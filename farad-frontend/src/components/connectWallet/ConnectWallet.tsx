"use client"
import { julee } from "../sidebar/Campaignersidebar";

export default function ConnectWallet() {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <div className={julee.className}><span className="text-white text-4xl">Connect Wallet</span></div>
        </div>
    )
}