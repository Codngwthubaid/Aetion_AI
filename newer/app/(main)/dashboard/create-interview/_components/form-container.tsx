import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { interviewDuration, interviewTypes } from "@/services"
import { useEffect, useState } from "react"


export default function FormContainer({ onHandleInputChange, GoToNext }: any) {

    const [isInterviewType, setIsInterviewType] = useState<string[]>([])
    useEffect(() => { onHandleInputChange({ field: "InterviewType", value: isInterviewType }) }, [isInterviewType])

    const onHandleInterviewTypeChange = (value: string) => {
        const data = isInterviewType.includes(value)
        if (!data) setIsInterviewType(prev => [...prev, value])
        else setIsInterviewType(prev => prev.filter(item => item !== value))
    }

    return (
        <div className="my-6 flex flex-col gap-y-5">
            <div >
                <div className="pb-1">Job Position</div>
                <Input
                    type="text"
                    placeholder="e.g. Senior Software Engineer"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => onHandleInputChange({ field: "JobPosition", value: e.target.value })} />
            </div>
            <div >
                <div className="pb-1">Job Description</div>
                <Textarea
                    className="h-40"
                    placeholder="Enter Job Description Details ..."
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => onHandleInputChange({ field: "JobDescription", value: e.target.value })}
                />
            </div>
            <div>
                <div className="pb-1">Interview Duration</div>
                <Select onValueChange={(value) => onHandleInputChange({ field: "InterviewDuration", value })}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="15 minutes" />
                    </SelectTrigger>
                    <SelectContent>
                        {interviewDuration.map((duration, index) => (
                            <SelectItem
                                key={index}
                                value={duration.value}
                            >
                                {duration.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <div className="pb-1">Interview Type</div>
                <div className="flex gap-3 items-center flex-wrap">
                    {
                        interviewTypes.map((type, index) => (
                            <Button
                                key={index}
                                variant={"outline"}
                                className={`rounded-full cursor-pointer ${isInterviewType.includes(type.value) && "bg-emerald-500 hover:bg-emerald-600  text-white hover:text-white"}`}
                                onClick={() => onHandleInterviewTypeChange(type.value)}
                            >
                                <type.icon />
                                {type.value}
                            </Button>
                        ))
                    }
                </div>
            </div>
            <div className="flex justify-end" onClick={() => GoToNext()}>
                <Button className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
                    Generate Interview Ques <ArrowRight />
                </Button>
            </div>
        </div>
    )
}