'use client'

import { GearCard } from './GearCard'

const featureGears = [
  {
    id: '1',
    title: 'Pro Mechanical Keyboard',
    description: 'High-performance mechanical keyboard with custom switches and RGB lighting for professional gaming and typing.',
    image: 'https://images.unsplash.com/photo-1587829191301-dfd0ff1c7d14?w=500&h=500&fit=crop',
    price: 149.99,
    quantity: 20
  },
  {
    id: '2',
    title: 'Wireless Headphones',
    description: 'Premium noise-cancelling headphones with 40-hour battery life and crystal-clear sound quality.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    price: 199.99,
    quantity: 10
  },
  {
    id: '3',
    title: '4K Webcam Pro',
    description: 'Professional-grade 4K webcam with auto-focus, advanced low-light correction, and built-in microphone.',
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
    price: 179.99,
    quantity: 12
  },
]

export function FeaturedGears() {
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-transparent bg-clip-text bg-liear-to-r from-primary to-accent">Gears</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check out our best-selling products loved by thousands of customers worldwide.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureGears.map((product) => (
            <GearCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
              quantity={product.quantity}

            />
          ))}
        </div>
      </div>
    </section>
  )
}
