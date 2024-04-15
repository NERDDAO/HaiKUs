/* eslint-disable react/jsx-key */
import { openframes } from "frames.js/middleware";
import { createFrames } from "frames.js/next";
import { getXmtpFrameMessage, isXmtpFrameActionPayload } from "frames.js/xmtp";

export type Haikipu = {
  id: string;
  address: string;
  title: string;
  type: string;
  timestamp: string;
  contextSummary: any;
  haiku: string;
  explainer: string;
};

export type State = {
  id: string;
  count: number;
};

export const frames = createFrames<State>({
  basePath: "/frames",
  initialState: { id: "", count: 0 } as State,
  middleware: [
    openframes({
      clientProtocol: {
        id: "xmtp",
        version: "2024-02-09",
      },
      handler: {
        isValidPayload: (body: JSON) => isXmtpFrameActionPayload(body),
        getFrameMessage: async (body: JSON) => {
          if (!isXmtpFrameActionPayload(body)) {
            return undefined;
          }
          const result = await getXmtpFrameMessage(body);

          return { ...result };
        },
      },
    }),
  ],
});
