import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterview } from "@/constants";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="card-cta">
        <div className="flex flex-col gap-6 max-w-lg">
          <h2>Get Interview Ready with AI Powered TYI</h2>
          <p className="text-lg">Practice on real interview questions with AI powered TYI & get instant feedbacks</p>
          <Button className="btn-primary" asChild>
            <Link href={"/interview"}>Start an Interview</Link>
          </Button>
        </div>
        <Image src="/robot.png" alt="hero" width={400} height={400} className="max-sm:hidden" />
      </section>

      <section className="flex flex-col gap-6 mt-8 mx-auto container">
        <h2>Your Interviews</h2>
        <div className="interviews-section">
          {dummyInterview.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}

          {/* <p>You haven&apos;t scheduled any interviews</p> */}
        </div>
      </section>

      <section className="flex mx-auto container flex-col gap-6">
        <h2>Take an Interview</h2>
        <div className="interviews-section">
          {dummyInterview.map((interview) => (
            <InterviewCard {...interview} key={interview.id} />
          ))}
        </div>
      </section>
    </>
  );
}

