"use client"
import axois from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { supabase } from "@/services/supabaseClient"
import { useUser } from "@/app/provider"
import { v4 as uuidv4 } from 'uuid';


export default function AiGeneratedQuestionList({ formData, onCreateLink }: any) {

    const { user } = useUser()
    const [isLoading, setIsLoading] = useState(true)
    const [isQuestionSavingLoading, setIsQuestionSavingLoading] = useState(false)
    const [isInterviewQuestionList, setIsInterviewQuestionList] = useState([])

    useEffect(() => { if (formData) generateQuestionList() }, [formData])

    const generateQuestionList = async () => {
        try {
            setIsLoading(true)
            const response = await axois.post('/api/ai-model', { ...formData })
            const content = response?.data?.data?.content
            const final_content = content.replace("```json", "").replace("```", "")
            console.log(final_content)
            setIsInterviewQuestionList(JSON.parse(final_content))

            toast.success("Questions generated successfully!")
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            console.log(error)
            toast.error("Failed to generate questions - something went wrong from server side. Please try again.")
        } finally {
            setIsLoading(false)
        }
    }

    
    const onFinish = async () => {
        setIsQuestionSavingLoading(true)
        const interviewId = uuidv4();
        console.log(" interviewId:", interviewId)
        try {
            const { data, error } = await supabase
                .from('Interviews')
                .insert([
                    {
                        jobPosition: formData?.JobPosition,
                        jobDescription: formData?.JobDescription,
                        interviewDuration: formData?.InterviewDuration,
                        interviewType: formData?.InterviewType,
                        userEmail: user?.email,
                        interviewId: interviewId,
                        questionsList: isInterviewQuestionList
                    }
                ])
                .select();

            setIsQuestionSavingLoading(false)
            onCreateLink(interviewId)
        } catch (e) {
            console.error('Unexpected Error:', e);
        } finally {
            setIsQuestionSavingLoading(false)
        }

    };


    return (
        <div>
            {isLoading &&
                <div className="flex justify-center border border-emerald-500 items-center h-32 bg-emerald-50 gap-x-3 rounded-lg my-10">
                    <Loader className="size-8 text-emerald-500 animate-spin" />
                    <div>
                        <p>Generating Interview questions...</p>
                        <p className="text-emerald-500">Our AI is crafting personalized questions basis your interview preferences</p>
                    </div>
                </div>
            }
            <div>
                {isInterviewQuestionList?.length > 0 && (
                    <ScrollArea className="border my-4 p-4 rounded-md h-[450px]">
                        {
                            isInterviewQuestionList.map((questionItem: any, index: number) => (
                                <div key={index} className="my-3 border p-2 rounded-md">
                                    <div>
                                        <span className="font-bold">Question {index + 1}: </span>
                                        {questionItem.question}
                                    </div>
                                    <p className="text-emerald-500">{questionItem.type}</p>
                                </div>
                            ))
                        }
                    </ScrollArea>
                )}
            </div>
            <div className="flex justify-end mt-4">
                <Button
                    disabled={isQuestionSavingLoading}
                    onClick={() => { onFinish() }}
                    className="bg-emerald-500 hover:bg-emerald-600 cursor-pointer">
                    {isQuestionSavingLoading && <Loader className="animate-spin text-white" />}
                    Genearte Interview Link
                </Button>
            </div>
        </div>
    )
}