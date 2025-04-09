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

    console.log('Features:', features);

    return (
        <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 my-7 justify-center items-center mx-auto">
                {features.map((feature, index) => (
                    <BlurFade key={index} delay={0.25 + index * 0.05} inView>
                        <UserInputDailogBox feature={feature}>
                            <Card
                                className="cursor-p̥ointer h-44 w-[80vw] sm:w-48 
                            hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out"
                            >
                                <CardHeader className="flex justify-center items-center p-4">
                                    <Image
                                        width={100}
                                        height={100}
                                        src={feature.icon}
                                        alt={feature.label}
                                        className="object-contain relative cursor-pointer"
                                        onError={() => console.error(`Failed to load image: ${feature.icon.src}`)}
                                    />
                                </CardHeader>
                                <CardContent>
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