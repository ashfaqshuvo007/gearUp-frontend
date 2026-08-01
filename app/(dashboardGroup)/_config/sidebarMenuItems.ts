import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, ShoppingCart } from "lucide-react";
import { ADMIN_SIDEBAR_ITEMS } from "./adminSidebarItems";
import { PROVIDER_SIDEBAR_ITEMS } from "./providerSidebarItems";

const CUSTOMER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Rental Orders",
    href: "/dashboard/rentals",
    icon: ShoppingCart,
  },
];

export const sidebarMenuItems = {
  CUSTOMER: CUSTOMER_SIDEBAR_ITEMS,
  PROVIDER: PROVIDER_SIDEBAR_ITEMS,
  ADMIN: ADMIN_SIDEBAR_ITEMS,
};
