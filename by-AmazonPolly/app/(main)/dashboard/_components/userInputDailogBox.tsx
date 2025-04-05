"use client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { AiInstructors } from "@/constants"
import Image from "next/image"
import { useState } from "react"

export function UserInputDailogBox({ children, feature }: any) {
    const [isSelectedMaster, setIsSelectedMaster] = useState("");

    return (
        <Dialog>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{feature.label}</DialogTitle>
                    <DialogDescription>
                        <span>
                            <span>
                                <span>Enter your topic to master your skills in {feature.label}</span>
                                <Textarea placeholder="Enter your topic" className="my-2" />
                            </span>
                            <span>
                                <span>Enter your topic to master your skills in {feature.label}</span>
                                <span className="flex flex-wrap justify-start items-center gap-x-2 relative">
                                    {AiInstructors.map((model, index) => (
                                        <span key={index} className={`flex flex-col items-center gap-2 my-2 ${isSelectedMaster == model.label && "border-2 "}p-2 rounded-md cursor-pointer`} onClick={() => setIsSelectedMaster(model.label)}>
                                            <Image width={100} height={100} src={model.icon} alt={model.label} />
                                            <span className="absolute bottom-5 text-white">{model.label}</span>
                                        </span>
                                    ))}
                                </span>
                            </span>
                            <span className="flex justify-between items-center mt-4">
                                <Button variant={"ghost"}>Cancel</Button>
                                <Button>Next</Button>
                            </span>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
