/* eslint-disable react/jsx-key */
import { Button } from "frames.js/next";
import { frames, Haikipu } from "../frames";
import { inngest } from "~~/app/inngest/client"
import { ObjectId } from "mongodb";
import Bonfire from "../../../components/assets/bonfireLogo"
export const POST = frames(async (ctx) => {
    const id = new ObjectId()
    await inngest.send({
        name: "test/hello.world",
        data: {
            id: id,
            prompt: ctx.message?.inputText,
            fid: ctx.message?.requesterFid
        },
    });

    return {
        image: (



            <div style={{
                color: 'white',
                backgroundColor: "black",
                display: 'flex',
                flexDirection: "row",
                fontSize: 60,
                padding: 16,
                alignItems: "center",
                justifyContent: "center",
                left: 0, right: 0, top: 0, bottom: 0, position: "absolute"
            }}>
                <div tw="flex flex-col">

                    Tribe
                    <span style={{ fontSize: 20, bottom: 0, right: 0, position: "relative", backgroundColor: "black", color: "white" }}> made by the Nerds</span>
                    <span style={{ fontSize: 30 }}> fid@{ctx.message?.requesterFid} generating...</span>
                    <span>{ctx.message?.inputText}</span>
                </div>
                <Bonfire />

            </div>


        ),
        buttons: [
            <Button action="post" target={{ pathname: "/display", query: { id: id.toString() } }} >View</Button>,
        ],
    }
});
