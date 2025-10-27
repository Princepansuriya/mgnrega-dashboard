
import { useState, useEffect } from 'react';
import type { MgnregaRecord } from '../types';

interface UseMgnregaDataResult {
  data: MgnregaRecord[] | null;
  isLoading: boolean;
  error: string | null;
}

export const useMgnregaData = (): UseMgnregaDataResult => {
  const [data, setData] = useState<MgnregaRecord[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/mgnrega_data.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        
        // Data cleaning and type conversion
        const cleanedData: MgnregaRecord[] = jsonData.records.map((rec: any) => ({
          financial_year: rec.financial_year,
          state_name: rec.state_name,
          district_name: rec.district_name.trim().toUpperCase(),
          work_demanded_person_days: parseFloat(rec.total_no_of_person_days_of_work_demanded_in_lakh) || 0,
          work_provided_person_days: parseFloat(rec.total_no_of_person_days_of_work_provided_in_lakh) || 0,
          percentage_work_provided: parseFloat(rec.percentage_of_person_days_of_work_provided_against_demanded) || 0,
          avg_days_employment_per_household: parseFloat(rec.average_days_of_employment_provided_per_household) || 0,
          total_expenditure_lakh: parseFloat(rec.total_expenditure_incurred_in_lakh) || 0,
        }));
        
        setData(cleanedData);
      } catch (e) {
        if (e instanceof Error) {
            setError(`Failed to load performance data. The service might be temporarily unavailable. Please try again later. Error: ${e.message}`);
        } else {
            setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, isLoading, error };
};