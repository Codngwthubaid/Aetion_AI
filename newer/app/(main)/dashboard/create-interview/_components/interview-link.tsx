import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Calendar, CircleCheckBig, Clock10, Copy, MailIcon, Menu, MessageCircleMore, Plus, Rss, Slack } from "lucide-react"
import { toast } from "sonner"

export default function InterviewLink({ interviewId, formData }: any) {

    console.log(formData , interviewId)
    
    const interviewDetails = [
        {
            icon: <Clock10 />,
            desc: formData?.InterviewDuration,
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

    const shareLink = [
        {
            icon: <MailIcon />,
            name: "Email"
        },
        {
            icon: <Slack />,
            name: "Slack"
        },
        {
            icon: <MessageCircleMore />,
            name: "Whatsapp"
        },
    ]

    const router = useRouter()
    const url = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId

    const getInterviewLink = () => { return url }

    const onlickCopyLink = async () => {
        await navigator.clipboard.writeText(url)
        toast.success("Link copied to clipboard")
    }


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
                    <Input defaultValue={getInterviewLink()} disabled={true} />
                    <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer" onClick={onlickCopyLink}>
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

            <div className="bg-emerald-50 p-4 rounded-lg flex flex-col gap-y-5 my-10">
                <div className="flex items-center gap-x-2 font-semibold">
                    <Rss />
                    <span>Share via</span>
                </div>
                <div className="flex gap-x-10 justify-between w-full">
                    {
                        shareLink.map((item, index) => (
                            <Button
                                key={index}
                                variant={"outline"}
                                className="bg-emerald-500 w-1/4 hover:bg-emerald-600 cursor-pointer text-white hover:text-white">
                                {item.icon} {item.name}
                            </Button>
                        ))
                    }
                </div>
            </div>

            <div className="flex w-full gap-x-5 items-center">
                <Button className="w-1/2 cursor-pointer" variant={"outline"} onClick={() => router.push("/dashboard")}>Back to Dashboard</Button>
                <Button className="w-1/2 cursor-pointer bg-emerald-500 hover:bg-emerald-600" onClick={() => router.push("/dashboard/create-interview")}>
                    <Plus /> Create New Interview
                </Button>
            </div>
        </div>
    )
}