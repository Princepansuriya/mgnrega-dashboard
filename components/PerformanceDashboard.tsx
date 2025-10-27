import React, { useMemo } from 'react';
import type { MgnregaRecord } from '../types';
import { TrendChart } from './TrendChart';
import { ExpenditureChart } from './ExpenditureChart';
import { Welcome } from './Welcome';
import { DashboardSkeleton } from './DashboardSkeleton';
import { ComparisonMetricCard } from './ComparisonMetricCard';
import { YearComparisonChart } from './YearComparisonChart';

interface PerformanceDashboardProps {
  districtData: MgnregaRecord[];
  stateData: MgnregaRecord[];
  selectedDistrict: string | null;
  isLoading: boolean;
  financialYears: string[];
  year1: string;
  year2: string;
  onYear1Change: (year: string) => void;
  onYear2Change: (year: string) => void;
}

export const PerformanceDashboard = ({ 
    districtData, 
    stateData, 
    selectedDistrict, 
    isLoading,
    financialYears,
    year1,
    year2,
    onYear1Change,
    onYear2Change
}: PerformanceDashboardProps) => {
    
    // If we're loading data for a selected district, show the skeleton loader.
    if (isLoading && selectedDistrict) {
        return <DashboardSkeleton districtName={selectedDistrict} />;
    }
    
    const dataForYear1 = useMemo(() => {
        if (districtData.length === 0 || !year1) return null;
        return districtData.find(d => d.financial_year === year1) || null;
    }, [districtData, year1]);

    const dataForYear2 = useMemo(() => {
        if (districtData.length === 0 || !year2) return null;
        return districtData.find(d => d.financial_year === year2) || null;
    }, [districtData, year2]);
    
    if (!selectedDistrict) {
        return <Welcome />;
    }

    if (!dataForYear1) {
        return (
             <div className="text-center bg-yellow-100 p-8 mt-6 rounded-lg">
                <h2 className="text-2xl font-bold text-yellow-800">No Data Available</h2>
                <p className="mt-2 text-yellow-700">No performance data found for {selectedDistrict} in the selected year(s).</p>
            </div>
        );
    }
    
    return (
        <div className="mt-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-4 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
                    Report for {selectedDistrict}
                </h2>
                <div className="bg-white/70 p-3 rounded-xl border border-slate-200 backdrop-blur-sm w-full sm:w-auto">
                     <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2">
                            <label htmlFor="year1-select" className="font-semibold text-slate-600 text-sm whitespace-nowrap">Compare Year:</label>
                            <select
                                id="year1-select"
                                value={year1}
                                onChange={(e) => onYear1Change(e.target.value)}
                                className="pl-3 pr-8 py-1.5 text-sm bg-white text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
                            >
                                {financialYears.map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="year2-select" className="font-semibold text-slate-600 text-sm whitespace-nowrap">With Year:</label>
                            <select
                                id="year2-select"
                                value={year2}
                                onChange={(e) => onYear2Change(e.target.value)}
                                disabled={financialYears.length < 2}
                                className="pl-3 pr-8 py-1.5 text-sm bg-white text-slate-800 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary disabled:bg-slate-100 disabled:cursor-not-allowed"
                            >
                                 <option value="" disabled>Select Year</option>
                                {financialYears.filter(y => y !== year1).map(year => <option key={year} value={year}>{year}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <ComparisonMetricCard
                    title="Work Provided"
                    value1={dataForYear1.percentage_work_provided}
                    value2={dataForYear2?.percentage_work_provided}
                    unit="%"
                    label1={dataForYear1.financial_year}
                    label2={dataForYear2?.financial_year}
                />
                <ComparisonMetricCard
                    title="Avg. Employment"
                    value1={dataForYear1.avg_days_employment_per_household}
                    value2={dataForYear2?.avg_days_employment_per_household}
                    unit=" days"
                    label1={dataForYear1.financial_year}
                    label2={dataForYear2?.financial_year}
                />
                <ComparisonMetricCard
                    title="Work Demanded"
                    value1={dataForYear1.work_demanded_person_days}
                    value2={dataForYear2?.work_demanded_person_days}
                    unit=" Lakh"
                    label1={dataForYear1.financial_year}
                    label2={dataForYear2?.financial_year}
                />
                <ComparisonMetricCard
                    title="Total Spent"
                    value1={dataForYear1.total_expenditure_lakh}
                    value2={dataForYear2?.total_expenditure_lakh}
                    unit=" Lakh"
                    isCurrency={true}
                    label1={dataForYear1.financial_year}
                    label2={dataForYear2?.financial_year}
                />
            </div>

            <div className="space-y-6">
                 {dataForYear2 && (
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                        <YearComparisonChart districtData={districtData} year1={year1} year2={year2} />
                    </div>
                )}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                        <TrendChart districtData={districtData} financialYear={year1} />
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200">
                        <ExpenditureChart districtData={districtData} financialYear={year1} />
                    </div>
                </div>
            </div>
        </div>
    );
};