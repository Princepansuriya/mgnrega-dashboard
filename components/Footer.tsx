import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white mt-8 py-4 border-t">
      <div className="container mx-auto px-4 text-center text-sm text-slate-500">
        <p>
          Data sourced from{' '}
          <a
            href="https://data.gov.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-dark font-medium hover:underline"
          >
            data.gov.in
          </a>
          . This is an independent project for better data accessibility.
        </p>
        <p className="mt-1">&copy; {new Date().getFullYear()} MGNREGA Performance Tracker. All rights reserved.</p>
      </div>
    </footer>
  );
};