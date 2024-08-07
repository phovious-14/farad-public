"use client"

import Link from "next/link"
import { useRouter } from "next/navigation";
import axios from "axios";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useState } from "react";
import { formatDateToDDMMYYYYHM } from "../formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";


export default function RequestesByInfluencerList({campaignData}:any) {
    const route = useRouter()
    const [open2, setOpen2] = useState(false);

    const handleRoute = (influencerId: any) => {
        route.push(`/visit-influencer/${influencerId}`)
    }

    const handleAccept = async (campaignId: String, requestId: String) => {

        try {
            const response = await fetch(`http://localhost:4000/api/update-campaign/${campaignId}/${requestId}`);
            const result = await response.json();
            setOpen2(true)
            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen2(false);
    };

    return (
        <>
            <div className="w-full">
                <p className="my-1 text-lg text-slate-400 ml-2 font-mono">Requests</p>
                <div className="w-full h-[85vh] font-mono overflow-y-scroll non-scroll">

                    <div className="w-full flex justify-between items-center flex-row bg-[#1b1b1b] rounded-t-lg text-white sticky top-0 z-10">
                        <span className="w-[5%] p-4">Id</span>
                        <span className="w-[30%] p-4">Influencer</span>
                        <span className="w-[25%] p-4">Applied At</span>
                        <span className="w-[20%] p-4">Accept?</span>
                    </div>
                    {
                        campaignData.requests?.map((item:any, index:number) => (
                            <div key={index} className="w-full flex justify-between items-center glass my-2 border border-slate-500 flex-row text-white ">
                                <span className="w-[5%] p-1 text-center">{index+1}</span>
                                <button onClick={() => handleRoute(item?.influencerId)} className="w-[30%] p-1 hover:underline ml-2 text-sm text-wrap break-words">{item?.walletAddress}</button>
                                <span className="w-[25%] p-1 text-center">{formatDateToDDMMYYYYHM(item?.created_at)}</span>
                                <span className="w-[20%] p-1"><button onClick={() => handleAccept(campaignData._id, item._id)} className="bg-green-500 text-black p-1 rounded-md text-sm px-4 hover:border-green-800 hover:bg-green-300">Accept</button></span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                    Request Accepted
                </Alert>
            </Snackbar>
        </>
    )
}