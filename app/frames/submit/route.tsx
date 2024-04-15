/* eslint-disable react/jsx-key */
import Bonfire from "../../../components/assets/bonfireLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";

export const POST = frames(async ctx => {
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
          HaiKus
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
            made by the Nerds
          </span>
          <span style={{ fontSize: 30 }}> fid@{ctx.message?.requesterFid}</span>
        </div>
        <Bonfire />
      </div>
    ),
    buttons: [
      <Button action="post" target={{ pathname: "/loading", query: { id: ctx.message?.requesterFid } }}>
        New Journey
      </Button>,

      <Button action="post" target="/display">
        Continue
      </Button>,
    ],
    textInput: "stuff",
  };
});
