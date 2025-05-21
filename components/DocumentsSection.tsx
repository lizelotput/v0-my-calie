"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

// Document type
type Document = {
  id: number
  title: string
  date: string
  description?: string
  downloadUrl: string
}

// Sample documents data
const documentsData: Document[] = [
  {
    id: 1,
    title: "Rapport trimestriel Q1 2025",
    date: "2025-03-31",
    description: "Analyse détaillée des performances financières du premier trimestre 2025.",
    downloadUrl: "/documents/rapport-q1-2025.pdf",
  },
  {
    id: 2,
    title: "Guide d'investissement 2025",
    date: "2025-01-15",
    description: "Perspectives et stratégies d'investissement recommandées pour l'année 2025.",
    downloadUrl: "/documents/guide-investissement-2025.pdf",
  },
  {
    id: 3,
    title: "Analyse des marchés émergents",
    date: "2025-02-22",
    // No description for this document
    downloadUrl: "/documents/marches-emergents-2025.pdf",
  },
  {
    id: 4,
    title: "Rapport ESG annuel",
    date: "2025-01-30",
    description: "Bilan annuel des initiatives et performances en matière d'environnement, social et gouvernance.",
    downloadUrl: "/documents/rapport-esg-2025.pdf",
  },
  {
    id: 5,
    title: "Perspectives économiques mondiales",
    date: "2025-03-10",
    description: "Analyse des tendances économiques mondiales et prévisions pour les trimestres à venir.",
    downloadUrl: "/documents/perspectives-economiques-2025.pdf",
  },
  {
    id: 6,
    title: "Guide fiscal 2025",
    date: "2025-01-05",
    description: "Informations essentielles sur la fiscalité et conseils pour optimiser votre situation fiscale.",
    downloadUrl: "/documents/guide-fiscal-2025.pdf",
  },
  {
    id: 7,
    title: "Analyse sectorielle: Technologies",
    date: "2025-02-18",
    description: "Étude détaillée du secteur technologique et des opportunités d'investissement associées.",
    downloadUrl: "/documents/analyse-tech-2025.pdf",
  },
  {
    id: 8,
    title: "Rapport sur les marchés de capitaux",
    date: "2025-03-25",
    // No description for this document
    downloadUrl: "/documents/marches-capitaux-2025.pdf",
  },
  {
    id: 9,
    title: "Guide de la retraite",
    date: "2025-02-10",
    description: "Conseils et stratégies pour préparer et optimiser votre retraite.",
    downloadUrl: "/documents/guide-retraite-2025.pdf",
  },
  {
    id: 10,
    title: "Analyse des matières premières",
    date: "2025-03-15",
    description: "Étude des marchés des matières premières et perspectives d'évolution.",
    downloadUrl: "/documents/matieres-premieres-2025.pdf",
  },
  {
    id: 11,
    title: "Stratégies d'investissement durable",
    date: "2025-04-05",
    description: "Guide complet sur l'intégration des critères ESG dans vos décisions d'investissement.",
    downloadUrl: "/documents/investissement-durable-2025.pdf",
  },
  {
    id: 12,
    title: "Rapport sur l'immobilier de luxe",
    date: "2025-04-12",
    description: "Tendances et opportunités sur le marché de l'immobilier de luxe international.",
    downloadUrl: "/documents/immobilier-luxe-2025.pdf",
  },
  {
    id: 13,
    title: "Guide de planification patrimoniale",
    date: "2025-04-18",
    description: "Stratégies avancées pour la transmission et la protection de votre patrimoine.",
    downloadUrl: "/documents/planification-patrimoniale-2025.pdf",
  },
  {
    id: 14,
    title: "Analyse des cryptomonnaies",
    date: "2025-04-22",
    description: "Évaluation des risques et opportunités liés aux actifs numériques dans un portefeuille diversifié.",
    downloadUrl: "/documents/cryptomonnaies-2025.pdf",
  },
]

// Number of documents to display per page
const DOCS_PER_PAGE = 6

export default function DocumentsSection() {
  const [currentPage, setCurrentPage] = useState(0)
  const totalPages = Math.ceil(documentsData.length / DOCS_PER_PAGE)
  const basePath = "/mycalie"

  const startIndex = currentPage * DOCS_PER_PAGE
  const visibleDocuments = documentsData.slice(startIndex, startIndex + DOCS_PER_PAGE)

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  return (
    <section id="documents" className="py-4 scroll-mt-24">
      <div className="flex justify-between items-center mb-6">
        <h2 className="section-title">Documents</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={prevPage}
            disabled={currentPage === 0}
            aria-label="Documents précédents"
            className="h-10 w-10 border-gold text-gold hover:bg-gold hover:text-white"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
            aria-label="Documents suivants"
            className="h-10 w-10 border-gold text-gold hover:bg-gold hover:text-white"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Group documents in pairs for equal height rows */}
        {Array.from({ length: Math.ceil(visibleDocuments.length / 2) }).map((_, rowIndex) => {
          const rowDocs = visibleDocuments.slice(rowIndex * 2, rowIndex * 2 + 2)
          return (
            <div key={`row-${rowIndex}`} className="contents">
              {rowDocs.map((doc) => (
                <Link key={doc.id} href={`${basePath}${doc.downloadUrl}`} download className="block h-full">
                  <Card className="overflow-hidden border border-[#746250]/30 shadow-none bg-white hover:shadow-sm transition-shadow h-full">
                    <CardContent className="p-4 h-full">
                      <div className="flex justify-between items-start h-full">
                        <div className="flex-1 pr-2">
                          <h3 className="text-lg font-light text-gray-800">{doc.title}</h3>
                          <p className="text-sm text-[#746250] mt-0.5 font-light">{formatDate(doc.date)}</p>
                          {doc.description && (
                            <p className="mt-1 text-base text-gray-600 font-light">{doc.description}</p>
                          )}
                        </div>
                        <div
                          className="inline-flex items-center justify-center bg-[#cfb07b] text-white h-9 w-9 sweep-to-top flex-shrink-0"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Download className="h-5 w-5" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )
        })}
      </div>
    </section>
  )
}
