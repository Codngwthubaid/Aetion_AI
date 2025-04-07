// "use client"
// import { Button } from "@/components/ui/button"
// import { AiInstructors } from "@/constants"
// import { api } from "@/convex/_generated/api"
// import { Id } from "@/convex/_generated/dataModel"
// import { UserButton, useUser } from "@stackframe/stack"
// import { useQuery } from "convex/react"
// import Image from "next/image"
// import { useParams } from "next/navigation"
// import { useState, useEffect, useRef } from "react"


// type Instructors = { label: string; icon: string };

// export default function DiscussionRoomPage() {

//     let silenceTimeout: NodeJS.Timeout;
//     const user = useUser()
//     const { roomId } = useParams()

//     const [masterDetails, setMasterDetails] = useState<Instructors>()
//     const [enableMicrophone, setEnableMicrophone] = useState(false);
//     const recorder = useRef<any>(null);

//     const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomDetails, { id: roomId as Id<"DiscussionRoom"> })
//     console.log(discussionRoomData)


//     useEffect(() => {
//         const fetchMasterDetails = AiInstructors.find((instructor) => instructor.label === discussionRoomData?.masterName)
//         setMasterDetails(fetchMasterDetails)
//         console.log("Master Details: ", fetchMasterDetails)
//     }, [discussionRoomData])


//     const connectToServer = async () => {
//         setEnableMicrophone(true);
//         if (typeof window !== "undefined" && typeof navigator !== "undefined") {
//             navigator.mediaDevices.getUserMedia({ audio: true })
//                 .then(async (stream) => {
//                     const RecordRTC = (await import('recordrtc')).default
//                     recorder.current = new RecordRTC(stream, {
//                         type: 'audio',
//                         mimeType: 'audio/webm;codecs=pcm',
//                         recorderType: RecordRTC.StereoAudioRecorder,
//                         timeSlice: 250,
//                         desiredSampRate: 16000,
//                         numberOfAudioChannels: 1,
//                         bufferSize: 4096,
//                         audioBitsPerSecond: 128000,
//                         ondataavailable: async (blob) => {
//                             // Reset the silence detection timer on audio input
//                             clearTimeout(silenceTimeout);

//                             const buffer = await blob.arrayBuffer();
//                             console.log("Buffer: ", buffer)
//                             await blob.arrayBuffer();
//                             // Restart the silence detection timer
//                             silenceTimeout = setTimeout(() => {
//                                 console.log('User stopped talking'); // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
//                             }, 2000);
//                         }
//                     });

//                     recorder.current.startRecording();
//                 })
//                 .catch((err) => console.error(err));
//         }
//     }

//     const stopRecording = async (event: any) => {
//         event.preventDefault()
//         recorder.current?.pauseRecording();
//         recorder.current = null;
//         setEnableMicrophone(false);
//     }

//     return (
//         <div>
//             <h1>{discussionRoomData?.topicName}</h1>
//             <div className="flex flex-col md:flex-row items-start justify-center gap-5 mx-auto">
//                 <div className="flex justify-center items-center flex-col gap-y-4">
//                     <div className="bg-secondary relative w-[90vw] sm:w-[60vw] h-[60vh] rounded-lg my-4 flex flex-col items-center justify-center gap-4">
//                         <div className="flex flex-col items-center justify-center gap-4">
//                             {masterDetails && <Image src={masterDetails.icon} alt="Master" className="animate-pulse rounded-full object-cover size-16 md:size-20 lg:size-24" width={100} height={100} />}
//                             <div>{masterDetails?.label}</div>
//                         </div>
//                         <div className="absolute bottom-5 right-12 bg-secondary-foreground w-24 h-16 rounded-md flex items-center justify-center">
//                             <UserButton />
//                         </div>
//                     </div>
//                     {!enableMicrophone ? <Button onClick={connectToServer} >Connect</Button> : <Button onClick={stopRecording} variant={"destructive"}>Disconnect</Button>}
//                 </div>
//                 <div className="md:w-[20vw] h-[60vh]">
//                     <div className="bg-secondary md:w-[20vw] h-[60vh] rounded-lg my-4 flex justify-center items-center ">
//                         <div>hello</div>
//                     </div>
//                     <h2 className="text-xs text-center">At the end of the conversation we will automatically generate a feedback report for {user?.displayName} from your conversation</h2>
//                 </div>
//             </div>
//         </div>
//     )
// }

