import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProviderOrders } from "../_actions/getProviderOrders";
import { getProviderGears } from "../_actions/getProviderGears";
import { OrderStatus } from "@/lib/types";

const ProviderDashboardCards = async () => {
  const rentals = await getProviderOrders();
  const pendingRentals = await getProviderOrders(OrderStatus.PENDING_PAYMENT);
  const gears = await getProviderGears();

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 px-4 mt-4">
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Rental orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {Object.keys(rentals.data).length}
            </CardTitle>
            <CardAction></CardAction>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Lifetime Orders
            </div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Total Gear Listings</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {Object.keys(gears.data).length}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">No. of Gear Listings</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Pending Orders</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {Object.keys(pendingRentals.data).length}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">
              Order pending for response.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ProviderDashboardCards;
