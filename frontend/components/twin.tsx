// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { Send, Bot, User } from 'lucide-react';

// interface Message {
//     id: string;
//     role: 'user' | 'assistant';
//     content: string;
//     timestamp: Date;
// }

// export default function Twin() {
//     const [messages, setMessages] = useState<Message[]>([]);
//     const [input, setInput] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const [sessionId, setSessionId] = useState<string>('');
//     const messagesEndRef = useRef<HTMLDivElement>(null);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//     };

//     useEffect(() => {
//         scrollToBottom();
//     }, [messages]);

//     const sendMessage = async () => {
//         if (!input.trim() || isLoading) return;

//         const userMessage: Message = {
//             id: Date.now().toString(),
//             role: 'user',
//             content: input,
//             timestamp: new Date(),
//         };

//         setMessages(prev => [...prev, userMessage]);
//         setInput('');
//         setIsLoading(true);

//         try {
//             const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     message: input,
//                     session_id: sessionId || undefined,
//                 }),
//             });

//             if (!response.ok) throw new Error('Failed to send message');

//             const data = await response.json();

//             if (!sessionId) {
//                 setSessionId(data.session_id);
//             }

//             const assistantMessage: Message = {
//                 id: (Date.now() + 1).toString(),
//                 role: 'assistant',
//                 content: data.response,
//                 timestamp: new Date(),
//             };

//             setMessages(prev => [...prev, assistantMessage]);
//         } catch (error) {
//             console.error('Error:', error);
//             // Add error message
//             const errorMessage: Message = {
//                 id: (Date.now() + 1).toString(),
//                 role: 'assistant',
//                 content: 'Sorry, I encountered an error. Please try again.',
//                 timestamp: new Date(),
//             };
//             setMessages(prev => [...prev, errorMessage]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const handleKeyPress = (e: React.KeyboardEvent) => {
//         if (e.key === 'Enter' && !e.shiftKey) {
//             e.preventDefault();
//             sendMessage();
//         }
//     };

//     return (
//         <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-lg">
//             {/* Header */}
//             <div className="bg-gradient-to-r from-slate-700 to-slate-800 text-white p-4 rounded-t-lg">
//                 <h2 className="text-xl font-semibold flex items-center gap-2">
//                     <Bot className="w-6 h-6" />
//                     AI Digital Twin
//                 </h2>
//                 <p className="text-sm text-slate-300 mt-1">Aagam Mehta 's AI course companion</p>
//             </div>

//             {/* Messages */}
//             <div className="flex-1 overflow-y-auto p-4 space-y-4">
//                 {messages.length === 0 && (
//                     <div className="text-center text-gray-500 mt-8">
//                         <Bot className="w-12 h-12 mx-auto mb-3 text-gray-400" />
//                         <p>Hello! I&apos;m your Digital Twin.</p>
//                         <p className="text-sm mt-2">Ask me anything about AI deployment!</p>
//                     </div>
//                 )}

//                 {messages.map((message) => (
//                     <div
//                         key={message.id}
//                         className={`flex gap-3 ${
//                             message.role === 'user' ? 'justify-end' : 'justify-start'
//                         }`}
//                     >
//                         {message.role === 'assistant' && (
//                             <div className="flex-shrink-0">
//                                 <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
//                                     <Bot className="w-5 h-5 text-white" />
//                                 </div>
//                             </div>
//                         )}

//                         <div
//                             className={`max-w-[70%] rounded-lg p-3 ${
//                                 message.role === 'user'
//                                     ? 'bg-slate-700 text-white'
//                                     : 'bg-white border border-gray-200 text-gray-800'
//                             }`}
//                         >
//                             <p className="whitespace-pre-wrap">{message.content}</p>
//                             <p
//                                 className={`text-xs mt-1 ${
//                                     message.role === 'user' ? 'text-slate-300' : 'text-gray-500'
//                                 }`}
//                             >
//                                 {message.timestamp.toLocaleTimeString()}
//                             </p>
//                         </div>

//                         {message.role === 'user' && (
//                             <div className="flex-shrink-0">
//                                 <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
//                                     <User className="w-5 h-5 text-white" />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}

