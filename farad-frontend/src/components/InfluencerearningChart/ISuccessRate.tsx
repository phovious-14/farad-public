"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function ISuccessRate() {
    return (
        <div className="w-[30%] h-[8rem] flex justify-center items-center flex-col bg-[#00ffd028] font-mono mt-4 p-2 rounded-lg">
            <span className="text-[#00ffd081] text-[1.2rem] text-center">Success Rate</span>
            <span className="my-2 text-xl text-[#00ffd0]"><NumberTicker className="text-[#00ffd0]" value={87} /> %</span>
        </div>
    )
}