import { Suspense } from "react";
import { getUserStats } from "../_actions/getUserStats";
import RentalSkeleton from "../../dashboard/rentals/_components/RentalSkeleton";
import { UsersTable } from "../_components/AdminUsersListTable";

const UsersListPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const users = await getUserStats();

  if (!users.success || !users.data?.length) {
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
        <UsersTable {...users} />
      </Suspense>
    </div>
  );
};
export default UsersListPage;
