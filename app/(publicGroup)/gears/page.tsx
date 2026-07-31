import { Suspense } from 'react'
import { GearSkeleton } from '../_components/GearSkeleton'
import { GearList } from '../_components/GearList'
import { GearsSearchBar } from '../_components/GearSearchBar'


const GearsListPage = async (
  {
    searchParams,
  }: {
    searchParams: Promise<{[key: string]: string | string[] | undefined}>;
  }
) => {
  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Gears</h1>
          <p className="text-sm text-muted-foreground">
            Exclusive gears for our customers.
          </p>
        </div>

        <GearsSearchBar />
      </div>

      <Suspense fallback={<GearSkeleton />}>
        <GearList searchParams={searchParams} />
      </Suspense>
    </div>
  )
}

export default GearsListPage