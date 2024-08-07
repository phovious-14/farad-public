"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function TotalCampaigns() {
    return (
        <button className="w-[40%] h-[10rem] rounded-lg flex justify-center items-center flex-col bg-[#0055ff1d] font-mono mt-4 p-2 mr-2">
            <span className="text-[#0055ffae] text-[1.3rem] text-center">Total Campaigns</span>
            <span className="mt-4 text-3xl text-[#0055ff]"><NumberTicker className="text-[#0055ff]" value={100} /></span>
        </button>
    )
}