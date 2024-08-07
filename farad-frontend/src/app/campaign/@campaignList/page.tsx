"use client"

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { formatDateToDDMMYYYYHM } from "@/components/formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";

export default function MyCampaignList() {
    const [data, setData] = useState<any>([])
    const { user }: any = useDynamicContext()
    const route = useRouter()
  
    const handleData = async (walletAddress: string) => {
      axios.get(`http://localhost:4000/api/get_campaigns/${walletAddress}`)
        .then(res => {
          console.log(res.data);  
          setData(res.data)
        })
    }

    const handleRoute = (id:any) => {
        route.push(`/campaign/connected-campaign/${id}`)
    }

    useEffect(() => {
        handleData(user?.verifiedCredentials[0]?.address)
    }, [])

    return (
        <div className="w-full mt-4">
            <p className="my-2 text-lg text-white ml-2"></p>
            <div className="w-full h-[40vh] non-scroll font-mono overflow-y-scroll flex justify-start items-center flex-col">
                <div className="flex justify-center items-center flex-row sticky top-0 bg-[#1b1b1b] p-2 w-full rounded-t-lg">          
                    <input type="text" placeholder="Search @super.eth, wallet address" className=" h-10 p-2 glass font-mono w-[40rem] outline-none" />
                    <button className="glass p-2 ml-2 h-10"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m21 21l-4.343-4.343m0 0A8 8 0 1 0 5.343 5.343a8 8 0 0 0 11.314 11.314"/></svg></button>
                </div>
                <div className="w-full flex justify-start items-center flex-row bg-[#1b1b1b] text-slate-300 sticky top-12 rounded-b-lg">
                    <span className="w-[5%] p-4">Id</span>
                    <span className="w-[35%] p-4">Campaign</span>
                    <span className="w-[25%] p-4">Created At</span>
                    <span className="w-[10%] p-4">ETHx</span>
                    <span className="w-[10%] p-4">Status</span>
                    <span className="w-[15%] p-4">Edit</span>
                </div>
                {
                    data?.map((item: any, index: number) => (
                        <div key={index} className="w-full flex justify-start items-center glass my-1flex-row text-white mt-2 p-1">
                            <span className="w-[5%] p-2">{index+1}</span>
                            <button onClick={() => handleRoute(item?._id)} className="w-[35%] p-2 hover:underline">{item?.title}</button>
                            <span className="w-[25%] p-2">{formatDateToDDMMYYYYHM(item?.created_at)}</span>
                            <span className="w-[10%] p-2">{item?.budget_allowance}</span>
                            {item?.haveClient ? <div className="w-[10%] text-xs bg-green-300 text-green-600 p-1 rounded-lg px-2 text-center">Active</div> : <div className="w-[10%] text-xs bg-red-300 text-red-600 p-1 rounded-lg px-2 text-center">Inactive</div>}
                            {item?.active ? <div className="w-[15%] text-sm p-1 rounded-lg text-center "><button className="bg-purple-600 text-white hover:bg-purple-400 p-2 py-1 w-20 rounded-md ">stop</button></div> : <div className="w-[15%] text-sm p-1 rounded-lg text-center "><button className="bg-purple-600 text-white hover:bg-purple-400 p-2 py-1 w-20 rounded-md ">start</button></div>}
                        </div>
                    ))
                }
           </div>
        </div>
    )
}