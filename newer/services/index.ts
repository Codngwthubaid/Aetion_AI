import { CalendarRange, IndianRupee, LayoutDashboard, Menu, Settings } from "lucide-react";

interface SidebarLink {
    name: string;
    icon: string | React.ElementType;
    path: string;
}

export const SidebarLinks: SidebarLink[] = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Schedule Interview",
        icon: CalendarRange,
        path: "/schedule-interview",
    },
    {
        name: "All Interviews",
        icon: Menu,
        path: "/all-interviews",
    },
    {
        name: "Billing",
        icon: IndianRupee,
        path: "/billing"
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings"
    }
];