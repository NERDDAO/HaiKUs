/* eslint-disable react/jsx-key */
import Bonfire from "../../../components/assets/bonfireLogo";
import { frames } from "../frames";
import { Button } from "frames.js/next";

const frameHandler = frames(async ctx => {
  const haiku = await fetch(`https://fworks.vercel.app/api/mongo/haiku?id=${ctx.searchParams.id}`);
  const hk = await haiku.json();
  const hkLength = hk.length;
  let currentState = ctx.state;
  if (!currentState.count) currentState.count = 0;
  const hkIndex = () => {
    if (Number(currentState.count) >= hkLength - 1) {
      return 0;
    }
    return currentState.count + 1;
  };
  console.log(ctx.state);
  const index: number = hkIndex();
  const latestHaiku = hk[hkLength - index];
  const state = ctx.state;
  const newState = { ...state, id: latestHaiku?.id, count: index };
  console.log(hk.length, latestHaiku);

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
        {latestHaiku?.haikipu ? (
          <div tw="flex flex-col -top-24">
            HaiKus
            <div
              tw="flex flex-col"
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
              <br />
            </div>
            <span style={{ fontSize: 40 }} tw="flex flex-col w-2/3 top-12 left-52 p-6">
              {latestHaiku?.haikipu.haiku}
            </span>
            <span style={{ fontSize: 20 }}>
              {index} of {hk.length}
            </span>
          </div>
        ) : (
          <div>loading</div>
        )}
        <Bonfire />
      </div>
    ), // foo: bar
    buttons: [
      <Button action="tx" target="/txdata" post_url="/tx-success">
        Mint HaiKU!
      </Button>,
      <Button action="post" target={{ pathname: "/display", query: { id: ctx.searchParams.id, count: index } }}>
        Next
      </Button>,
      <Button action="post" target={{ pathname: "/display", query: { id: ctx.searchParams.id, count: index - 2 } }}>
        Prev
      </Button>,
      <Button action="post" target="/">
        Home
      </Button>,
    ],
    state: newState,
  };
});

export const GET = frameHandler;
export const POST = frameHandler;
