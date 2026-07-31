'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface GearCardProps {
  id: string
  title: string
  description: string
  image: string
  price: number
  quantity: number
}

export function GearCard({ id, title, description, image, price, quantity }: GearCardProps) {
  const gearUrl = "/gears/" + id
  return (
    <div className="group relative bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10">
      {/* Image container */}
      <div className="relative h-64 overflow-hidden bg-muted">
        <Image
          src={image}
          alt={title}
          height={500}
          width={500}
          loading="eager"
          className="object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6">
        <Link href={gearUrl} className="shrink-0">
          <span className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">

          {title}
          </span>
        </Link>
        <div className="flex flex-wrap items-center gap-2">
          { quantity > 1 ? (
            <Badge variant="default">AVAILABLE</Badge>
          ) : <Badge variant="destructive"> NOT AVAILABLE</Badge> }
          </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {description}
        </p>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            BDT {price}
          </span>
          { quantity > 1 ? (
            <Link href={gearUrl} className="shrink-0">
          <Button
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
          >
            
            <ShoppingCart className="h-4 w-4" />
            Rent Now
          </Button>
          </Link>
          ) : ""}
        </div>
      </div>
    </div>
  )
}