"use client"
import { Button } from "@/components/ui/button"
import { AiInstructors } from "@/constants"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { UserButton, useUser } from "@stackframe/stack"
import { useQuery } from "convex/react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { useState, useEffect, useRef } from "react"

// Define SpeechRecognition interface for TypeScript
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

    const [masterDetails, setMasterDetails] = useState<Instructors>()
    const [enableMicrophone, setEnableMicrophone] = useState(false);
    const [textChunks, setTextChunks] = useState<string[]>([]);
    const [fullTranscript, setFullTranscript] = useState<string>("");
    const recorder = useRef<any>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomDetails, {
        id: roomId as Id<"DiscussionRoom">
    })

    useEffect(() => {
        const fetchMasterDetails = AiInstructors.find((instructor) =>
            instructor.label === discussionRoomData?.masterName
        )
        setMasterDetails(fetchMasterDetails)
    }, [discussionRoomData])

    const connectToServer = async () => {
        setEnableMicrophone(true);
        setTextChunks([]);
        setFullTranscript("");

        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
            // Check for SpeechRecognition support
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

            if (!SpeechRecognition) {
                console.error("Speech Recognition API not supported in this browser");
                return;
            }

            const recognition = new SpeechRecognition();
            recognitionRef.current = recognition;
            recognition.continuous = true;
            recognition.interimResults = true;
            recognition.lang = 'en-US';

            recognition.onresult = (event: any) => {
                const transcript = Array.from(event.results)
                    .map((result: any) => result[0].transcript)
                    .join('');
                const latestChunk = event.results[event.results.length - 1][0].transcript;

                setTextChunks(prev => {
                    const newChunks = [...prev];
                    if (newChunks.length > 0) {
                        newChunks[newChunks.length - 1] = latestChunk;
                    } else {
                        newChunks.push(latestChunk);
                    }
                    // Log the current text chunks
                    console.log("Current text chunks:", newChunks);
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
                // Restart recognition if it ends unexpectedly while microphone is enabled
                if (enableMicrophone && recognitionRef.current) {
                    recognitionRef.current.start();
                }
            };

            try {
                recognition.start();
            } catch (err) {
                console.error('Error starting speech recognition:', err);
            }

            // Existing RecordRTC code
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
                            const buffer = await blob.arrayBuffer();
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

        if (recognitionRef.current) {
            recognitionRef.current.stop();
            const finalTranscript = textChunks.join(' ');
            setFullTranscript(finalTranscript);
            // Log the full transcript
            console.log("Full transcript:", finalTranscript);
            recognitionRef.current = null;
        }

        recorder.current?.pauseRecording();
        recorder.current = null;
        setEnableMicrophone(false);
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
                                    className="animate-pulse rounded-full object-cover size-16 md:size-20 lg:size-24"
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
                        <Button onClick={connectToServer}>Connect</Button>
                    ) : (
                        <Button onClick={stopRecording} variant={"destructive"}>Disconnect</Button>
                    )}
                    {enableMicrophone && (
                        <div className="mt-4">
                            <h3>Real-time Transcript:</h3>
                            <p>{textChunks.join(' ')}</p>
                        </div>
                    )}
                    {!enableMicrophone && fullTranscript && (
                        <div className="mt-4">
                            <h3>Full Transcript:</h3>
                            <p>{fullTranscript}</p>
                        </div>
                    )}
                </div>
                <div className="md:w-[20vw] h-[60vh]">
                    <div className="bg-secondary md:w-[20vw] h-[60vh] rounded-lg my-4 flex justify-center items-center">
                        <div>hello</div>
                    </div>
                    <h2 className="text-xs text-center">
                        At the end of the conversation we will automatically generate a feedback report for {user?.displayName} from your conversation
                    </h2>
                </div>
            </div>
        </div>
    )
}