'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-r">
      {/* Gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block mb-6 px-4 py-2 bg-primary/10 rounded-full border border-primary/20">
          <p className="text-sm font-medium text-primary">Premium Gear Collection</p>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance">
          Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">Premium Gears</span>
        </h1>

        <p className="text-xl md:text-2xl text-muted-foreground mb-12 text-balance max-w-2xl mx-auto">
          Explore our curated collection of high-quality gears designed for professionals and enthusiasts alike.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/gears">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8">
              Browse All Gears
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
