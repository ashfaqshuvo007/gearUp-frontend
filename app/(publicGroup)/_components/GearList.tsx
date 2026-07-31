import { IGear } from '@/lib/types';
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

  if (!result.success || !result.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        No news found.
      </p>
    );
  }
  return (
     <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {result.data.map((gear : IGear | any) => (
          <GearCard
              key={gear.id}
              id={gear.id}
              title={gear.name}
              description={gear.description}
              image={gear.image}
              price={gear.price}
              quantity={gear.quantity}
            />
        ))}
      </div>
      
    </div>
  )
}
