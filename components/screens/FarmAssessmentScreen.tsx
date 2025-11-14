
import React from 'react';
import type { Page, FarmData } from '../../types';
import Header from '../ui/Header';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';

interface FarmAssessmentScreenProps {
  farmData: FarmData;
  setFarmData: (data: FarmData) => void;
  setPage: (page: Page) => void;
}

const FarmAssessmentScreen: React.FC<FarmAssessmentScreenProps> = ({ farmData, setFarmData, setPage }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFarmData({ ...farmData, [id]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage('crop');
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Farm Assessment" onBack={() => setPage('dashboard')} />
      <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <div className="space-y-6">
              <Input id="farmerName" label="Farmer Name" value={farmData.farmerName} onChange={handleChange} placeholder="e.g., Jane Smith" required />
              <Input id="farmName" label="Farm Name" value={farmData.farmName} onChange={handleChange} placeholder="e.g., Green Valley Farms" required />
              <Input id="area" label="Area (Hectares)" type="number" value={farmData.area} onChange={handleChange} placeholder="e.g., 50" required />
              <Input id="soilType" label="Soil Type" value={farmData.soilType} onChange={handleChange} placeholder="e.g., Loamy Sand" required />
            </div>
          </Card>
          <div className="mt-8">
            <Button type="submit">
              Next: Crop Details
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default FarmAssessmentScreen;
