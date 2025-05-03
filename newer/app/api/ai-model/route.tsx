import OpenAI from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { PROMPT } from '@/services/index';

export async function POST(request: NextRequest, response: NextResponse) {

    const { JobPosition, JobDescription, InterviewDuration, InterviewType } = await request.json();

    const FINAL_PROMPT = PROMPT
        .replace('{{jobTitle}}', JobPosition)
        .replace('{{jobDescription}}', JobDescription)
        .replace('{{duration}}', InterviewDuration)
        .replace('{{type}}', InterviewType);

    console.log(FINAL_PROMPT)
    try {
        const openai = new OpenAI({
            baseURL: 'https://openrouter.ai/api/v1',
            apiKey: process.env.OPENROUTER_API_KEY!,
        });

        const completion = await openai.chat.completions.create({
            model: 'google/gemini-2.5-pro-exp-03-25',
            messages: [
                {
                    role: 'user',
                    content: FINAL_PROMPT,
                },
            ],
        });
        console.log(completion.choices[0].message);
        return NextResponse.json({ data: completion.choices[0].message })
        
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({ error })
    }
}