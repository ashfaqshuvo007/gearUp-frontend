'use client'

import { FeaturedGears } from "./_components/FeaturedGears"
import { HeroSection } from "./_components/HeroSection"



export default function Home() {
  return (
    <main className="bg-background">
      <HeroSection />
      <FeaturedGears />
    </main>
  )
}
