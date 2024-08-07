"use client";

import ChatInflluencer from "@/components/Chat/ChatInflluencer";
import FlowingBalance from "@/components/FlowingBalance/FlowingBalance";
import NumberTicker from "@/components/magicui/number-ticker";
import Campaignersidebar from "@/components/sidebar/Campaignersidebar";
import { julee } from "@/components/sidebar/Sidebar";
import { Drawer } from "antd";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import copy from 'copy-to-clipboard';
import { formatDateToDDMMYYYYHM } from "@/components/formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";

export default function Campaign({ params }: any) {

    const [open, setOpen] = useState(false);
    const [streamData, setStreamData] = useState<any>([])

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const { campaignId, requestId } = params

    const handleData = async () => {
        axios.get(`http://localhost:4000/api/retrive_stream/${campaignId}/${requestId}`)
            .then(res => {
                console.log(res.data);
                setStreamData(res.data)
            })
    }

    useEffect(() => {
        handleData()
    }, [])

    return (
        <div className="w-screen h-screen overflow-hidden bg-gradient-to-r from-black to-[#3a003f]">

            {streamData?.stream != null
                ? <div className="mt-4 w-screen h-screen">
                    <div className="w-full flex justify-between items-center flex-row">
                        <div className={julee.className}>
                            <span className="text-white uppercase text-2xl ml-32">{streamData?.campaign?.title}</span>
                            <span title="budget allowance" className="font-mono text-slate-400 text-2xl">&nbsp; {streamData?.campaign?.budget_allowance} ETHx</span>
                        </div>
                        <div>

                        </div>
                    </div>

                    <div className="w-[90%] flex justify-around items-start flex-row mt-4 ml-[100px] font-mono">
                        <div className="w-[60%] ml-6 flex justify-center items-start flex-col ">
                            <div className="flex justify-between items-center flex-row text-base glass p-2 rounded-lg w-full">
                                <p className="text-slate-200 ml-2">@krishn - {streamData?.stream?.receiver}</p>
                                <button onClick={showDrawer} className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-700 text-sm ml-2">Show Frame</button>
                            </div>
                            {
                                streamData?.stream?.startDate !== undefined
                                    ? <>
                                        <div className="text-slate-500 w-full text-center">(Started At - {formatDateToDDMMYYYYHM(streamData?.stream?.startDate)})</div>
                                        {streamData?.stream?.endDate && <div className="text-slate-500 w-full text-center">(Ended At - {formatDateToDDMMYYYYHM(streamData?.stream?.endDate)})</div>}
                                    <div className="flex items-center flex-row w-full mt-24" style={{ justifyContent: streamData?.stream?.endDate ? "space-around" : "center" }}>
                                            <div className="text-slate-400 flex flex-col justify-start items-center">
                                                <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />
                                                
                                            </div>
                                            {(streamData?.stream?.startDate && !streamData?.stream?.endDate) && <div className="loader"></div>}
                                            <div className="text-slate-400 flex flex-col justify-start items-center">
                                                <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />
                                                
                                            </div>
                                        </div>
                                        <div className="text-white text-sm mt-4 flex justify-center items-center flex-row w-full">
                                            <p className="mr-2">{streamData?.stream?.sender}</p>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path fill="white" d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z" /></svg>
                                            <p className="ml-2">{streamData?.stream?.receiver}</p>
                                        </div>
                                        <div className="text-slate-300 text-3xl font-mono flex justify-center items-center flex-row w-full mt-12">
                                        {(streamData?.stream?.startDate && !streamData?.stream?.endDate) 
                                        ? <>
                                            <FlowingBalance startingBalance={BigInt("000000000000000000")} startingBalanceDate={new Date(streamData?.stream?.startDate)} flowRate={BigInt(streamData?.stream?.flowRate)} />
                                            <p className="ml-2">ETHx</p>
                                        </>
                                        : <div className="glass p-2 w-full flex justify-between items-center flex-row">
                                            <p className="text-slate-400">{streamData?.stream?.trasferredAmount} ETHx</p>
                                            <p className="text-2xl">Received ✅</p>
                                        </div>
                                        
                                    }
                                        </div>
                                        <div className="w-full flex justify-around items-center flex-row mt-12">
                                            <button className="w-[47%] h-[8rem] flex justify-center items-center flex-col bg-[#00ff1a1d] font-mono mt-4 p-2 rounded-lg">
                                                <div className="text-[#00ff1a76] text-[1.2rem] text-center flex justify-center items-center"><span className="mr-2">Impressions</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#00ff1a76" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3.5v11a2 2 0 0 0 2 2h11" /><path d="m6.5 12.5l3-3l2 2l5-5" /><path d="M16.5 9.5v-3h-3" /></g></svg></div>
                                                <span className="mt-4 text-3xl text-[#00ff1a]"><NumberTicker className="text-[#00ff1a]" value={1507} /></span>
                                            </button>
                                            <button className="w-[47%] h-[8rem] flex justify-center items-center flex-col bg-[#ff242416] font-mono mt-4 p-2 rounded-lg">
                                                <div className="text-[#ff00666a] text-[1.2rem] text-center flex justify-center items-center"><span className="mr-2">Likes</span></div>
                                                <span className="mt-4 text-3xl text-[#ff0066]"><NumberTicker className="text-[#ff0066]" value={134} /></span>
                                            </button>
                                        </div>
                                    </>
                                    : <>
                                        <div className="text-slate-500 w-full text-center">(Steam not started by campaigner)</div>
                                        <div className="flex justify-around items-center flex-row w-full mt-24">
                                            <div className="text-slate-400 flex flex-col justify-start items-center">
                                                <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />
                                                <p className="mt-2">@aryan</p>
                                            </div>
                                            <div className="text-slate-400 flex flex-col justify-start items-center">
                                                <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />
                                                <p className="mt-2">@krishn</p>
                                            </div>
                                        </div>
                                        <div className="text-slate-300 text-3xl font-mono flex justify-center items-center flex-row w-full mt-12">
                                            <p className="ml-2">0.000000000000000000 ETHx</p>
                                        </div>
                                        <div className="w-full flex justify-around items-center flex-row mt-12">
                                            <button className="w-[47%] h-[8rem] flex justify-center items-center flex-col bg-[#00ff1a1d] font-mono mt-4 p-2 rounded-lg">
                                                <div className="text-[#00ff1a76] text-[1.2rem] text-center flex justify-center items-center"><span className="mr-2">Impressions</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#00ff1a76" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3.5v11a2 2 0 0 0 2 2h11" /><path d="m6.5 12.5l3-3l2 2l5-5" /><path d="M16.5 9.5v-3h-3" /></g></svg></div>
                                                <span className="mt-4 text-3xl text-[#00ff1a]">0</span>
                                            </button>
                                            <button className="w-[47%] h-[8rem] flex justify-center items-center flex-col bg-[#ff242416] font-mono mt-4 p-2 rounded-lg">
                                                <div className="text-[#ff00666a] text-[1.2rem] text-center flex justify-center items-center"><span className="mr-2">Likes</span></div>
                                                <span className="mt-4 text-3xl text-[#ff0066]">0</span>
                                            </button>
                                        </div>
                                    </>
                            }
                        </div>
                        <div className="w-[40%] ml-6 -mt-[36px]">
                            <ChatInflluencer requestId={requestId} />
                        </div>
                    </div>

                    <>
                        <Drawer title="Copy Frame" style={{ background: "#db66cf", fontFamily: "monospace" }} className="text-xl" onClose={onClose} open={open}>
                            <div className="flex justify-center items-start flex-col">
                                <div className="bg-black p-2 rounded-lg">
                                    <p className="text-slate-500">{streamData?.campaign?.ad_text_message}</p>
                                    <Image src={`https://gateway.pinata.cloud/ipfs/${streamData?.campaign?.image_hash}`} alt="" width={"400"} height={"70"} className="rounded-lg mt-2" />
                                </div>
                                {
                            streamData?.campaign?.frameUrl
                                ? <p className="break-words w-full mt-4">{streamData?.campaign?.frameUrl}</p>
                                :<div className="w-full mt-8 text-base">
                                    <button className="bg-slate-900 text-white hover:bg-slate-700 p-2 w-full mt-2 rounded-lg" onClick={() => copy(`https://farad.vercel.app/api/ad/${streamData?.campaign?.image_hash}`)}>Copy frame</button>
                                </div>}
                            </div>
                        </Drawer>
                    </>
                </div>
                : <div className="mt-4 w-screen h-screen">
                    <div className="w-[62%] flex justify-between items-center">
                        <div>
                            <div className={julee.className}>
                                <span className="text-white uppercase text-2xl ml-32">{streamData?.campaign?.title}</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-[90%] flex justify-center items-center flex-row mt-4 ml-[100px] font-mono">
                        <div className="flex justify-center items-center flex-col text-base glass p-4 rounded-lg">
                            <div className="bg-black p-2 rounded-lg w-[400px]" >
                                <p className="text-slate-500">{streamData?.campaign?.ad_text_message}</p>
                                <Image src={`https://gateway.pinata.cloud/ipfs/${streamData?.campaign?.image_hash}`} alt="" width={"400"} height={"70"} className="rounded-lg mt-2" />
                            </div>

                            <div className="text-slate-300  font-mono flex justify-center items-center flex-row w-full mt-12 mb-6">
                                <p className="ml-2 text-3xl">{streamData?.campaign?.budget_allowance} ETHx</p>
                            </div>

                            <div className="bg-yellow-200 text-yellow-700 rounded-full px-4 p-2 ">Acceptance Pending</div>
                        </div>
                    </div>

                </div>
            }
        </div>
    );
}
