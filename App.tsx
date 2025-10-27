import React, { useState, useMemo, useEffect } from 'react';
import { DistrictSelector } from './components/DistrictSelector';
import { PerformanceDashboard } from './components/PerformanceDashboard';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Loader } from './components/Loader';
import { useMgnregaData } from './hooks/useMgnregaData';
import { Chatbot } from './components/Chatbot';
import { ChatbotToggleButton } from './components/ChatbotToggleButton';
import type { MgnregaRecord } from './types';

function App() {
  const { data, isLoading, error } = useMgnregaData();
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [year1, setYear1] = useState<string>('');
  const [year2, setYear2] = useState<string>('');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const states = useMemo(() => {
    if (!data) return [];
    const stateSet = new Set(data.map(item => item.state_name));
    return Array.from(stateSet).sort();
  }, [data]);

  const districts = useMemo(() => {
    if (!data || !selectedState) return [];
    const districtSet = new Set(data.filter(item => item.state_name === selectedState).map(item => item.district_name));
    return Array.from(districtSet).sort();
  }, [data, selectedState]);

  const handleStateSelect = (state: string) => {
    setSelectedState(state);
    setSelectedDistrict(null); // Reset district when state changes
  };

  const handleDistrictSelect = (district: string) => {
    setSelectedDistrict(district);
  };

  const selectedDistrictData = useMemo(() => {
    if (!data || !selectedDistrict) return [];
    return data.filter(item => item.district_name === selectedDistrict && item.state_name === selectedState);
  }, [data, selectedState, selectedDistrict]);
  
  const selectedStateData = useMemo(() => {
    if (!data || !selectedState) return [];
    return data.filter(item => item.state_name === selectedState);
  }, [data, selectedState]);

  const financialYears = useMemo(() => {
    if (selectedDistrictData.length === 0) return [];
    const years = new Set(selectedDistrictData.map(d => d.financial_year));
    return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending
  }, [selectedDistrictData]);

  useEffect(() => {
    if (financialYears.length > 0) {
        setYear1(financialYears[0]);
        if (financialYears.length > 1) {
            setYear2(financialYears[1]);
        } else {
            setYear2('');
        }
    } else {
        setYear1('');
        setYear2('');
    }
  }, [financialYears]);

  const handleYear1Change = (newYear: string) => {
    setYear1(newYear);
    if (newYear === year2) {
        const otherAvailableYears = financialYears.filter(y => y !== newYear);
        if (otherAvailableYears.length > 0) {
            setYear2(otherAvailableYears[0]);
        } else {
            setYear2('');
        }
    }
  };


  return (
    <div className="min-h-screen font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-5xl mx-auto">
          <DistrictSelector 
            states={states}
            districts={districts} 
            onStateSelect={handleStateSelect}
            onSelect={handleDistrictSelect} 
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            isDisabled={isLoading || !!error}
          />

          {isLoading && !selectedDistrict && <Loader />}
          {error && <div className="text-center text-red-600 bg-red-100 p-4 rounded-lg mt-6">{error}</div>}
          
          {!error && (
            <PerformanceDashboard 
                isLoading={isLoading}
                districtData={selectedDistrictData} 
                stateData={selectedStateData}
                selectedDistrict={selectedDistrict} 
                financialYears={financialYears}
                year1={year1}
                year2={year2}
                onYear1Change={handleYear1Change}
                onYear2Change={setYear2}
            />
          )}
        </div>
      </main>
      <Footer />

      {!isLoading && !error && selectedDistrict && (
          <>
            <ChatbotToggleButton onClick={() => setIsChatbotOpen(!isChatbotOpen)} isOpen={isChatbotOpen} />
            <Chatbot
                isOpen={isChatbotOpen}
                onClose={() => setIsChatbotOpen(false)}
                districtData={selectedDistrictData}
                stateName={selectedState}
                districtName={selectedDistrict}
                year1={year1}
                year2={year2}
            />
          </>
      )}

    </div>
  );
}

export default App;