// components/ChatScreen.js

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChatCampaigner = ({requestId}: any) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (input.trim()) {
            axios.post('http://localhost:4000/api/chat',
                {
                    requestId,
                    user:"campaigner",
                    message: input
                },
                {
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                })
            setInput('');
        }
    };

    const getChat = () => {
        console.log("request id", requestId);
        
        axios.get(`http://localhost:4000/api/get_chat/${requestId}`)
            .then(res => {
                console.log(res.data);
                setMessages(res.data)
            })
    }

    useEffect(() => {
        getChat()
    }, [input])

    return (
        <div className="flex flex-col p-4 h-[90vh]">
            <div className="flex-1 overflow-y-auto p-4 bg-[#00000050] rounded-md">
                {messages?.map((chat: any, index: any) => (
                    <div
                        key={index}
                        className={`p-3 my-2 rounded-lg max-w-xs ${chat.user === 'campaigner' ? 'ml-auto bg-blue-500 text-white' : 'mr-auto bg-gray-300'}`}
                    >
                        <p className='break-words'>{chat?.message}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 border rounded-l-md glass"
                />
                <button
                    onClick={handleSend}
                    className="px-4 py-2 bg-black ml-2 text-white rounded-r-md"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatCampaigner;
