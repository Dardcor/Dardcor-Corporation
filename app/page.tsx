'use client'

import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'

// Dynamically import heavy and below-the-fold components to prevent initial lag
const ThreeBackground = dynamic(() => import('@/components/ThreeBackground'), { ssr: false })
const BottomNeuralBackground = dynamic(() => import('@/components/BottomNeuralBackground'), { ssr: false })
const Products = dynamic(() => import('@/components/Products'), { ssr: true })
const Features = dynamic(() => import('@/components/Features'), { ssr: true })
const Ecosystem = dynamic(() => import('@/components/Ecosystem'), { ssr: true })
const Footer = dynamic(() => import('@/components/Footer'), { ssr: true })

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
