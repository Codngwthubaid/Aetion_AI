import { Phone, Video } from "lucide-react"

export default function CreateOptions() {

    const data = [
        {
            name: "Create New Interview",
            icon: Video,
            desc: "Create Ai Interview and schedule it for practice and sharing"
        },
        {
            name: "Create Phone Screening Call",
            icon: Phone,
            desc: "Schedule Phone Screening Call for practice and sharing"
        }
    ]

    return (
        <div className="flex justify-between items-center gap-x-5">
            {data.map((option, index) => (
                <div key={index} className="flex flex-col w-1/2 shadow-md items-start gap-2 p-4 rounded-md hover:bg-zinc-100 cursor-pointer">
                    <option.icon className="size-8 border text-emerald-500 bg-emerald-100 p-1 rounded-md"/>
                    <span className="font-bold">{option.name}</span>
                    <span className="text-gray-500">{option.desc}</span>
                </div>
            ))}
        </div>
    )
}   