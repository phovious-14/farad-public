"use client";

import { julee } from "@/components/sidebar/Sidebar";
import Image from "next/image";
import React, { useEffect, useState } from 'react';
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material";

export default function Campaign({params}:any) {

    const [data, setData] = useState<any>([])
    const { user }:any = useDynamicContext()
    const [open, setOpen] = useState(false);
    const {campaignId} = params

    const handleData = async () => {
      axios.get(`http://localhost:4000/api/get_campaign_by_id/${campaignId}`)
        .then(res => {
          console.log(res.data);
  
          setData(res.data)
        })
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const handleConnect = async (id: number, address: string | undefined) => {
        axios.post('http://localhost:4000/api/send_request',
          {
              _id:id,
              walletAddress: address
          },
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(res => {
              if(res.status == 200) {
                setOpen(true)
              }
          })
      }

    useEffect(() => {
        handleData()
    }, [])

    return (
        <div className="w-screen font-mono h-screen overflow-hidden bg-gradient-to-r from-black to-[#3a003f]">
            <div className="mt-4 w-screen h-screen">
                <div className="w-[62%] flex justify-between items-center">
                    <div>
                        <div className={julee.className}>
                            <span className="text-white uppercase text-2xl ml-32">{data?.title}</span>
                        </div>  
                    </div>
                </div>

                <div className="w-[90%] flex justify-center items-center flex-row mt-4 ml-[100px] font-mono">
                    <div className="flex justify-center items-center flex-col text-base glass p-4 rounded-lg">
                        <div className="bg-black p-2 rounded-lg w-[400px]" >
                            <p className="text-slate-500">{data?.ad_text_message}</p>
                            <Image src={`https://gateway.pinata.cloud/ipfs/${data?.image_hash}`} alt="" width={"400"} height={"70"} className="rounded-lg mt-2" />
                        </div>
                        
                        <div className="text-slate-300 text-6xl font-mono flex justify-center items-center flex-row w-full mt-12 mb-6">
                            <p className="ml-2">{data?.budget_allowance} ETHx</p>
                        </div>
                        <button onClick={() => handleConnect(data?._id, user?.verifiedCredentials[0]?.address)} className="w-full bg-violet-800 text-white p-2 rounded-lg hover:bg-violet-600 mt-6 text-xl">Connect</button>
                    </div>
                </div>

            </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Request sent!
        </Alert>
      </Snackbar>    
              

        </div>
    );
}
