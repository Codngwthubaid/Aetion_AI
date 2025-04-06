"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { AiInstructors } from "@/constants"
import { api } from "@/convex/_generated/api"
import { useMutation } from "convex/react"
import { Loader } from "lucide-react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function UserInputDailogBox({ children, feature }: any) {

    const [isSelectedMaster, setIsSelectedMaster] = useState("")
    const [isSelectedTopic, setIsSelectedtopic] = useState("")
    const [isOpenDailog, setIsOpenDailog] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const createDiscussionRoom = useMutation(api.discussionRoom.DiscussionRoom)
    const router = useRouter()

    const createDiscussionRoomHandler = async () => {
        setIsLoading(true)
        const result = await createDiscussionRoom({ topic: isSelectedTopic, topicName: feature.label, masterName: isSelectedMaster })
        console.log(result);
        setIsLoading(false)
        setIsOpenDailog(false)
        router.push(`/discussion-room/${result}`)
    }


    return (
        <Dialog open={isOpenDailog} onOpenChange={setIsOpenDailog}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{feature.label}</DialogTitle>
                    <DialogDescription>
                        <span>
                            <span>
                                <span>Enter your topic to master your skills in {feature.label}</span>
                                <Textarea placeholder="Enter your topic" className="my-2" onChange={(e) => setIsSelectedtopic(e.target.value)} />
                            </span>
                            <span>
                                <span>Enter your topic to master your skills in {feature.label}</span>
                                <span className="flex flex-wrap justify-start items-center gap-x-2 relative">
                                    {AiInstructors.map((model, index) => (
                                        <span key={index} className={`flex flex-col items-center gap-2 my-2 ${isSelectedMaster == model.label && "border-2 "} rounded-md cursor-pointer`} onClick={() => setIsSelectedMaster(model.label)}>
                                            <Image width={100} height={100} src={model.icon} alt={model.label} className="object-contain rounded-md" />
                                            <span className="absolute bottom-3 text-white">{model.label}</span>
                                        </span>
                                    ))}
                                </span>
                            </span>
                            <span className="flex justify-end gap-x-2 items-center mt-4">
                                <DialogClose asChild>
                                    <Button variant={"destructive"} className="cursor-pointer">Cancel</Button>
                                </DialogClose>
                                <Button className="cursor-pointer" disabled={(!isSelectedTopic || !isSelectedMaster || isLoading)} onClick={createDiscussionRoomHandler}>
                                    {isLoading && <Loader className="animate-spin" />} Next</Button>
                            </span>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
