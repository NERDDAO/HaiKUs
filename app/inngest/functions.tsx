import { inngest } from "./client";
import { Haikipu, hAIku } from "~~/app/ai/llmCall";



export const helloWorld = inngest.createFunction(
    { id: "hello-world" },
    { event: "test/hello.world" },
    async ({ event, step }) => {
        const userPrompt = `"subject: ${event.data.prompt}"`
        const haikiput: Haikipu = {
            title: event.data.prompt || '',
            id: event.data.id,
            address: event.data.fid,
            timestamp: Date.now().toString(),
            type: "frame",
            contextSummary: "You write haikus and weave them coherently",
            haiku: "",
            explainer: "",
        };
        await hAIku(haikiput, systemPrompt, assistantPrompt, userPrompt)
        return { event, body: `"Message ${event.data.prompt}"` };
    },
);


const systemPrompt = "Write a haiku about a the subject respond in a JSON format with the following structure: {haiku: string, haikuExplainer:string}"

const assistantPrompt = "Haiku, unrhymed poetic form consisting of 17 syllables arranged in three lines of 5, 7, and 5 syllables respectively"

