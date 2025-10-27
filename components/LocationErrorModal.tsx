import React, { useEffect } from 'react';

interface LocationErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  errorMessage: string;
}

const WarningIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
    </svg>
);


export const LocationErrorModal = ({ isOpen, onClose, errorMessage }: LocationErrorModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
        window.addEventListener('keydown', handleEsc);
    }
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="error-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-sm w-full text-center p-6"
        onClick={e => e.stopPropagation()}
      >
        <WarningIcon />
        <h2 id="error-modal-title" className="text-xl font-bold text-slate-800">
          Location Error
        </h2>
        <p className="text-slate-600 mt-2">
            {errorMessage}
        </p>
        <button
            onClick={onClose}
            className="mt-6 w-full bg-brand-primary text-white font-semibold py-2 px-4 rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary"
        >
            OK
        </button>
      </div>
    </div>
  );
};