"use client"
import { useUser } from "@stackframe/stack"
import Features from "./_components/features"
import History from "./_components/history"
import Feedback from "./_components/feedback"
export default function Dashboard() {

    const user = useUser()
    return (
        <div className="mx-auto container">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div>Dashboard</div>
                <div>Welcome back , {user?.displayName}</div>
                <Features />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mx-auto">
                    <History />
                    <Feedback />
                </div>
            </div>
        </div>
    )
}