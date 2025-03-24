import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    )
}