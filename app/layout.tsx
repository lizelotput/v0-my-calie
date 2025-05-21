import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { basePath } from "@/lib/path-utils"

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
})

export const metadata = {
  title: "Indosuez Wealth Management",
  description: "Services financiers et gestion de patrimoine",
  metadataBase: new URL("https://yourdomain.com/mycalie"),
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
      </head>
      <body className={`${inter.className} antialiased font-light`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
