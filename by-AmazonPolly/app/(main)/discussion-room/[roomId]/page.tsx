"use client"
import { AiInstructors } from "@/constants"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { UserButton } from "@stackframe/stack"
import { useQuery } from "convex/react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"

type Instructors = { label: string; icon: string };

export default function DiscussionRoomPage() {
    const { roomId } = useParams()
    const [masterDetails, setMasterDetails] = useState<Instructors>()

    const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomDetails, { id: roomId as Id<"DiscussionRoom"> })
    console.log(discussionRoomData)


    useEffect(() => {
        const fetchMasterDetails = AiInstructors.find((instructor) => instructor.label === discussionRoomData?.masterName)
        setMasterDetails(fetchMasterDetails)
        console.log("Master Details: ", fetchMasterDetails)
    }, [discussionRoomData])


    return (
        <div>
            <h1>{discussionRoomData?.topicName}</h1>
            <div className="bg-secondary relative w-[90vw] sm:w-[60vw] h-[60vh] rounded-md mx-auto my-4 flex flex-col items-center justify-center gap-4">
                <div>
                    {masterDetails && <Image src={masterDetails.icon} alt="Master" className="animated-pulse rounded-full object-cover size-16 md:size-20 lg:size-24" width={100} height={100} />}
                </div>
                <div className="absolute bottom-5 right-12 bg-secondary-foreground w-24 h-12 rounded-md flex items-center justify-center">
                    <UserButton />
                </div>
            </div>
        </div>
    )
}