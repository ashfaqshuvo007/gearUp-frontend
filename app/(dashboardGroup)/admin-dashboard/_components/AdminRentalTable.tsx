import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRentalOrderData, IUserRentalOrders } from "@/lib/types";
import { cn } from "@/lib/utils";
import { differenceInCalendarDays } from "date-fns";
import { UserPen } from "lucide-react";
import Link from "next/link";
import { getUserStats } from "../_actions/getUserStats";

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  COMPLETED: "bg-blue-50 text-blue-700 border-blue-200",
  CANCELED: "bg-red-50 text-red-700 border-red-200",
};

const paymentStatusStyles: Record<string, string> = {
  PAID: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  FAILED: "bg-red-50 text-red-700 border-red-200",
  REFUNDED: "bg-blue-50 text-blue-700 border-blue-200",
};

export const AdminRentalTable = async (rentalOrderList: IUserRentalOrders) => {
  const orders: IRentalOrderData[] = rentalOrderList.data;

  return (
    <div className="mt-4">
      <Card className="@container/card">
        <Table>
          <TableCaption>A list of your recent orders.</TableCaption>
          <TableHeader>
            <TableRow className="font-extrabold">
              <TableHead>OrderId</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rent Duration</TableHead>
              <TableHead>OrderItem</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Order Created</TableHead>
              <TableHead>Payment Method</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>PaidAt</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => {
              const days = differenceInCalendarDays(
                order.rentTill,
                order.rentFrom,
              );

              return (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-medium",
                        statusStyles[order.status] ??
                          "bg-muted text-muted-foreground",
                      )}
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-primary">
                    {days} {days === 1 ? "Day" : "Days"}
                  </TableCell>
                  <TableCell>{order.orderItemId}</TableCell>
                  <TableCell>{order.total}</TableCell>
                  <TableCell>{order.createdAt}</TableCell>
                  <TableCell>{order.payment.method}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cn(
                        "text-xs font-medium",
                        paymentStatusStyles[order.payment.status] ??
                          "bg-muted text-muted-foreground",
                      )}
                    >
                      {order.payment.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.payment.paidAt}</TableCell>
                  <TableCell>
                    <Link href={"/admin-dashboard/rentals/" + order.id}>
                      <UserPen />
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </Card>
    </div>
  );
};
