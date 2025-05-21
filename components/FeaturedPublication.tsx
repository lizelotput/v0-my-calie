import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"

// Featured publication type
type FeaturedPublication = {
  id: number
  title: string
  image: string
  link: string
  type: string
  date: string
  description: string
}

// Sample featured publication data
const featuredPublication: FeaturedPublication = {
  id: 1,
  title: "Quand l'impensable devient possible",
  image:
    "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/8/2/2/6/606228-1-eng-GB/7cd0b6429028-Monthly-House-View-04.jpg",
  link: "/publications/monthly-house-view-avril-2025",
  type: "monthly house view",
  date: "2025-04-01",
  description:
    "Notre analyse mensuelle des marchés financiers et des perspectives économiques. Découvrez nos recommandations d'investissement pour le mois d'avril 2025.",
}

export default function FeaturedPublication() {
  const basePath = "/mycalie"

  return (
    <div className="sticky top-[50px] pt-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-4 tracking-wider normal-case">Publication à la une</h3>
      <Card className="overflow-hidden border-0 shadow-sm">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] max-h-[300px]">
            <Image
              src={
                featuredPublication.image.startsWith("http")
                  ? featuredPublication.image
                  : `${basePath}${featuredPublication.image}`
              }
              alt={featuredPublication.title}
              fill
              className="object-cover"
            />
            {/* Publication type at the top */}
            <div className="absolute top-0 left-0 right-0 p-2">
              <div className="flex items-center text-publication-monthly">
                <span className="text-2xl mr-1.5">•</span>
                <span className="text-base font-bold font-variant-small-caps">{featuredPublication.type}</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4">
              <div className="h-16 flex flex-col justify-end">
                <h4 className="font-medium text-lg text-white normal-case line-clamp-2 drop-shadow-md">
                  {featuredPublication.title}
                </h4>
              </div>
              <p className="text-sm text-gray-200 mt-1 font-light">{formatDate(featuredPublication.date)}</p>
            </div>
          </div>
          <div className="p-4">
            <p className="text-base text-gray-600 mb-4 line-clamp-3 font-light">{featuredPublication.description}</p>
            <Button
              asChild
              size="default"
              className="w-full bg-sable hover:bg-sable text-white text-base py-2 uppercase tracking-wider font-light btn btn-block button-primary sweep-to-top text-center color-white text-uppercase rounded-0 ls-3"
            >
              <Link href={`${basePath}${featuredPublication.link}`}>Lire la publication</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
