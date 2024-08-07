import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import NumberTicker from "../magicui/number-ticker";
import { useEffect, useState } from "react";

import { Balanceof } from "../../graphql/Functions"

export default function Balance() {
    const { user } = useDynamicContext()
    const [balance, setBalance] = useState(0)
    
    const callBalance = async () => {
        
        setBalance(Number(await Balanceof(user?.verifiedCredentials[0]?.address)) / Math.pow(10, 18))
    }

    useEffect(() => {
        callBalance()
    }, [])

    return (
        <button className="w-[68%] h-[8rem] flex justify-center items-center flex-col bg-[#00ff1a1d] font-mono mt-4 p-2 rounded-lg">
            <div className="text-[#00ff1a76] text-[1.2rem] text-center flex justify-center items-center"><span className="mr-2">Balance</span> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 21 21"><g fill="none" fill-rule="evenodd" stroke="#00ff1a76" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 3.5v11a2 2 0 0 0 2 2h11" /><path d="m6.5 12.5l3-3l2 2l5-5" /><path d="M16.5 9.5v-3h-3" /></g></svg></div>
            <span className="mt-4 text-2xl text-[#00ff1a]">{balance} ETHx</span>
        </button>
    )
}