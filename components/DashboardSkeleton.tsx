import React from 'react';

const SkeletonCard = () => (
    <div className="bg-white p-5 rounded-xl shadow-lg border border-slate-200 h-[148px]">
        <div className="animate-pulse flex flex-col justify-between h-full">
            <div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
                <div className="h-8 bg-slate-300 rounded w-1/2"></div>
            </div>
            <div className="h-3 bg-slate-200 rounded w-full mt-3"></div>
        </div>
    </div>
);

const SkeletonChart = () => (
    <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 animate-pulse">
        <div className="h-6 w-1/3 bg-slate-200 rounded mb-4"></div>
        <div className="h-[284px] bg-slate-200 rounded"></div>
    </div>
);


interface DashboardSkeletonProps {
  districtName: string;
}

export const DashboardSkeleton = ({ districtName }: DashboardSkeletonProps) => {
  return (
    <div className="mt-6 space-y-6" aria-live="polite" aria-busy="true">
        <div className="animate-pulse">
            <h2 className="text-3xl font-bold text-slate-400 text-center mb-4">
                Loading Report for {districtName}...
            </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
        </div>

        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <SkeletonChart />
                <SkeletonChart />
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-slate-200 animate-pulse">
                <div className="h-6 w-1/3 bg-slate-200 rounded mb-4"></div>
                <div className="h-[284px] bg-slate-200 rounded"></div>
            </div>
        </div>
    </div>
  );
};