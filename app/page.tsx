'use client'

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Search, Users, FileCheck, Building2, ShieldCheck, LogIn } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
  ];

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <svg width="33" height="32" viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_i_151_560)">
                    <circle cx="16.5" cy="16" r="16" fill="#0057FF"></circle>
                    <path
                      d="M8.59979 14.6151C8.59979 11.8183 8.59979 10.4199 8.93118 9.94941C9.26256 9.47896 10.5822 9.02887 13.2213 8.12869L13.7242 7.95719C15.0999 7.48795 15.7878 7.25333 16.5 7.25333C17.2122 7.25333 17.9001 7.48795 19.2759 7.95719L19.7787 8.12869C22.4179 9.02887 23.7375 9.47896 24.0688 9.94941C24.4002 10.4199 24.4002 11.8183 24.4002 14.6151C24.4002 15.0376 24.4002 15.4957 24.4002 15.9924C24.4002 20.9239 20.6793 23.317 18.3447 24.3332C17.7114 24.6088 17.3947 24.7467 16.5 24.7467C15.6053 24.7467 15.2887 24.6088 14.6554 24.3332C12.3208 23.317 8.59979 20.9239 8.59979 15.9924C8.59979 15.4957 8.59979 15.0376 8.59979 14.6151Z"
                      fill="white"
                    ></path>
                </g>
                <defs>
                    <filter
                      id="filter0_i_151_560"
                      x="0.5"
                      y="0"
                      width="32"
                      height="36"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix"></feFlood>
                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"></feBlend>
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      ></feColorMatrix>
                        <feOffset dy="4"></feOffset>
                        <feGaussianBlur stdDeviation="3"></feGaussianBlur>
                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"></feComposite>
                        <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.35 0"></feColorMatrix>
                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_151_560"></feBlend>
                    </filter>
                </defs>
                </svg>
                <span className="font-semibold">AML Check</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">
                  Pricing
                </a>
                <a href="#services" className="text-gray-600 hover:text-gray-900">
                  Services
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900">
                  About Us
                </a>
              </nav>
            </div>
            <div className="flex items-center">
              <Link href="/wallet-check" className="w-full">
                <Button variant="default" className="bg-black text-white hover:bg-black/90 rounded-full w-full">
                  <LogIn className="w-4 h-4" />
                  Check
                </Button>
              </Link>

              {/* Mobile Menu Button */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden ml-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
            </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 md:hidden z-50">
              <nav className="flex flex-col space-y-4">
                <a href="#pricing" className="text-gray-600 hover:text-gray-900 py-2">
                  Pricing
                </a>
                <a href="#services" className="text-gray-600 hover:text-gray-900 py-2">
                  Services
                </a>
                <a href="#about" className="text-gray-600 hover:text-gray-900 py-2">
                  About Us
                </a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Checking cryptocurrency wallets for dirty money
            </h1>
            <p className="text-gray-600 text-lg">
              By checking your wallets, you protect yourself from scammers and
              stolen coins.
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg rounded-full">
              <Link href="/wallet-check">Check your Wallet</Link>
            </Button>

            <div className="flex flex-col">
              <Image src="/logo-trustpilot.png" alt="Trustpilot" width={100} height={100} />
              <div className="flex items-center gap-1 mt-2">
                {"★★★★☆".split("").map((star, i) => (
                    <span key={i} className="text-green-500">
                      {star}
                    </span>
                  ))}
                <span className="ml-2 text-sm text-gray-600">4.5 out of 5</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/123-rhSbpj8xh9nph5AKwsAM57mUedDmck.png"
              alt="AMLBot Dashboard Visualization"
              width={600}
              height={400}
              className="rounded-lg shadow-xl"
              priority
            />
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our 300+ clients and partners
          </h2>

          <div className="overflow-hidden whitespace-nowrap">
            <div className="animate-marquee inline-flex gap-8 shrink-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-1-qb90O4VukjmfGpGZrqE88SiwzZkG7D.png"
                alt="KUNA IO"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-2-hLP7aBHGnj3DUHgBqMbLvco82E44pa.png"
                alt="e-Scrooge"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-3-wtJZYVzEWJQFhgnv6d4r5FnMwG1sab.png"
                alt="CryptoPNL"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-4-yzEhRANya4VAQ0UJbfCO3eqh8iy7Oq.png"
                alt="COMISTAR"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-5-3yjF9GIukXpblBI3JyDms6riHZLZde.png"
                alt="GOODCRYPTO"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-sOg2B4iY6CpdmZP9d4UJC6pFo64O6A.png"
                alt="hodl credit"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-PehYRyMUNhSguzXV9hzjQvL5EE3Z7H.png"
                alt="eclipscoin"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-3R3y9eXIg0h5VlcuXFv8ovDl0inO5a.png"
                alt="purefi"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-7-RtPHtV6pHp8uO1ddJnvFZCFAHgtZei.png"
                alt="Box exchanger"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-q32wcMPxvGuqznuGOolIM2XCcyMjx7.png"
                alt="LetsExchange"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-8-3iUpzsfQzbLI6NDLsQfvH92dBd7gWO.png"
                alt="Crystal"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-1-qb90O4VukjmfGpGZrqE88SiwzZkG7D.png"
                alt="KUNA IO"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-2-hLP7aBHGnj3DUHgBqMbLvco82E44pa.png"
                alt="e-Scrooge"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-3-wtJZYVzEWJQFhgnv6d4r5FnMwG1sab.png"
                alt="CryptoPNL"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-4-yzEhRANya4VAQ0UJbfCO3eqh8iy7Oq.png"
                alt="COMISTAR"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-5-3yjF9GIukXpblBI3JyDms6riHZLZde.png"
                alt="GOODCRYPTO"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-sOg2B4iY6CpdmZP9d4UJC6pFo64O6A.png"
                alt="hodl credit"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-PehYRyMUNhSguzXV9hzjQvL5EE3Z7H.png"
                alt="eclipscoin"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-3R3y9eXIg0h5VlcuXFv8ovDl0inO5a.png"
                alt="purefi"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-7-RtPHtV6pHp8uO1ddJnvFZCFAHgtZei.png"
                alt="Box exchanger"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-q32wcMPxvGuqznuGOolIM2XCcyMjx7.png"
                alt="LetsExchange"
                width={150}
                height={50}
                className="object-contain"
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-8-3iUpzsfQzbLI6NDLsQfvH92dBd7gWO.png"
                alt="Crystal"
                width={150}
                height={50}
                className="object-contain"
              />
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white py-16 mt-16">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">+$100 000 000</h3>
              <p className="text-blue-100">
                Amount of the risky funds detected
              </p>
            </div>
            <div className="text-center">
              <div className="flex justify-center items-center gap-8 mb-4">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/binance-Izv2EliSLbBbSzJ7wkj9i6RMmbQO8c.png"
                  alt="Binance"
                  width={120}
                  height={30}
                  className="object-contain"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/huobi-8mC7UfLrQitZJI4thErtPmBjNVluCm.png"
                  alt="Huobi"
                  width={120}
                  height={30}
                  className="object-contain"
                />
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/okx-cBglM0juuIPiVcfhf10h03zrYN0KxD.png"
                  alt="OKX"
                  width={120}
                  height={30}
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Compliance departments
              </h3>
              <p className="text-blue-100">that accept our AML procedures</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">60,000+</h3>
              <p className="text-blue-100">Service providers checked</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            AML Check services
          </h2>
          <p className="text-center text-gray-600 mb-12">
            We provide full pack of options for safe work with crypto
          </p>

          <div className="flex flex-nowrap gap-4 overflow-x-auto pb-4">
            {services.map((service, index) => (
              <Card
                key={index}
                className={`flex flex-col flex-shrink-0 w-64 p-6 ${
                  service.dark ? "bg-gray-900 text-white" : "bg-white"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                    service.dark ? "bg-gray-800" : "bg-gray-100"
                  }`}
                >
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p
                  className={`${
                    service.dark ? "text-gray-300" : "text-gray-600"
                  } text-sm`}
                >
                  {service.description}
                </p>
                {/* Sticky "Learn more" button */}
                <Button
                  variant="link"
                  className={`mt-auto p-0 rounded-full ${
                    service.dark ? "text-white" : "text-blue-600"
                  }`}
                >
                  Learn more →
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-sm overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8 md:p-12 lg:p-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  How much is your peace of mind worth
                </h2>
              <div className="inline-block bg-orange-100 text-orange-600 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
                  FIRST INSPECTION FREE
                </div>
              <div className="space-y-6">
                  <div>
                  <p className="text-gray-600 text-lg mb-1">From</p>
                    <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-blue-500">
                      20 <span className="text-purple-500">TRX</span>
                      </span>
                    <span className="text-gray-500 text-lg">/ per additional check</span>
                  </div>
                </div>
                <Link href="/wallet-check" className="inline-block">
                  <Button className="rounded-full px-6 py-6 h-auto text-base font-medium">Contact us →</Button>
                </Link>
              </div>
            </div>
            <div className="relative h-full">
              <div className="h-full min-h-[300px] md:min-h-[400px] lg:min-h-[500px] relative overflow-hidden">
                <Image
                  src="https://i.ibb.co/Nt9kMbc/bg-2.png"
                  alt="Security illustration"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">Why AML Check?</h2>

        <div className="grid gap-6">
          {/* Sanctions List Card */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12 2L3 9L12 16L21 9L12 2Z"
                      stroke="#0066FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 9V19L12 22L21 19V9"
                      stroke="#0066FF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Checking the sanctions lists</h3>
                <p className="text-gray-700 mb-4">
                  We will show whether the address is on the sanctions lists. Any interaction with such addresses may
                  result in fines, blocking or license revocation.
                </p>
                <Button className="rounded-full bg-blue-500 hover:bg-blue-600">Let&apos;s discuss</Button>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Helping to Salvage Card */}
            <div className="bg-gray-800 text-white rounded-xl p-6 shadow-sm">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                        stroke="#3B82F6"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Helping to salvage stolen crypto</h3>
                  <ul className="space-y-3 text-gray-300">
                    <li className="flex gap-2">
                      <span>•</span>
                      <p>We offer KYT/Wallet Screening, KYC, AML, and more for crypto businesses.</p>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <p>
                        AML Check risk scoring is based on multiple data sources, ensuring that we have the most
                        reliable data in the industry.
                      </p>
                    </li>
                    <li className="flex gap-2">
                      <span>•</span>
                      <p>
                        Our user-friendly services and solutions streamline your company processes, removing compliance
                        provider complexity.
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
                    </div>

            {/* Customer Support Card */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                        stroke="#0066FF"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold mb-2">Customer Support</h3>
                  <p className="text-gray-700 mb-4">
                    AML Check understands the significance of fast, friendly customer support, thus we&apos;re always
                    here for our clients. 24/7 support.
                  </p>
                  <p className="text-sm text-gray-500 mb-4">An answer during the night may take a bit longer</p>
                  <Link href="/" className="text-blue-500 font-medium flex items-center">
                    Contact <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Team Section */}
    <section id="about" className="py-16 bg-[#f5f5f5]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Our team</h2>

          <div className="max-w-4xl mx-auto text-center mb-12">
            <p className="text-xl leading-relaxed">
              AML officers help resolve difficult situations and keep you safe from fines and blockages. Professional
              specialists will represent your interests up to the court, if necessary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Team Member 1 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="data:image/webp;base64,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"
                  alt="Slava Demchuk"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Co-Founder</p>
                <h3 className="text-2xl font-bold">Slava Demchuk</h3>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team2-CTL725D4.webp"
                  alt="Vasily Vidmanov"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Chief Operating Officer</p>
                <h3 className="text-2xl font-bold">Vasily Vidmanov</h3>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team3-DH9H-rCm.webp"
                  alt="Andrew Aleksandrov"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Chief Commercial Officer</p>
                <h3 className="text-2xl font-bold">Andrew Aleksandrov</h3>
              </div>
            </div>

            {/* Team Member 4 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team4-B3PbVeRF.webp"
                  alt="Sid Panda"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Blockchain Analyst</p>
                <h3 className="text-2xl font-bold">Sid Panda</h3>
              </div>
            </div>

            {/* Team Member 5 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team5-Z1xAavYy.webp"
                  alt="Nikolay Demchuk"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Certified AML Specialist</p>
                <h3 className="text-2xl font-bold">Nikolay Demchuk</h3>
              </div>
            </div>

            {/* Team Member 6 */}
            <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team6-DPDdh9tS.webp"
                  alt="Anna Voevodina"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Legal Advisor</p>
                <h3 className="text-2xl font-bold">Anna Voevodina</h3>
              </div>
            </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team7-CmlWnAqS.webp"
                  alt="Anna Voevodina"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Business development manager</p>
                <h3 className="text-2xl font-bold">Vlad Raskosov</h3>
              </div>
            </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team8-Ba7qheCQ.webp"
                  alt="Anna Voevodina"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Business development manager</p>
                <h3 className="text-2xl font-bold">Denys Shestak</h3>
              </div>
            </div>

          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
              <div className="p-4">
                <Image
                  src="team9-sIMRwxbc.webp"
                  alt="Nikita Raskosov"
                  width={400}
                  height={400}
                  className="w-full aspect-square object-cover object-top rounded-lg mb-4"
                />
                <p className="text-gray-500 mb-1">Customer support manager</p>
                <h3 className="text-2xl font-bold">Nikita Raskosov</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12">Why AMLBot</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Safety Card */}
            <Card className="p-8 bg-white">
              <h3 className="text-4xl font-bold mb-4">Safety</h3>
              <p className="text-xl mb-8">
                AMLBot does not collect or store data about you or your business. You remain anonymous and protected.
              </p>
              <div className="w-64 h-64 mx-auto float-left">
                <Image
                  src="11-CEJH9EXk.webp"
                  alt="Security Lock"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            </Card>

            {/* Reliability Card */}
            <Card className="p-8 bg-blue-500 text-white">
              <h3 className="text-4xl font-bold mb-4">Reliability</h3>
              <p className="text-xl mb-8">
                We have the relevant certificates, which you can show to the inspection authorities
              </p>
              <div className="bg-white rounded-lg p-4">
                <Image
                  src="22-CzpWkn_R.webp"
                  alt="AML Certificate"
                  width={400}
                  height={300}
                  className="w-full h-auto object-contain"
                />
              </div>
            </Card>

            {/* 24/7 Support Card */}
            <Card className="p-8 bg-white">
              <h3 className="text-4xl font-bold mb-4">24/7 support</h3>
              <p className="text-xl mb-4">
                We are on call 24/7, so any issue can be resolved quickly and in a live chat format.
              </p>
              <p className="text-gray-600 mb-8">
                We are living people, so may not respond as promptly at night as during the day 👋
              </p>
              <div className="w-64 h-64 mx-auto relative float-left">
                <Image
                  src="33-1yWRRjf1.webp"
                  alt="Telegram Support"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            </Card>

            {/* Experience Card */}
            <Card className="p-8 bg-gray-900 text-white">
              <h3 className="text-4xl font-bold mb-4">Experience</h3>
              <p className="text-xl mb-8">
                We saved about $5 359 800 from being blocked on exchanges and exchangers
              </p>
              <div className="w-64 h-64 mx-auto">
                <Image
                  src="44-DcUgPKtf.webp"
                  alt="Money Saved"
                  width={128}
                  height={128}
                  className="w-full h-full object-contain"
                />
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">FAQs</h2>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="border-b border-t py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What does the address check show?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  The address check shows the risk level associated with a cryptocurrency address, including its
                  transaction history, connections to known risky entities, and compliance with regulatory requirements.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What do the parameters in the check results mean?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  The parameters include risk score, transaction volume, connection to sanctioned entities, and other
                  metrics that help determine the overall safety of interacting with a particular address.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How do I understand risk assessment?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  Risk assessment is based on multiple factors including transaction history, connections to known risky
                  addresses, and compliance with international regulations. Higher risk scores indicate greater
                  potential for regulatory issues.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How quickly is the balance replenished?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  Balance replenishment typically occurs within minutes after payment confirmation. For larger packages,
                  it may be processed manually within 24 hours.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What does the percentage risk score mean?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  The percentage risk score indicates the likelihood of an address being associated with illicit
                  activities. Scores below 10% are generally considered safe, 10-50% require caution, and above 50%
                  indicate high risk.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How does AML Check help to protect you against blocking?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  AML Check identifies high-risk addresses before you interact with them, preventing transactions that
                  could trigger compliance flags with exchanges or payment processors, thus avoiding potential account
                  blocks.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  The risk is higher than 50%, but I am certain that the address is reliable. What to do?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  We recommend contacting our support team for a manual review. In some cases, legitimate addresses may
                  have high risk scores due to indirect connections. Our specialists can provide a detailed analysis and
                  documentation for your compliance needs.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-8" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What is the difference between an address and transaction checks?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  Address checks analyze the entire history and risk profile of a wallet address, while transaction
                  checks focus on specific transactions, their amounts, and direct connections. Transaction checks are
                  more specific but provide less context.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What happens if I don't use all my checks each month?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  Unused checks from monthly subscription packages roll over to the next month, up to a maximum of three
                  months' worth of checks. After that, the oldest unused checks will expire.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  How often are checks recommended to do?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  For active traders, we recommend checking new addresses before each transaction. For businesses,
                  regular weekly or monthly checks of frequent partners are advised, as risk profiles can change over
                  time.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-11" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What cryptocurrencies does AML Check analyze?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  AML Check supports major cryptocurrencies including Bitcoin, Ethereum, Litecoin, Bitcoin Cash, and
                  most ERC-20 tokens. We regularly add support for additional cryptocurrencies based on market demand.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12" className="border-b py-4">
                <AccordionTrigger className="text-lg font-medium text-left">
                  What if I will need more checks?
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-2 text-gray-600">
                  You can purchase additional checks at any time through your account dashboard. We also offer custom
                  enterprise packages for businesses with high-volume needs. Contact our sales team for personalized
                  options.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-6">
              <div className="w-40">
                <svg width="100%" height="auto" viewBox="0 0 158 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                            <circle cx="16.5" cy="16" r="16" fill="#fff"></circle>
                        </g>
                        <path d="M8.59979 14.6151C8.59979 11.8183 8.59979 10.4199 8.93118 9.94941C9.26256 9.47896 10.5822 9.02887 13.2213 8.12869L13.7242 7.95719C15.0999 7.48795 15.7878 7.25333 16.5 7.25333C17.2122 7.25333 17.9001 7.48795 19.2759 7.95719L19.7787 8.12869C22.4179 9.02887 23.7375 9.47896 24.0688 9.94941C24.4002 10.4199 24.4002 11.8183 24.4002 14.6151C24.4002 15.0376 24.4002 15.4957 24.4002 15.9924C24.4002 20.9239 20.6793 23.317 18.3447 24.3332C17.7114 24.6088 17.3947 24.7467 16.5 24.7467C15.6053 24.7467 15.2887 24.6088 14.6554 24.3332C12.3208 23.317 8.59979 20.9239 8.59979 15.9924C8.59979 15.4957 8.59979 15.0376 8.59979 14.6151Z" fill="black"></path>
                        <path d="M48.2713 23H44.9759L49.9972 8.45455H53.9602L58.9744 23H55.679L52.0355 11.7784H51.9219L48.2713 23ZM48.0653 17.2827H55.8494V19.6832H48.0653V17.2827ZM60.7251 8.45455H64.5178L68.5234 18.2273H68.6939L72.6996 8.45455H76.4922V23H73.5092V13.5327H73.3885L69.6243 22.929H67.593L63.8288 13.4972H63.7081V23H60.7251V8.45455ZM79.0259 23V8.45455H82.1012V20.4645H88.337V23H79.0259ZM107.836 13.5469H104.725C104.669 13.1444 104.553 12.7869 104.377 12.4744C104.202 12.1572 103.977 11.8873 103.703 11.6648C103.428 11.4422 103.111 11.2718 102.751 11.1534C102.396 11.035 102.01 10.9759 101.593 10.9759C100.841 10.9759 100.185 11.1629 99.6261 11.5369C99.0674 11.9062 98.6341 12.446 98.3263 13.1562C98.0186 13.8617 97.8647 14.7187 97.8647 15.7273C97.8647 16.7642 98.0186 17.6354 98.3263 18.3409C98.6388 19.0464 99.0745 19.5791 99.6332 19.9389C100.192 20.2988 100.838 20.4787 101.572 20.4787C101.984 20.4787 102.365 20.4242 102.716 20.3153C103.071 20.2064 103.386 20.0478 103.66 19.8395C103.935 19.6264 104.162 19.3684 104.342 19.0653C104.527 18.7623 104.654 18.4167 104.725 18.0284L107.836 18.0426C107.756 18.7102 107.555 19.3542 107.233 19.9744C106.915 20.59 106.487 21.1416 105.947 21.6293C105.412 22.1122 104.773 22.4957 104.029 22.7798C103.291 23.0592 102.455 23.1989 101.522 23.1989C100.225 23.1989 99.065 22.9053 98.0423 22.3182C97.0243 21.7311 96.2193 20.8812 95.6275 19.7685C95.0404 18.6558 94.7468 17.3087 94.7468 15.7273C94.7468 14.1411 95.0451 12.7917 95.6417 11.679C96.2383 10.5663 97.0479 9.71875 98.0707 9.13636C99.0934 8.54924 100.244 8.25568 101.522 8.25568C102.365 8.25568 103.146 8.37405 103.866 8.6108C104.591 8.84754 105.232 9.19318 105.791 9.64773C106.35 10.0975 106.804 10.6491 107.154 11.3026C107.51 11.956 107.737 12.7041 107.836 13.5469ZM113.01 16.6932V23H109.985V8.45455H112.925V14.0156H113.053C113.299 13.3717 113.697 12.8674 114.246 12.5028C114.795 12.1335 115.484 11.9489 116.313 11.9489C117.07 11.9489 117.731 12.1146 118.294 12.446C118.863 12.7727 119.303 13.2438 119.615 13.8594C119.933 14.4702 120.089 15.2017 120.084 16.054V23H117.059V16.5938C117.063 15.9214 116.893 15.3982 116.547 15.0241C116.206 14.6501 115.728 14.4631 115.113 14.4631C114.701 14.4631 114.336 14.5507 114.019 14.7259C113.706 14.901 113.46 15.1567 113.28 15.4929C113.105 15.8243 113.015 16.2244 113.01 16.6932ZM127.437 23.2131C126.315 23.2131 125.349 22.9858 124.539 22.5312C123.734 22.072 123.114 21.4233 122.678 20.5852C122.243 19.7424 122.025 18.7457 122.025 17.5952C122.025 16.473 122.243 15.4882 122.678 14.6406C123.114 13.7931 123.727 13.1326 124.518 12.6591C125.313 12.1856 126.246 11.9489 127.316 11.9489C128.036 11.9489 128.706 12.0649 129.326 12.2969C129.951 12.5241 130.496 12.8674 130.96 13.3267C131.428 13.786 131.793 14.3636 132.053 15.0597C132.314 15.7509 132.444 16.5606 132.444 17.4886V18.3196H123.232V16.4446H129.596C129.596 16.009 129.501 15.6231 129.312 15.2869C129.122 14.9508 128.86 14.688 128.523 14.4986C128.192 14.3045 127.806 14.2074 127.366 14.2074C126.906 14.2074 126.499 14.3139 126.144 14.527C125.794 14.7353 125.519 15.017 125.32 15.3722C125.121 15.7225 125.02 16.1132 125.015 16.544V18.3267C125.015 18.8665 125.114 19.3329 125.313 19.7259C125.517 20.1188 125.803 20.4219 126.173 20.6349C126.542 20.848 126.98 20.9545 127.487 20.9545C127.823 20.9545 128.13 20.9072 128.41 20.8125C128.689 20.7178 128.928 20.5758 129.127 20.3864C129.326 20.197 129.478 19.965 129.582 19.6903L132.38 19.875C132.238 20.5473 131.947 21.1345 131.506 21.6364C131.071 22.1335 130.507 22.5218 129.816 22.8011C129.129 23.0758 128.336 23.2131 127.437 23.2131ZM139.347 23.2131C138.23 23.2131 137.269 22.9763 136.464 22.5028C135.664 22.0246 135.048 21.3617 134.617 20.5142C134.191 19.6667 133.978 18.6913 133.978 17.5881C133.978 16.4706 134.193 15.4905 134.624 14.6477C135.06 13.8002 135.678 13.1397 136.478 12.6662C137.278 12.188 138.23 11.9489 139.333 11.9489C140.285 11.9489 141.118 12.1217 141.833 12.4673C142.548 12.813 143.114 13.2983 143.531 13.9233C143.947 14.5483 144.177 15.2822 144.219 16.125H141.364C141.284 15.5805 141.071 15.1425 140.725 14.8111C140.384 14.4749 139.937 14.3068 139.383 14.3068C138.914 14.3068 138.504 14.4347 138.154 14.6903C137.808 14.9413 137.539 15.3082 137.344 15.7912C137.15 16.2741 137.053 16.8589 137.053 17.5455C137.053 18.2415 137.148 18.8333 137.337 19.321C137.531 19.8087 137.804 20.1804 138.154 20.4361C138.504 20.6918 138.914 20.8196 139.383 20.8196C139.728 20.8196 140.039 20.7486 140.313 20.6065C140.593 20.4645 140.822 20.2585 141.002 19.9886C141.187 19.714 141.308 19.3849 141.364 19.0014H144.219C144.172 19.8348 143.945 20.5687 143.538 21.2031C143.135 21.8329 142.579 22.3253 141.869 22.6804C141.158 23.0355 140.318 23.2131 139.347 23.2131ZM148.898 19.8608L148.905 16.2315H149.346L152.84 12.0909H156.313L151.618 17.5739H150.901L148.898 19.8608ZM146.157 23V8.45455H149.182V23H146.157ZM152.975 23L149.765 18.2486L151.782 16.1108L156.519 23H152.975Z" fill="#fff"></path>
                    </svg>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400">SAFELEMENT LIMITED,</p>
                <p className="text-gray-400">
                  FLAT H 3/F TOWER 5 THE
                  <br />
                  BEAUMOUNT 8 SHEK KOK ROAD
                  <br />
                  TSEUNG KWAN O NT, HONG
                  <br />
                  KONG
                </p>
              </div>
            </div>

            {/* Products */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Products</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    AMLBot
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Investigation
                  </Link>
                </li>
              </ul>
            </div>

            {/* Regulatory */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Regulatory framework</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Terms of service
                  </Link>
                </li>
                <li>
                  <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Socials</h3>
              <div className="grid grid-cols-2 gap-2">
                <Link href="https://t.me/AML_GROUP" className="text-gray-400 hover:text-white transition-colors">
                  Telegram
                </Link>
                <Link href="https://redis.com/blog/aml-bot-is-now-aml-check/" className="text-gray-400 hover:text-white transition-colors">
                  Redis
                </Link>
                <Link href="https://linkedin.com/company/amlbot/" className="text-gray-400 hover:text-white transition-colors">
                  LinkedIn
                </Link>
                <Link href="https://x.com/AMLBotHQ" className="text-gray-400 hover:text-white transition-colors">
                  Twitter
                </Link>
                <Link href="https://medium.com/@AMLBot" className="text-gray-400 hover:text-white transition-colors">
                  Medium
                </Link>
                <Link href="https://youtube.com/channel/UCwWKnYS5sQLWVwFBBEEYJgw/videos" className="text-gray-400 hover:text-white transition-colors">
                  YouTube
                </Link>
                <Link href="https://www.tiktok.com/@amlbot" className="text-gray-400 hover:text-white transition-colors">
                  TikTok
                </Link>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-16 pt-8 border-t border-gray-800">
            <p className="text-gray-400">© 2022 AMLCheck</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
