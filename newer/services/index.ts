import { CalendarRange, IndianRupee, LayoutDashboard, Menu, Settings, BriefcaseBusiness, CodeXml, Puzzle, ShieldEllipsis, User } from "lucide-react";

interface SidebarLink {
    name: string;
    icon: string | React.ElementType;
    path: string;
}

interface InterviewType {
    value: string,
    icon: string | React.ElementType;
}

interface interviewDuration {
    value: string,
    label: string;
}

export const SidebarLinks: SidebarLink[] = [
    {
        name: "Dashboard",
        icon: LayoutDashboard,
        path: "/dashboard",
    },
    {
        name: "Schedule Interview",
        icon: CalendarRange,
        path: "/schedule-interview",
    },
    {
        name: "All Interviews",
        icon: Menu,
        path: "/all-interviews",
    },
    {
        name: "Billing",
        icon: IndianRupee,
        path: "/billing"
    },
    {
        name: "Settings",
        icon: Settings,
        path: "/settings"
    }
];


export const interviewDuration: interviewDuration[] = [
    {
        value: "5 minutes",
        label: "5 minutes"
    },
    {
        value: "15 minutes",
        label: "15 minutes"
    },
    {
        value: "30 minutes",
        label: "30 minutes"
    },
    {
        value: "45 minutes",
        label: "45 minutes"
    },
    {
        value: "60 minutes",
        label: "60 minutes"
    },
]

export const interviewTypes: InterviewType[] = [
    {
        value: "Technical",
        icon: CodeXml
    },
    {
        value: "Behavioral",
        icon: User
    },
    {
        value: "Experience",
        icon: BriefcaseBusiness
    },
    {
        value: "Problem Solving",
        icon: Puzzle
    },
    {
        value: "Leadeship",
        icon: ShieldEllipsis
    },
]

export const PROMPT = `You are an expert technical interviewer.

Given the following inputs:
- Job Title: {{jobTitle}}
- Job Description: {{jobDescription}}
- Interview Duration: {{duration}}
- Interview Type: {{type}}

Your task:
1. Carefully analyze the job description to identify the key responsibilities, required technical and soft skills, and the level of experience expected for the role.
2. Generate a well-structured list of high-quality interview questions tailored to the specified job title and description.
3. Adjust the number, complexity, and depth of the questions to fit within the provided interview duration, ensuring a balanced assessment of both technical and behavioral competencies.
4. Ensure the tone, style, and format of the questions are appropriate for a real-life {{type}} interview.
5. Categorize each question by type, such as: Technical, Behavioral, Experience-based, Problem-solving, or Leadership.

Format your response in valid JSON as an array of objects, where each object contains:
- "question": The interview question
- "type": The category of the question (Technical/Behavioral/Experience/Problem-solving/Leadership)

The goal is to create a structured, relevant, and time-optimized interview plan for the {{jobTitle}} role.
`;
