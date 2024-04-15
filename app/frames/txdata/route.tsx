import { NextRequest, NextResponse } from "next/server";
import { TransactionTargetResponse } from "frames.js";
import { getFrameMessage } from "frames.js";
import { Abi, encodeFunctionData } from "viem";

export async function POST(req: NextRequest): Promise<NextResponse<TransactionTargetResponse>> {
  const json = await req.json();

  const frameMessage = await getFrameMessage(json);
  if (!frameMessage) {
    throw new Error("No frame message");
  }
  console.log(frameMessage);
  const state = JSON.parse(frameMessage.state || "{}");

  const haiku = await fetch(`https://fworks.vercel.app/api/mongo/haiku?id=${state.id}&type=hash`);
  const hk = await haiku.json();
  const hkLength = hk.length;
  const latestHaiku = hk[hkLength - 1];
  console.log(hk, latestHaiku, state.id);

  const abi = [
    {
      inputs: [
        {
          internalType: "string",
          name: "_userText",
          type: "string",
        },
      ],
      name: "mint",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
  ] as const;
  const calldata = encodeFunctionData({
    abi: abi,
    functionName: "mint",
    args: [latestHaiku.haikipu?.haiku],
  });

  const STORAGE_REGISTRY_ADDRESS = "0xd02D7C87E9EB71ABCd544D07230849Fc5EdcbD55";

  return NextResponse.json({
    chainId: "eip155:8453", // OP Mainnet 10
    method: "eth_sendTransaction",
    params: {
      abi: abi as Abi,
      to: STORAGE_REGISTRY_ADDRESS,
      data: calldata,
      value: "70000000000001",
    },
  });
}
