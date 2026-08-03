import React, { Suspense } from "react";
import RentalSkeleton from "../../dashboard/rentals/_components/RentalSkeleton";
import { getProviderGears } from "../_actions/getProviderGears";
import { ProviderGearTable } from "../_components/ProviderGearsListTable";
import { ProviderGearFormDialog } from "../_components/ProviderGearFormDialog";

const ProviderGearsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const gears = await getProviderGears();

  if (!gears.success || !gears.data?.length) {
    return (
      <p className="py-12 text-center text-muted-foreground">No orders yet.</p>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Your Gears</h1>
          <p className="text-sm text-muted-foreground">Gear Items List</p>
        </div>
        <ProviderGearFormDialog mode="create" />
      </div>

      <Suspense fallback={<RentalSkeleton />}>
        <ProviderGearTable {...gears} />
      </Suspense>
    </div>
  );
};

export default ProviderGearsListPage;
