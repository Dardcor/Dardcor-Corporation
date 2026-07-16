import ThreeBackground from '@/components/ThreeBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Features from '@/components/Features'
import Ecosystem from '@/components/Ecosystem'
import BrandShowcase from '@/components/BrandShowcase'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <Navbar />
      <main>
        <Hero />
        <Products />
        <Features />
        <Ecosystem />
        <BrandShowcase />
      </main>
      <Footer />
    </>
  )
}
