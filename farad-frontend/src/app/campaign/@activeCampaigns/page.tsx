"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function ActiveCampaigns() {
    return (
        <button className="w-[40%] h-[10rem] flex justify-center items-center flex-col bg-[#ffae001d] font-mono mt-4 p-2 rounded-lg">
            <span className="text-[#ff8400ae] text-[1.3rem] text-center">Active Campaigns </span>
            <span className="mt-4 text-3xl "><NumberTicker className="text-[#ff9d00]" value={34} /></span>
        </button>
    )
}