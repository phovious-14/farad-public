"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function SuccessRate() {
    return (
        <button className="w-[40%] h-[10rem] flex justify-center items-center flex-col bg-[#00ff1a1d] font-mono mt-4 p-2">
            <span className="text-[#00ff1a76] text-[1.3rem] text-center">Success Rate </span>
            <span className="mt-4 text-3xl text-[#00ff1a]"><NumberTicker className="text-[#00ff1a]" value={97} />&nbsp;%</span>
        </button>
    )
}