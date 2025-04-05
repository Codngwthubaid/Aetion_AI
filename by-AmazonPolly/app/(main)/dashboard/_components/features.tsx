import { BlurFade } from "@/components/magicui/blur-fade";
import { features } from "@/constants/index";
import Image from "next/image";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
import { UserInputDailogBox } from "./userInputDailogBox";

export default function Features() {
    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 my-5 justify-center items-center mx-auto">
                {features.map((feature, index) => (
                    <BlurFade key={index} delay={0.25 + index * 0.05} inView>
                        <UserInputDailogBox feature={feature}>
                            <Card
                                className="group cursor-pointer flex flex-col justify-between items-center h-60 w-[80vw] sm:w-48
                            hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
                            >
                                <CardHeader className="flex justify-center p-4">
                                    <div className="p-3 rounded-full transition-colors duration-300">
                                        <Image
                                            width={32}
                                            height={32}
                                            src={feature.icon}
                                            alt={feature.label}
                                            className="object-contain"
                                        />
                                    </div>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <span className="text-center font-medium">
                                        {feature.label}
                                    </span>
                                </CardContent>
                            </Card>
                        </UserInputDailogBox>
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}