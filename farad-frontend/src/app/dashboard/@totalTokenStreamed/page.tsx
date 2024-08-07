import NumberTicker from "@/components/magicui/number-ticker";

export default function TotalTokenStreamed() {
    return (
        <button className="w-[30%] h-[8rem] flex justify-center items-center flex-col bg-[#d0ff0050] font-mono mt-4 p-2 rounded-lg">
            <span className="text-[#d0ff00a3] text-[1rem] text-center">Total ETHx streamed</span>
            <span className="my-2 text-2xl text-white"><NumberTicker className="text-[#d0ff00]" value={1204} /></span>
        </button>
    )
}