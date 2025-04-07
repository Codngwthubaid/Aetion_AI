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
}

type Instructors = { label: string; icon: string };

export default function DiscussionRoomPage() {
    let silenceTimeout: NodeJS.Timeout;
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


    const recorder = useRef<any>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const lastProcessedChunkRef = useRef<string>("");

    const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomDetails, {
        id: roomId as Id<"DiscussionRoom">
    })

    useEffect(() => {
        const fetchMasterDetails = AiInstructors.find((instructor) =>
            instructor.label === discussionRoomData?.masterName
        )
        setMasterDetails(fetchMasterDetails)
    }, [discussionRoomData])

    // In the processAIResponse function, modify it like this:
    const processAIResponse = async (newChunk: string) => {
        if (newChunk && newChunk !== lastProcessedChunkRef.current) {
            try {
                const aiResponse = await aiModel({
                    topic: discussionRoomData?.topic || "default topic",
                    feature: discussionRoomData?.topicName || "default feature",
                    message: newChunk
                });
                console.log("AI Response:", aiResponse);
                if (aiResponse && typeof aiResponse === 'string') {
                    // Add both user message and AI response
                    setAiResponses(prev => [
                        ...prev,
                        { role: "user", content: newChunk },
                        { role: "assistant", content: aiResponse }
                    ]);
                }
                lastProcessedChunkRef.current = newChunk;
            } catch (error) {
                console.error("Error processing AI response:", error);
            }
        }
    };

    const connectToServer = async () => {
        setIsLoading(true)
        setEnableMicrophone(true);
        setTextChunks([]);
        setFullTranscript("");
        setAiResponses([]);

        setIsLoading(false)
        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
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
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');
                const latestChunk = event.results[event.results.length - 1][0].transcript;

                setTextChunks(prev => {
                    const newChunks = [...prev, latestChunk];
                    console.log("Current text chunks:", newChunks);
                    processAIResponse(latestChunk);
                    return newChunks;
                });

                clearTimeout(silenceTimeout);
                silenceTimeout = setTimeout(() => {
                    console.log('User stopped talking');
                }, 2000);
            };

            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                if (event.error === 'no-speech') {
                    recognition.stop();
                    recognition.start();
                }
            };

            recognition.onend = () => {
                if (enableMicrophone && recognitionRef.current) {
                    recognitionRef.current.start();
                }
            };

            try {
                recognition.start();
            } catch (err) {
                console.error('Error starting speech recognition:', err);
            }

            navigator.mediaDevices.getUserMedia({ audio: true })
                .then(async (stream) => {
                    const RecordRTC = (await import('recordrtc')).default
                    recorder.current = new RecordRTC(stream, {
                        type: 'audio',
                        mimeType: 'audio/webm;codecs=pcm',
                        recorderType: RecordRTC.StereoAudioRecorder,
                        timeSlice: 250,
                        desiredSampRate: 16000,
                        numberOfAudioChannels: 1,
                        bufferSize: 4096,
                        audioBitsPerSecond: 128000,
                        ondataavailable: async (blob) => {
                            clearTimeout(silenceTimeout);
                            silenceTimeout = setTimeout(() => {
                                console.log('User stopped talking');
                            }, 2000);
                        }
                    });
                    recorder.current.startRecording();
                })
                .catch((err) => console.error(err));
        }
    }

    const stopRecording = async (event: any) => {
        event.preventDefault();
        setIsLoading(true)
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            const finalTranscript = textChunks.join(' ');
            setFullTranscript(finalTranscript);
            recognitionRef.current = null;
        }

        recorder.current?.pauseRecording();
        recorder.current = null;
        setEnableMicrophone(false);
        setIsLoading(false)
    }

    return (
        <div>
            <h1>{discussionRoomData?.topicName}</h1>
            <div className="flex flex-col md:flex-row items-start justify-center gap-5 mx-auto">
                <div className="flex justify-center items-center flex-col gap-y-4">
                    <div className="bg-secondary relative w-[90vw] sm:w-[60vw] h-[60vh] rounded-lg my-4 flex flex-col items-center justify-center gap-4">
                        <div className="flex flex-col items-center justify-center gap-4">
                            {masterDetails && (
                                <Image
                                    src={masterDetails.icon}
                                    alt="Master"
                                    className={`animate-pulse rounded-full object-cover size-16 md:size-20 lg:size-24`}
                                    width={100}
                                    height={100}
                                />
                            )}
                            <div>{masterDetails?.label}</div>
                        </div>
                        <div className="absolute bottom-5 right-12 bg-secondary-foreground w-24 h-16 rounded-md flex items-center justify-center">
                            <UserButton />
                        </div>
                    </div>
                    {!enableMicrophone ? (
                        <Button onClick={connectToServer} disabled={isLoading}>
                            {isLoading && <Loader className="animated-spin" />} Connect
                        </Button>
                    ) : (
                        <Button onClick={stopRecording} variant={"destructive"}>
                            {isLoading && <Loader className="animated-spin" />} Disconnect
                        </Button>
                    )}
                    {enableMicrophone && (
                        <div className="mt-4">
                            <h3>Real-time Transcript:</h3>
                            <div>{textChunks.map((chunk, index) => (
                                <p key={index}>{chunk}</p>
                            ))}</div>
                        </div>
                    )}
                    {!enableMicrophone && fullTranscript && (
                        <div className="mt-4">
                            <h3>Full Transcript:</h3>
                            <p>{fullTranscript}</p>
                        </div>
                    )}
                </div>
                <Chat aiResponses={aiResponses} />
            </div>
        </div>
    )
}