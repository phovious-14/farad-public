"use client"

import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useEffect, useState } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import axios from "axios";
import { useRouter } from "next/navigation";
import { formatDateToDDMMYYYYHM } from "@/components/formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";

export default function OngoingCampaigns() {

  const [onGoingData, setData] = useState<any>([])
  const { user }: any = useDynamicContext()
  const [open, setOpen] = useState(false);
  const route = useRouter()

  const handleData = async () => {
    axios.get('http://localhost:4000/api/get_ongoingcampaigns')
      .then(res => {
        console.log(res.data);

        setData(res.data)
      })
      .catch(err => {
        throw new Error("Server error")
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
          walletAddress: address,
          influencerId: user?.userId
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
  
  const handleRoute = (id: string) => {
    route.push(`/campaign/${id}`)
  }

  useEffect(() => {
    handleData()
  }, [])

  return (
    <div className="w-full">
      <p className="my-1 text-lg text-slate-400 ml-2 font-mono">Ongoing Campaigns</p>
      <div className="w-full h-[80vh] font-mono overflow-y-scroll non-scroll">

        <div className="w-full flex justify-start items-center flex-row bg-[#1b1b1b] rounded-t-lg text-white sticky top-0 z-10">
          <span className="w-[10%] p-4">Id</span>
          <span className="w-[30%] p-4">Campaign</span>
          <span className="w-[20%] p-4 text-center">ETHx</span>
          <span className="w-[20%] p-4">Created At</span>
          <span className="w-[20%] p-4 text-center">Join</span>
        </div>
        <>
          {
            onGoingData?.map((item: any, index: number) => (
              <div key={item?.id} className="w-full flex justify-start items-center glass my-1 border border-slate-500 flex-row text-white">
                <span className="w-[10%] p-1">{index + 1}</span>
                <button onClick={() => handleRoute(item?._id)} className="w-[30%] p-1 hover:underline">{item?.title}</button>
                <span className="w-[20%] p-1 text-center">{item?.budget_allowance}</span>
                <span className="w-[20%] p-1">{formatDateToDDMMYYYYHM(item?.created_at)}</span>
                 <span className="w-[20%] p-1 text-center"><button onClick={() => handleConnect(item?._id, user?.verifiedCredentials[0]?.address)} className="bg-green-500 text-black p-2 rounded-md text-sm px-4 hover:border-green-800 hover:bg-green-300">Connect</button></span>
              </div>
            ))
          }
        </>
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
  )
}