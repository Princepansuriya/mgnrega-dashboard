import React, { useState } from 'react';
import { HelpModal } from './HelpModal';

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

export const Header = () => {
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center">
            <svg className="w-12 h-12 text-brand-primary mr-4 hidden sm:block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 015.962 0L14.25 6h5.25M4.5 19.5v-15a2.25 2.25 0 012.25-2.25h3.75m-5.25 15h10.5a2.25 2.25 0 002.25-2.25v-3.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 13.5v3.75a2.25 2.25 0 002.25 2.25z" />
            </svg>

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-brand-dark">
                MGNREGA District Report Card
              </h1>
              <p className="text-sm md:text-base text-slate-600 mt-1">
                Simple and Clear Performance Data for Every Citizen
              </p>
            </div>
          </div>
          
          <button
            onClick={() => setIsHelpOpen(true)}
            className="flex items-center gap-2 text-brand-dark font-semibold py-2 px-4 rounded-lg hover:bg-brand-light transition-colors"
            aria-label="Open help and information modal"
          >
            <HelpIcon />
            <span className="hidden md:inline">Help</span>
          </button>

        </div>
      </header>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </>
  );
};