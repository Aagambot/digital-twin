// 'use client';

// import { useState, useRef, useEffect } from 'react';
// import { Send, Bot, User, Sparkles, Briefcase, Code, GraduationCap } from 'lucide-react';

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

//     const suggestedQuestions = [
//         "What's your experience with AI/ML?",
//         "Tell me about your projects",
//         "What are your technical skills?",
//         "What's your educational background?"
//     ];

//     const handleSuggestedQuestion = (question: string) => {
//         setInput(question);
//     };

//     return (
//         <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl shadow-2xl overflow-hidden">
//             {/* Header with gradient and glassmorphism effect */}
//             <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white p-6 shadow-lg">
//                 <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
//                 <div className="relative z-10">
//                     <div className="flex items-center gap-3 mb-2">
//                         <div className="relative">
//                             <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center ring-2 ring-white/30">
//                                 <Bot className="w-7 h-7 text-white" />
//                             </div>
//                             <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
//                         </div>
//                         <div>
//                             <h2 className="text-2xl font-bold flex items-center gap-2">
//                                 Aagam's Digital Twin
//                                 <Sparkles className="w-5 h-5 text-yellow-300 animate-pulse" />
//                             </h2>
//                             <p className="text-sm text-white/90 mt-0.5">AI-Powered Career Assistant • Available 24/7</p>
//                         </div>
//                     </div>
//                     <div className="flex gap-2 mt-3 text-xs">
//                         <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1">
//                             <Code className="w-3 h-3" /> Full Stack Dev
//                         </span>
//                         <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1">
//                             <GraduationCap className="w-3 h-3" /> AI Specialist
//                         </span>
//                         <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1">
//                             <Briefcase className="w-3 h-3" /> Open to Work
//                         </span>
//                     </div>
//                 </div>
//             </div>

//             {/* Messages Container */}
//             <div className="flex-1 overflow-y-auto p-6 space-y-4">
//                 {messages.length === 0 && (
//                     <div className="text-center mt-8 space-y-6">
//                         <div className="relative inline-block">
//                             <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
//                                 <Bot className="w-10 h-10 text-white" />
//                             </div>
//                             <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full animate-ping opacity-20"></div>
//                         </div>
                        
//                         <div>
//                             <h3 className="text-2xl font-bold text-gray-800 mb-2">
//                                 Hello! I'm Aagam's Digital Twin 👋
//                             </h3>
//                             <p className="text-gray-600 max-w-md mx-auto">
//                                 I can answer questions about Aagam's experience, skills, projects, and career aspirations. 
//                                 Ask me anything you'd like to know!
//                             </p>
//                         </div>

//                         <div className="max-w-2xl mx-auto">
//                             <p className="text-sm font-semibold text-gray-700 mb-3">Quick Start Questions:</p>
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
//                                 {suggestedQuestions.map((question, idx) => (
//                                     <button
//                                         key={idx}
//                                         onClick={() => handleSuggestedQuestion(question)}
//                                         className="px-4 py-3 bg-white hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200 hover:border-indigo-300 rounded-xl text-sm text-gray-700 hover:text-indigo-700 transition-all duration-200 shadow-sm hover:shadow-md text-left group"
//                                     >
//                                         <span className="group-hover:translate-x-1 inline-block transition-transform">
//                                             {question}
//                                         </span>
//                                     </button>
//                                 ))}
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {messages.map((message) => (
//                     <div
//                         key={message.id}
//                         className={`flex gap-3 ${
//                             message.role === 'user' ? 'justify-end' : 'justify-start'
//                         } animate-fade-in`}
//                     >
//                         {message.role === 'assistant' && (
//                             <div className="flex-shrink-0">
//                                 <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-purple-200">
//                                     <Bot className="w-6 h-6 text-white" />
//                                 </div>
//                             </div>
//                         )}

//                         <div
//                             className={`max-w-[75%] rounded-2xl p-4 shadow-md ${
//                                 message.role === 'user'
//                                     ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
//                                     : 'bg-white border border-gray-200 text-gray-800'
//                             }`}
//                         >
//                             <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
//                             <p
//                                 className={`text-xs mt-2 ${
//                                     message.role === 'user' ? 'text-indigo-200' : 'text-gray-400'
//                                 }`}
//                             >
//                                 {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                             </p>
//                         </div>

//                         {message.role === 'user' && (
//                             <div className="flex-shrink-0">
//                                 <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-full flex items-center justify-center shadow-lg ring-2 ring-gray-300">
//                                     <User className="w-6 h-6 text-white" />
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 ))}

