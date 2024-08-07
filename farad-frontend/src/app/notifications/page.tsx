"use client"
import NotificationList from "@/components/notifications/NotificationList";
import Campaignersidebar from "@/components/sidebar/Campaignersidebar";

export default function Notifications() {
    return (
        <div className="ml-32 overflow-hidden">
            <Campaignersidebar />
            <NotificationList />
        </div>
    )
}