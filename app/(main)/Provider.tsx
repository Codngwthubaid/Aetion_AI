import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import UserDetailsHeader from "./dashboard/_components/user-details-header";

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarTrigger className="cursor-pointer" />
            <div className="w-full p-10">
                <UserDetailsHeader />
                {children}
            </div>
        </SidebarProvider>
    )
}