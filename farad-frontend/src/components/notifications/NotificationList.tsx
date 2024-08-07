"use client"

export default function NotificationList() {
    return (
        <div className="w-[80vw] mt-4">
            <p className="my-2 text-lg text-white ml-2"></p>
            <div className="w-full h-[95vh] border-2 glass font-mono overflow-y-scroll flex justify-start items-center flex-col">
                <div className="flex justify-center items-center flex-row sticky top-0 bg-[#1b1b1b] p-2 w-full">          
                    <input type="text" placeholder="Search @super.eth, wallet address" className=" h-10 p-2 glass font-mono w-[40rem] outline-none" />
                    <button className="glass p-2 ml-2 h-10"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg></button>
                </div>
                <div className="w-full flex justify-start items-center flex-row bg-[#1b1b1b] text-slate-300 sticky top-12">
                    <span className="w-[5%] p-4">Id</span>
                    <span className="w-[25%] p-4">Campaign / Influencer</span>
                    <span className="w-[25%] p-4">Requested by</span>
                    <span className="w-[10%] p-4 text-center">ETHx</span>
                    <span className="w-[10%] p-4">Type</span>
                    <span className="w-[15%] p-4">At</span>
                    <span className="w-[10%] p-4">Accept?</span>
                </div>
                <div className="w-full flex justify-start items-center border-b-2 border-slate-400 flex-row text-white ">
                    <span className="w-[5%] p-4">1</span>
                    <span className="w-[25%] p-4">Web3 conference 🔥</span>
                    <span className="w-[25%] p-4">abc.eth</span>
                    <span className="w-[10%] p-4 text-center">0.5</span>
                    <span className="w-[10%] p-4">Campaign</span>
                    <span className="w-[15%] p-4">2 min ago</span>
                    <span className="w-[10%] p-4"><button className="bg-green-600 text-white p-2 rounded-md text-sm px-4 hover:border-green-800 hover:bg-green-400">Accept</button></span>
                </div>
                <div className="w-full flex justify-start items-center border-b-2 border-slate-400 flex-row text-white ">
                    <span className="w-[5%] p-4">1</span>
                    <span className="w-[25%] p-4">krishn14.eth</span>
                    <span className="w-[25%] p-4">Web3 conference 🔥</span>
                    <span className="w-[10%] p-4 text-center">0.5</span>
                    <span className="w-[10%] p-4">Influence</span>
                    <span className="w-[15%] p-4">15 hour ago</span>
                    <span className="w-[10%] p-4"><button className="bg-blue-600 text-white p-2 rounded-md text-sm px-4 hover:border-blue-800 hover:bg-blue-400">Accept</button></span>
                </div>
                <div className="w-full flex justify-start items-center border-b-2 border-slate-400 flex-row text-white ">
                    <span className="w-[5%] p-4">1</span>
                    <span className="w-[25%] p-4">Hacker house goa 🔥</span>
                    <span className="w-[25%] p-4">xyz.eth</span>
                    <span className="w-[10%] p-4 text-center">0.5</span>
                    <span className="w-[10%] p-4">Campaign</span>
                    <span className="w-[15%] p-4">2 min ago</span>
                    <span className="w-[10%] p-4"><button className="bg-green-600 text-white p-2 rounded-md text-sm px-4 hover:border-green-800 hover:bg-green-400">Accept</button></span>
                </div>
                <div className="w-full flex justify-start items-center border-b-2 border-slate-400 flex-row text-white ">
                    <span className="w-[5%] p-4">1</span>
                    <span className="w-[25%] p-4">krishn14.eth</span>
                    <span className="w-[25%] p-4">Web3 conference 🔥</span>
                    <span className="w-[10%] p-4 text-center">0.5</span>
                    <span className="w-[10%] p-4">Influence</span>
                    <span className="w-[15%] p-4">15 hour ago</span>
                    <span className="w-[10%] p-4"><button className="bg-blue-600 text-white p-2 rounded-md text-sm px-4 hover:border-blue-800 hover:bg-blue-400">Accept</button></span>
                </div>
            </div>
        </div>
    )
}