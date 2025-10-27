import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import type { MgnregaRecord } from '../types';

interface ExpenditureChartProps {
  districtData: MgnregaRecord[];
  financialYear: string;
}

// FIX: Correctly type the custom tooltip props with a local interface to avoid issues with recharts' library types.
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: NameType;
    value: ValueType;
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
    const data = payload[0];
    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200" role="tooltip">
        <p className="font-bold text-slate-700 mb-2">Year: {label}</p>
        <div className="flex items-center">
          <div style={{ width: '10px', height: '10px', backgroundColor: data.color, marginRight: '8px' }}></div>
          <p className="text-sm text-slate-600">{`${data.name}: `}<span className="font-semibold">{`₹${Number(data.value).toLocaleString('en-IN')} Lakh`}</span></p>
        </div>
      </div>
    );
  }
  return null;
};


export const ExpenditureChart = ({ districtData, financialYear }: ExpenditureChartProps) => {
  const filteredData = districtData.filter(d => d.financial_year <= financialYear);
  const sortedData = [...filteredData].sort((a, b) => a.financial_year.localeCompare(b.financial_year));
  
  const chartData = sortedData.map(item => ({
    year: item.financial_year,
    'Total Expenditure (Lakh ₹)': parseFloat(item.total_expenditure_lakh.toFixed(2)),
  }));
  
  const districtName = districtData.length > 0 ? districtData[0].district_name : '';
  const startYear = sortedData.length > 0 ? sortedData[0].financial_year : '';
  const endYear = sortedData.length > 0 ? sortedData[sortedData.length - 1].financial_year : '';

  const handleDownload = () => {
    const headers = ['Year', 'Total Expenditure (Lakh ₹)'];
    const csvRows = [
      headers.join(','),
      ...chartData.map(row => `${row.year},${row['Total Expenditure (Lakh ₹)']}`)
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `expenditure_${districtName}_upto_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartDescription = `Bar chart showing the total expenditure on MGNREGA for ${districtName} over multiple financial years, from ${startYear} up to ${endYear}. Each bar represents a financial year, and its height indicates the total amount spent in Lakhs of Rupees.`;

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-700">Expenditure (up to {financialYear})</h3>
            <button
                onClick={handleDownload}
                className="flex items-center text-sm font-medium text-brand-dark bg-brand-light px-3 py-1 rounded-md hover:bg-green-100 transition-colors"
                aria-label="Download expenditure data as CSV"
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
            <XAxis dataKey="year" stroke="#475569" />
            <YAxis stroke="#475569" />
            <Tooltip 
                content={<CustomTooltip />} 
                cursor={{ fill: 'rgba(229, 231, 235, 0.5)' }} 
            />
            <Legend />
            <Bar dataKey="Total Expenditure (Lakh ₹)" fill="#4338ca" />
            </BarChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
};