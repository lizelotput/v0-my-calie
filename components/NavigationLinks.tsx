"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { MessageSquare } from "lucide-react"

export default function NavigationLinks() {
  const [activeSection, setActiveSection] = useState("")
  const [isAtTop, setIsAtTop] = useState(true)
  const headerRef = useRef<HTMLElement>(null)
  const prevScrollY = useRef(0)
  const basePath = "/mycalie"

  const mainLinks = [
    { id: "documents", label: "documents" },
    { id: "mandats", label: "notre offre" },
    { id: "publications", label: "publications" },
    { id: "about", label: "nous connaître" },
  ]

  const contactLink = { id: "contact", label: "contact", href: `${basePath}/contact` }

  // Handle scroll to update active section and control header visibility
  useEffect(() => {
    // Set initial state to true (transparent background)
    setIsAtTop(window.scrollY <= 10)
    prevScrollY.current = window.scrollY

    // Initially, don't set any active section
    setActiveSection("")

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Only update isAtTop when crossing the threshold to minimize re-renders
      if ((prevScrollY.current <= 10 && currentScrollY > 10) || (prevScrollY.current > 10 && currentScrollY <= 10)) {
        setIsAtTop(currentScrollY <= 10)
      }

      prevScrollY.current = currentScrollY

      // Update active section based on scroll position
      const headerHeight = headerRef.current?.offsetHeight || 0
      const scrollPosition = currentScrollY + headerHeight + 20 // Add offset for better detection

      // Find the active section
      const sections = mainLinks
        .filter((link) => !link.href) // Only consider sections on this page
        .map((link) => document.getElementById(link.id))
        .filter(Boolean) // Filter out null elements

      // Find the last section that's above our current scroll position
      let activeSection = null
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          activeSection = section.id
          break
        }
      }

      if (activeSection && activeSection !== activeSection) {
        setActiveSection(activeSection)
      } else if (!activeSection && activeSection !== "") {
        setActiveSection("")
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    // Initial call to set correct active section
    setTimeout(handleScroll, 100)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [mainLinks])

  // Handle smooth scrolling to sections
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const section = document.getElementById(id)

    if (section) {
      const headerHeight = headerRef.current?.offsetHeight || 0
      const sectionPosition = section.offsetTop - headerHeight

      window.scrollTo({
        top: sectionPosition,
        behavior: "smooth",
      })

      setActiveSection(id)
    }
  }

  // Function to render a navigation link with consistent styling
  const renderNavLink = (link: { id: string; label: string; href?: string }, isContactLink = false) => {
    // Force documents to always use the non-active color
    const isActive = link.id === "documents" ? false : activeSection === link.id

    return (
      <Link
        key={link.id}
        href={link.href || `#${link.id}`}
        className={`text-sm tracking-wider font-variant-small-caps group ${
          isAtTop
            ? "font-bold " + (isActive ? "text-gold" : "text-white hover:text-gold")
            : "font-normal " + (isActive ? "text-gold" : "text-gray-700 hover:text-gold")
        } ${isContactLink ? "flex items-center" : ""}`}
        onClick={(e) => !link.href && scrollToSection(e, link.id)}
      >
        {isContactLink && (
          <MessageSquare
            className={`mr-1.5 h-3.5 w-3.5 ${isAtTop ? "text-white" : "text-gray-700"} group-hover:text-gold transition-colors`}
          />
        )}
        {link.label}
      </Link>
    )
  }

  // Fixed header height based on scroll position
  const headerHeight = isAtTop ? "100px" : "50px"

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-20 ${
        isAtTop ? "bg-transparent border-transparent" : "bg-[rgb(241,238,236)] border-b-0 shadow-none" // Removed border-b-2
      }`}
      style={{
        height: headerHeight,
        transition: "height 0.3s ease",
      }}
    >
      <div className="max-w-[1400px] mx-auto h-full">
        <div className="flex justify-between items-center px-4 md:px-8 lg:px-12 h-full">
          {/* Logo and Main Navigation */}
          <div className="flex items-center h-full">
            {/* Logo */}
            <div className="flex-shrink-0 mr-8 h-full flex items-center">
              <Link href={basePath || "/"} className="flex items-center h-full">
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: isAtTop ? "160px" : "83.19px",
                    height: isAtTop ? "100px" : "50px",
                    transition: "width 0.3s ease, height 0.3s ease",
                    overflow: "hidden", // Add overflow hidden to prevent any pixel leakage
                  }}
                >
                  <Image
                    src={`${basePath}/logo.png`}
                    alt="Indosuez Wealth Management"
                    fill
                    className="object-contain"
                    priority
                    sizes={isAtTop ? "160px" : "83.19px"}
                  />
                </div>
              </Link>
            </div>

            {/* Main Navigation Links */}
            <nav className="hidden md:flex space-x-6 h-full items-center">
              {mainLinks.map((link) => renderNavLink(link))}
            </nav>
          </div>

          {/* Contact Link on Right */}
          <div className="hidden md:flex h-full items-center pr-4">{renderNavLink(contactLink, true)}</div>

          {/* Mobile menu button - simplified for this example */}
          <div className="md:hidden">
            <button className={`hover:text-gold ${isAtTop ? "text-white" : "text-gray-700"}`}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
