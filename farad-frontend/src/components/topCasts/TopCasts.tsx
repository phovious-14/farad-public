"use client"
import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core"

import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Image from "next/image";

const ReviewCard = ({cast}:any) => {
    return (
        <figure
            className={cn(
                "relative w-64 overflow-hidden rounded-xl border p-4 flex justify-between items-start flex-col text-white",
                // light styles
                "glass"
            )}
        >
            <div>
                <div className="flex flex-row items-center gap-2">
                    <Image className="rounded-full" width="50" height="50" alt="" src={cast?.author?.pfp_url} />
                    <div className="flex flex-col">
                        <figcaption className="text-sm font-medium text-slate-300">
                            {cast?.author?.display_name}
                        </figcaption>
                        <p className="text-xs font-medium text-slate-100">@{cast?.author?.username}</p>
                    </div>
                </div>
                <blockquote className="mt-2 text-sm">{cast?.text}</blockquote>
            </div>
            <div className="flex justify-between items-center mt-2 w-full">
                <div className="flex justify-start items-center">
                    <div className="flex justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#f1f5f9 " d="M3 20.59L6.59 17H18a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2zM3 22H2V6a3 3 0 0 1 3-3h13a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H7z"/></svg>
                        <span className="ml-1">{cast?.replies?.count}</span>
                    </div>
                    <div className="flex justify-center items-center ml-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#f1f5f9 " fill-rule="evenodd" d="M19.285 12.645a3.8 3.8 0 0 0-5.416-5.332q-.288.288-.732.707l-.823.775l-.823-.775q-.445-.42-.733-.707a3.8 3.8 0 0 0-5.374 0c-1.468 1.469-1.485 3.844-.054 5.32l6.984 6.984l6.97-6.972zm-14.75-6.18a5 5 0 0 1 7.072 0q.273.274.707.682q.432-.408.707-.683a5 5 0 0 1 7.125 7.017l-7.125 7.126a1 1 0 0 1-1.414 0L4.48 13.48a5 5 0 0 1 .055-7.017z"/></svg>
                        <span className="ml-1">{cast?.reactions?.likes_count}</span>
                    </div>
                </div>
                <a href={`https://warpcast.com/${cast?.author?.username}/${cast?.hash}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="#f1f5f9" d="M5.5 9.75v10.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V9.75a.25.25 0 0 0-.25-.25h-2.5a.75.75 0 0 1 0-1.5h2.5c.966 0 1.75.784 1.75 1.75v10.5A1.75 1.75 0 0 1 18.25 22H5.75A1.75 1.75 0 0 1 4 20.25V9.75C4 8.784 4.784 8 5.75 8h2.5a.75.75 0 0 1 0 1.5h-2.5a.25.25 0 0 0-.25.25m7.03-8.53l3.25 3.25a.749.749 0 0 1-.326 1.275a.75.75 0 0 1-.734-.215l-1.97-1.97v10.69a.75.75 0 0 1-1.5 0V3.56L9.28 5.53a.75.75 0 0 1-1.042-.018a.75.75 0 0 1-.018-1.042l3.25-3.25a.75.75 0 0 1 1.06 0"/></svg>
                </a>
            </div>
        </figure>
    );
};


export default function TopCasts() {

    const [topCasts, setTopCasts] = useState([])
    const { user }: any = useDynamicContext()

    const fetchPopularCasts = async () => {
        const url = `https://api.neynar.com/v2/farcaster/feed/user/${user?.verifiedCredentials[2]?.oauthMetadata?.fid}/popular`;
        const options: any = {
            method: 'GET',
            headers: { accept: 'application/json', api_key: "A245EBF6-D0B1-441C-B316-22606F5562CD" }
        };

        const res =await fetch(url, options)
        let json = await res.json()
        console.log(json.casts) 
        setTopCasts(json.casts)
    }

    useEffect(() => {
        fetchPopularCasts()
    }, [])

    return (
        <div className="w-full">
            <p className="my-2 text-lg text-slate-400 ml-2 font-mono">Top 10 Casts</p>
            <div className="relative flex h-[250px] w-[100%] flex-col items-center justify-center overflow-hidden md:shadow-xl bg-transparent border-2 rounded-lg">
                <Marquee pauseOnHover className="[--duration:20s]">
                    {topCasts!=null && topCasts?.map((cast:any, index:Number) => (
                        <ReviewCard key={index} cast={cast} />
                    ))}
                </Marquee>
            </div>
        </div>
    )
}
