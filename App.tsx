
import React, { useState, useCallback } from 'react';
import type { Page, FarmData, CropData, Photo } from './types';
import { generateReportSummary } from './services/geminiService';

import LoginScreen from './components/screens/LoginScreen';
import DashboardScreen from './components/screens/DashboardScreen';
import FarmAssessmentScreen from './components/screens/FarmAssessmentScreen';
import CropAssessmentScreen from './components/screens/CropAssessmentScreen';
import ReportScreen from './components/screens/ReportScreen';

const initialFarmData: FarmData = { farmerName: '', farmName: '', area: '', soilType: '' };
const initialCropData: CropData = { variety: '', cropStage: '', irrigationType: '', fertilizerUsed: '' };

export default function App() {
  const [page, setPage] = useState<Page>('login');
  const [farmData, setFarmData] = useState<FarmData>(initialFarmData);
  const [cropData, setCropData] = useState<CropData>(initialCropData);
  const [photo, setPhoto] = useState<Photo | null>(null);
  const [report, setReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleLogin = () => {
    setPage('dashboard');
  };

  const handleGenerateReport = useCallback(async () => {
    if (!farmData.farmerName || !cropData.variety) {
        setError('Please complete both farm and crop assessments before generating a report.');
        setPage('report');
        return;
    }
    setIsLoading(true);
    setError('');
    setReport('');
    setPage('report');
    
    try {
      const summary = await generateReportSummary(farmData, cropData);
      setReport(summary);
    } catch (e) {
      setError('An error occurred while generating the report.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [farmData, cropData]);
  
  const resetAssessments = () => {
    setFarmData(initialFarmData);
    setCropData(initialCropData);
    setPhoto(null);
    setReport('');
    setError('');
  };

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <LoginScreen onLogin={handleLogin} />;
      case 'dashboard':
        return <DashboardScreen setPage={setPage} resetAssessments={resetAssessments} />;
      case 'farm':
        return <FarmAssessmentScreen farmData={farmData} setFarmData={setFarmData} setPage={setPage} />;
      case 'crop':
        return <CropAssessmentScreen cropData={cropData} setCropData={setCropData} photo={photo} setPhoto={setPhoto} onGenerateReport={handleGenerateReport} setPage={setPage} />;
      case 'report':
        return <ReportScreen report={report} isLoading={isLoading} error={error} setPage={setPage} />;
      default:
        return <LoginScreen onLogin={handleLogin} />;
    }
  };

  return (
    <div className="bg-green-50 min-h-screen font-sans">
      <div className="relative mx-auto min-h-screen max-w-md bg-white shadow-2xl">
        {renderPage()}
      </div>
    </div>
  );
}
