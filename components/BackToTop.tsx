"use client"

import { useState, useEffect } from "react"
import { ChevronUp } from "lucide-react"

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener("scroll", toggleVisibility)

    return () => window.removeEventListener("scroll", toggleVisibility)
  }, [])

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  return (
    <>
      {isVisible && (
        <div className="block-goTop_inner text-right">
          <a
            id="goTop"
            href="#"
            onClick={(e) => {
              e.preventDefault()
              scrollToTop()
            }}
            aria-label="Retour en haut"
            className="inline-flex items-center justify-center"
          >
            <ChevronUp className="h-4 w-4" />
          </a>
        </div>
      )}
    </>
  )
}
