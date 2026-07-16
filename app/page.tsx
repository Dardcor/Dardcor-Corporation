import ThreeBackground from '@/components/ThreeBackground'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import Features from '@/components/Features'
import Ecosystem from '@/components/Ecosystem'
import Footer from '@/components/Footer'
import BottomNeuralBackground from '@/components/BottomNeuralBackground'

export default function Home() {
  return (
    <>
      <ThreeBackground />
      <Navbar />
      <main>
        <Hero />
        {/* Container for the lower sections with Neural Network background */}
        <div className="relative">
          <BottomNeuralBackground />
          <div className="relative z-10">
            <Products />
            <Features />
            <Ecosystem />
            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}
