import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export default function WalletCheck() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col items-center pt-8">
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
          <span className="font-semibold">AML Check</span>
        </div>
      </div>

      <Card className="w-full max-w-md p-6">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Wallet check</h2>
            <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm">Step 1 of 4</span>
          </div>

          <p className="text-gray-500">To continue, please select the desired network</p>

          <div className="space-y-3">
            <button className="w-full p-4 border rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500">T</span>
              </div>
              <div className="text-left">
                <div className="font-medium">USDT</div>
                <div className="text-sm text-gray-500">TRC-20</div>
              </div>
            </button>

            <button className="w-full p-4 border rounded-lg flex items-center gap-4 hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-gray-500">E</span>
              </div>
              <div className="text-left">
                <div className="font-medium">USDT</div>
                <div className="text-sm text-gray-500">ERC-20</div>
              </div>
            </button>
          </div>

          <Button className="w-full bg-blue-100 text-blue-600 hover:bg-blue-200">Continue</Button>
        </div>
      </Card>
    </div>
  )
}

