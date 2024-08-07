"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function TotalSpent() {
    return (
        <button className="w-[40%] h-[10rem] flex justify-center items-center flex-col bg-[#00b7ff1d] font-mono mt-4 p-2 mr-2 rounded-lg">
            <span className="text-[#00b7ff87] text-[1.3rem] text-center">Total Ad Spent </span>
            <span className="mt-4 text-3xl text-[#00b7ff]"><NumberTicker className="text-[#00b7ff]" value={22} /> ETHx</span>
        </button>
    )
}