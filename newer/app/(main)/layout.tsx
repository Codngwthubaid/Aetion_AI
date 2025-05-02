import DashboardProvider from "./Provider";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <DashboardProvider>
                <div className="p-10">
                {children}
                </div>
            </DashboardProvider>
        </>
    )
}