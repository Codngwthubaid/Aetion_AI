import { Phone, Video } from "lucide-react"
import Link from "next/link"

export default function CreateOptions() {

    const data = [
        {
            icon: Video,
            path: "/dashboard/create-interview",
            name: "Create New Interview",
            desc: "Create Ai Interview and schedule it for practice and sharing"
        },
        {
            icon: Phone,
            path: "/dashbord/create-interview",
            name: "Create Phone Screening Call",
            desc: "Schedule Phone Screening Call for practice and sharing"
        }
    ]

    return (
        <div className="flex justify-between items-center gap-x-5">
            {data.map((option, index) => (
                <Link key={index} href={option.path} className="w-1/2">
                    <div className="flex flex-col shadow-md items-start gap-2 p-4 rounded-md hover:bg-zinc-100 cursor-pointer">
                        <option.icon className="size-8 border text-emerald-500 bg-emerald-100 p-1 rounded-md" />
                        <span className="font-bold">{option.name}</span>
                        <span className="text-gray-500">{option.desc}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}   