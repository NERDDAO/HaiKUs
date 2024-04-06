import "@rainbow-me/rainbowkit/styles.css";
import { Metadata } from "next";
import { ScaffoldEthAppWithProviders } from "~~/components/ScaffoldEthAppWithProviders";
import { ThemeProvider } from "~~/components/ThemeProvider";
import "~~/styles/globals.css";

import { fetchMetadata } from "frames.js/next";

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : `http://localhost:${process.env.PORT || 3000}`;
const imageUrl = `${baseUrl}/thumbnail.jpg`;


export async function generateMetadata() {
    return {
        title: "My Page",
        // provide a full URL to your /frames endpoint
        other: await fetchMetadata(
            new URL(
                "/frames",
                process.env.VERCEL_URL
                    ? `https://{process.env.VERCEL_URL}`
                    : "http://localhost:3000"
            )
        ),
    };
}


const ScaffoldEthApp = ({ children }: { children: React.ReactNode }) => {
    return (
        <html suppressHydrationWarning>
            <body>
                <ThemeProvider enableSystem>
                    <ScaffoldEthAppWithProviders>{children}</ScaffoldEthAppWithProviders>
                </ThemeProvider>
            </body>
        </html>
    );
};

export default ScaffoldEthApp;
