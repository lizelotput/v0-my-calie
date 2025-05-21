import Link from "next/link"
import { ArrowRight } from "lucide-react"

// QuickLink type
type QuickLink = {
  id: number
  title: string
  link: string
}

// Sample quick links data
const quickLinksData: QuickLink[] = [
  {
    id: 1,
    title: "Indosuez au Luxembourg",
    link: "/about/luxembourg",
  },
  {
    id: 2,
    title: "La place financière au Luxembourg",
    link: "/about/financial-center",
  },
  {
    id: 3,
    title: "L'assurance vie au Luxembourg",
    link: "/about/life-insurance",
  },
  {
    id: 4,
    title: "Vos interlocuteurs",
    link: "/about/contacts",
  },
]

export default function QuickLinks() {
  const basePath = "/mycalie"

  return (
    <section id="about" className="scroll-mt-24 overflow-hidden">
      {/* True full width background - removed py-4 padding */}
      <div className="bg-beige w-screen relative left-1/2 right-1/2 -mx-[50vw]">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-20">
          <h2 className="section-title mb-8">Nous connaître</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 mt-6">
            {quickLinksData.map((link) => (
              <Link
                key={link.id}
                href={`${basePath}${link.link}`}
                className="text-gray-700 hover:text-[#746250] font-light text-lg flex items-center group py-2"
              >
                <span>{link.title}</span>
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
