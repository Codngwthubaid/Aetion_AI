"use client"
import { useUser } from "@stackframe/stack"

export default function Chat({ aiResponses }: any) {
    const user = useUser()

    return (
        <div className="md:w-[20vw] h-[60vh]">
            <div className="bg-secondary scrollbar-hide md:w-[20vw] h-[60vh] rounded-lg my-4 flex flex-col justify-start items-start p-4 overflow-y-auto">
                {aiResponses.map((response: any, index: number) => (
                    <div 
                        key={index} // Added unique key prop using index
                        className={`flex w-full ${response.role === "user" ? "justify-end" : "justify-start"} my-2`}
                    >
                        <p 
                            className={`px-2 py-1 text-sm rounded-md max-w-[80%] ${
                                response.role === "assistant" 
                                    ? "bg-primary text-white" 
                                    : "bg-gray-200 text-black"
                            }`}
                        >
                            {response.content}
                        </p>
                    </div>
                ))}
            </div>
            <h2 className="text-xs text-center">
                At the end of the conversation we will automatically generate a feedback report for {user?.displayName} from your conversation
            </h2>
        </div>
    )
}