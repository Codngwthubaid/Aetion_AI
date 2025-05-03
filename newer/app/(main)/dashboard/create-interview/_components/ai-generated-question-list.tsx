"use client"
import { useEffect, useState } from "react"
import axois from "axios"
import { toast } from "sonner"
import { Loader } from "lucide-react"

export default function AiGeneratedQuestionList({ formData }: any) {

    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => { if (formData) generateQuestionList() }, [formData])
    console.log("Form Data :", formData)

    const generateQuestionList = async () => {
        try {
            setIsLoading(true)
            const response = await axois.post('/api/ai-model', ...formData)
            console.log(response)
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

    return (
        <div>
            {isLoading &&
                <div className="flex justify-center items-center h-40 bg-emerald-100">
                    <Loader className="size-8 text-emerald-500 animate-spin" />
                    <div>
                        <p>Generating questions...</p>
                        <p className="text-gray-500">Please wait...</p>
                    </div>
                </div>
            }
        </div>
    )
}