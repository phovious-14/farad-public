"use client"
import TotalFollowers from "@/components/followers/Followers";
import InfluencerEarningChart from "@/components/InfluencerearningChart/InfluencerEarningChart";
import ISuccessRate from "@/components/InfluencerearningChart/ISuccessRate";
import NumberTicker from "@/components/magicui/number-ticker";
import MyCampaignList from "@/components/myCampaignsList/MyCampaignList";
import Campaignersidebar from "@/components/sidebar/Campaignersidebar";
import SuccessRate from "@/components/successRate/SuccessRate";
import TopCasts from "@/components/topCasts/TopCasts";
import { useDynamicContext, useSocialAccounts } from "@dynamic-labs/sdk-react-core"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DYNAMIC_API_TOKEN } from "../../../../constants";

export default function Influencer({ params }: any) {

    const [user, setUser] = useState([])
    const { influencerId } = params
    // const getUserById = async () => {
    //   const options = {
    //     method: 'GET',
    //     headers: {
    //       Authorization: `Bearer ${DYNAMIC_API_TOKEN}`
    //     }
    //   };
      
    //   fetch('https://app.dynamic.xyz/api/v0/users/7346b39d-c3e1-4912-9d8c-ec279840f54a', options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .catch(err => console.error(err));
    // }

    // useEffect(() => {
    //     getUserById()
    // }, [])

        return (
            <div className="w-screen h-screen overflow-hidden bg-gradient-to-l from-black to-[#3a003f]">
                <Campaignersidebar />
                <div className="w-screen h-screen ml-32 mt-2">
                    <div className="w-[55%] bg-[#1b1b1b50] rounded-lg p-2 flex justify-between items-start flex-row">                                
                        <div className="flex justify-start items-center p-2 flex-row">
                            {/* <Image src={user?.verifiedCredentials[user?.verifiedCredentials.length -1]?.oauthAccountPhotos[0]} alt="" width={70} height={70} className="rounded-lg" /> */}
                            <div className="flex justify-center items-start flex-col ml-2">
                                <span className="text-lg flex justify-center flex-rol items-center">
                                    <div className="text-violet-400">@krishn</div> 
                                    <div className="flex justify-center items-start p-2 flex-col mr-4">
                                      <div className="flex justify-center items-center flex-row text-sm text-red-700"><div className="relative bg-red-700 mr-2 mt-1 p-1 rounded-full h-2 w-2"></div> Inactive</div>
                                      
                                    </div>
                                </span>
                                <span className="text-slate-400 text-sm">A Crypto enthusiastic.</span>
                            </div>
                        </div>
                        <div className="flex justify-start items-end flex-col mt-4">
                            <div className="text-slate-400 text-sm">FID : 123098</div>
                            <div className="text-slate-400 text-sm">ETH Address : </div>
                        </div>
                    </div>

                    <div className="w-[90%] flex justify-center items-ceter flex-row">
                        <div className="w-[50%] flex justify-between items-center flex-wrap">
                            <TotalFollowers followers={22} />       
                            <button className="w-[30%] h-[8rem] flex justify-center items-center flex-col bg-[#00ff1a1d] font-mono mt-4 p-2 rounded-lg">
                                <div className="text-[#00ff1a76] text-[1.2rem] text-center flex justify-center items-center"><span className="mr-2">Earning</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#00ff1a76" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3.5v11a2 2 0 0 0 2 2h11"/><path d="m6.5 12.5l3-3l2 2l5-5"/><path d="M16.5 9.5v-3h-3"/></g></svg></div>
                                <span className="mt-4 text-2xl text-[#00ff1a]"><NumberTicker className="text-[#00ff1a]" value={22} />&nbsp;ETHx</span>
                            </button>
                            <ISuccessRate />    
                            <button className="w-[30%] h-[8rem] flex justify-center items-center flex-col bg-[#ffffff1d] font-mono mt-4 p-2 rounded-lg">
                                <div className="text-[#ffffff83] text-[1.2rem] text-center flex justify-center items-center"><span className="mr-2">Connected Campaigns</span></div>
                                <span className="mt-4 text-2xl text-[#ffffff]"><NumberTicker className="text-[#ffffff]" value={64} /></span>
                            </button>
                        </div>
                        <div className="w-[50%] flex justify-center items-center flex-col">
                            <div>
                                <p className="my-2 mt-4 text-lg text-slate-400 ml-2 font-mono">Earning Chart (ETHx / Month)</p>
                                <div className="bg-[#b5a2ff5e] mt-2 rounded-lg text-white">
                                    <InfluencerEarningChart />
                                </div>
                            </div>
                            <div className="w-[72%] flex justify-between items-center ">
                                {/* <TopCasts /> */}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        )
}