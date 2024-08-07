"use client"
import { julee } from "@/components/sidebar/Campaignersidebar";

export default function Title() {
    return (
        <div className={julee.className}>
            <span className="text-white uppercase text-2xl ml-32">My Campaigns</span>
        </div>
    )
}