//                 {isLoading && (
//                     <div className="flex gap-3 justify-start">
//                         <div className="flex-shrink-0">
//                             <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center">
//                                 <Bot className="w-5 h-5 text-white" />
//                             </div>
//                         </div>
//                         <div className="bg-white border border-gray-200 rounded-lg p-3">
//                             <div className="flex space-x-2">
//                                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
//                                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
//                                 <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Input */}
//             <div className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
//                 <div className="flex gap-2">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={handleKeyPress}
//                         placeholder="Type your message..."
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-transparent text-gray-800"
//                         disabled={isLoading}
//                     />
//                     <button
//                         onClick={sendMessage}
//                         disabled={!input.trim() || isLoading}
//                         className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//                     >
//                         <Send className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Briefcase, Code, GraduationCap } from 'lucide-react';

interface Message {
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
}

export default function Twin() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    session_id: sessionId || undefined,
                }),
            });

            if (!response.ok) throw new Error('Failed to send message');

            const data = await response.json();

            if (!sessionId) {
                setSessionId(data.session_id);
            }

            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.response,
                timestamp: new Date(),
            };

            setMessages(prev => [...prev, assistantMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date(),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    const suggestedQuestions = [
        "What's your experience with AI/ML?",
        "Tell me about your projects",
        "What are your technical skills?",
        "What's your educational background?"
    ];

    const handleSuggestedQuestion = (question: string) => {
        setInput(question);
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header with gradient and glassmorphism effect */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-6 shadow-lg">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="relative">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center ring-2 ring-white/30">
                                <Bot className="w-7 h-7 text-white" />
                            </div>
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                Aagam's Digital Twin
                                <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
                            </h2>
                            <p className="text-sm text-white/90 mt-0.5">AI-Powered Career Assistant • Available 24/7</p>
                        </div>
                    </div>
                    <div className="flex gap-2 mt-3 text-xs">
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1">
                            <Code className="w-3 h-3" /> Full Stack Dev
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1">
                            <GraduationCap className="w-3 h-3" /> AI Specialist
                        </span>
                        <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1">
                            <Briefcase className="w-3 h-3" /> Open to Work
                        </span>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {messages.length === 0 && (
                    <div className="text-center mt-8 space-y-6">
                        <div className="relative inline-block">
                            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                                <Bot className="w-10 h-10 text-white" />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
                        </div>
                        
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">
                                Hello! I'm Aagam's Digital Twin 👋
                            </h3>
                            <p className="text-gray-600 max-w-md mx-auto">
                                I can answer questions about Aagam's experience, skills, projects, and career aspirations. 
                                Ask me anything you'd like to know!
                            </p>
                        </div>

                        <div className="max-w-2xl mx-auto">
                            <p className="text-sm font-semibold text-gray-700 mb-3">Quick Start Questions:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {suggestedQuestions.map((question, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestedQuestion(question)}
                                        className="px-4 py-3 bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200 hover:border-indigo-300 rounded-xl text-sm text-gray-700 hover:text-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md text-left group"
                                    >
                                        <span className="group-hover:translate-x-1 inline-block transition-transform">
                                            {question}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        } animate-fade-in`}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-purple-200">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        )}

                        <div
                            className={`max-w-[75%] rounded-2xl p-4 shadow-md ${
                                message.role === 'user'
                                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                            }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                            <p
                                className={`text-xs mt-2 ${
                                    message.role === 'user' ? 'text-indigo-200' : 'text-gray-400'
                                }`}
                            >
                                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                        </div>

                        {message.role === 'user' && (
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg ring-2 ring-gray-300">
                                    <User className="w-6 h-6 text-white" />
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                {isLoading && (
                    <div className="flex gap-3 justify-start animate-fade-in">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-purple-200">
                                <Bot className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                            <div className="flex space-x-2">
                                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" />
                                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="border-t border-gray-200 bg-white/80 backdrop-blur-lg p-5 shadow-lg">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask me about Aagam's experience, skills, or projects..."
                        className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-white shadow-sm transition-all"
                        disabled={isLoading}
                    />
                    <button
                        onClick={sendMessage}
                        disabled={!input.trim() || isLoading}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:shadow-md transform hover:scale-105 disabled:hover:scale-100"
                    >
                        <Send className="w-5 h-5" />
                    </button>
                </div>
                <p className="text-xs text-gray-500 mt-3 text-center">
                    Powered by AI • Responses based on Aagam Mehta's portfolio and experience
                </p>
            </div>

            <style jsx>{`
                @keyframes fade-in {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.3s ease-out;
                }
            `}</style>
        </div>
    );
}