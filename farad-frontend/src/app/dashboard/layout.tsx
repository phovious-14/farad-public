export const metadata = {
    title: "dashboard",
    description: "dashboard"
}

export default function RootLayout({
    children,
    recentCampaigns,
    recentContracts,
    ongoingCampaigns,
    totalTokenStreamed,
    suggestedInfluencers
}: {
    children: React.ReactNode,
    recentCampaigns: React.ReactNode,
    ongoingCampaigns: React.ReactNode,
    recentContracts: React.ReactNode,
    totalTokenStreamed: React.ReactNode,
    suggestedInfluencers: React.ReactNode,
}) {
    return (
        <div className="w-screen h-screen overflow-hidden bg-gradient-to-l font-mono from-black to-[#3a003f]">

            <div className="mt-4 w-screen h-screen">
                <div className="flex justify-start items-center flex-row w-screen">
                    <span className="text-white uppercase text-2xl ml-32">Dashboard</span>
                    <div className=" ml-24 flex justify-start items-center flex-row">
                        <input type="text" placeholder="Search @super.eth, wallet address" className=" h-10 p-2 glass font-mono w-[40rem] outline-none" />
                        <button className="glass p-2 ml-2 h-10"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314" /></svg></button>
                    </div>
                </div>

                <div className="w-screen flex justify-around items-start flex-row">

                    <div className="w-[60%] ml-[90px] mt-8 flex justify-start items-center flex-col">
                        {ongoingCampaigns}
                    </div>


                    <div className="flex justify-start items-center flex-col w-[30%] -mt-12">
                        {children}
                        <div className="flex justify-between items-center flex-row w-full">            
                            {recentCampaigns}
                            {recentContracts}
                            {totalTokenStreamed}
                        </div>
                        {suggestedInfluencers}
                    </div>
                </div>

            </div>
        </div>
    )
}