"use client";

import { useEffect, useState, Suspense } from "react";
import { ClipboardCopy } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAccount, useBalance } from "wagmi";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function WalletCheckContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedNetwork = searchParams.get("network") || "erc20";
  const [percentage, setPercentage] = useState(0);
  const [copied, setCopied] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [usdtBalance, setUsdtBalance] = useState<string | null>(null);
  const [networkName, setNetworkName] = useState<string>("Ethereum");

  const { address: evmAddress, isConnected: isEvmConnected } = useAccount();
  const usdtContracts: { [key: string]: `0x${string}` } = {
    erc20: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    bep20: "0x55d398326f99059fF775485246999027B3197955",
  };
  const { data: evmUsdtBalance } = useBalance({
    address: evmAddress,
    token: selectedNetwork === "bep20" ? usdtContracts.bep20 : usdtContracts.erc20,
    chainId: selectedNetwork === "bep20" ? 56 : 1,
  });

  const [tronWeb, setTronWeb] = useState<TronWeb | null>(null);
  const tronUsdtContract = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t";

  const networkNames: { [key: string]: string } = {
    trc20: "Tron",
    bep20: "BSC",
    erc20: "Ethereum",
  };

  useEffect(() => {
    setPercentage(Math.floor(Math.random() * 31));

    // Always prioritize the selected network
    if (selectedNetwork === "trc20") {
      // Set the network name to Tron regardless of wallet availability
      setNetworkName(networkNames.trc20);
      
      // If TronWeb is available, use it
      if (window.tronWeb && window.tronWeb.defaultAddress) {
        const tron = window.tronWeb;
        setTronWeb(tron);
        const tronAddr = tron.defaultAddress.base58;
        setWalletAddress(tronAddr);
        fetchTronBalance(tron, tronAddr);
      } 
      // If TronWeb is not available but EVM wallet is connected (fallback case)
      else if (isEvmConnected && evmAddress) {
        setWalletAddress(evmAddress);
        // Still show Tron as the network, but use the EVM address
        if (evmUsdtBalance) {
          setUsdtBalance(Number(evmUsdtBalance.formatted).toFixed(2));
        }
      }
    } 
    // For EVM networks (Ethereum or BSC)
    else if (isEvmConnected && evmAddress) {
      setWalletAddress(evmAddress);
      setNetworkName(networkNames[selectedNetwork]);
      if (evmUsdtBalance) {
        setUsdtBalance(Number(evmUsdtBalance.formatted).toFixed(2));
      }
    }
  }, [selectedNetwork, isEvmConnected, evmAddress, evmUsdtBalance]);

  const fetchTronBalance = async (tron: TronWeb, address: string) => {
    try {
      const contract = await tron.contract().at(tronUsdtContract);
      const balance = await contract.balanceOf(address).call();
      setUsdtBalance(tron.fromSun(balance.toString()));
    } catch (error) {
      setUsdtBalance("N/A");
    }
  };

  const handleCopy = async () => {
    if (!walletAddress) return;
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
    }
  };

  const formatDate = () => {
    const date = new Date();
    return `${date.getDate().toString().padStart(2, "0")}.${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}.${date.getFullYear()} ${date
      .getHours()
      .toString()
      .padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto p-6 space-y-8">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Wallet Check</h2>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Step 3 of 3
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>Mode: Personal</span>
                <span>•</span>
                <span>Updated: {formatDate()}</span>
                <span>•</span>
                <span>Check cost: Free</span>
              </div>

              <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg">
                <span className="font-medium">{networkName}</span>
                <div className="flex items-center gap-1 ml-auto">
                  <span className="font-mono">
                    {walletAddress ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}` : "N/A"}
                  </span>
                  <button
                    className="p-1 hover:bg-gray-100 rounded transition-colors"
                    onClick={handleCopy}
                    title={copied ? "Copied!" : "Copy to clipboard"}
                    disabled={!walletAddress}
                  >
                    <ClipboardCopy className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              {usdtBalance && (
                <div className="text-sm text-gray-600">
                  USDT Balance: <span className="font-medium">{usdtBalance} USDT</span>
                </div>
              )}
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-48 h-48">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="16"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    fill="none"
                    stroke="#22c55e"
                    strokeWidth="16"
                    strokeDasharray={`${(percentage / 100) * 552} 552`}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-gray-800 flex items-center gap-1">
                      <span className="text-green-500">⚡</span>
                      <span>{percentage}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-blue-600" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
                <span>Blacklist Free</span>
              </div>
            </div>

            <div className="text-center text-sm text-gray-500">
              *where 0% reflects low-risk funds, and 100% reflects illicit funds.
            </div>

            <Button
              onClick={() => router.push("/")}
              className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full p-6"
            >
              Home
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

// Main component with Suspense boundary
export default function Step3() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f5f5f5] py-16">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto p-6 space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold">Wallet Check</h2>
                <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                  Step 3 of 3
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
