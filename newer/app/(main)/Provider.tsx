import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "./_components/app-sidebar";

export default function DashboardProvider({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div>
                <SidebarTrigger className="cursor-pointer"/>
                {children}
            </div>
        </SidebarProvider>
    )
}