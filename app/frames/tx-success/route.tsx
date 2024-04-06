/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async (ctx) => {
    if (ctx.message?.transactionId) {
        return {
            image: (
                <div tw="flex">
                    Transaction submitted! {ctx.message.transactionId}
                </div>
            ),
            buttons: [
                <Button
                    action="link"
                    target={`https://www.onceupon.gg/tx/${ctx.message.transactionId}`}
                >
                    View on block explorer
                </Button>,
            ],
        };
    }
}); 
