"use client"

import Particles from "@/components/magicui/particles"
import { useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from "next/navigation";
import axios from "axios"
import { PINATA_JWT } from "../../../constants";

export default function Campaign() {

    const { user } = useDynamicContext()
    const [open, setOpen] = useState(false);
    const router = useRouter()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };
        
    const [formData, setFormData] = useState({
        title: '',
        budget: '',
        message: '',
        image: null
    });

    const handleChange = (e: any) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Handle form submission logic here, such as sending data to an API endpoint
        const data = new FormData();
        data.append("file", formData?.image!);

        const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${PINATA_JWT}`,
            },
            body: data,
        });
        
        const resData = await res.json();

        axios.post('http://localhost:4000/api/create_campaign',
            {
                title: formData?.title,
                budget_allowance: formData?.budget,
                ad_text_message: formData?.message,
                image_hash: resData.IpfsHash,
                walletAddress: user?.verifiedCredentials[0]?.address!
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
                    router.push("/dashboard")
                }
            })
        
        
    };

    return (
        <div className="w-screen h-screen bg-black flex justify-center items-center">
            <Particles
                className="absolute inset-0"
                quantity={100}
                ease={80}
                color={"#fff"}
                refresh
            />
            <div className="w-[40%] h-[70vh] glass2 flex justify-start items-start flex-col p-6">
                <>
                    <label className="text-slate-400 my-2">Campaign Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Eg. Web3 conference Ad"
                        className="h-10 text-[#fff] p-2 bg-[#45065450] font-mono w-full outline-slate-200"
                    />

                    <label className="text-slate-400 mt-6 mb-2">Budget per month (ETHx)</label>
                    <input
                        type="text"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        placeholder="Eg. 0.5"
                        className="h-10 text-[#fff] p-2 bg-[#45065450] font-mono w-full outline-slate-200"
                    />

                    <label className="text-slate-400 mt-6 mb-2">Text Message in Ad</label>
                    <input
                        type="text"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Register for Web3 Conference ticket!"
                        className="h-10 text-[#fff] p-2 bg-[#45065450] font-mono w-full outline-slate-200"
                    />

                    <label className="text-slate-400 mt-6 mb-2">Select Ad image / Ad banner</label>
                    <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        className="h-10 text-[#fff] p-2 bg-[#45065450] font-mono w-full outline-slate-200"
                    />

                    <div className="w-full flex justify-center items-center mt-10">
                        <button onClick={handleSubmit} className="bg-black p-2 rounded-lg px-4 hover:bg-slate-600 transition-all border-2 border-black text-white font-mono">
                            Create Campaign
                        </button>
                    </div>
                </>
            </div>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: '100%' }}
                >
                Campaign Ready!
                </Alert>
            </Snackbar>
    </div>
    )
}