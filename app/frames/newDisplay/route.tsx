/* eslint-disable react/jsx-key */
import { frames } from "../frames";
import { Button } from "frames.js/next";

const frameHandler = frames(async (ctx) => {
    const haiku = await fetch(`http://fworks.vercel.app/api/mongo/haiku?id=${ctx.searchParams.id}&type=hash`)
    const hk = await haiku.json()
    const hkLength = hk.length
    let currentState = ctx.state
    if (currentState.count!) currentState.count = 0
    const hkIndex = () => {
        if (currentState.count === hkLength - 1) {
            return 0
        }
        return currentState.count + 1
    }

    const index: number = hkIndex()
    const latestHaiku = hk[hkLength - (1 + index)]
    const state = ctx.state
    const newState = { ...state, id: latestHaiku?.id, count: index };
    console.log(hk.length);

    return {
        image:



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
                {latestHaiku?.haikipu ?
                    <div tw="flex flex-col -top-24">

                        HaiKus

                        <div tw="flex flex-col" style={{ fontSize: 20, bottom: 0, right: 0, position: "relative", backgroundColor: "black", color: "white" }}> made by the Nerds
                            <br />
                        </div>

                        <span style={{ fontSize: 40 }} tw="flex flex-col w-2/3 top-12 left-52 p-6">{latestHaiku?.haikipu.haiku}

                        </span>
                        <span style={{ fontSize: 20 }}>{index + 1} of {hk.length}</span>


                    </div> : <div>loading</div>}
                <svg style={{ left: 0, height: "250px", width: "250px" }} xmlns="http://www.w3.org/2000/svg" version="1.1" id="Layer_1" viewBox="0 0 512 512">
                    <path style={{ fill: "#FF1A26" }} d="M267.13,239.304h-94.609c-39.893,0-72.348-29.959-72.348-66.783v-38.957h33.391v38.957  c0,18.412,17.476,33.391,38.957,33.391h94.609V239.304z" />
                    <polygon style={{ fill: "#FF832F" }} points="467.478,422.957 456.348,512 256,512 233.739,422.957 " />
                    <polygon style={{ fill: "#FFB833" }} points="256,422.957 256,512 55.652,512 44.522,422.957 " />
                    <path style={{ fill: "#C0141C" }} d="M100.174,422.957v-44.522c0-49.099,39.945-89.043,89.043-89.043h44.522  c12.067,0,22.261-10.194,22.261-22.261V144.696h66.783V267.13c0,49.099-39.945,89.043-89.043,89.043h-44.522  c-12.066,0-22.261,10.194-22.261,22.261v44.522" />
                    <rect x="378.435" y="378.435" style={{ fill: "#37AD36" }} width="33.391" height="44.522" />
                    <rect x="311.652" y="378.435" style={{ fill: "#9BB335" }} width="33.391" height="44.522" />
                    <path style={{ fill: "#C0141C" }} d="M339.478,306.087h-41.774v-33.391h41.774c21.481,0,38.957-14.979,38.957-33.391v-33.391h33.391  v33.391C411.826,276.128,379.371,306.087,339.478,306.087z" />
                    <path style={{ fill: "#37AD36" }} d="M467.478,122.435v33.391H256l-22.261-77.913L256,0c18.154,0,36.307,0,50.087,0  c27.548,0,50.087,25.043,50.087,55.652v11.13c14.002,0,50.777,0,61.217,0C444.939,66.783,467.478,91.826,467.478,122.435z" />
                    <path style={{ fill: "#9BB335" }} d="M256,0v155.826H44.522v-33.391c0-30.609,22.539-55.652,50.087-55.652c10.44,0,47.215,0,61.217,0  v-11.13C155.826,25.043,178.365,0,205.913,0C219.693,0,237.846,0,256,0z" />
                    <polygon style={{ fill: "#FFB833" }} points="512,406.261 512,439.652 256,439.652 244.87,422.957 256,406.261 " />
                    <rect y="406.261" style={{ fill: "#FFD485" }} width="256" height="33.391" />
                </svg>

            </div>, // foo: bar
        buttons: [
            <Button action="post" target={{ pathname: "/newDisplay", query: { id: ctx.searchParams.id } }}>
                Refresh
            </Button>,
            <Button action="tx" target="/txdata" post_url="/tx-success">
                Mint HaiKU!
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
