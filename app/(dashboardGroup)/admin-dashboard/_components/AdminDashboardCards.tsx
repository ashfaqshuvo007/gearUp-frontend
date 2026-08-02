import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserStats } from "../_actions/getUserStats";
import { getRentalStats } from "../_actions/getRentalStats";
import { getGearStats } from "../_actions/getGearStats";

const AdminDashboardCards = async () => {
  const users = await getUserStats();
  const rentals = await getRentalStats();
  const gears = await getGearStats();

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
            <CardDescription>Total Customers</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {Object.keys(users.data).length}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">Happy Customers</div>
          </CardFooter>
        </Card>
        <Card className="@container/card">
          <CardHeader>
            <CardDescription>Gear Items</CardDescription>
            <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
              {Object.keys(gears.data).length}
            </CardTitle>
          </CardHeader>
          <CardFooter className="flex-col items-start gap-1.5 text-sm">
            <div className="text-muted-foreground">Items in inventory</div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardCards;
