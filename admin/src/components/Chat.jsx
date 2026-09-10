import { useEffect, useRef, useState } from 'react';

export default function Chat() {
    // const socket = useRef(null);
    // const timer = useRef(null)
    const [userName, setUserName] = useState('');
    // const [typers, setTypers] = useState([])

    const [messages, setMessages] = useState([]);
    const [text, setText] = useState('');
    const messageRef = useRef(null)

    //scrool if messages lenght exeed smooth scrolling
    // useEffect(() => {
    //     if (messageRef.current) {
    //         setTimeout(() => {
    //             messageRef.current.scrollIntoView({ behavior: 'smooth' })
    //         }, 50);
    //     }
    // })


    // FORMAT TIMESTAMP TO HH:MM FOR MESSAGES
    function formatTime(ts) {
        const d = new Date(ts);
        const hh = String(d.getHours()).padStart(2, '0');
        const mm = String(d.getMinutes()).padStart(2, '0');
        return `${hh}:${mm}`;
    }


    // SEND MESSAGE FUNCTION
    function sendMessage() {
        const t = text.trim();
        if (!t) return;

        // USER MESSAGE
        const msg = {
            id: Date.now(),
            sender: userName,
            text: t,
            ts: Date.now(),
        };
        setMessages((m) => [...m, msg]);

        setText('');
    }

    // HANDLE ENTER KEY TO SEND MESSAGE
    function handleKeyDown(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 font-inter dark:bg-gray-900dark:text-white">

            {/* CHAT WINDOW */}
           
                <div className="w-full max-w-2xl h-[90vh] dark:text-white dark:bg-gray-900 rounded-xl shadow-md flex flex-col overflow-hidden">
                    {/* CHAT HEADER */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                        <div className="h-10 w-10 rounded-full bg-[#075E54] flex items-center justify-center text-white font-semibold">
                            R
                        </div>
                        <div className="flex-1">
                            <div className="text-sm font-medium text-[#303030] dark:text-white">
                                Realtime group chat
                            </div>

                             <div className="text-xs text-gray-500 dark:text-white">
                             is typing...
                            </div>


                        </div>
                        <div className="text-sm text-gray-500 dark:text-white">
                            Signed in as{' '}
                            <span className="font-medium text-[#303030] capitalize">
                                {userName}
                            </span>
                        </div>
                    </div>

                    {/* CHAT MESSAGE LIST */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-3 dark:bg-gray-900 dark:text-white flex flex-col">
                        {messages.map((m) => {
                            const mine = m.sender === userName;
                            return (
                                <div
                                    key={m.id}
                                    className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
                                    <div
                                        className={`max-w-[78%] p-3 my-2 rounded-[18px] text-sm leading-5 shadow-sm ${mine
                                            ? 'bg-[#DCF8C6] text-[#303030] dark:bg-gray-900 dark:text-white rounded-br-2xl'
                                            : 'bg-white text-[#303030] dark:bg-gray-900 dark:text-white rounded-bl-2xl'
                                            }`}>
                                        <div className="wrap-break-word whitespace-pre-wrap">
                                            {m.text}
                                        </div>
                                        <div className="flex justify-between items-center mt-1 gap-16">
                                            <div className="text-[11px] font-bold dark:text-white dark:bg-gray-900">{m.sender}</div>
                                            <div className="text-[11px] text-gray-500 text-right dark:text-white dark:bg-gray-900">
                                                {formatTime(m.ts)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/*smooth scrolling */}
                        <div ref={messageRef}></div>
                    </div>

                    {/* CHAT TEXTAREA */}
                    <div className="px-4 py-3 border-t border-gray-200 bg-white dark:bg-gray-900 dark:text-white">
                        <div className="flex items-center justify-between gap-4 border border-gray-200 rounded-full">
                            <textarea
                                rows={1}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Type a message..."
                                className="w-full resize-none px-4 py-4 text-sm outline-none"
                            />
                            <button
                                onClick={sendMessage}
                                disabled={!text}
                                className={`px-4 py-2 mr-2 rounded-full text-sm font-medium 
                                 ${text ? "bg-green-500 dark:text-white text-black cursor-pointer" : " text-gray-500 cursor-not-allowed"}
                                `}
                            >
                                Send
                            </button>

                        </div>
                    </div>
                </div>
        </div>
    );
}
