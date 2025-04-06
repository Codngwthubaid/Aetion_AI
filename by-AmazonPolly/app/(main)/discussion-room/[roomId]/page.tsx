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
import RecordRTC, { StereoAudioRecorder } from 'recordrtc';

type Instructors = { label: string; icon: string };

export default function DiscussionRoomPage() {

    let silenceTimeout: NodeJS.Timeout;
    const user = useUser()
    const { roomId } = useParams()

    const [masterDetails, setMasterDetails] = useState<Instructors>()
    const recorderRef = useRef<RecordRTC | null>(null);
    const [isRecording, setIsRecording] = useState(false);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [enableMicrophone, setEnableMicrophone] = useState(false);

    const discussionRoomData = useQuery(api.discussionRoom.getDiscussionRoomDetails, { id: roomId as Id<"DiscussionRoom"> })
    console.log(discussionRoomData)


    useEffect(() => {
        const fetchMasterDetails = AiInstructors.find((instructor) => instructor.label === discussionRoomData?.masterName)
        setMasterDetails(fetchMasterDetails)
        console.log("Master Details: ", fetchMasterDetails)
    }, [discussionRoomData])


    const connectToServer = async () => {
        if (typeof window === 'undefined' || typeof navigator === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
            alert('Microphone access not supported in this environment.');
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new RecordRTC(stream, {
                type: 'audio',
                mimeType: 'audio/webm;codecs=pcm',
                recorderType: StereoAudioRecorder,
                timeSlice: 250,
                desiredSampRate: 16000,
                numberOfAudioChannels: 1,
                bufferSize: 4096,
                audioBitsPerSecond: 128000,
                ondataavailable: async (blob) => {
                    const buffer = await blob.arrayBuffer();
                    // Process audio data here if needed
                },
            });

            recorderRef.current = recorder;
            recorder.startRecording();
            setIsRecording(true);

            silenceTimeout = setTimeout(() => {
                stopRecording();
                console.log('User stopped talking');
                // Add logic to send final transcript, stop recording, etc.
            }, 2000);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone.');
        }
    };

    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stopRecording(() => {
                const blob = recorderRef.current?.getBlob();
                setAudioUrl(URL.createObjectURL(blob!));
                recorderRef.current?.destroy();
                setIsRecording(false);
            });
            clearTimeout(silenceTimeout);
        }
    };

    useEffect(() => {
        return () => {
            if (recorderRef.current) {
                recorderRef.current.destroy();
            }
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl);
            }
        };
    }, [audioUrl]);

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