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
import { format } from "date-fns";
import { UserPen } from "lucide-react";
import Link from "next/link";

export type IUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "CUSTOMER" | "PROVIDER" | string;
  status: "ACTIVE" | "INACTIVE" | "SUSPENDED" | string;
  createdAt: string;
  updatedAt: string;
};

export type IUsersResponse = {
  success: boolean;
  message: string;
  data: IUser[];
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

export const UsersTable = ({ data }: IUsersResponse) => {
  return (
    <div className="mt-4">
      <Card className="@container/card">
        <Table>
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow className="font-extrabold">
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="text-muted-foreground">
                  {user.email}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium",
                      roleStyles[user.role] ?? "bg-muted text-muted-foreground",
                    )}
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={cn(
                      "text-xs font-medium",
                      statusStyles[user.status] ??
                        "bg-muted text-muted-foreground",
                    )}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {format(new Date(user.createdAt), "LLL d, y")}
                </TableCell>
                <TableCell>
                  <Link href={"/admin-dashboard/users/" + user.id}>
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
