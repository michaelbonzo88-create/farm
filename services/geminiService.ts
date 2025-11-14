
import { GoogleGenAI } from "@google/genai";
import type { FarmData, CropData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateReportSummary = async (farmData: FarmData, cropData: CropData): Promise<string> => {
  if (!process.env.API_KEY) {
    return Promise.resolve(`
# MOCK REPORT (API Key Not Found)

This is a sample report because a Gemini API key was not available. Please configure your API key to generate a live report.

### Farm Overview
- **Farmer:** ${farmData.farmerName}
- **Farm:** ${farmData.farmName}
- **Area:** ${farmData.area} hectares
- **Soil Type:** ${farmData.soilType}

### Crop Health Assessment
- **Variety:** ${cropData.variety}
- **Stage:** ${cropData.cropStage}
- **Irrigation:** ${cropData.irrigationType}
- **Fertilizer:** ${cropData.fertilizerUsed}

### Key Recommendations
1.  **Soil Test:** Conduct a comprehensive soil test to determine nutrient deficiencies.
2.  **Pest Scouting:** Implement a weekly pest scouting schedule.
3.  **Irrigation Schedule:** Adjust irrigation frequency based on the current crop stage and weather conditions.

### Summary
The farm shows good potential. Adhering to the recommendations will likely improve yield and crop health.
    `);
  }

  const prompt = `
    As an expert agronomist, create a concise report summary for a farm visit.
    The report should be structured with the following sections using Markdown formatting:
    1.  **Farm Overview**: Briefly describe the farm based on the provided details.
    2.  **Crop Health Assessment**: Analyze the crop status based on the provided data.
    3.  **Key Recommendations**: Provide 3-5 clear, actionable recommendations for the farmer.
    4.  **Summary**: A concluding paragraph.

    Use a professional but easy-to-understand tone.

    **FARM DATA:**
    - Farmer's Name: ${farmData.farmerName || 'N/A'}
    - Farm Name: ${farmData.farmName || 'N/A'}
    - Total Area: ${farmData.area || 'N/A'} hectares
    - Soil Type: ${farmData.soilType || 'N/A'}

    **CROP DATA:**
    - Crop Variety: ${cropData.variety || 'N/A'}
    - Current Crop Stage: ${cropData.cropStage || 'N/A'}
    - Irrigation Method: ${cropData.irrigationType || 'N/A'}
    - Fertilizer Used: ${cropData.fertilizerUsed || 'N/A'}

    Generate the report now.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating report:", error);
    throw new Error("Could not generate the report via Gemini API.");
  }
};
