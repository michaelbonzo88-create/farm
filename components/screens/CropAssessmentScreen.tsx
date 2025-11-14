
import React, { useRef } from 'react';
import type { Page, CropData, Photo } from '../../types';
import Header from '../ui/Header';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Card } from '../ui/Card';
import { CameraIcon } from '../ui/Icons';

interface CropAssessmentScreenProps {
  cropData: CropData;
  setCropData: (data: CropData) => void;
  photo: Photo | null;
  setPhoto: (photo: Photo | null) => void;
  onGenerateReport: () => void;
  setPage: (page: Page) => void;
}

const CropAssessmentScreen: React.FC<CropAssessmentScreenProps> = ({
  cropData,
  setCropData,
  photo,
  setPhoto,
  onGenerateReport,
  setPage
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCropData({ ...cropData, [id]: value });
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto({
        file,
        previewUrl: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerateReport();
  };

  return (
    <div className="flex flex-col h-screen">
      <Header title="Crop Assessment" onBack={() => setPage('farm')} />
      <main className="flex-grow p-6 bg-gray-50 overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <Card>
              <div className="space-y-6">
                <Input id="variety" label="Crop / Variety" value={cropData.variety} onChange={handleChange} placeholder="e.g., Maize - SC719" required />
                <Input id="cropStage" label="Crop Stage" value={cropData.cropStage} onChange={handleChange} placeholder="e.g., Vegetative" required />
                <Input id="irrigationType" label="Irrigation Type" value={cropData.irrigationType} onChange={handleChange} placeholder="e.g., Drip Irrigation" required />
                <Input id="fertilizerUsed" label="Fertilizer Used" value={cropData.fertilizerUsed} onChange={handleChange} placeholder="e.g., Compound D" required />
              </div>
            </Card>

            <Card>
              <h3 className="font-semibold text-gray-800 mb-4">Farm Photo</h3>
              <input
                type="file"
                accept="image/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              {photo ? (
                <div className="text-center">
                  <img src={photo.previewUrl} alt="Farm preview" className="w-full h-auto max-h-64 object-cover rounded-lg mb-4" />
                  <Button variant="outline" type="button" onClick={() => setPhoto(null)}>
                    Remove Photo
                  </Button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:bg-gray-100 hover:border-green-400 hover:text-green-600 transition-colors"
                >
                  <CameraIcon className="w-12 h-12 mb-2" />
                  <span className="font-semibold">Take or Upload Photo</span>
                </button>
              )}
            </Card>
          </div>
          <div className="mt-8">
            <Button type="submit">
              Generate Report
            </Button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default CropAssessmentScreen;
