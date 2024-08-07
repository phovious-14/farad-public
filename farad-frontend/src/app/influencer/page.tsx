"use client"
import Balance from "@/components/balanceOf/BalanceOf";
import ConnectWarpcast from "@/components/connectWarpcast/ConnectWarpcast";
import TotalFollowers from "@/components/followers/Followers";
import InfluencerCampaignList from "@/components/InfluencerCampaignList/InfluencerCampaignList";
import InfluencerEarningChart from "@/components/InfluencerearningChart/InfluencerEarningChart";
import ISuccessRate from "@/components/InfluencerearningChart/ISuccessRate";
import NumberTicker from "@/components/magicui/number-ticker";
import TopCasts from "@/components/topCasts/TopCasts";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";

export default function Influencer() {

    const { user }: any = useDynamicContext()

    if (user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthAccountPhotos) {
        return (
            <div className="w-screen h-screen overflow-hidden bg-gradient-to-l from-black to-[#3a003f]">
                <div className="w-screen h-screen ml-32 mt-2">
                    <div className="w-[55%] bg-[#1b1b1b50] rounded-lg p-2 flex justify-between items-start flex-row">
                        <div className="flex justify-start items-center p-2 flex-row">
                            <Image src={user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthAccountPhotos[0]} alt="" width={70} height={70} className="rounded-lg" />
                            <div className="flex justify-center items-start flex-col ml-2">
                                <span className="text-lg flex justify-center flex-rol items-center">
                                    <div className="text-violet-400">@{user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthMetadata?.username}</div>
                                    <div className="flex justify-center items-start p-2 flex-col mr-4">
                                        {user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthMetadata?.active_status == "active"
                                            ? <div className="flex justify-center items-center flex-row text-slate-400"><div className="relative bg-green-700 mr-2 mt-1 p-1 rounded-full h-2 w-2"></div> Active</div>
                                            : <div className="flex justify-center items-center flex-row text-sm text-red-700"><div className="relative bg-red-700 mr-2 mt-1 p-1 rounded-full h-2 w-2"></div> Inactive</div>
                                        }
                                    </div>
                                </span>
                                <span className="text-slate-400 text-sm">{user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthMetadata?.profile?.bio?.text}</span>
                            </div>
                        </div>
                        <div className="flex justify-start items-end flex-col mt-4">
                            <div className="text-slate-400 text-sm">FID : {user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthMetadata?.fid}</div>
                            <div className="text-slate-400 text-sm">Custody Address : {user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthMetadata?.custody_address}</div>
                        </div>
                    </div>

                    <div className="w-[90%] h-screen flex justify-between items-start flex-row">

                        <div className="w-[63%] h-screen">
                            <InfluencerCampaignList />
                        </div>

                        <div className=" w-[35%] flex justify-between items-center flex-wrap -mt-24">
                            <TotalFollowers followers={user?.verifiedCredentials[user?.verifiedCredentials.length-1]?.oauthMetadata?.follower_count} />
                            <Balance />
                            {/* <ISuccessRate /> */}
                            <div>
                                <p className="my-2 mt-4 text-lg text-slate-400 ml-2 font-mono">Earning Chart (ETHx / Month)</p>
                                <div className="bg-[#b5a2ff5e] mt-2 rounded-lg text-white">
                                    <InfluencerEarningChart />
                                </div>
                            </div>
                            <div className="w-[100%] flex justify-between items-center mt-2">
                                {/* <TopCasts /> */}
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        )
    } else {
        return (
            <div className="w-screen h-screen overflow-hidden flex justify-center items-center bg-gradient-to-l from-black to-[#3a003f]">
                <ConnectWarpcast />
            </div>
        )
    }
}