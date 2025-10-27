import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { ValueType, NameType } from 'recharts/types/component/DefaultTooltipContent';
import type { MgnregaRecord } from '../types';

interface TrendChartProps {
  districtData: MgnregaRecord[];
  financialYear: string;
}

// FIX: Correctly type the custom tooltip props with a local interface to avoid issues with recharts' library types.
interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    dataKey: string;
    name: NameType;
    value: ValueType;
    stroke: string;
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
        <p className="font-bold text-slate-700 mb-2">Year: {label}</p>
        <ul className="space-y-1">
          {payload.map((pld) => (
            <li key={pld.dataKey} className="flex items-center">
              <div style={{ width: '10px', height: '10px', backgroundColor: pld.stroke, marginRight: '8px' }}></div>
              <p className="text-sm text-slate-600">{`${pld.name}: `}<span className="font-semibold">{pld.value} {pld.dataKey === 'Avg Employment Days' ? 'days' : '%'}</span></p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return null;
};


export const TrendChart = ({ districtData, financialYear }: TrendChartProps) => {
  const filteredData = districtData.filter(d => d.financial_year <= financialYear);
  const sortedData = [...filteredData].sort((a, b) => a.financial_year.localeCompare(b.financial_year));
  
  const chartData = sortedData.map(item => ({
    year: item.financial_year,
    'Avg Employment Days': parseFloat(item.avg_days_employment_per_household.toFixed(2)),
    '% Work Provided': parseFloat(item.percentage_work_provided.toFixed(2)),
  }));

  const districtName = districtData.length > 0 ? districtData[0].district_name : '';
  const startYear = sortedData.length > 0 ? sortedData[0].financial_year : '';
  const endYear = sortedData.length > 0 ? sortedData[sortedData.length - 1].financial_year : '';

  const handleDownload = () => {
    const headers = ['Year', 'Avg Employment Days', '% Work Provided'];
    const csvRows = [
      headers.join(','),
      ...chartData.map(row => `${row.year},${row['Avg Employment Days']},${row['% Work Provided']}`)
    ];
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `trend_${districtName}_upto_${financialYear}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const chartDescription = `Area chart showing performance trends in ${districtName} from financial year ${startYear} up to ${endYear}. The chart plots two lines: 'Average Employment Days' measured on the left axis, and 'Percentage of Work Provided' measured on the right axis, showing how these metrics have changed over the years.`;


  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-slate-700">Performance Trend (up to {financialYear})</h3>
            <button
                onClick={handleDownload}
                className="flex items-center text-sm font-medium text-brand-dark bg-brand-light px-3 py-1 rounded-md hover:bg-green-100 transition-colors"
                aria-label="Download trend data as CSV"
            >
                <DownloadIcon />
                Download CSV
            </button>
        </div>
        <div className="w-full h-[300px]" role="img" aria-label={chartDescription}>
        <ResponsiveContainer>
            <AreaChart
            data={chartData}
            margin={{
                top: 5, right: 10, left: -10, bottom: 5,
            }}
            >
            <defs>
                <linearGradient id="colorDays" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#14532d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#14532d" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorPercent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#c2410c" stopOpacity={0.7}/>
                <stop offset="95%" stopColor="#c2410c" stopOpacity={0}/>
                </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" stroke="#475569" />
            <YAxis yAxisId="left" stroke="#14532d" />
            <YAxis yAxisId="right" orientation="right" stroke="#c2410c" />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area yAxisId="left" type="monotone" dataKey="Avg Employment Days" stroke="#14532d" fillOpacity={1} fill="url(#colorDays)" strokeWidth={3} activeDot={{ r: 8 }} dot={{ r: 5 }}/>
            <Area yAxisId="right" type="monotone" dataKey="% Work Provided" stroke="#c2410c" fillOpacity={1} fill="url(#colorPercent)" strokeWidth={3} activeDot={{ r: 8 }} dot={{ r: 5 }}/>
            </AreaChart>
        </ResponsiveContainer>
        </div>
    </div>
  );
};