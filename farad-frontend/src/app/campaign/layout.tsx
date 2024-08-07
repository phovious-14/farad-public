"use client"

import ConnectWallet from "@/components/connectWallet/ConnectWallet"
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"

// export const metadata = {
//     title: "My Campaigns",
//     description: "my cmapaigns"
// }

export default function RootLayout({
    children,
    title,
    campaignList,
    totalCampaigns,
    activeCampaigns,
    totalSpent
}: {
    children: React.ReactNode,
    title: React.ReactNode,
    campaignList: React.ReactNode,
    totalCampaigns: React.ReactNode,
    activeCampaigns: React.ReactNode,
    totalSpent: React.ReactNode
}) {

    const { user } = useDynamicContext()

    if(!user) return (
        <ConnectWallet />
    )

    return (
        <div className="w-screen h-screen overflow-hidden bg-gradient-to-l from-black to-[#3a003f]">

            <div className="mt-4 w-screen h-screen">

                {title}

                <div className="w-full flex justify-around items-start flex-row mt-4 ml-[100px]">
                    <div className="w-[60%] ml-6">
                        {campaignList}
                    </div>
                    <div className="w-[30%] flex justify-start items-center flex-row flex-wrap">
                        <button className="w-[80%] h-[8rem] flex justify-center items-center flex-col bg-[#ddff0032] font-mono p-2 rounded-lg">
                            <span className="text-[#fffb29a9] text-[1rem] text-center">Current Balance)</span>
                            <span className="my-2 text-3xl text-[#fffb29]">14 <span className="text-[#fffb29] text-lg">ETHx</span></span>
                        </button>
                        {totalCampaigns}
                        {activeCampaigns}
                        {totalSpent}
                        {children}
                    </div>
                </div>
            </div>

        </div>
    
    )
}