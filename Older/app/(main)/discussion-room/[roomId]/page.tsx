"use client"
import { aiModel } from "@/constants/aiResponse"
import { Button } from "@/components/ui/button"
import { AiInstructors } from "@/constants"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { UserButton, useUser } from "@stackframe/stack"
import { useQuery } from "convex/react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"
import { Loader } from "lucide-react"
import Chat from "./_components/Chat"

interface SpeechRecognition extends EventTarget {
    continuous: boolean;
    interimResults: boolean;
    lang: string;
    start(): void;
    stop(): void;
    onresult: (event: any) => void;
    onerror: (event: any) => void;
    onend: () => void;
}

type Instructors = { label: string; icon: string };

export default function DiscussionRoomPage() {
    const user = useUser()
    const { roomId } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const [masterDetails, setMasterDetails] = useState<Instructors>()
    const [enableMicrophone, setEnableMicrophone] = useState(false);
    const [textChunks, setTextChunks] = useState<string[]>([]);
    const [fullTranscript, setFullTranscript] = useState<string>("");
    const [aiResponses, setAiResponses] = useState<{ role: string, content: string }[]>([
        {
            role: "assistant",
            content: `Hello ${user?.displayName}! Thanks for joining the AI powered interview session.`
        }
    ]);

    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const lastProcessedChunkRef = useRef<string>("");
    const processingRef = useRef(false);
    const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomDetails, {
        id: roomId as Id<"DiscussionRoom">
    })

    useEffect(() => {
        const fetchMasterDetails = AiInstructors.find((instructor) =>
            instructor.label === discussionRoomData?.masterName
        )
        setMasterDetails(fetchMasterDetails)
    }, [discussionRoomData])

    const processAIResponse = async (newChunk: string) => {
        if (!newChunk || newChunk === lastProcessedChunkRef.current || processingRef.current) return;

        processingRef.current = true;
        try {
            const aiResponse = await aiModel({
                topic: discussionRoomData?.topic || "default topic",
                feature: discussionRoomData?.topicName || "default feature",
                message: newChunk
            });

            if (aiResponse && typeof aiResponse === 'string') {
                setAiResponses(prev => {
                    const lastEntry = prev[prev.length - 1];
                    if (lastEntry?.role === "assistant" && lastEntry.content === aiResponse) {
                        return prev;
                    }
                    return [
                        ...prev,
                        { role: "user", content: newChunk },
                        { role: "assistant", content: aiResponse }
                    ];
                });
                lastProcessedChunkRef.current = newChunk;
            }
        } catch (error) {
            console.error("Error processing AI response:", error);
        } finally {
            processingRef.current = false;
        }
    };

    const startRecognition = () => {
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Speech Recognition API not supported in this browser");
            return;
        }

        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = (event: any) => {
            const latestChunk = event.results[event.results.length - 1][0].transcript;
            setTextChunks(prev => {
                if (prev[prev.length - 1] !== latestChunk) {
                    const newChunks = [...prev, latestChunk];
                    processAIResponse(latestChunk);
                    return newChunks;
                }
                return prev;
            });

            if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
            silenceTimeoutRef.current = setTimeout(() => {
                console.log('User stopped talking');

            }, 2000);
        };

        recognition.onerror = (event: any) => {
            console.error('Speech recognition error:', event.error);
            if (event.error === 'no-speech' || event.error === 'network') {
                recognition.stop();
                if (enableMicrophone) setTimeout(() => recognition.start(), 100); 
            } else if (event.error === 'not-allowed') {
                setEnableMicrophone(false);
                alert("Microphone access denied. Please enable it in your browser settings.");
            }
        };

        recognition.onend = () => {
            if (enableMicrophone && recognitionRef.current) {
                setTimeout(() => recognitionRef.current?.start(), 100); 
            }
        };

        try {
            recognition.start();
        } catch (err) {
            console.error('Error starting speech recognition:', err);
        }
    };

    const connectToServer = async () => {
        setIsLoading(true);
        setEnableMicrophone(true);
        setTextChunks([]);
        setFullTranscript("");
        setAiResponses([{
            role: "assistant",
            content: `Hello ${user?.displayName}! Thanks for joining the AI powered interview session.`
        }]);

        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
            try {
                await navigator.mediaDevices.getUserMedia({ audio: true });
                startRecognition();
            } catch (err) {
                console.error("Microphone access error:", err);
                setEnableMicrophone(false);
                alert("Microphone access is required for this feature.");
            }
        }
        setIsLoading(false);
    };

    const stopRecording = async (event: any) => {
        event.preventDefault();
        setIsLoading(true);
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            recognitionRef.current = null;
            if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
            const finalTranscript = textChunks.join(' ');
            setFullTranscript(finalTranscript);
        }
        setEnableMicrophone(false);
        setIsLoading(false);
    };

    useEffect(() => {
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
                recognitionRef.current = null;
            }
            if (silenceTimeoutRef.current) clearTimeout(silenceTimeoutRef.current);
        };
    }, []);

    return (
        <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-4">
                {discussionRoomData?.topicName}
            </h1>
            <div className="flex flex-col md:flex-row items-start justify-center gap-4 sm:gap-5 md:gap-6 lg:gap-8 mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center gap-y-4 w-full">
                    <div className="bg-secondary relative w-full max-w-[90vw] sm:max-w-[80vw] md:max-w-[60vw] lg:max-w-[50vw] h-[50vh] sm:h-[55vh] md:h-[60vh] rounded-lg my-4 flex flex-col items-center justify-center gap-4">
                        <div className="flex flex-col items-center justify-center gap-4">
                            {masterDetails && (
                                <Image
                                    src={masterDetails.icon}
                                    alt="Master"
                                    className="animate-pulse rounded-full object-cover w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24"
                                    width={100}
                                    height={100}
                                />
                            )}
                            <div className="text-sm sm:text-base md:text-lg lg:text-xl">
                                {masterDetails?.label}
                            </div>
                        </div>
                        <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-6 bg-secondary-foreground w-16 h-12 sm:w-20 sm:h-14 md:w-24 md:h-16 rounded-md flex items-center justify-center">
                            <UserButton />
                        </div>
                    </div>
                    {!enableMicrophone ? (
                        <Button
                            onClick={connectToServer}
                            disabled={isLoading}
                            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
                        >
                            {isLoading && <Loader className="animate-spin mr-2" />} Connect
                        </Button>
                    ) : (
                        <Button
                            onClick={stopRecording}
                            variant="destructive"
                            className="w-full sm:w-auto px-4 py-2 text-sm sm:text-base"
                        >
                            {isLoading && <Loader className="animate-spin mr-2" />} Disconnect
                        </Button>
                    )}
                    {enableMicrophone && (
                        <div className="my-2 w-full bg-primary rounded-md p-2 sm:p-3 md:p-4 text-sm sm:text-base overflow-y-auto max-h-[20vh] sm:max-h-[25vh]">
                            <div>
                                {textChunks.map((chunk, index) => (
                                    <p key={index} className="mb-1">
                                        {chunk}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )}
                    {!enableMicrophone && fullTranscript && (
                        <div className="my-2 w-full bg-primary rounded-md p-2 sm:p-3 md:p-4 text-sm sm:text-base overflow-y-auto max-h-[20vh] sm:max-h-[25vh]">
                            <p className="break-words">{fullTranscript}</p>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-auto">
                    <Chat aiResponses={aiResponses} />
                </div>
            </div>
        </div>
    )
}