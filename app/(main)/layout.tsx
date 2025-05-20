import DashboardProvider from "./Provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardProvider>
                <div>
                {children}
                </div>
            </DashboardProvider>
        </>
    )
}