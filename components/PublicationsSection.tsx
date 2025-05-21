"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { basePath } from "@/lib/path-utils"

// Publication type
type Publication = {
  id: number
  title: string
  subtitle?: string
  image: string
  link: string
  type: "monthly" | "outlook" | "perspectives" | "market-news"
  date: string
}

// Sample publications data with updated images
const publicationsData: Publication[] = [
  {
    id: 1,
    title: "Quand l'impensable devient possible",
    image:
      "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/8/2/2/6/606228-1-eng-GB/7cd0b6429028-Monthly-House-View-04.jpg",
    link: "/publications/monthly-house-view-avril-2025",
    type: "monthly",
    date: "2025-04-01",
  },
  {
    id: 2,
    title: "Un monde en transformation",
    image:
      "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/4/0/1/4/564104-1-eng-GB/5df5a289413b-241208-une-site-externe.png",
    link: "/publications/global-outlook-2025-q1",
    type: "outlook",
    date: "2025-01-15",
  },
  {
    id: 3,
    title: "Nouveaux sommets",
    image:
      "https://france.ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/1/7/7/8/598771-1-eng-GB/780c866638c5-VisuelMHV-.jpg",
    link: "/publications/monthly-house-view-nouveaux-sommets",
    type: "monthly",
    date: "2025-03-04",
  },
  {
    id: 4,
    title: "Nouvel épisode de Banking Insider, le podcast d'Indosuez",
    image:
      "https://france.ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/1/7/7/8/598771-1-eng-GB/780c866638c5-VisuelMHV-.jpg",
    link: "/publications/market-news-podcast",
    type: "market-news",
    date: "2025-02-27",
  },
  {
    id: 5,
    title: "« Liberation Day » : liquidation ou stabilisation ?",
    image:
      "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/5/4/8/3/603845-12-fre-FR/9f4bdf7da8cf-2024-banner-CIOP-ok.png",
    link: "/publications/cio-perspectives-liberation-day",
    type: "perspectives",
    date: "2025-02-10",
  },
  {
    id: 6,
    title: "Zones de turbulence : à quoi s'attendre ?",
    image:
      "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/5/4/8/3/603845-12-fre-FR/9f4bdf7da8cf-2024-banner-CIOP-ok.png",
    link: "/publications/cio-perspectives-turbulence",
    type: "perspectives",
    date: "2025-03-15",
  },
  {
    id: 7,
    title: 'Europe: "Whatever it takes" 2.0',
    image:
      "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/full_news/5/4/8/3/603845-12-fre-FR/9f4bdf7da8cf-2024-banner-CIOP-ok.png",
    link: "/publications/cio-perspectives-europe",
    type: "perspectives",
    date: "2025-01-20",
  },
]

// Filter options
const filterOptions = [
  { value: "all", label: "Toutes" },
  { value: "monthly", label: "Monthly House View" },
  { value: "outlook", label: "Global Outlook 2025" },
  { value: "perspectives", label: "CIO Perspectives" },
  { value: "market-news", label: "Market News" },
]

