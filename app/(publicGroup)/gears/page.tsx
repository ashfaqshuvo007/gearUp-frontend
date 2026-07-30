import { Suspense } from 'react'
import { GearSkeleton } from '../_components/GearSkeleton'
import { GearList } from '../_components/GearList'

const GearsListPage = () => {
  return (
    <div>
      <Suspense fallback={<GearSkeleton />}>
        <GearList/>
      </Suspense>
    </div>
  )
}

export default GearsListPage