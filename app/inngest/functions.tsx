import { inngest } from "./client";
import Replicate from "replicate";
import { Haikipu, hAIku } from "~~/app/ai/llmCall";

// make sure to set your NEYNAR_API_KEY .env

// LLM Consts
const systemPrompt =
  "Write a haiku about a the subject respond in a JSON format with the following structure: {haiku: string, haikuExplainer:string}";

const assistantPrompt =
  "Haiku, unrhymed poetic form consisting of 17 syllables arranged in three lines of 5, 7, and 5 syllables respectively";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    const userPrompt = `"subject: ${event.data.prompt}"`;
    const haikiput: Haikipu = {
      title: event.data.prompt || "",
      id: event.data.id,
      address: event.data.fid,
      timestamp: Date.now().toString(),
      type: "frame",
      contextSummary: "You write haikus and weave them coherently",
      haiku: "",
      explainer: "",
    };
    await hAIku(haikiput, systemPrompt, assistantPrompt, userPrompt);
    return { event, body: `"Message ${event.data.prompt}"` };
  },
);
// cast action function
export const hello2World = inngest.createFunction(
  { id: "hello2-world" },
  { event: "test/hello2.world" },
  async ({ event, step }) => {
    // fetch a single cast
    const hash = event.data.castId;
    const options = {
      method: "GET",
      headers: { accept: "application/json", api_key: process.env.NEYNAR_API_KEY || "" },
    };

    const query = await fetch(`https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`, options);
    const response = await query.json();
    if (!response) {
      return { event, body: `"No response from cast ${hash}"` };
    }

    const userPrompt = `"subject: ${response.cast?.text}"`;
    const haikiput: Haikipu = {
      title: "Casted Haikus",
      id: hash,
      address: event.data.fid,
      timestamp: Date.now().toString(),
      type: "cast",
      contextSummary: "You write haikus and weave them coherently",
      haiku: "",
      explainer: "",
    };
    await hAIku(haikiput, systemPrompt, assistantPrompt, userPrompt);
    return { event, body: `"Message ${response.cast?.text}"` };
  },
);

export const hello3World = inngest.createFunction(
  { id: "hello3-world" },
  { event: "test/hello3.world" },
  async ({ event, step }) => {
    // fetch a single cast
    const hash = event.data.castId;
    const options = {
      method: "GET",
      headers: { accept: "application/json", api_key: process.env.NEYNAR_API_KEY || "" },
    };

    const query = await fetch(`https://api.neynar.com/v2/farcaster/cast?identifier=${hash}&type=hash`, options);
    const response = await query.json();
    if (!response) {
      return { event, body: `"No response from cast ${hash}"` };
    }

    const userPrompt = `"subject: ${response.cast?.text}"`;
    const haikiput: Haikipu = {
      title: "Casted Haikus",
      id: hash,
      address: event.data.fid,
      timestamp: Date.now().toString(),
      type: "cast",
      contextSummary: "You write haikus and weave them coherently",
      haiku: "",
      explainer: "",
    };
    const hk = await hAIku(haikiput, systemPrompt, assistantPrompt, userPrompt);
    //replicate

    const output = await fetch("http://127.0.0.1:8000/generate/description-mode", {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: "Infer a style and create a song about the subject",
        gpt_description_prompt: hk.haiku,
        make_instrumental: false,
        mv: "chirp-v3-0",
      }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response data
        console.log(data);
      })
      .catch(error => {
        // Handle any errors
        console.error("Error:", error);
      });
    console.log(output);
    //=> "https://replicate.delivery/pbxt/HuWYFtJyyH50BxruGu1XfUle...
    return { event, body: `"Message ${output}"` };
  },
);
