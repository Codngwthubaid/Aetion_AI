import mockinterview from "@/public/mi.jpg";
import quesansprep from "@/public/qai.jpg";
import lecturtopic from "@/public/lt.jpg";
import langprep from "@/public/lp.jpg";
import mentorship from "@/public/ms.jpg";
import instructor from "@/public/ubaid.jpg";
import { StaticImageData } from "next/image";

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
        icon: mockinterview,
    },
    {
        label: "Ques Ans Prep",
        icon: quesansprep,
    },
    {
        label: "Lecture topic",
        icon: lecturtopic,
    },
    {
        label: "Lang Prep",
        icon: langprep,
    },
    {
        label: "Mentorship",
        icon: mentorship,
    },
]


export const AiInstructors: Instructors[] = [
    {
        label: "Ubaid",
        icon: instructor,
    },
    {
        label: "Mustafa",
        icon: instructor,
    },
]