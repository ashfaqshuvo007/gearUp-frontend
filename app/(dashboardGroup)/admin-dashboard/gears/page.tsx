import React, { Suspense } from "react";
import { getGearStats } from "../_actions/getGearStats";
import RentalSkeleton from "../../dashboard/rentals/_components/RentalSkeleton";
import { GearTable } from "../_components/AdminGearsListTable";

const GearsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const gears = await getGearStats();

  if (!gears.success || !gears.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">No orders yet.</p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Rental Orders</h1>
          <p className="text-sm text-muted-foreground">Newest rental orders</p>
        </div>
      </div>

      <Suspense fallback={<RentalSkeleton />}>
        <GearTable {...gears} />
      </Suspense>
    </div>
  );
};

export default GearsListPage;
