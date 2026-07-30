import { getGearsList } from '../_actions/getGearsList';
import { GearCard } from './GearCard'
import { GearsSearchBar } from './GearSearchBar'

export async function GearList(
{
  searchParams,
}: {
  searchParams?: Promise<{[key: string]: string | string[] | undefined }>;
}) {
  const query = await searchParams;
  const result = await getGearsList({query})
  return (
    <section className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Gears</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check out our gears loved by thousands of customers worldwide.
            </p>
          </div>
          <div className='mt-6 mb-6'>
            <GearsSearchBar/>
          </div>
          
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {result.data.map((product: any) => (
            <GearCard
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