export default function PublicationsSection() {
  const [activeFilter, setActiveFilter] = useState("all")
  const carouselRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [hasMoved, setHasMoved] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const dragThreshold = 5 // Minimum pixels to move before considering it a drag

  // Filter publications based on active filter
  const filteredPublications =
    activeFilter === "all" ? publicationsData : publicationsData.filter((pub) => pub.type === activeFilter)

  const scroll = (direction: "left" | "right") => {
    if (carouselRef.current) {
      const { current } = carouselRef
      const scrollAmount = direction === "left" ? -current.offsetWidth : current.offsetWidth

      current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  // Mouse events for drag scrolling
  const handleMouseDown = (e: React.MouseEvent) => {
    // Only initiate drag if the target is the carousel or an image container
    const target = e.target as HTMLElement
    const isImageContainer = target.closest(".carousel-image-container")

    if (!carouselRef.current || (!isImageContainer && target !== carouselRef.current)) {
      return
    }

    setIsDragging(true)
    setHasMoved(false)
    setStartX(e.pageX - carouselRef.current.offsetLeft)
    setScrollLeft(carouselRef.current.scrollLeft)

    // Change cursor to grabbing only if we're on the image container
    if (carouselRef.current && isImageContainer) {
      carouselRef.current.style.cursor = "grabbing"
    }
  }

  const handleMouseUp = () => {
    setIsDragging(false)

    // Reset cursor
    if (carouselRef.current) {
      carouselRef.current.style.cursor = ""
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !carouselRef.current) return

    e.preventDefault()
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startX) * 3 // Increased multiplier for more fluid scrolling

    // Only set hasMoved if we've moved more than the threshold
    if (Math.abs(x - startX) > dragThreshold) {
      setHasMoved(true)
    }

    carouselRef.current.scrollLeft = scrollLeft - walk
  }

  // Add and remove event listeners for mouse up outside the carousel
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isDragging) {
        setIsDragging(false)
        if (carouselRef.current) {
          carouselRef.current.style.cursor = ""
        }
      }
    }

    document.addEventListener("mouseup", handleGlobalMouseUp)
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp)
    }
  }, [isDragging])

  // Function to get publication type color
  const getPublicationTypeColor = (type: string) => {
    switch (type) {
      case "monthly":
        return "text-blue-500" // Changed to match the image
      case "outlook":
        return "text-publication-outlook"
      case "perspectives":
        return "text-publication-perspectives"
      case "market-news":
        return "text-blue-900" // Changed to match the image
      default:
        return "text-gold"
    }
  }

  // Function to get publication type border color
  const getPublicationTypeBorderColor = (type: string) => {
    switch (type) {
      case "monthly":
        return "border-blue-500" // Changed to match the image
      case "outlook":
        return "border-publication-outlook"
      case "perspectives":
        return "border-publication-perspectives"
      case "market-news":
        return "border-blue-900" // Changed to match the image
      default:
        return "border-gold"
    }
  }

  // Function to get publication type label
  const getPublicationTypeLabel = (type: string) => {
    switch (type) {
      case "monthly":
        return "MONTHLY HOUSE VIEW"
      case "outlook":
        return "GLOBAL OUTLOOK"
      case "perspectives":
        return "CIO PERSPECTIVES"
      case "market-news":
        return "MARKET VIEWS"
      default:
        return ""
    }
  }

  // Function to get image path with basePath
  const getImagePath = (imagePath: string) => {
    if (imagePath.startsWith("http")) {
      return imagePath
    }
    return `${basePath}${imagePath}`
  }

  // Format date as DD.MM.YY
  const formatDateShort = (dateString: string) => {
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, "0")
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const year = date.getFullYear().toString().slice(-2)
    return `${day}.${month}.${year}`
  }

  // Handle click on publication only if not dragging
  const handlePublicationClick = (e: React.MouseEvent, link: string) => {
    // If we've moved the carousel, prevent navigation
    if (hasMoved) {
      e.preventDefault()
      return
    }

    // Otherwise, navigate to the link
    window.location.href = `${basePath}${link}`
  }

  return (
    <section id="publications" className="py-4 scroll-mt-24">
      <div className="mb-6 max-w-[90%]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="section-title">Publications Indosuez</h2>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              aria-label="Publications précédentes"
              className="h-10 w-10 border-gold text-gold hover:bg-gold hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              aria-label="Publications suivantes"
              className="h-10 w-10 border-gold text-gold hover:bg-gold hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Pill filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setActiveFilter(option.value)}
              className={`px-4 py-1.5 rounded-none text-base font-light transition-colors ${
                activeFilter === option.value ? "bg-gold text-white" : "bg-beige text-gray-700 hover:bg-beige/80"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Full width carousel - extending beyond the container */}
      <div className="w-full max-w-[1400px] mx-auto">
        <div
          ref={carouselRef}
          className="flex py-2 overflow-x-auto snap-x snap-mandatory scroll-smooth"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch", // Add smooth scrolling for iOS
          }}
        >
          {filteredPublications.map((publication, index) => (
            <div
              key={publication.id}
              className={`w-[280px] flex-shrink-0 group snap-start block relative hover:after:content-[''] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[2px] ${getPublicationTypeBorderColor(
                publication.type,
              )} hover:after:transition-all hover:after:duration-300`}
              onClick={(e) => handlePublicationClick(e, publication.link)}
            >
              <div className="p-3">
                {/* Date at the top */}
                <div className="mb-2 text-xs text-gray-600 font-light pl-[5px]">
                  {formatDateShort(publication.date)}
                </div>

                {/* Image with 4:3 aspect ratio - with grab cursor */}
                <div className="relative aspect-[4/3] mb-3 overflow-hidden carousel-image-container cursor-grab">
                  <Image
                    src={getImagePath(publication.image) || `${basePath}/placeholder.svg`}
                    alt={publication.title}
                    fill
                    className="object-cover"
                    draggable="false"
                  />
                </div>

                {/* Publication type below image - with pointer cursor */}
                <div className="flex items-center mb-2 pl-[5px] cursor-pointer">
                  <span className={`text-xl mr-2 ${getPublicationTypeColor(publication.type)}`}>•</span>
                  <span
                    className={`text-xs font-medium tracking-wide ${getPublicationTypeColor(publication.type)}`}
                    style={{ fontSize: "12px" }}
                  >
                    {getPublicationTypeLabel(publication.type)}
                  </span>
                </div>

                {/* Title at the bottom - with pointer cursor */}
                <h3 className="font-medium text-lg text-gray-800 normal-case line-clamp-3 pl-[5px] cursor-pointer">
                  {publication.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
