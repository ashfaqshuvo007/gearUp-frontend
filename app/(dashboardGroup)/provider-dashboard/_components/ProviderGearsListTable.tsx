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
import { cn } from "@/lib/utils";
import { UserPen } from "lucide-react";
import Link from "next/link";

export type IGear = {
  id: string;
  name: string;
  brand: string;
  quantity: number;
  price: string;
  categoryName: string;
  status: "ACTIVE" | "INACTIVE" | string;
  provider: {
    id: string;
    name: string;
  };
};

export type IGearListResponse = {
  success: boolean;
  message: string;
  data: IGear[];
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  INACTIVE: "bg-muted text-muted-foreground border-border",
};

export const ProviderGearTable = ({ data }: IGearListResponse) => {
  return (
    <div className="mt-4">
      <Card className="@container/card">
        <Table>
          <TableCaption>A list of gear listings.</TableCaption>
          <TableHeader>
            <TableRow className="font-extrabold">
              <TableHead>Name</TableHead>
              <TableHead>Brand</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price / Day</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Provider</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((gear) => (
              <TableRow key={gear.id}>
                <TableCell className="font-medium">{gear.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {gear.brand}
                </TableCell>
                <TableCell>{gear.categoryName}</TableCell>
                <TableCell>BDT {Number(gear.price).toLocaleString()}</TableCell>
                <TableCell>{gear.quantity}</TableCell>
                <TableCell className="text-muted-foreground">
                  {gear.provider.name}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium",
                      statusStyles[gear.status] ??
                        "bg-muted text-muted-foreground",
                    )}
                  >
                    {gear.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Link href={"/provider-dashboard/gears/" + gear.id}>
                    <UserPen />
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter></TableFooter>
        </Table>
      </Card>
    </div>
  );
};
