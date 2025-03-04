import React from "react"
import { TbDeviceAnalytics } from "react-icons/tb";

interface SidebarElementInterface {
    icon: React.ReactNode;
    title: string;
}

const SidebarElement: React.FC<SidebarElementInterface> = ({ icon, title }) => {
    return (
        <>
            <div className="flex gap-5 items-center cursor-pointer bg-gray-400  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
 rounded-xl p-1">
                <div>
                    {icon}
                </div>
                <div>
                    <span className="text-gray-300 text-xl">
                        {title}
                    </span>
                </div>
            </div>
        </>
    )
}


const Sidebar = () => {
    return (
        <>
            <div className="relative top-0 left-0 p-8 overflow-y-auto max-h-screen">
                <div className="flex flex-col gap-3">
                    <SidebarElement title="Analytics" icon={<TbDeviceAnalytics size={40} color="white" />} />
                </div>
            </div>
        </>
    )
}

export default Sidebar
