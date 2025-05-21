"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import Image from "next/image"

// Slide type
type Slide = {
  id: number
  title: string
  subtitle: string
  sentence?: string
  buttonText?: string
  buttonLink?: string
  buttonIcon?: React.ReactNode
  isPublication?: boolean
  videoBackground?: string
  imageBackground?: string
}

// Sample slides data
const slidesData: Slide[] = [
  {
    id: 1,
    title: "Indosuez",
    subtitle: "Wealth Management",
    // Removed buttonText and buttonLink for the first slide
    videoBackground: "https://ca-indosuez.com/fr/content/download/1122/video/Blue%20-%2022908.mp4?version=6",
  },
  {
    id: 2,
    subtitle: "Février 2025",
    title: "Monthly House View",
    sentence: "Quand la planète paie les droits de douane",
    buttonText: "Découvrir la publication", // Updated button text
    buttonLink: "/publications/monthly-house-view-fevrier-2025",
    isPublication: true,
    imageBackground:
      "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/home_banner/3/0/3/0/303-233-fre-FR/b1cd76403295-vous-accompagner.jpg",
  },
  {
    id: 3,
    title: "Solutions Patrimoniales",
    subtitle: "Pour votre avenir",
    buttonText: "Découvrir nos services",
    buttonLink: "/services",
    buttonIcon: <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />,
    imageBackground:
      "https://ca-indosuez.com/var/indosuez/storage/images/_aliases/discover_banner/9/0/3/0/309-233-fre-FR/ba02fa92936a-nous-connaitre.jpg",
  },
  {
    id: 4,
    title: "Expertise Financière",
    subtitle: "À votre service",
    buttonText: "Découvrir nos services", // Will be rendered as a simple link
    buttonLink: "/services",
    buttonIcon: <ArrowRight className="ml-2 h-5 w-5" />,
  },
]

export default function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const totalSlides = slidesData.length

  // Function to reset the timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current)
    }

    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1))
    }, 5000)
  }, [totalSlides])

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const [imageLoadError, setImageLoadError] = useState<Record<number, boolean>>({})
  const [videoLoadError, setVideoLoadError] = useState<Record<number, boolean>>({})
  const basePath = "/mycalie"

  // Auto-advance slides
  useEffect(() => {
    resetTimer()

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
      }
    }
  }, [resetTimer])

  // Handle video playback when slide changes
  useEffect(() => {
    // Pause all videos
    videoRefs.current.forEach((video) => {
      if (video) video.pause()
    })

    // Play the current video if it exists
    const currentVideo = videoRefs.current[currentSlide]
    if (currentVideo && slidesData[currentSlide].videoBackground && !videoLoadError[currentSlide]) {
      currentVideo.currentTime = 0
      currentVideo.play().catch((e) => {
        console.log("Video play error:", e)
        setVideoLoadError((prev) => ({ ...prev, [currentSlide]: true }))
      })
    }
  }, [currentSlide, videoLoadError])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    resetTimer() // Reset timer when manually changing slides
  }

  const handleImageError = (slideIndex: number) => {
    setImageLoadError((prev) => ({ ...prev, [slideIndex]: true }))
  }

  const handleVideoError = (slideIndex: number) => {
    setVideoLoadError((prev) => ({ ...prev, [slideIndex]: true }))
  }

  return (
    <div className="w-full h-[450px] relative overflow-hidden bg-navy pt-[100px]">
      {/* Slides */}
      {slidesData.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Background: Video, Image or Wave Animation */}
          {slide.videoBackground && !videoLoadError[index] ? (
            <div className="absolute inset-0 w-full h-full">
              <video
                ref={(el) => (videoRefs.current[index] = el)}
                className="absolute inset-0 w-full h-full object-cover"
                muted
                loop
                playsInline
                onError={() => handleVideoError(index)}
              >
                <source src={slide.videoBackground} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-navy bg-opacity-50"></div>
            </div>
          ) : slide.imageBackground && !imageLoadError[index] ? (
            <div className="absolute inset-0 w-full h-full">
              <div className="relative w-full h-full">
                <Image
                  src={slide.imageBackground || `${basePath}/placeholder.svg`}
                  alt={`${slide.title} background`}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  onError={() => handleImageError(index)}
                />
                <div className="absolute inset-0 bg-navy bg-opacity-40"></div>
              </div>
            </div>
          ) : (
            <div className="wave-animation">
              <div className="wave"></div>
              <div className="wave"></div>
              <div className="wave"></div>
            </div>
          )}

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="max-w-[1400px] mx-auto w-full px-4 md:px-8 lg:px-12">
              <div className="text-white text-center mx-auto hero-content flex flex-col h-[250px] justify-between pt-12">
                <div>
                  {slide.isPublication ? (
                    <>
                      <p className="text-base md:text-lg font-light mb-2 uppercase tracking-wide">{slide.subtitle}</p>
                      <h1
                        className="text-3xl md:text-[34px] tracking-[6px] mb-4 uppercase font-medium"
                        style={{ lineHeight: "48px", fontFamily: "Florent" }}
                      >
                        {slide.title}
                      </h1>
                      {slide.sentence && <p className="baskerville-italic mb-8 tracking-wider">{slide.sentence}</p>}
                    </>
                  ) : (
                    <>
                      <h1
                        className="text-4xl md:text-[34px] tracking-[6px] mb-2 uppercase font-medium"
                        style={{ lineHeight: "48px", fontFamily: "Florent" }}
                      >
                        {slide.title}
                      </h1>
                      <p className="baskerville-italic mb-8">{slide.subtitle}</p>
                    </>
                  )}
                </div>

                <div className="mt-auto">
                  {/* Conditional rendering for buttons/links */}
                  {slide.buttonText && slide.buttonLink && (
                    <>
                      {/* For slide 4, render a simple link with arrow */}
                      {slide.id === 4 ? (
                        <Link
                          href={`${basePath}${slide.buttonLink}`}
                          className="inline-flex items-center text-white text-base font-medium uppercase tracking-wider group"
                        >
                          <span>{slide.buttonText}</span>
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      ) : /* For slide 2 (publication), add download icon */
                      slide.id === 2 ? (
                        <Link
                          href={`${basePath}${slide.buttonLink}`}
                          className="inline-flex items-center justify-center bg-[#cfb07b] text-white px-6 py-3 uppercase tracking-wider font-medium text-sm sweep-to-bottom"
                        >
                          <span>{slide.buttonText}</span>
                          <Download className="ml-2 h-5 w-5" />
                        </Link>
                      ) : (
                        /* For other slides (except slide 1 which has no button), render the button */
                        slide.id !== 1 && (
                          <Link
                            href={`${basePath}${slide.buttonLink}`}
                            className="inline-flex items-center justify-center bg-[#cfb07b] text-white px-6 py-3 uppercase tracking-wider font-medium text-sm sweep-to-bottom"
                          >
                            <span>{slide.buttonText}</span>
                          </Link>
                        )
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
        {slidesData.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? "bg-gold scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Aller à la slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
