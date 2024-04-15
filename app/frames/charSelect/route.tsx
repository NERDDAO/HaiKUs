/* eslint-disable react/jsx-key */
import Bonfire from "../../../components/assets/bonfireLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";

const frameHandler = frames(async ctx => {
  // check NFT balance
  // display list of NFTs
  // if no balance prompt mint
  // else move playerId to game state
  return {
    image: (
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "row",
          fontSize: 60,
          padding: 16,
          alignItems: "center",
          justifyContent: "center",
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
        }}
      >
        <div tw="flex flex-col">
          Tribe
          <span
            style={{
              fontSize: 20,
              bottom: 0,
              right: 0,
              position: "relative",
              backgroundColor: "black",
              color: "white",
            }}
          >
            {" "}
            by the Nerds
          </span>
          <span style={{ fontSize: 30 }}> fid@{ctx.message?.requesterFid}</span>
        </div>
        <Bonfire />
      </div>
    ),

    buttons: [
      // With query params

      <Button action="tx" target="/txdata" post_url="/tx-success">
        New Journey
      </Button>,
      <Button action="post" target="/route">
        Continue
      </Button>,
    ],
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
