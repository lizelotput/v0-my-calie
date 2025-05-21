import Banner from "@/components/Banner"
import NavigationLinks from "@/components/NavigationLinks"
import DocumentsSection from "@/components/DocumentsSection"
import MandatsSection from "@/components/MandatsSection"
import PublicationsSection from "@/components/PublicationsSection"
import QuickLinks from "@/components/QuickLinks"
import BackToTop from "@/components/BackToTop"
import Footer from "@/components/Footer"

export default function Home() {
  return (
    <div className="bg-white overflow-x-hidden">
      {/* Navigation */}
      <NavigationLinks />

      {/* Back to Top Button */}
      <BackToTop />

      {/* Remove the padding that was pushing the hero down */}
      <div>
        {/* Full width hero */}
        <Banner />

        {/* Added 72px padding below the hero */}
        <div className="pt-[72px]"></div>

        {/* Content with padding */}
        <div className="max-w-[1400px] mx-auto bg-white px-4 md:px-8 lg:px-12">
          <div className="py-6">
            <div className="space-y-12">
              <div className="max-w-[90%]">
                <DocumentsSection />
              </div>
              <div className="max-w-[90%]">
                <MandatsSection />
              </div>
              <PublicationsSection />
            </div>
          </div>
        </div>

        {/* QuickLinks placed here for true full width - removed margin bottom */}
        <div className="mb-0">
          <QuickLinks />
        </div>

        {/* Footer - removed margin top */}
        <div className="mt-0">
          <Footer />
        </div>
      </div>
    </div>
  )
}
