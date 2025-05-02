import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";
import UserDetailsHeader from "./dashboard/_components/user-details-header";

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="w-full p-10">
                {/* <SidebarTrigger className="cursor-pointer"/> */}
                <UserDetailsHeader />
                {children}
            </div>
        </SidebarProvider>
    )
}