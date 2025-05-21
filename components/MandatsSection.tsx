import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

// Mandat type
type Mandat = {
  id: number
  title: string
  link: string
  description: string
}

// Updated mandats data with new titles
const mandatsData: Mandat[] = [
  {
    id: 1,
    title: "Mandat Actions",
    link: "/mandats/actions",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 2,
    title: "Mandat Obligataire",
    link: "/mandats/obligataire",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 3,
    title: "Compass Strategy",
    link: "/mandats/compass-strategy",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 4,
    title: "Mandats Thématiques",
    link: "/mandats/thematiques",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 5,
    title: "Mandat profilé",
    link: "/mandats/profile",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 6,
    title: "Private Markets",
    link: "/mandats/private-markets",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
  {
    id: 7,
    title: "Structured Product",
    link: "/mandats/structured-product",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.",
  },
]

export default function MandatsSection() {
  const basePath = "/mycalie"

  return (
    <section id="mandats" className="py-4 scroll-mt-24">
      <div className="mb-6">
        <h2 className="section-title">Notre offre</h2>
        <p className="text-base text-gray-600 mt-2 font-light">Présentation et Reporting des Mandats de Gestion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mandatsData.map((mandat) => (
          <Link key={mandat.id} href={`${basePath}${mandat.link}`} className="block h-full">
            <Card className="overflow-hidden border border-[#746250]/30 shadow-none transition-colors duration-300 h-full bg-[#f1eeec]">
              <CardContent className="p-6 h-full flex flex-col">
                <h3 className="font-medium text-lg text-gray-800 mb-2">{mandat.title}</h3>
                <p className="text-base text-gray-600 mb-4 line-clamp-2 font-light flex-grow">{mandat.description}</p>
                <div className="inline-flex items-center text-gold hover:text-indosuez-dark transition-colors font-medium mt-auto">
                  En savoir plus <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  )
}
