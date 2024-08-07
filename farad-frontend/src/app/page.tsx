"use client"

import RetroGrid from "@/components/magicui/retro-grid";

import { AnimatedBeamMultipleOutputDemo } from "@/components/animatedBeam/AnimatedBeam";
import { WordRotateDemo } from "@/components/wordRotate/WordRotate";

export default function Home() {

  return (<>
    
    <div>
      <RetroGrid />
      <div className="h-screen w-screen">
        <div className="font-mono"> <span className="text-white text-3xl absolute top-24 left-32">Unlock Warpcast&apos;s full potential: Expand your Ads with continuos money stream</span></div> 
        <AnimatedBeamMultipleOutputDemo />
        <div className="text-white absolute ml-32 font-mono bottom-10">Win Win for <WordRotateDemo /></div>
      </div>
      
      <div id="howitswork" className="ml-32 w-screen h-[300px] ">
        hello
      </div>
    </div>
  </>)
}
