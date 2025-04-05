import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { AiModels } from "@/constants"
import Image from "next/image"

export function UserInputDailogBox({ children, feature }: any) {
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
                                {AiModels.map((model, index) => (
                                    <span key={index} className="flex border items-center gap-2 my-2">
                                        <Image width={32} height={32} src={model.icon} alt={model.label} />
                                        <span>{model.label}</span>
                                    </span>
                                ))}
                            </span>
                        </span>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>

    )
}
