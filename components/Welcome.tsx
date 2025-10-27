import React from 'react';

const MgnregaIllustration = () => (
    <svg width="100%" height="100%" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="illustration-title">
        <title id="illustration-title">An illustration of people working together in a rural community under the MGNREGA scheme.</title>
        <defs>
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#e0f2fe', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#f0f9ff', stopOpacity: 1 }} />
            </linearGradient>
            <linearGradient id="groundGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#d9f99d', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#a3e635', stopOpacity: 1 }} />
            </linearGradient>
        </defs>
        
        <rect width="400" height="300" fill="url(#skyGradient)" />
        
        <circle cx="350" cy="50" r="25" fill="#fef08a" />
        
        <path d="M0 200 C 80 180, 150 220, 250 200 S 350 180, 400 200 V 300 H 0 Z" fill="url(#groundGradient)" />
        
        <g transform="translate(80, 150) scale(0.8)">
            <circle cx="15" cy="15" r="15" fill="#f97316"/>
            <rect x="5" y="30" width="20" height="40" rx="5" fill="#fb923c" />
            <path d="M -5 70 Q 15 50, 35 70" stroke="#c2410c" strokeWidth="4" fill="none" strokeLinecap="round"/>
        </g>
        
        <g transform="translate(180, 130) scale(0.9)">
            <circle cx="20" cy="20" r="20" fill="#16a34a" />
            <rect x="10" y="40" width="20" height="50" rx="5" fill="#4ade80" />
            <line x1="-10" y1="60" x2="15" y2="80" stroke="#14532d" strokeWidth="5" strokeLinecap="round" />
            <line x1="25" y1="80" x2="50" y2="60" stroke="#14532d" strokeWidth="5" strokeLinecap="round" />
        </g>
        
        <g transform="translate(280, 160) scale(0.7)">
            <circle cx="10" cy="10" r="10" fill="#3b82f6" />
            <rect y="20" width="20" height="35" rx="5" fill="#60a5fa" />
            <rect x="-20" y="40" width="10" height="30" rx="3" fill="#93c5fd" transform="rotate(-30, -15, 55)" />
        </g>

        <path d="M 20 280 L 60 220 L 100 280 Z" fill="#22c55e" opacity="0.7"/>
        <path d="M 320 280 L 360 210 L 400 280 Z" fill="#84cc16" opacity="0.8"/>
    </svg>
);


export const Welcome = () => {
    return (
        <div className="bg-white mt-6 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 overflow-hidden">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="lg:w-1/2 text-center lg:text-left">
                    <h2 className="text-3xl sm:text-4xl font-bold text-brand-dark tracking-tight">
                        Your Window into Local Employment
                    </h2>
                    <p className="mt-4 text-lg text-slate-600">
                        Track progress, compare performance, and see how the MGNREGA scheme is working for your community.
                    </p>
                    <div className="mt-8 flex items-center justify-center lg:justify-start gap-3 bg-brand-light p-4 rounded-lg">
                         <svg className="w-8 h-8 text-brand-dark animate-bounce" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                        </svg>
                        <p className="font-semibold text-brand-dark text-lg">
                            Select a district above to get started!
                        </p>
                    </div>
                </div>
                <div className="lg:w-1/2 w-full max-w-md lg:max-w-none">
                   <div className="aspect-[4/3] rounded-lg overflow-hidden border-4 border-white shadow-2xl">
                        <MgnregaIllustration />
                    </div>
                </div>
            </div>
        </div>
    );
};