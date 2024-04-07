import { serve } from "inngest/next";
import { inngest } from "../../inngest/client";
import { helloWorld, hello2World } from "../../inngest/functions";

export const { GET, POST, PUT } = serve({
    client: inngest,
    functions: [
        helloWorld,
        hello2World// <-- This is where you'll always add all your functions
    ],
});

