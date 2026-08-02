import { Suspense } from "react";
import { IUserRentalOrders } from "@/lib/types";
import RentalSkeleton from "../../dashboard/rentals/_components/RentalSkeleton";
import { getRentalStats } from "../../admin-dashboard/_actions/getRentalStats";
import { ProviderRentalTable } from "../_components/ProviderRentalTable";
import { getProviderOrders } from "../_actions/getProviderOrders";

const RentalsListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const userRentalOrders: IUserRentalOrders = await getProviderOrders();

  if (!userRentalOrders.success || !userRentalOrders.data?.length) {
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
        <ProviderRentalTable {...userRentalOrders} />
      </Suspense>
    </div>
  );
};

export default RentalsListPage;
