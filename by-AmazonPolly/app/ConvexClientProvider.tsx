"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode, Suspense } from "react";
import AuthProvider from "./AuthProvider";

export function ConvexClientProvider({ children }: { children: ReactNode }) {
    const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
    return (
        <ConvexProvider client={convex}>
            <Suspense>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </Suspense>
        </ConvexProvider>
    )
}