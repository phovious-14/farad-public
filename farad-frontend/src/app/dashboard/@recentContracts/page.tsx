"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function RecentContracts() {
    return (
        <button className="w-[30%] h-[8rem] flex justify-center items-center flex-col bg-[#00eaff50] font-mono mt-4 p-2 rounded-lg">
            <span className="text-[#00eaffb2] text-[1rem] text-center">Recent Joins</span>
            <span className="my-2 text-2xl text-white"><NumberTicker className="text-[#00eaff]" value={100} /></span>
        </button>
    )
}