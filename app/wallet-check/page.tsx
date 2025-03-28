"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useRouter } from "next/navigation";

const networks = [
  {
    id: "trc20",
    name: "USDT",
    network: "TRC-20 (Tron)",
    iconUrl: "/tron-trx-logo.png",
  },
  {
    id: "bep20",
    name: "USDT",
    network: "BEP-20 (BSC)",
    iconUrl: "https://s1.bycsi.com/app/assets/token/a5f5acef9e4ee381767205006404a5e6.svg",
  },
  {
    id: "erc20",
    name: "USDT",
    network: "Ethereum (ERC-20)",
    iconUrl: "/erc-logo.png",
  },
];


export default function WalletCheck() {
  const router = useRouter()

  const handleContinue = (networkId: string) => {
    router.push(`/wallet-check-step2?network=${networkId}`);
  };


  return (
    <div className="min-h-screen bg-[#f5f5f5] py-16">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Wallet check</h2>
              <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">
                Step 1 of 3
              </span>
            </div>
  
            <p className="text-gray-500">
              To continue, please select the desired network
            </p>
  
            <div className="space-y-3">
              {networks.map((network) => (
                <button
                  key={network.id}
                  onClick={() => handleContinue(network.id)}
                  className="w-full p-4 border rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center`}>
                    <img
                      src={network.iconUrl}
                      alt={network.name}
                      className="w-8 h-8 object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">{network.name}</div>
                    <div className="text-sm text-gray-500">{network.network}</div>
                  </div>
                </button>
              ))}
            </div>
  
            <Button className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200 rounded-full">
              Continue
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
