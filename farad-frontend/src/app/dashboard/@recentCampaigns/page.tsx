"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function RecentCampaigns() {
    return (
        <button className="w-[30%] h-[8rem] flex justify-center items-center flex-col bg-[#ff232337] font-mono mt-4 p-2 rounded-lg">
            <span className="text-[#ff2323b5] text-[1rem] text-center">Recent Campaigns</span>
            <span className="my-2 text-2xl text-white"><NumberTicker className="text-[#ff2323]" value={100} /></span>
        </button>
    )
}