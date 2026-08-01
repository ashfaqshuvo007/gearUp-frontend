import { ISidebarItem } from "@/lib/types";
import {
  FileText,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  User,
} from "lucide-react";

export const ADMIN_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Admin Dashboard",
    href: "/Admin-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Rental Orders",
    href: "/admin-dashboard/rentals",
    icon: ShoppingCart,
  },
  {
    label: "Users",
    href: "/admin-dashboard/users",
    icon: User,
  },
  {
    label: "Gears",
    href: "/admin-dashboard/gears",
    icon: Settings,
  },
];
