import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { MgnregaRecord } from '../types';

interface YearComparisonChartProps {
  districtData: MgnregaRecord[];
  year1: string;
  year2: string;
}

// FIX: Correctly type the custom tooltip props with a local interface to avoid issues with recharts' library types.
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    name: string;
    value: number;
    color: string;
  }>;
  label?: string | number;
}

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 9.707a1 1 0 011.414 0L9 11.086V3a1 1 0 112 0v8.086l1.293-1.379a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200" role="tooltip">
        <p className="font-bold text-slate-700 mb-2">{label}</p>
        {payload.map((pld) => (
          <div key={pld.dataKey} className="flex items-center">
            <div style={{ width: '10px', height: '10px', backgroundColor: pld.color, marginRight: '8px', borderRadius: '50%' }}></div>
            <p className="text-sm text-slate-600">{`${pld.name}: `}<span className="font-semibold">{pld.value}</span></p>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const YearComparisonChart = ({ districtData, year1, year2 }: YearComparisonChartProps) => {
    const dataForYear1 = districtData.find(d => d.financial_year === year1);
    const dataForYear2 = districtData.find(d => d.financial_year === year2);
      
    if (!dataForYear1 || !dataForYear2) {
        return <div className="flex items-center justify-center h-[300px] text-slate-500">Not enough data to compare years.</div>;
    }

  const districtName = dataForYear1.district_name;

  const chartData = [
    {
      name: '% Work Provided',
      [year1]: parseFloat(dataForYear1.percentage_work_provided.toFixed(2)),
      [year2]: parseFloat(dataForYear2.percentage_work_provided.toFixed(2)),
    },
    {
      name: 'Avg. Employment Days',
      [year1]: parseFloat(dataForYear1.avg_days_employment_per_household.toFixed(2)),
      [year2]: parseFloat(dataForYear2.avg_days_employment_per_household.toFixed(2)),
    },
  ];

  const handleDownload = () => {
    const headers = ['Metric', year1, year2];
    const csvRows = [
      headers.join(','),
      ...chartData.map(row => `${row.name},${row[year1]},${row[year2]}`)
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `year_comparison_${districtName}_${year1}_vs_${year2}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartDescription = `Grouped bar chart comparing key metrics for ${districtName} between the financial years ${year1} and ${year2}. It visually compares '% Work Provided' and 'Avg. Employment Days'.`;

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-700">Year-over-Year Comparison ({year1} vs. {year2})</h3>
            <button
                onClick={handleDownload}
                className="flex items-center text-sm font-medium text-brand-dark bg-brand-light px-3 py-1 rounded-md hover:bg-green-100 transition-colors"
                aria-label="Download comparison data as CSV"
            >
                <DownloadIcon />
                Download CSV
            </button>
        </div>
        <div className="w-full h-[300px]" role="img" aria-label={chartDescription}>
        <ResponsiveContainer>
            <BarChart
            data={chartData}
            margin={{
                top: 5, right: 10, left: -10, bottom: 5,
            }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(229, 231, 235, 0.5)' }} 
            />
            <Legend />
            <Bar dataKey={year1} fill="#14532d" />
            <Bar dataKey={year2} fill="#f97316" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
};