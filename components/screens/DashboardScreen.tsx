
import React from 'react';
import type { Page } from '../../types';
import { Card } from '../ui/Card';
import { FarmIcon, CropIcon, ReportIcon } from '../ui/Icons';

interface DashboardScreenProps {
  setPage: (page: Page) => void;
  resetAssessments: () => void;
}

const DashboardScreen: React.FC<DashboardScreenProps> = ({ setPage, resetAssessments }) => {
    const handleNewAssessment = () => {
        resetAssessments();
        setPage('farm');
    }
    
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="p-6 bg-green-600 text-white shadow-lg">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-green-100">Welcome, Agronomist!</p>
        </header>
        
        <main className="flex-grow p-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">What would you like to do?</h2>
            <div className="grid grid-cols-1 gap-6">
            <DashboardCard
              icon={<FarmIcon />}
              title="New Assessment"
              description="Start a new farm and crop assessment."
              onClick={handleNewAssessment}
            />
            <DashboardCard
              icon={<ReportIcon />}
              title="View Last Report"
              description="Check the latest generated report."
              onClick={() => setPage('report')}
            />
            <DashboardCard
              icon={<CropIcon />}
              title="Quick Crop Log"
              description="Log crop data for the current farm."
              onClick={() => setPage('crop')}
            />
            </div>
        </main>
    </div>
  );
};

interface DashboardCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ icon, title, description, onClick }) => (
    <Card onClick={onClick} className="!p-4">
      <div className="flex items-center space-x-4">
        <div className="bg-green-100 p-3 rounded-full">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
        </div>
      </div>
    </Card>
);

export default DashboardScreen;
