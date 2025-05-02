"use client"
import { Button } from "@/components/ui/button"
import { Plus, Video } from "lucide-react"
import { useState } from "react"

export default function LatestInterviewList() {

    const [isLatestInterview, setIsLatestInterview] = useState<string[]>([])

    return (
        <div>
            <div className="font-bold text-2xl my-6 text-emerald-500">Previously Created Interviews</div>
            {
                isLatestInterview.length === 0
                    ?
                    (
                        <div className="flex flex-col justify-center items-center gap-y-3">
                            <Video className="size-8 text-emerald-500"/>
                            <div>You don't have any interview created</div>
                            <Button className="bg-emerald-500 cursor-pointer hover:bg-emerald-600"><Plus /> Create New Interview</Button>
                        </div>
                    )
                    :
                    (
                        <p>Latest Interviews</p>
                    )
            }
        </div>
    )
}