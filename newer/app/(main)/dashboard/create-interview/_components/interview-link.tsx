import { Video } from "lucide-react";

export default function InterviewLink() {
    return (
        <div className="flex flex-col items-center justify-center gap-y-3 my-6">
            <Video className="size-8 text-emerald-500" />
            <div className="font-bold text-2xl text-emerald-500">Interview Link</div>
            <div className="text-gray-500">You can share this link with your candidates</div>
        </div>
    )
}