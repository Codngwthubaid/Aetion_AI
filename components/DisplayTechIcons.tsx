import { cn, getTechLogos } from "@/utils";
import { group } from "console";
import Image from "next/image";
import { relative } from "path";
export default async function DisplayTechIcons({techStack} : TechIconProps) {
    const techIcons = await getTechLogos(techStack);
    
    return (
        <div className="flex flex-row cursor-pointer">
            {techIcons.slice(0, 3).map(({tech, url}, index) => (
                <div className={cn("relative group bg-dark-300 flex-center p-2 rounded-full" , index >= 1 && "ml-[-10px]")} key={tech}>
                    <span className="tech-tooltip">{tech}</span>
                    <Image src={url} alt={tech} width={30} height={30} className="object-contain size-5" />
                </div>
            ))}
        </div>
    )
}