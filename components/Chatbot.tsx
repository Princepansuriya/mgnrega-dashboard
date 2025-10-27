import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { MgnregaRecord } from '../types';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  districtData: MgnregaRecord[];
  stateName: string | null;
  districtName: string | null;
  year1: string;
  year2: string;
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
        <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
    </svg>
);

export const Chatbot = ({ isOpen, onClose, districtData, stateName, districtName, year1, year2 }: ChatbotProps) => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    
    useEffect(() => {
        if (!isOpen || !districtName || !stateName || districtData.length === 0) return;

        const dataContext = JSON.stringify(districtData, null, 2);
        const systemInstruction = `You are an expert data analyst AI for the MGNREGA District Report Card. Your entire knowledge base is confined to the JSON data provided below.
        The user is viewing a dashboard for the district of ${districtName} in the state of ${stateName}.
        CRITICAL CONTEXT: The user has selected two specific financial years for comparison:
        - Year 1: ${year1}
        - Year 2: ${year2}

        Your primary function is to answer questions by comparing the data between these two specific years.
        - When a user asks for a comparison (e.g., "was performance better?", "compare spending"), you MUST use the data for ${year1} and ${year2}.
        - If data for either ${year1} or ${year2} is missing for a particular metric, you MUST explicitly state that the comparison cannot be made for that metric because the data is unavailable for one of the selected years.
        - Do not use data from any other years unless specifically asked.
        - Do not invent any information or metrics not present in the provided data. If you cannot answer from the data, state that the information is not available in the provided dataset.
        Here is the complete and only data you should use: \n\n${dataContext}`;

        try {
            // --- IMPORTANT ---
            // PASTE YOUR API KEY HERE
            const ai = new GoogleGenAI({ apiKey: 'AIzaSyDMPV28OaN-eHjPyXn6gqdlqf1dGliodRQ' });
            const newChat = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: { systemInstruction },
            });
            setChat(newChat);
            setMessages([
                { role: 'model', text: `Hello! I'm your AI assistant. You are viewing data for ${districtName}, comparing ${year1} with ${year2}. How can I help?` }
            ]);
        } catch (error) {
            console.error("Failed to initialize Gemini Chat:", error);
            setMessages([{ role: 'model', text: "Sorry, I'm having trouble connecting right now." }]);
        }

    }, [isOpen, districtData, stateName, districtName, year1, year2]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading || !chat) return;

        const userMessage: Message = { role: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await chat.sendMessage({ message: input });
            const modelText = typeof response.text === 'string' ? response.text : "Sorry, I received an empty response.";
            const modelMessage: Message = { role: 'model', text: modelText };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error("Gemini API error:", error);
            const errorMessage: Message = { role: 'model', text: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 w-[90vw] max-w-md h-[70vh] max-h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col z-20 transition-transform duration-300 ease-in-out transform origin-bottom-right">
        <header className="flex items-center justify-between p-4 bg-brand-dark text-white rounded-t-2xl">
            <h3 className="text-lg font-bold">AI Assistant</h3>
            <button onClick={onClose} aria-label="Close chat" className="hover:opacity-75">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </header>

        <div className="flex-1 p-4 overflow-y-auto bg-slate-50">
            <div className="space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeInUp`}>
                        <div className={`max-w-xs md:max-w-sm px-4 py-2 rounded-2xl shadow-md ${msg.role === 'user' ? 'bg-brand-primary text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                           <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                        </div>
                    </div>
                ))}
                 {isLoading && (
                    <div className="flex justify-start animate-fadeInUp">
                         <div className="max-w-xs md:max-w-sm px-4 py-3 rounded-2xl bg-slate-200 text-slate-800 rounded-bl-none shadow-md">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 border-t bg-white rounded-b-2xl">
            <div className="flex items-center bg-slate-100 rounded-lg">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about the data..."
                    className="flex-1 p-3 bg-transparent focus:outline-none text-sm"
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className="p-3 text-brand-primary disabled:text-slate-400 disabled:cursor-not-allowed hover:text-brand-dark" aria-label="Send message">
                    <SendIcon />
                </button>
            </div>
        </form>
    </div>
  );
};