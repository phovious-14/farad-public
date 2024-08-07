"use client";

import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import Link from "next/link";

export default function Campaign() {
    return (
        <NeonGradientCard className="max-w-sm mt-8 items-center justify-center text-center bg-[#ffffff50]">
            <span className="pointer-events-none font-mono z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff29ea] from-35% to-[#0a3fff] bg-clip-text text-center text-2xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                Lets create campaign for your amaizing brand
            </span>
            <br /><br />
            <button className="bg-black p-2 rounded-lg px-4 hover:bg-slate-600 transition-all border-2 border-black">
                <Link href="/add-campaign" className="font-mono text-white">
                    Add Campaign
                </Link>
            </button>
        </NeonGradientCard>
    );
}
