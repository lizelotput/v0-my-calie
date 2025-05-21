"use client"

import Link from "next/link"
import { basePath } from "@/lib/path-utils"
import { useEffect, useState } from "react"
import { MessageSquare } from "lucide-react"

export default function Footer() {
  // State for the current year
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear())

  // Update year when component mounts and on date change
  useEffect(() => {
    // Set initial year
    setCurrentYear(new Date().getFullYear())

    // Check for year change at midnight
    const checkYearChange = () => {
      const now = new Date()
      const newYear = now.getFullYear()
      if (newYear !== currentYear) {
        setCurrentYear(newYear)
      }
    }

    // Check daily at midnight
    const timer = setInterval(() => {
      checkYearChange()
    }, 86400000) // 24 hours in milliseconds

    return () => clearInterval(timer)
  }, [currentYear])

  // Navigation links - same as in the header
  const mainLinks = [
    { id: "documents", label: "documents", href: "#documents" },
    { id: "mandats", label: "notre offre", href: "#mandats" },
    { id: "publications", label: "publications", href: "#publications" },
    { id: "about", label: "nous connaître", href: "#about" },
  ]

  return (
    <footer className="w-screen relative left-1/2 right-1/2 -mx-[50vw] bg-[#1e2025] text-white overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 py-16">
        <div className="flex flex-col items-center md:items-start space-y-8">
          {/* Top section with Architects of Wealth and Contact button */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center md:items-start">
            {/* Architects of Wealth - now with small-caps */}
            <div className="text-center md:text-left">
              <h3
                className="uppercase text-[#746250] font-variant-small-caps"
                style={{
                  fontFamily: "Florent",
                  letterSpacing: "3px",
                  fontSize: "1.4rem",
                }}
              >
                Architects of Wealth
              </h3>
            </div>

            {/* Contact Us button - with sweep-to-bottom animation */}
            <div className="mt-4 md:mt-0">
              <Link
                href={`${basePath}/contact`}
                className="inline-flex items-center justify-center bg-[#cfb07b] text-white px-6 py-3 uppercase tracking-wider font-medium text-sm sweep-to-bottom"
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                <span>Contact us</span>
              </Link>
            </div>
          </div>

          {/* Navigation Links - now bold */}
          <nav className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-8">
            {mainLinks.map((link) => (
              <Link
                key={link.id}
                href={link.href}
                className="text-sm tracking-wider font-variant-small-caps text-white/80 hover:text-gold transition-colors font-bold"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Copyright - removed border, added Maison Neue font */}
          <div
            className="text-xs text-[#7b7877] pt-12 mt-4 w-full text-center md:text-left"
            style={{ fontFamily: "'Maison Neue', sans-serif" }}
          >
            ©{currentYear} CA Indosuez
          </div>
        </div>
      </div>
    </footer>
  )
}
