import { Button } from "@/components/ui/button"

export default function Pricing() {
  return (
    <div className="min-h-screen bg-[#f5f5f5] py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl font-bold mb-4">How much is your peace of mind worth</h1>
              <div className="inline-block bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm mb-6">
                FIRST INSPECTION FREE
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">From</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-blue-600">20 TRX</span>
                    <span className="text-gray-600">/ per additional check</span>
                  </div>
                </div>
                <Button className="w-full md:w-auto">Contact us →</Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-blue-600 rounded-full absolute right-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

