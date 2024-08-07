"use client";
import { Framework } from "@superfluid-finance/sdk-core";
import { ethers } from "ethers";
import FlowingBalance from "@/components/FlowingBalance/FlowingBalance";
import NumberTicker from "@/components/magicui/number-ticker";
import RequestesByInfluencerList from "@/components/RequestesByInfluencerList/RequestesByInfluencerList";
import { julee } from "@/components/sidebar/Sidebar";
import Image from "next/image";
import { useEffect, useState } from 'react';
import { Drawer } from 'antd';
import axios from "axios";
import Chat from "@/components/Chat/ChatCampaigner";
import { ACC2_PRIVATE_KEY, INFURA_API } from "../../../../../constants";

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Web3Modal from "web3modal";
import { Web3Provider } from "@ethersproject/providers";
import { formatDateToDDMMYYYYHM } from "@/components/formatDateToDDMMYYYYHM/formatDateToDDMMYYYYHM";

export default function Campaign({ params }: any) {

    const [frameUrl, setFrameUrl] = useState("");
    const [open, setOpen] = useState(false);
    const [data, setData] = useState<any>([])
    const [snackBarMesg, setSnackBarMsg] = useState({ msg: "", type: "success" })
    const [open2, setOpen2] = useState(false);

    const { campaignId } = params

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen2(false);
    };

    const handleData = async () => {
        axios.get(`http://localhost:4000/api/get_campaign_by_id/${campaignId}`)
            .then(res => {
                console.log(res.data);
                setData(res.data)
            })
    }

    async function createStream() {
        // Initialize provider and signer
        const provider = new ethers.providers.InfuraProvider("sepolia", INFURA_API);

        // const web3Modal = new Web3Modal({
        //     providerOptions:{
        //         walletconnect: {
        //             display: {
        //               logo: "data:image/gif;base64,INSERT_BASE64_STRING",
        //               name: "Mobile",
        //               description: "Scan qrcode with your mobile wallet"
        //             },
        //             package: WalletConnectProvider,
        //             options: {
        //               infuraId: "INFURA_ID" // required
        //             }
        //           }
        //     }
        // })

        // const web3ModalRawProvider = await web3Modal.connect();
        // const web3ModalProvider = new Web3Provider(web3ModalRawProvider, "any");

        // Initialize Superfluid Framework
        const sf = await Framework.create({
            chainId: 11155111, // Replace with your network's chain ID
            provider: provider
        });
        const signer = sf.createSigner({ privateKey: ACC2_PRIVATE_KEY, provider });
        // Define stream parameters
        const superToken = "0x30a6933ca9230361972e413a15dc8114c952414e"; // Replace with your Super Token address
        const receiver = data?.stream?.receiver; // Replace with the receiver's address
        const flowRate = data?.stream?.flowRate; // Example flow rate in wei/second

        // Create the stream
        const createFlowOperation = sf.cfaV1.createFlow({
            superToken: superToken,
            sender: await signer.getAddress(),
            receiver: receiver,
            flowRate: flowRate
        });
        const tx = await createFlowOperation.exec(signer);
        console.log(tx);
        if (tx) {
            axios.post('http://localhost:4000/api/start_stream',
                {
                    requestId: data?.stream?.requestId
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                .then(res => {
                    if (res.status == 200) {
                        setSnackBarMsg({ msg: "Stream Started!", type: "success" })
                        setOpen2(true)
                    }
                })
        } else {
            setSnackBarMsg({ msg: "Your stream alreadt started with this receiver or You have an error", type: "error" })
            setOpen2(true)
        }

        console.log("Stream created successfully!");
    }

    async function deleteStream() {
        // Initialize provider and signer
        const provider = new ethers.providers.InfuraProvider("sepolia", INFURA_API);

        // Initialize Superfluid Framework
        const sf = await Framework.create({
            chainId: 11155111, // Replace with your network's chain ID
            provider: provider
        });
        const signer = sf.createSigner({ privateKey: ACC2_PRIVATE_KEY, provider });
        // Define stream parameters
        const superToken = "0x30a6933ca9230361972e413a15dc8114c952414e"; // Replace with your Super Token address
        const receiver = data?.stream?.receiver; // Replace with the receiver's address

        // Create the stream
        const createFlowOperation = sf.cfaV1.deleteFlow({
            superToken: superToken,
            sender: await signer.getAddress(),
            receiver: receiver
        });
        // Execute the transaction
        const tx = await createFlowOperation.exec(signer);
        console.log(tx);
        if (tx) {
            axios.post('http://localhost:4000/api/end_stream',
                {
                    requestId: data?.stream?.requestId
                },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/x-www-form-urlencoded"
                    }
                })
                .then(res => {
                    if (res.status == 200) {
                        setSnackBarMsg({ msg: "Stream Stopped!", type: "success" })
                        setOpen2(true)
                    }
                })
        }

        console.log("Stream deleted successfully!");
    }

    const verifyFrame = () => {
        axios.post('http://localhost:4000/api/verify_frame',
            {
                campaignId,
                frameUrl
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .then(res => {
                if (res.status == 200) {
                    setSnackBarMsg({ msg: "Frame verified!", type: "success" })
                    setOpen2(true)
                }
            })
    }


    useEffect(() => {
        handleData()
    }, [])

    return (
        <div className="w-screen h-screen overflow-hidden bg-gradient-to-r from-black to-[#3a003f]">

            <div className="mt-4 w-screen h-screen">
                <div className="w-[62%] flex justify-between items-center">
                    <div>
                        <div className={julee.className}>
                            <span className="text-white uppercase text-2xl ml-32">{data?.campaign?.title}</span>
                        </div>
                    </div>
                    {data?.campaign?.haveClient && (data?.stream?.startDate ? (data?.stream?.endDate ? <p className="p-2 px-4 text-center bg-green-200 rounded-md">Contract Done!</p> : <button onClick={deleteStream} className="font-mono bg-purple-600 text-white p-2 px-4 rounded-lg hover:bg-purple-400">Stop stream 🚀</button>) : <button onClick={createStream} className="font-mono bg-purple-600 text-white p-2 px-4 rounded-lg hover:bg-purple-400">Start stream 🚀</button>)}
                </div>

                <div className="w-[90%] flex justify-around items-start flex-row mt-4 ml-[100px] font-mono">
                    {data?.campaign?.haveClient
                        ?
                        <div className="w-[60%] ml-6 flex justify-center items-start flex-col ">
                            <div className="flex justify-between items-center flex-row text-base glass p-2 rounded-lg w-full">
                                <p className="text-slate-200 ml-2">@krishn - {data?.stream?.receiver}</p>
                                <button onClick={showDrawer} className="bg-slate-900 text-white p-2 rounded-lg hover:bg-slate-700 text-sm ml-2">Verify Frame</button>
                            </div>

                            {data?.stream?.startDate
                                ? <>
                                    <div className="text-slate-500 w-full text-center mt-4">(Started At - {formatDateToDDMMYYYYHM(data?.stream?.startDate)})</div>
                                    {data?.stream?.endDate && <div className="text-slate-500 w-full text-center">(Ended At - {formatDateToDDMMYYYYHM(data?.stream?.endDate)})</div>}
                                    <div className="flex items-center flex-row w-full mt-24" style={{ justifyContent: data?.stream?.endDate ? "space-around" : "center" }}>
                                        <div className="text-slate-400 flex flex-col justify-start items-center">
                                            <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />

                                        </div>
                                        {(data?.stream?.startDate && !data?.stream?.endDate) && <div className="loader"></div>}
                                        <div className="text-slate-400 flex flex-col justify-start items-center">
                                            <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />

                                        </div>
                                    </div>
                                    <div className="text-white text-sm mt-4 flex justify-center items-center flex-row w-full">
                                        <p className="mr-2">{data?.stream?.sender}</p>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 1024 1024"><path fill="white" d="M754.752 480H160a32 32 0 1 0 0 64h594.752L521.344 777.344a32 32 0 0 0 45.312 45.312l288-288a32 32 0 0 0 0-45.312l-288-288a32 32 0 1 0-45.312 45.312z" /></svg>
                                        <p className="ml-2">{data?.stream?.receiver}</p>
                                    </div>

                                    <div className="text-slate-300 text-3xl font-mono flex justify-center items-center flex-row w-full mt-12">

                                        {(data?.stream?.startDate && !data?.stream?.endDate)
                                            ? <>
                                                <FlowingBalance startingBalance={BigInt("000000000000000000")} startingBalanceDate={new Date(data?.stream?.startDate)} flowRate={BigInt(data?.stream?.flowRate)} />
                                                <p className="ml-2">ETHx</p>
                                            </>
                                            : <div className="glass p-2 w-full flex justify-between items-center flex-row">
                                                <p className="text-slate-400">{data?.stream?.trasferredAmount} ETHx</p>
                                                <p className="text-2xl">Sent ✅</p>
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
                                    <div className="text-slate-500 w-full text-center">(You have not started stream yet)</div>
                                    <div className="flex justify-around items-center flex-row w-full mt-24">
                                        <div className="text-slate-400 flex flex-col justify-start items-center">
                                            <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />

                                        </div>
                                        <div className="text-slate-400 flex flex-col justify-start items-center">
                                            <Image src="https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png" className="rounded-full" alt="" width={100} height={100} />

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
                                </>}

                        </div>
                        : <div className="w-[60%] flex justify-center items-center flex-row mt-4 ml-[100px] font-mono">
                            <div className="flex justify-center items-center flex-col text-base glass p-4 rounded-lg">
                                <div className="bg-black p-2 rounded-lg w-[400px]" >
                                    <p className="text-slate-500">{data?.ad_text_message}</p>
                                    <Image src={`https://gateway.pinata.cloud/ipfs/${data?.image_hash}`} alt="" width={"400"} height={"70"} className="rounded-lg mt-2" />
                                </div>

                                <div className="text-slate-300 text-6xl font-mono flex justify-center items-center flex-row w-full mt-12 mb-6">
                                    <p className="ml-2">{data?.budget_allowance} ETHx</p>
                                </div>
                            </div>
                        </div>}

                    {!data?.campaign?.haveClient ? <div className="w-[35%] ml-6 -mt-8">
                        <RequestesByInfluencerList campaignData={data} />
                    </div>
                        : <div className="w-[35%]"><Chat requestId={data?.stream?.requestId} /></div>
                    }
                </div>
            </div>
            <>
                <Drawer title="Verify Frame" style={{ background: "#db66cf", fontFamily: "monospace" }} className="text-xl" onClose={onClose} open={open}>
                    <div className="flex justify-center items-start flex-col">
                        <div className="bg-black p-2 rounded-lg">
                            <p className="text-slate-500">texts of frame</p>
                            <Image src={"https://imgs.search.brave.com/5WsbcEYIdZPM_L0xfDj17IN2jto74n8NeVtgyy4n1Jc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cHJvZC53ZWJzaXRl/LWZpbGVzLmNvbS82/NGRhMTJkYmQ2ZDZh/M2NlYjA0ZTc3Nzcv/NjUxZWI3YTU4ZDZl/ZDcxYmQ2MmI1MTc0/X2Jlc3QlMjBjcnlw/dG8lMjBhZCUyMG5l/dHdvcmtzLndlYnA"} alt="" width={"400"} height={"70"} className="rounded-lg mt-2" />
                        </div>
                        {
                            data?.campaign?.frameUrl
                                ? <p className="break-words w-full mt-4">{data?.campaign?.frameUrl}</p>
                                : <div className="w-full mt-8 text-base">
                                    <input type="text" onChange={(e) => setFrameUrl(e.target.value)} placeholder="frame url" className="w-full p-2 outline-none rounded-md" />
                                    <button onClick={verifyFrame} className="bg-slate-900 text-white hover:bg-slate-700 p-2 w-full mt-2 rounded-lg">Verify</button>
                                </div>
                        }
                    </div>
                </Drawer>
                <Snackbar open={open2} autoHideDuration={6000} onClose={handleClose}>
                    <Alert
                        onClose={handleClose}
                        severity="success"
                        variant="filled"
                        sx={{ width: '100%' }}
                    >
                        {snackBarMesg.msg}
                    </Alert>
                </Snackbar>
            </>

        </div>
    );
}
