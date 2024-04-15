/* eslint-disable react/jsx-key */
import Speaker from "../../../components/assets/speakerLogo";
import { frames } from "../frames";
import { constructCastActionUrl } from "../utils";
import { Button } from "frames.js/next";
import { ObjectId } from "mongodb";
import { inngest } from "~~/app/inngest/client";

export const GET = frames(async ctx => {
  const currentUrl = new URL("https://nerdhouse.ngrok.app");
  currentUrl.pathname = "/frames/echoAction";

  const installActionUrl = constructCastActionUrl({
    actionType: "post",
    icon: "megaphone",
    name: "Echo Maker",
    postUrl: currentUrl.toString(),
  });

  return {
    image: (
      <div
        style={{
          color: "white",
          backgroundColor: "black",
          display: "flex",
          flexDirection: "row",
          fontSize: 60,
          padding: 8,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: 0,
          right: 0,
          top: 0,
          bottom: 0,
          position: "absolute",
        }}
      >
        <div tw="flex flex-col -top-12 left-24">
          Echoes
          <div
            tw="flex flex-col -left-12"
            style={{
              fontSize: 20,
              bottom: 0,
              right: 0,
              left: 50,
              position: "relative",
              backgroundColor: "black",
              color: "white",
            }}
          >
            {" "}
            ...made by the Nerds
            <br />
          </div>
          <span tw="top-6 left-12" style={{ fontSize: 60, color: "#f2af13" }}>
            Echo Action:
          </span>{" "}
          <span tw="w-2/3 text-2xl top-12" style={{ fontSize: 40 }}>
            {" "}
            Use to convert any Post into an Echo. view and mint on your HaiKu garden
          </span>
        </div>
        <Speaker />
      </div>
    ), // foo: bar

    buttons: [
      <Button action="link" target={installActionUrl}>
        Install
      </Button>,
      <Button action="post" target="/">
        Home
      </Button>,
    ],
  };
});

export const POST = frames(async ctx => {
  const id = new ObjectId();
  await inngest.send({
    name: "test/hello3.world",
    data: {
      id: id,
      castId: ctx.message?.castId?.hash,
      fid: ctx.message?.requesterFid,
    },
  });

  return Response.json({
    message: `Echo Submitted!`,
  });
});
