
import React from 'react';
import type { Page } from '../../types';
import Header from '../ui/Header';
import { Button } from '../ui/Button';
import { SpinnerIcon } from '../ui/Icons';
import { Card } from '../ui/Card';

interface ReportScreenProps {
  report: string;
  isLoading: boolean;
  error: string;
  setPage: (page: Page) => void;
}

const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, index) => {
        line = line.trim();
        if (line.startsWith('### ')) return <h3 key={index} className="text-xl font-bold text-green-800 mt-4 mb-2">{line.substring(4)}</h3>;
        if (line.startsWith('## ')) return <h2 key={index} className="text-2xl font-bold text-green-900 mt-6 mb-3">{line.substring(3)}</h2>;
        if (line.startsWith('# ')) return <h1 key={index} className="text-3xl font-bold text-green-900 mt-8 mb-4">{line.substring(2)}</h1>;
        if (line.startsWith('**') && line.endsWith('**')) return <p key={index} className="font-bold my-1 text-gray-800">{line.substring(2, line.length - 2)}</p>;
        if (line.startsWith('* ') || line.startsWith('- ')) return <li key={index} className="ml-5 list-disc text-gray-700">{line.substring(2)}</li>;
        if (line === '') return <div key={index} className="h-4"></div>;
        return <p key={index} className="my-1 text-gray-700 leading-relaxed">{line}</p>;
    });
};

const ReportScreen: React.FC<ReportScreenProps> = ({ report, isLoading, error, setPage }) => {
  return (
    <div className="flex flex-col h-screen">
      <Header title="Assessment Report" onBack={() => setPage('dashboard')} />
      <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
        {isLoading && (
          <div className="flex flex-col items-center justify-center text-center h-full">
            <SpinnerIcon />
            <h2 className="text-xl font-semibold text-green-700 mt-4">Generating Your Report...</h2>
            <p className="text-gray-500">This may take a moment.</p>
          </div>
        )}
        {error && (
            <Card className="border-l-4 border-red-500">
                <h2 className="text-lg font-bold text-red-700">Error</h2>
                <p className="text-red-600 mt-2">{error}</p>
            </Card>
        )}
        {!isLoading && !error && report && (
          <Card className="prose">
            {renderMarkdown(report)}
          </Card>
        )}
         {!isLoading && !error && !report && (
            <Card>
                <h2 className="text-lg font-bold text-gray-700">No Report Available</h2>
                <p className="text-gray-600 mt-2">Please complete an assessment to generate a new report.</p>
            </Card>
        )}
        <div className="mt-8">
            <Button variant="secondary" onClick={() => setPage('dashboard')}>
              Back to Dashboard
            </Button>
        </div>
      </main>
    </div>
  );
};

export default ReportScreen;
