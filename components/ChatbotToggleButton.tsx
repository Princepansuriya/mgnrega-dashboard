import React from 'react';

const ChatIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M5.337 21.726a1.5 1.5 0 01-2.067-1.465L3.5 18.5A3 3 0 016 15.5h12a3 3 0 013 3v.203a1.5 1.5 0 01-2.006 1.47l-2.68-1.149a1.5 1.5 0 00-1.416.002L13 19.975l-1.898-.949a3.75 3.75 0 00-3.506 0l-1.898.95a1.5 1.5 0 01-1.82.202zM8.577.932a.75.75 0 01.35.633L9 2.25v.005l.002.146a4.5 4.5 0 014.354 4.352L13.5 7h.25a3.75 3.75 0 013.75 3.75v.204a.75.75 0 01-1.494.137 2.25 2.25 0 00-2.25-2.25h-.25a4.5 4.5 0 01-4.5-4.5V6.57a.75.75 0 01-.633-.35L8.423.932z" clipRule="evenodd" />
        <path d="M11.5 12.5a1 1 0 100-2 1 1 0 000 2zM15 11.5a1 1 0 11-2 0 1 1 0 012 0zM7 11.5a1 1 0 11-2 0 1 1 0 012 0z" />
    </svg>
);

const CloseIcon = () => (
     <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
)

interface ChatbotToggleButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const ChatbotToggleButton = ({ onClick, isOpen }: ChatbotToggleButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-brand-dark text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-brand-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-transform duration-300 ease-in-out transform hover:scale-110"
      aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
    >
        {isOpen ? <CloseIcon /> : <ChatIcon />}
    </button>
  );
};