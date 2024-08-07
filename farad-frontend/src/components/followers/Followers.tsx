"use client"
import NumberTicker from "@/components/magicui/number-ticker";

export default function TotalFollowers({followers}:any) {
    return(
        <button className="w-[30%] h-[8rem] flex justify-center items-center flex-col bg-[#fffb293b] font-mono mt-4 p-2 rounded-lg">
            <span className="text-[#fffb29c2] text-[1.2rem] text-center">Followers</span>
            <span className="my-2 text-2xl text-white"><NumberTicker className="text-[#fffb29]" value={followers} /></span>
        </button>
    )
}