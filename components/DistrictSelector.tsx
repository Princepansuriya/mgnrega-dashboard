import React, { useState } from 'react';
import { GoogleGenAI, Type } from '@google/genai';
import { LocationErrorModal } from './LocationErrorModal';

interface DistrictSelectorProps {
  states: string[];
  districts: string[];
  onStateSelect: (state: string) => void;
  onSelect: (district: string) => void;
  selectedState: string | null;
  selectedDistrict: string | null;
  isDisabled: boolean;
}

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const SelectIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-slate-400">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m-3-1l-3-1m-3 1l-3 1m-3-1l3 1m0 0l3 1.636m-3-1.636l-3 1.636" />
    </svg>
);


export const DistrictSelector = ({ states, districts, onStateSelect, onSelect, selectedState, selectedDistrict, isDisabled }: DistrictSelectorProps) => {
    const [isDetecting, setIsDetecting] = useState(false);
    const [locationError, setLocationError] = useState<string | null>(null);

    const handleDetectLocation = () => {
        setIsDetecting(true);
        setLocationError(null);
        
        if (!selectedState || districts.length === 0) {
            setLocationError("Please select a state first, then try detecting your location.");
            setIsDetecting(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    // --- IMPORTANT ---
                    // PASTE YOUR API KEY HERE
                    const ai = new GoogleGenAI({ apiKey: 'AIzaSyDMPV28OaN-eHjPyXn6gqdlqf1dGliodRQ' });
                    const response = await ai.models.generateContent({
                        model: 'gemini-2.5-flash',
                        contents: `You are an expert geographer for India, specializing in reverse geocoding. Your task is to determine the administrative district for a given set of coordinates within a specific state. Analyze the latitude ${position.coords.latitude} and longitude ${position.coords.longitude}. Consider proximity to major cities, landmarks, and administrative boundaries within the state of ${selectedState}. Your answer must be one of the following districts: [${districts.join(', ')}]. Provide your answer in a structured JSON format, including a confidence score and your reasoning.`,
                        config: {
                            responseMimeType: "application/json",
                            responseSchema: {
                                type: Type.OBJECT,
                                properties: {
                                    districtName: {
                                        type: Type.STRING,
                                        description: 'The identified district name from the provided list.'
                                    },
                                    confidenceScore: {
                                        type: Type.NUMBER,
                                        description: 'A confidence score from 0.0 to 1.0 of how certain you are about the district.'
                                    },
                                    reasoning: {
                                        type: Type.STRING,
                                        description: 'A brief explanation for your choice, mentioning proximity to any known locations.'
                                    }
                                },
                                required: ['districtName', 'confidenceScore', 'reasoning']
                            }
                        }
                    });
                    
                    const text = response.text;
                    if (typeof text !== 'string' || text.trim() === '') {
                        throw new Error('Empty or missing response text from AI model');
                    }
                    const result = JSON.parse(text);
                    const detectedDistrict = (result.districtName || '').trim().toUpperCase();

                    if (districts.map(d=>d.toUpperCase()).includes(detectedDistrict)) {
                         const matchingDistrict = districts.find(d => d.toUpperCase() === detectedDistrict);
                         if(matchingDistrict) onSelect(matchingDistrict);
                    } else {
                        setLocationError(`We couldn't reliably match your location to a district in ${selectedState}. The model suggested "${result.districtName}" which is not in the list. Please select one manually.`);
                    }
                } catch (error) {
                    console.error("Gemini API or JSON parsing error:", error);
                    setLocationError("An error occurred while determining your district. Please select it manually.");
                } finally {
                    setIsDetecting(false);
                }
            },
            (error) => {
                let message = 'Geolocation failed. Please enable location services in your browser or select your district manually.';
                if (error.code === error.PERMISSION_DENIED) {
                    message = 'Location access was denied. Please grant permission or select your district manually.';
                } else if (error.code === error.TIMEOUT) {
                    message = 'Could not get your location in time. Please try again or select manually.';
                }
                setLocationError(message);
                setIsDetecting(false);
            },
            { timeout: 10000 }
        );
    };

    return (
        <>
        <section aria-labelledby="district-selector-heading" className={`p-4 sm:p-6 rounded-xl shadow-lg border border-slate-200 transition-colors duration-300 ${selectedDistrict ? 'bg-green-100' : 'bg-white'}`}>
            <div className="flex items-center gap-4">
                <SelectIcon />
                <div>
                     <h2 id="district-selector-heading" className="text-lg sm:text-xl font-bold text-slate-800">
                        Select Your Location
                    </h2>
                    <p className="text-slate-500" id="district-selector-desc">Choose a state and district to view its MGNREGA performance report.</p>
                </div>
            </div>
           
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4">
                <div className="relative w-full md:w-1/3">
                    <select
                        id="state-select"
                        aria-label="Select State"
                        value={selectedState || ''}
                        onChange={(e) => onStateSelect(e.target.value)}
                        disabled={isDisabled}
                        className="w-full pl-3 pr-10 py-3 text-base bg-white text-slate-800 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary appearance-none disabled:bg-slate-100"
                    >
                        <option value="" disabled>-- Select a State --</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>
                <div className="relative w-full md:flex-1">
                    <select
                        id="district-select"
                        aria-label="Select District"
                        value={selectedDistrict || ''}
                        onChange={(e) => onSelect(e.target.value)}
                        disabled={isDisabled || !selectedState}
                        className="w-full pl-3 pr-10 py-3 text-base bg-white text-slate-800 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary appearance-none disabled:bg-slate-100 disabled:text-slate-500"
                    >
                        <option value="" disabled>{selectedState ? '-- Select a District --' : '-- Select a State First --'}</option>
                        {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700">
                         <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                </div>

                <button
                    onClick={handleDetectLocation}
                    disabled={isDetecting || isDisabled}
                    aria-describedby={locationError ? 'location-error-desc' : undefined}
                    className="w-full md:w-auto flex-shrink-0 flex items-center justify-center px-4 py-3 bg-brand-dark text-white font-semibold rounded-lg shadow-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors duration-300"
                >
                    {isDetecting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Detecting...
                        </>
                    ) : (
                        <>
                            <LocationIcon />
                            Use My Location
                        </>
                    )}
                </button>
            </div>
        </section>

        <LocationErrorModal 
            isOpen={!!locationError}
            onClose={() => setLocationError(null)}
            errorMessage={locationError || ''}
        />
        </>
    );
};