import { StaticImageData } from "next/image";
import demoImage from "@/public/demoImg.png"
interface Feature {
    label: string;
    icon: StaticImageData;
}

interface Instructors {
    label: string;
    icon: StaticImageData;
}

export const features: Feature[] = [
    {
        label: "Mock Interview",
        icon: demoImage,
    },
    {
        label: "Ques Ans Prep",
        icon: demoImage,
    },
    {
        label: "Lecture topic",
        icon: demoImage,
    },
    {
        label: "Lang Prep",
        icon: demoImage,
    },
    {
        label: "Mentorship",
        icon: demoImage,
    },
]


export const AiInstructors: Instructors[] = [
    {
        label: "GPT-4",
        icon: demoImage,
    },
    {
        label: "Claude 3",
        icon: demoImage,
    },
]