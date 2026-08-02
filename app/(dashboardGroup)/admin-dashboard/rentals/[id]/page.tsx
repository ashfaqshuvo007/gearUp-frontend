// app/rentals/[id]/page.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format, differenceInCalendarDays } from "date-fns";
import { cn } from "@/lib/utils";
import { getRentalOrder } from "@/app/(dashboardGroup)/dashboard/rentals/_actions/rentalActions";
import { FormDialog } from "../../_components/FormDialog";
import { Button } from "@/components/ui/button";
import { UpdateStatusForm } from "../../_components/UpdateStatusForm";
import { updateOrderStatus } from "../../_actions/updateOrderStatus";

type RentalOrder = {
  id: string;
  status: "PENDING" | "ACTIVE" | "COMPLETED" | "CANCELED" | string;
  total: string;
  rentFrom: string;
  rentTill: string;
  createdAt: string;
  customer: {
    name: string;
    email: string;
  };
  payment: {
    transactionId: string;
    amount: string;
    currency: string;
    method: string;
    status: string;
    paidAt: string;
  };
  orderItems: Array<{
    id: string;
    name: string;
    brand: string;
    quantity: number;
    price: string;
    categoryName: string;
  }>;
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  PENDING: "bg-amber-50 text-amber-700 border-amber-200",
  COMPLETED: "bg-blue-50 text-blue-700 border-blue-200",
  CANCELED: "bg-red-50 text-red-700 border-red-200",
};

export default async function AdminRentalOrderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const order = await getRentalOrder(id);
  const days = differenceInCalendarDays(
    new Date(order.rentTill),
    new Date(order.rentFrom),
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-10 space-y-8">
      {/* Page heading */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">Rental Order</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight break-all">
            {order.id}
          </h1>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              statusStyles[order.status] ?? "bg-muted text-muted-foreground",
            )}
          >
            {order.status}
          </Badge>
          <FormDialog
            trigger={
              <Button variant="default" size="lg" className="ml-4">
                Edit status
              </Button>
            }
            title="Update order status"
            description={`Change the order status for ${order.id}.`}
          >
            <UpdateStatusForm
              id={order.id}
              currentStatus={order.status}
              statusOptions={[
                "PENDING_PAYMENT",
                "ACTIVE",
                "COMPLETED",
                "CANCELED",
              ]}
              action={updateOrderStatus}
            />
          </FormDialog>
        </div>
      </div>

      {/* Section 1: Order details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Order Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div>
            <p className="text-muted-foreground">Customer</p>
            {/* <p className="font-medium">{order.customer.name}</p>
            <p className="text-muted-foreground">{order.customer.email}</p> */}
          </div>

          <div>
            <p className="text-muted-foreground">Rental Period</p>
            <p className="font-medium">
              {format(new Date(order.rentFrom), "LLL d, y")} –{" "}
              {format(new Date(order.rentTill), "LLL d, y")}
            </p>
            <p className="text-muted-foreground">
              {days} {days === 1 ? "day" : "days"}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Order Placed</p>
            <p className="font-medium">
              {format(new Date(order.createdAt), "LLL d, y 'at' h:mm a")}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Total</p>
            <p className="font-medium text-base">
              BDT {Number(order.total).toLocaleString()}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Section 2: Rental item */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Item</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-medium">{order.orderItem.name}</p>
              <p className="text-sm text-muted-foreground">
                {order.orderItem.brand} · {order.orderItem.categoryName}
              </p>
            </div>
            <div className="text-right shrink-0">
              <p className="font-medium">
                BDT {Number(order.orderItem.price).toLocaleString()}
                <span className="text-muted-foreground font-normal">
                  {" "}
                  / day
                </span>
              </p>
              <p className="text-sm text-muted-foreground">
                Qty: {order.orderItem.quantity}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Section 3: Payment details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Payment</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div>
            <p className="text-muted-foreground">Status</p>
            <Badge
              variant="outline"
              className={cn(
                "text-xs font-medium mt-1",
                statusStyles[order.payment.status] ??
                  "bg-muted text-muted-foreground",
              )}
            >
              {order.payment.status}
            </Badge>
          </div>

          <div>
            <p className="text-muted-foreground">Amount Paid</p>
            <p className="font-medium">
              {order.payment.currency}{" "}
              {(Number(order.payment.amount) / 100).toLocaleString()}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Method</p>
            <p className="font-medium capitalize">{order.payment.method}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Paid At</p>
            <p className="font-medium">
              {format(new Date(order.payment.paidAt), "LLL d, y 'at' h:mm a")}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-muted-foreground">Transaction ID</p>
            <p className="font-mono text-xs break-all">
              {order.payment.transactionId}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
