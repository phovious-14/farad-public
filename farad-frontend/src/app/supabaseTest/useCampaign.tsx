'use client'
import { supabase } from "@/lib/supabase"
import { useState } from "react";

export const useCampaign = () => {
    
    const addCampaign = async (title:string, budget_allowance:string, ad_text_message:string, image_hash:string, active:boolean, walletAddress:string, haveClient:boolean) => {
        const {data, error} = await supabase
        .from("campaign")
        .insert({ title, budget_allowance, ad_text_message, image_hash, active, walletAddress, haveClient })

        return data        
    }

    const getOngoingCampaign = async () => {
        const {data, error}: any = await supabase
        .from("campaign")
        .select()
        .is('haveClient', false)

        return data        
    }

    return {
       addCampaign,
       getOngoingCampaign
    }
}