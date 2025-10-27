import React from 'react';

const UpArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
    </svg>
);

const DownArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);


interface ComparisonMetricCardProps {
  title: string;
  value1: number;
  value2?: number;
  unit: string;
  isCurrency?: boolean;
  label1?: string;
  label2?: string;
}

const formatValue = (value: number, isCurrency: boolean, unit: string) => {
    const formatted = value.toLocaleString('en-IN', {
        minimumFractionDigits: isCurrency ? 0 : 2,
        maximumFractionDigits: 2,
    });
    return `${isCurrency ? '₹' : ''}${formatted}${unit}`;
};

const calculatePercentageChange = (val1: number, val2?: number) => {
    if (val2 === undefined || val2 === 0) return null;
    const change = ((val1 - val2) / val2) * 100;
    return change;
};

export const ComparisonMetricCard = ({ title, value1, value2, unit, isCurrency = false, label1, label2 }: ComparisonMetricCardProps) => {
    const percentageChange = calculatePercentageChange(value1, value2);
    
    let changeColor = 'text-slate-500';
    let changeText = 'No change';
    let ChangeIcon = null;

    if (percentageChange !== null && Math.abs(percentageChange) > 0.01) {
        if (percentageChange > 0) {
            changeColor = 'text-green-600';
            changeText = `+${percentageChange.toFixed(2)}%`;
            ChangeIcon = <UpArrowIcon />;
        } else {
            changeColor = 'text-red-600';
            changeText = `${percentageChange.toFixed(2)}%`;
            ChangeIcon = <DownArrowIcon />;
        }
    }


  return (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-slate-200 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div>
        <p className="text-base font-semibold text-slate-500">{title}</p>
        <p className="text-3xl font-bold mt-1 text-slate-800">
          {formatValue(value1, isCurrency, unit)}
        </p>
         <p className="text-sm text-slate-500">{label1}</p>
      </div>
      <div className="mt-4 pt-3 border-t">
        {value2 !== undefined && label2 ? (
            <div className="flex justify-between items-center text-sm">
                <div className={`flex items-center font-bold ${changeColor}`}>
                    {ChangeIcon}
                    <span>{changeText}</span>
                </div>
                <p className="text-slate-500">
                    vs {formatValue(value2, isCurrency, unit)} ({label2})
                </p>
            </div>
        ) : (
            <p className="text-sm text-slate-400">No comparison data selected.</p>
        )}
      </div>
    </div>
  );
};