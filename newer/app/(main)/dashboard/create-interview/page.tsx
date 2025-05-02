import { ArrowLeft } from "lucide-react";

export default function CreateInterview() {
    return (
        <div>
            <div className="flex items-center gap-x-2">
                <ArrowLeft className="hover:text-emerald-500 cursor-pointer p-1 size-8 rounded-full"/>
                <h1 className="font-bold text-2xl text-emerald-500">Create New Interview</h1>
            </div>
        </div>
    )
}