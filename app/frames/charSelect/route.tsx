/* eslint-disable react/jsx-key */
import { Haikipu, frames } from "../frames";
import { Button } from "frames.js/next";
import Bonfire from "../../../components/assets/bonfireLogo"

const frameHandler = frames(async ({ ctx }) => {
    return {
        image: <div style={{
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
                <span style={{ fontSize: 20, bottom: 0, right: 0, position: "relative", backgroundColor: "black", color: "white" }}> by the Nerds</span>
            </div>
            <Bonfire />

        </div>

        ,
        buttons: [
            // With query params
            <Button
                action="post"
                target="/route"
            >
                Submit
            </Button>

        ],
    };
});

export const GET = frameHandler;
export const POST = frameHandler;
