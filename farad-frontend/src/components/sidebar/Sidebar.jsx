"use client"

import Image from "next/image";
import  "./style.css"

import { Julee } from 'next/font/google'
import Link from "next/link";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";

export const julee = Julee({
    subsets: ['latin'],
    weight: ['400'], // Specify the font weights you need
  })

export default function Sidebar() {
    return (
        <nav className="sidebar font-mono" >
            <div className={julee.className}>
                <div className="flex justify-start items-center flex-row">
                    <Image src={"https://res.cloudinary.com/dm6aa7jlg/image/upload/v1721494429/Screenshot_2024-07-20_162353_ed2ckk.png"} alt="" className="rounded-xl ml-2 mt-2" width={50} height={50} />
                    <span className="text-4xl uppercase text-white ml-5 overflow-hidden mt-2">farad</span>
                </div>
            </div>

            <div className="menu-bar">
                <div className="menu">
                    <ul className="menu-links">
                        <li className="nav-link">
                            <a>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="#c4c4c4" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></g></svg>
                                <span className="text nav-text">Home</span>
                            </a>
                        </li>

                        <li className="nav-link">
                            <Link href="/dashboard">
                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path fill="none" stroke="#898989" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8.557 2.75H4.682A1.932 1.932 0 0 0 2.75 4.682v3.875a1.942 1.942 0 0 0 1.932 1.942h3.875a1.942 1.942 0 0 0 1.942-1.942V4.682A1.942 1.942 0 0 0 8.557 2.75m10.761 0h-3.875a1.942 1.942 0 0 0-1.942 1.932v3.875a1.943 1.943 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942V4.682a1.932 1.932 0 0 0-1.932-1.932m0 10.75h-3.875a1.942 1.942 0 0 0-1.942 1.933v3.875a1.942 1.942 0 0 0 1.942 1.942h3.875a1.942 1.942 0 0 0 1.932-1.942v-3.875a1.932 1.932 0 0 0-1.932-1.932M8.557 13.5H4.682a1.943 1.943 0 0 0-1.932 1.943v3.875a1.932 1.932 0 0 0 1.932 1.932h3.875a1.942 1.942 0 0 0 1.942-1.932v-3.875a1.942 1.942 0 0 0-1.942-1.942"/></svg>
                                <span className="text nav-text">Dashboard</span>
                            </Link>
                        </li>

                        <li className="nav-link">
                            <a href="#howitswork">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 32 32"><path fill="#c4c4c4" d="M26 18c-1.858 0-3.41 1.28-3.858 3h-2.728L14 15.586A2 2 0 0 0 12.586 15H2v2h10.586L18 22.414c.378.378.88.586 1.414.586h2.728c.447 1.72 2 3 3.858 3c2.206 0 4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2m0-18c-1.858 0-3.41 1.28-3.858 3h-2.728c-.534 0-1.036.208-1.414.586l-3.586 3.586l1.414 1.414L19.414 11h2.728c.447 1.72 2 3 3.858 3c2.206 0 4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .898 2 2s-.897 2-2 2"/></svg>
                                <span className="text nav-text">How it&apos;s works</span>
                            </a>
                        </li>                        

                        <li className="nav-link">  
                            <a>    
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#898989" d="M19 12a1 1 0 1 1-2 0a1 1 0 0 1 2 0"/><path fill="#898989" fill-rule="evenodd" d="M9.944 3.25h3.112c1.838 0 3.294 0 4.433.153c1.172.158 2.121.49 2.87 1.238c.924.925 1.219 2.163 1.326 3.77c.577.253 1.013.79 1.06 1.47c.005.061.005.126.005.186v3.866c0 .06 0 .125-.004.185c-.048.68-.484 1.218-1.061 1.472c-.107 1.606-.402 2.844-1.326 3.769c-.749.748-1.698 1.08-2.87 1.238c-1.14.153-2.595.153-4.433.153H9.944c-1.838 0-3.294 0-4.433-.153c-1.172-.158-2.121-.49-2.87-1.238c-.748-.749-1.08-1.698-1.238-2.87c-.153-1.14-.153-2.595-.153-4.433v-.112c0-1.838 0-3.294.153-4.433c.158-1.172.49-2.121 1.238-2.87c.749-.748 1.698-1.08 2.87-1.238c1.14-.153 2.595-.153 4.433-.153m10.224 12.5H18.23c-2.145 0-3.981-1.628-3.981-3.75s1.836-3.75 3.98-3.75h1.938c-.114-1.341-.371-2.05-.87-2.548c-.423-.423-1.003-.677-2.009-.812c-1.027-.138-2.382-.14-4.289-.14h-3c-1.907 0-3.261.002-4.29.14c-1.005.135-1.585.389-2.008.812c-.423.423-.677 1.003-.812 2.009c-.138 1.028-.14 2.382-.14 4.289c0 1.907.002 3.262.14 4.29c.135 1.005.389 1.585.812 2.008c.423.423 1.003.677 2.009.812c1.028.138 2.382.14 4.289.14h3c1.907 0 3.262-.002 4.29-.14c1.005-.135 1.585-.389 2.008-.812c.499-.498.756-1.206.87-2.548M5.25 8A.75.75 0 0 1 6 7.25h4a.75.75 0 0 1 0 1.5H6A.75.75 0 0 1 5.25 8m15.674 1.75H18.23c-1.424 0-2.481 1.059-2.481 2.25s1.057 2.25 2.48 2.25h2.718c.206-.013.295-.152.302-.236V9.986c-.007-.084-.096-.223-.302-.235z" clip-rule="evenodd"/></svg>
                                <span className="text nav-text"><DynamicWidget /></span>
                            </a>                  
                        </li>
                    </ul>
                </div>

                <div className="bottom-content">

                    <li className="mode">

                    </li>

                </div>
            </div>
        </nav>
    )
}