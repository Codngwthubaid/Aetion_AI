"use client"
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Progress } from "@/components/ui/progress"
import { useState } from "react";
import FormContainer from "./_components/form-container";
import AiGeneratedQuestionList from "./_components/ai-generated-question-list";
import { toast } from "sonner";
import InterviewLink from "./_components/interview-link";

export default function CreateInterview() {

    const router = useRouter()
    const [isStep, setIsStep] = useState(3)
    const [formData, setFormData] = useState<{ [key: string]: string }>({})
    const [isInterviewId, setIsInterviewId] = useState("")

    const onHandleInputChange = ({ field, value }: { field: string, value: string }) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));

    }

    const onGoToNext = () => {
        if (!formData?.JobPosition || !formData.JobDescription || !formData.InterviewDuration || !formData.InterviewType) return toast.warning("Plese fill all the required fields");
        else toast.success("Form submitted successfully"); setIsStep(prev => prev + 1)
    }

    const onCreateLink = (interviewId: string) => {
        setIsInterviewId(interviewId)
        setIsStep(prev => prev + 1)
    }


    return (
        <div className="w-[90%] mx-auto">
            <div className="flex items-center  gap-x-2 my-6">
                <ArrowLeft
                    onClick={() => router.back()}
                    className="hover:text-emerald-500 cursor-pointer p-1 size-8 rounded-full" />
                <div className="font-bold text-2xl text-emerald-500">Create New Interview</div>
            </div>
            <Progress value={isStep * 33} />
            {
                isStep == 1 ? <FormContainer
                    onHandleInputChange={onHandleInputChange}
                    GoToNext={() => onGoToNext()}
                />
                    :
                    isStep == 2 ? <AiGeneratedQuestionList
                        formData={formData}
                        onCreateLink={(interviewId: string) => onCreateLink(interviewId)}
                    />
                        :
                        isStep == 3 ? <InterviewLink interviewId={isInterviewId} formData={formData} />
                            :
                            null
            }
        </div>
    )
}