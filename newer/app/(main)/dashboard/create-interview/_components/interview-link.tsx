import { Button } from "@/components/ui/button"
import { Calendar, CircleCheckBig, Clock10, Copy, Menu } from "lucide-react"
import { title } from "process"

export default function InterviewLink({ interviewId, formData }: any) {

    const interviewDetails = [
        {
            icon: <Clock10 />,
            desc: "30 min",
        },
        {
            icon: <Menu />,
            desc: "10 Questions",
        },
        {
            icon: <Calendar />,
            desc: "Expries in 24 hours",
        },
    ]

    return (
        <div>
            <div className="my-10 flex flex-col gap-y-2 items-center justify-center">
                <CircleCheckBig className="text-white bg-linear-to-r from-blue-500 to-emerald-500 p-4 w-fit size-20 rounded-full" />
                <p className="text-2xl font-bold">Your AI Interview is Ready</p>
                <div className="text-gray-500">Simplly copy the link and start the interview orr share it with candidates</div>
            </div>

            <div className="bg-emerald-50 p-4 rounded-lg flex flex-col gap-y-5">
                <div className="flex items-center justify-between ">
                    <div className="text-lg font-semibold">Interview Link</div>
                    <Button
                        variant={"outline"}
                        className="bg-emerald-50 text-emerald-500 hover:text-emerald-600 rounded-full border border-emerald-600 cursor-pointer">
                        Valid for only 24 hours
                    </Button>
                </div>
                <div className="flex items-center justify-between gap-x-3">
                    <div className="bg-zinc-50 p-2 rounded-md w-full">https://interview.ai/interviewId</div>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
                        <Copy /> Copy Link
                    </Button>
                </div>
                <hr />
                <div className="flex gap-x-10">
                    {interviewDetails.map((item, index) => (
                        <div key={index} className="flex gap-2 text-zinc-700">
                            <span className="size-5">{item.icon}</span>
                            <span>{item.desc}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}