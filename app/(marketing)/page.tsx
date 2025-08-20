import Hero from "@/components/app/hero"
import Features from "@/components/app/features"
import HowItWorks from "@/components/app/how-it-works"
import Faqs from "@/components/app/faqs"
import Cta from "@/components/app/cta"
import Footer from "@/components/app/footer"

export default function Home() {
  return (
    <div className="bg-background min-h-screen">
      <Hero />
      <Features />
      <HowItWorks />
      <Faqs />
      <Cta />
      <Footer />
    </div>
  )
}
