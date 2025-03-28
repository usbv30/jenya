import Image from "next/image"

export default function Partners() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our 300+ clients and partners</h2>

          <div className="flex gap-8 overflow-hidden whitespace-nowrap">
            <div className="animate-marquee flex gap-8">
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
            </div>
            <div className="animate-marquee flex gap-8" aria-hidden="true">
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
            </div>
          </div>
        </div>

        <div className="bg-blue-600 text-white py-16 mt-16">
          <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">+$100 000 000</h3>
              <p className="text-blue-100">Amount of the risky funds detected</p>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold mb-2">Compliance departments</h3>
              <p className="text-blue-100">that accept our AML procedures</p>
            </div>
            <div className="text-center">
              <h3 className="text-4xl font-bold mb-2">60,000+</h3>
              <p className="text-blue-100">Service providers checked</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

