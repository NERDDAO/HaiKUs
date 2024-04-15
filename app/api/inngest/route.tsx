import { inngest } from "../../inngest/client";
import { hello2World, hello3World, helloWorld } from "../../inngest/functions";
import { serve } from "inngest/next";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    helloWorld,
    hello2World,
    hello3World, // <-- This is where you'll always add all your functions
  ],
});
