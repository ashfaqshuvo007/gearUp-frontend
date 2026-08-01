// app/dashboard/users/[id]/page.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { getUserStats } from "../../_actions/getUserStats";

type User = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "PROVIDER" | string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | string;
  createdAt: string;
  updatedAt: string;
};

const roleStyles: Record<string, string> = {
  ADMIN: "bg-purple-50 text-purple-700 border-purple-200",
  PROVIDER: "bg-blue-50 text-blue-700 border-blue-200",
  CUSTOMER: "bg-slate-50 text-slate-700 border-slate-200",
};

const statusStyles: Record<string, string> = {
  ACTIVE: "bg-emerald-50 text-emerald-700 border-emerald-200",
  INACTIVE: "bg-muted text-muted-foreground border-border",
  SUSPENDED: "bg-red-50 text-red-700 border-red-200",
};

export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const userAll = await getUserStats();
  const user = userAll.data.find((u: any) => u.id === id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 space-y-8">
      {/* Page heading */}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{user.email}</p>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-3xl font-semibold tracking-tight">{user.name}</h1>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              roleStyles[user.role] ?? "bg-muted text-muted-foreground",
            )}
          >
            {user.role}
          </Badge>
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-medium",
              statusStyles[user.status] ?? "bg-muted text-muted-foreground",
            )}
          >
            {user.status}
          </Badge>
        </div>
      </div>

      {/* Account details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Account Details</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 text-sm">
          <div>
            <p className="text-muted-foreground">Email</p>
            <p className="font-medium">{user.email}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Role</p>
            <p className="font-medium">{user.role}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Joined</p>
            <p className="font-medium">
              {format(new Date(user.createdAt), "LLL d, y")}
            </p>
          </div>

          <div>
            <p className="text-muted-foreground">Last Updated</p>
            <p className="font-medium">
              {format(new Date(user.updatedAt), "LLL d, y")}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
