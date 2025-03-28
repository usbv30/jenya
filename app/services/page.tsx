import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, Users, FileCheck, Building2, ShieldCheck } from "lucide-react"

export default function Services() {
  const services = [
    {
      icon: <Search className="w-6 h-6" />,
      title: "AML/KYT screening",
      description:
        "API solutions that empower AML compliance tools within your current system. All transactions are automatically verified to comply with AML and FATF requirements and minimize risk exposure.",
      dark: true,
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "KYC for business",
      description:
        "The streamlined and automated verification process empowers your business to swiftly onboard customers, reducing manual effort and mitigating identity fraud and illicit activity risks.",
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "AML/KYC procedures",
      description:
        "Launch your crypto venture with ease, simplicity, and confidence through our streamlined AML and KYC consulting, ensuring smooth compliance and effective risk management right from the beginning.",
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Corporate accounts at CEX/EMI",
      description:
        "Streamline corporate account opening on CEX EMI with our expert assistance, while your focus remains on business growth in the crypto industry.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "Blockchain investigations",
      description:
        "Recover stolen cryptocurrencies with AML Check expert blockchain investigations, swiftly identifying culprits and ensuring effective recovery.",
    },
  ]

  return (
    <div className="min-h-screen bg-[#f5f5f5] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4">AML Check services</h2>
        <p className="text-center text-gray-600 mb-12">We provide full pack of options for safe work with crypto</p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className={`p-6 ${service.dark ? "bg-gray-900 text-white" : "bg-white"}`}>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                  service.dark ? "bg-gray-800" : "bg-gray-100"
                }`}
              >
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
              <p className={service.dark ? "text-gray-300" : "text-gray-600"}>{service.description}</p>
              <Button variant="link" className={`mt-4 p-0 ${service.dark ? "text-white" : "text-blue-600"}`}>
                Learn more →
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

