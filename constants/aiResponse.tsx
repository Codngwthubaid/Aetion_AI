// constants/aiResponse.ts
import { OpenAI } from "openai"
import { features } from "@/constants/index"

const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.NEXT_PUBLIC_OPENROUTER_API_KEY,
    dangerouslyAllowBrowser: true
})

export const aiModel = async ({ topic, feature, message }: { topic: string, feature: string, message: string }): Promise<string> => {
    const selectedFeature = features.find((item) => item.label === feature)
    const PROMPT = selectedFeature?.prompt.replace("{user_topic}", topic) || "Default prompt"

    try {
        const completion = await openai.chat.completions.create({
            model: "deepseek/deepseek-chat-v3-0324",
            messages: [
                { role: "assistant", content: PROMPT },
                { role: "user", content: message }
            ],
        })
        const aiResponse = completion.choices[0].message.content
        return aiResponse || "No response generated"
    } catch (error) {
        console.error("Error in aiModel:", error)
        return "Error generating AI response"
    }
}