// app/dashboard/gears/[id]/page.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getGearById } from "@/app/(publicGroup)/_actions/getGearById";
import { FormDialog } from "../../_components/FormDialog";
import { Button } from "@/components/ui/button";
import { UpdateStatusForm } from "../../_components/UpdateStatusForm";
import { updateGearStatus } from "../../_actions/updateGearStatus";
import { getUserStats } from "../../_actions/getUserStats";
import { IUser } from "@/lib/types";

type Gear = {
  id: string;
  name: string;
  description: string | null;
  brand: string;
  quantity: number;
  price: string;
  categoryName: string;
  status: "ACTIVE" | "INACTIVE" | string;
  createdAt: string;
  category: {
    name: string;
    description: string | null;
  };
  provider: {
    id: string;
    name: string;
    email: string;
  };
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  INACTIVE: "bg-muted text-muted-foreground border-border",
};

export default async function GearItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const gear = await getGearById(id);
  const userAll = await getUserStats();
  const provider = userAll.data.find((u: any) => u.id === gear.data.providerId);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      {/* Page heading */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{gear.data.brand}</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">
            {gear.data.name}
          </h1>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              statusStyles[gear.data.status] ??
                "bg-muted text-muted-foreground",
            )}
          >
            {gear.data.status}
          </Badge>
          <FormDialog
            trigger={
              <Button variant="default" size="lg" className="ml-4">
                Edit status
              </Button>
            }
            title="Update gear status"
            description={`Change the gear status for ${gear.data.name}.`}
          >
            <UpdateStatusForm
              id={gear.data.id}
              currentStatus={gear.data.status}
              statusOptions={["ACTIVE", "DRAFT", "SUSPENDED"]}
              action={updateGearStatus}
            />
          </FormDialog>
        </div>
        {gear.data.description && (
          <p className="text-muted-foreground max-w-xl">
            {gear.data.description}
          </p>
        )}
      </div>
      {/* Section 1: Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Overview</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div>
            <p className="text-muted-foreground">Price</p>
            <p className="font-medium text-base">
              BDT {Number(gear.data.price).toLocaleString()}
              <span className="text-muted-foreground font-normal text-sm">
                {" "}
                / day
              </span>
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Quantity Available</p>
            <p className="font-medium">{gear.data.quantity}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Category</p>
            <p className="font-medium">{gear.data.categoryName}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Listed On</p>
            <p className="font-medium">
              {format(new Date(gear.data.createdAt), "LLL d, y")}
            </p>
          </div>
        </CardContent>
      </Card>
      {/* Section 2: Provider */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Provider</CardTitle>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">{provider.name}</p>
              <p className="text-muted-foreground">{provider.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