//                 {isLoading && (
//                     <div className="flex gap-3 justify-start animate-fade-in">
//                         <div className="flex-shrink-0">
//                             <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-purple-200">
//                                 <Bot className="w-6 h-6 text-white" />
//                             </div>
//                         </div>
//                         <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
//                             <div className="flex space-x-2">
//                                 <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" />
//                                 <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
//                                 <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 <div ref={messagesEndRef} />
//             </div>

//             {/* Input Section */}
//             <div className="border-t border-gray-200 bg-white/80 backdrop-blur-lg p-5 shadow-lg">
//                 <div className="flex gap-3">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyDown={handleKeyPress}
//                         placeholder="Ask me about Aagam's experience, skills, or projects..."
//                         className="flex-1 px-5 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-white shadow-sm transition-all"
//                         disabled={isLoading}
//                     />
//                     <button
//                         onClick={sendMessage}
//                         disabled={!input.trim() || isLoading}
//                         className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg disabled:hover:shadow-md transform hover:scale-105 disabled:hover:scale-100"
//                     >
//                         <Send className="w-5 h-5" />
//                     </button>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-3 text-center">
//                     Powered by AI • Responses based on Aagam Mehta's portfolio and experience
//                 </p>
//             </div>

//             <style jsx>{`
//                 @keyframes fade-in {
//                     from {
//                         opacity: 0;
//                         transform: translateY(10px);
//                     }
//                     to {
//                         opacity: 1;
//                         transform: translateY(0);
//                     }
//                 }
//                 .animate-fade-in {
//                     animation: fade-in 0.3s ease-out;
//                 }
//             `}</style>
//         </div>
//     );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles, Briefcase, Code, GraduationCap, Download, RefreshCw } from 'lucide-react';

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
    const inputRef = useRef<HTMLInputElement>(null);

    const aagamPhotoUrl = "/avatar.jpg";

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

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
        { q: "What's your experience with AI/ML?", icon: "🤖" },
        { q: "Tell me about your projects", icon: "💼" },
        { q: "What are your technical skills?", icon: "⚡" },
        { q: "What's your educational background?", icon: "🎓" },
        { q: "How can you contribute to our team?", icon: "🚀" },
        { q: "What are your career goals?", icon: "🎯" }
    ];

    const handleSuggestedQuestion = (question: string) => {
        setInput(question);
        inputRef.current?.focus();
    };

    const resetConversation = () => {
        setMessages([]);
        setSessionId('');
        setInput('');
    };

    const exportChat = () => {
        const chatText = messages
            .map(m => `[${m.role.toUpperCase()}] ${m.timestamp.toLocaleString()}\n${m.content}\n`)
            .join('\n');
        const blob = new Blob([chatText], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `chat-with-aagam-${Date.now()}.txt`;
        a.click();
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 text-white shadow-lg">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div className="relative z-10 p-6">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="w-14 h-14 rounded-full overflow-hidden ring-2 ring-white/40 shadow-xl">
                                    <img 
                                        src={aagamPhotoUrl} 
                                        alt="Aagam Mehta"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-white shadow-md"></div>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold flex items-center gap-2">
                                    Aagam Mehta
                                    <Sparkles className="w-5 h-5 text-yellow-300" />
                                </h2>
                                <p className="text-sm text-white/90 mt-0.5">Digital Twin • Ask me anything</p>
                            </div>
                        </div>
                        {messages.length > 0 && (
                            <div className="flex gap-2">
                                <button
                                    onClick={exportChat}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
                                    title="Export conversation"
                                >
                                    <Download className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={resetConversation}
                                    className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all duration-200 backdrop-blur-sm"
                                    title="Start new conversation"
                                >
                                    <RefreshCw className="w-5 h-5" />
                                </button>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3 text-xs">
                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1.5">
                            <Code className="w-3.5 h-3.5" /> Full Stack Developer
                        </span>
                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5" /> AI Specialist
                        </span>
                        <span className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5" /> Open to Opportunities
                        </span>
                    </div>
                </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth">
                {messages.length === 0 && (
                    <div className="text-center mt-12 space-y-8 animate-fade-in px-4">
                        <div className="relative inline-block">
                            <div className="w-24 h-24 rounded-full overflow-hidden shadow-2xl ring-4 ring-indigo-200">
                                <img 
                                    src={aagamPhotoUrl} 
                                    alt="Aagam Mehta"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/30 to-purple-400/30 rounded-full animate-ping"></div>
                        </div>
                        
                        <div className="space-y-3">
                            <h3 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Welcome! 👋
                            </h3>
                            <p className="text-gray-600 max-w-xl mx-auto text-lg leading-relaxed">
                                I'm Aagam's AI-powered digital twin. I can share insights about his experience, 
                                skills, projects, and professional journey. Feel free to ask me anything!
                            </p>
                        </div>

                        <div className="max-w-3xl mx-auto">
                            <p className="text-sm font-semibold text-gray-700 mb-4">Popular Questions:</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                {suggestedQuestions.map((item, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestedQuestion(item.q)}
                                        className="px-4 py-3.5 bg-white hover:bg-gradient-to-br hover:from-indigo-50 hover:to-purple-50 border-2 border-gray-200 hover:border-indigo-300 rounded-xl text-sm text-gray-700 hover:text-indigo-700 transition-all duration-200 shadow-sm hover:shadow-lg text-left group relative overflow-hidden"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300"></div>
                                        <span className="relative flex items-center gap-2">
                                            <span className="text-lg">{item.icon}</span>
                                            <span className="group-hover:translate-x-1 inline-block transition-transform">
                                                {item.q}
                                            </span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pt-6 text-xs text-gray-500">
                            <p>💡 Tip: You can export the conversation anytime using the button in the header</p>
                        </div>
                    </div>
                )}

                {messages.map((message, index) => (
                    <div
                        key={message.id}
                        className={`flex gap-3 ${
                            message.role === 'user' ? 'justify-end' : 'justify-start'
                        } animate-slide-in`}
                        style={{ animationDelay: `${index * 0.05}s` }}
                    >
                        {message.role === 'assistant' && (
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg ring-2 ring-purple-200">
                                    <img 
                                        src={aagamPhotoUrl} 
                                        alt="Aagam Mehta"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        )}

                        <div
                            className={`max-w-[80%] rounded-2xl p-4 shadow-md transition-all duration-200 hover:shadow-lg ${
                                message.role === 'user'
                                    ? 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white'
                                    : 'bg-white border border-gray-200 text-gray-800'
                            }`}
                        >
                            <p className="whitespace-pre-wrap leading-relaxed text-sm md:text-base">{message.content}</p>
                            <p
                                className={`text-xs mt-2 flex items-center gap-1 ${
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
                            <div className="w-10 h-10 rounded-full overflow-hidden shadow-lg ring-2 ring-purple-200">
                                <img 
                                    src={aagamPhotoUrl} 
                                    alt="Aagam Mehta"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                        <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-md">
                            <div className="flex space-x-2">
                                <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full animate-bounce" />
                                <div className="w-2.5 h-2.5 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                                <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                            </div>
                        </div>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input Section */}
            <div className="border-t border-gray-200 bg-white/90 backdrop-blur-xl p-5 shadow-lg">
                <div className="max-w-4xl mx-auto">
                    <div className="flex gap-3">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your question here..."
                            className="flex-1 px-5 py-3.5 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-800 placeholder-gray-400 bg-white shadow-sm transition-all text-sm md:text-base"
                            disabled={isLoading}
                        />
                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || isLoading}
                            className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-xl disabled:hover:shadow-md transform hover:scale-[1.02] disabled:hover:scale-100 active:scale-[0.98]"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                        <p>Press Enter to send • Shift + Enter for new line</p>
                        <p className="hidden sm:block">Powered by Advanced AI</p>
                    </div>
                </div>
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
                @keyframes slide-in {
                    from {
                        opacity: 0;
                        transform: translateX(-10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                .animate-fade-in {
                    animation: fade-in 0.4s ease-out;
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out;
                }
                .scroll-smooth {
                    scroll-behavior: smooth;
                }
            `}</style>
        </div>
    );
}