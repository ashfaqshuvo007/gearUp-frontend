import { ISidebarItem } from "@/lib/types";
import { FileText, LayoutDashboard, Settings } from "lucide-react";

export const PROVIDER_SIDEBAR_ITEMS: ISidebarItem[] = [
  {
    label: "Dashboard",
    href: "/provider-dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "My Orders",
    href: "/provider-dashboard/orders",
    icon: FileText,
  },
  {
    label: "My Gear items",
    href: "/provider-dashboard/gears",
    icon: Settings,
  },
];
