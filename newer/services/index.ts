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
1. Analyze the job description to identify the key responsibilities, required skills, and expected experience for the role.
2. Generate a list of high-quality interview questions tailored to the job title, description, and interview type.
3. Adjust the number and depth of questions to fit the interview duration.
4. For each question, specify its type: Technical, Behavioral, Experience, Problem-solving, or Leadership.

Output ONLY a valid JSON array of objects, where each object contains:
- "question": The interview question.
- "type": The category of the question.

Do not include any explanations, notes, analysis, or additional text-just the JSON array.
`;
