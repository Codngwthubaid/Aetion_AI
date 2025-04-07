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
import { RealtimeTranscriber } from "assemblyai"
import axios from "axios"

type Instructors = { label: string; icon: string };

export default function DiscussionRoomPage() {

    let silenceTimeout: NodeJS.Timeout;
    const user = useUser()
    const { roomId } = useParams()

    const [masterDetails, setMasterDetails] = useState<Instructors>()
    const [enableMicrophone, setEnableMicrophone] = useState(false);
    const recorder = useRef<any>(null);
 
    const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomDetails, { id: roomId as Id<"DiscussionRoom"> })
    console.log(discussionRoomData)


    useEffect(() => {
        const fetchMasterDetails = AiInstructors.find((instructor) => instructor.label === discussionRoomData?.masterName)
        setMasterDetails(fetchMasterDetails)
        console.log("Master Details: ", fetchMasterDetails)
    }, [discussionRoomData])


    const connectToServer = async () => {
        setEnableMicrophone(true);
        if (typeof window !== "undefined" && typeof navigator !== "undefined") {
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
                            // Reset the silence detection timer on audio input
                            clearTimeout(silenceTimeout);

                            const buffer = await blob.arrayBuffer();
                            console.log("Buffer: ", buffer)
                            await blob.arrayBuffer();
                            // Restart the silence detection timer
                            silenceTimeout = setTimeout(() => {
                                console.log('User stopped talking'); // Handle user stopped talking (e.g., send final transcript, stop recording, etc.)
                            }, 2000);
                        }
                    });

                    recorder.current.startRecording();
                })
                .catch((err) => console.error(err));
        }
    }

    const stopRecording = async (event: any) => {
        event.preventDefault()
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
                            {masterDetails && <Image src={masterDetails.icon} alt="Master" className="animate-pulse rounded-full object-cover size-16 md:size-20 lg:size-24" width={100} height={100} />}
                            <div>{masterDetails?.label}</div>
                        </div>
                        <div className="absolute bottom-5 right-12 bg-secondary-foreground w-24 h-16 rounded-md flex items-center justify-center">
                            <UserButton />
                        </div>
                    </div>
                    {!enableMicrophone ? <Button onClick={connectToServer} >Connect</Button> : <Button onClick={stopRecording} variant={"destructive"}>Disconnect</Button>}
                </div>
                <div className="md:w-[20vw] h-[60vh]">
                    <div className="bg-secondary md:w-[20vw] h-[60vh] rounded-lg my-4 flex justify-center items-center ">
                        <div>hello</div>
                    </div>
                    <h2 className="text-xs text-center">At the end of the conversation we will automatically generate a feedback report for {user?.displayName} from your conversation</h2>
                </div>
            </div>
        </div>
    )
}