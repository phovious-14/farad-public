"use client"

import type { Metadata } from "next";
import { Buffer } from "buffer";
import { Inter } from "next/font/google";
import "./globals.css";
import { DynamicContextProvider, DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

import { createConfig, WagmiProvider, useAccount } from "wagmi";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { base, scrollSepolia } from "viem/chains";
import {DYNAMIC_ENV_ID} from "../../constants"
import Campaignersidebar from "@/components/sidebar/Campaignersidebar";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

const config = createConfig({
  chains: [base, scrollSepolia],
  multiInjectedProviderDiscovery: false,
  transports: {
    [base.id]: http(),
    [scrollSepolia.id]: http()
  },
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={"bg-gradient-to-r from-black to-[#7D0088] w-screen h-screen"}>

        <DynamicContextProvider
          settings={{
            environmentId: DYNAMIC_ENV_ID,
            walletConnectors: [EthereumWalletConnectors],
          }}>
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <Campaignersidebar />
                {children}
            </QueryClientProvider>
          </WagmiProvider>
        </DynamicContextProvider>

      </body>

    </html>
  );
}