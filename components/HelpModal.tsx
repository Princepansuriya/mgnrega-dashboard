import React, { useEffect } from 'react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal = ({ isOpen, onClose }: HelpModalProps) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="help-modal-title"
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()} // Prevent clicks inside modal from closing it
      >
        <div className="p-6 border-b sticky top-0 bg-white">
          <div className="flex justify-between items-center">
            <h2 id="help-modal-title" className="text-2xl font-bold text-brand-dark">
              Help & Information
            </h2>
            <button 
              onClick={onClose} 
              className="text-slate-500 hover:text-slate-800"
              aria-label="Close help modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6 text-slate-700">
          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">How to Use This Tracker</h3>
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Select a District:</strong> Use the dropdown menu or the "Use My Location" button to choose the district you want to inspect.</li>
              <li><strong>View the Report Card:</strong> Once a district is selected, a performance report card will appear for the latest financial year.</li>
              <li><strong>Analyze the Charts:</strong>
                  <ul className="list-disc list-inside ml-4 mt-1">
                      <li><strong>Performance Trend:</strong> See how key metrics have changed over the years.</li>
                      <li><strong>Expenditure Over Years:</strong> Track the total spending in the district.</li>
                      <li><strong>District vs. State Average:</strong> Compare your district's performance against the state average for the latest year.</li>
                  </ul>
              </li>
               <li><strong>Download Data:</strong> Click the "Download CSV" button on any chart to save the data for your own analysis.</li>
            </ol>
          </section>

          <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Metric Definitions</h3>
            <dl className="space-y-3">
              <div>
                <dt className="font-semibold">Work Provided</dt>
                <dd className="ml-4">The percentage of person-days of work provided against the total person-days of work demanded by households. A higher percentage indicates better fulfillment of demand.</dd>
              </div>
              <div>
                <dt className="font-semibold">Avg. Employment</dt>
                <dd className="ml-4">The average number of days of employment provided to each household that worked under the scheme in a financial year.</dd>
              </div>
              <div>
                <dt className="font-semibold">Work Demanded</dt>
                <dd className="ml-4">The total number of person-days of work demanded by registered households, measured in Lakhs.</dd>
              </div>
              <div>
                <dt className="font-semibold">Total Spent</dt>
                <dd className="ml-4">The total expenditure on wages and materials for the scheme in a district for a financial year, measured in Lakhs of Rupees.</dd>
              </div>
            </dl>
          </section>

           <section>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Data Source</h3>
            <p>
              All data presented in this tracker is sourced from the official Government of India open data portal,{' '}
              <a href="https://data.gov.in" target="_blank" rel="noopener noreferrer" className="text-brand-dark font-medium hover:underline">
                data.gov.in
              </a>. This tool is an independent initiative to make this public data more accessible and understandable for citizens.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};