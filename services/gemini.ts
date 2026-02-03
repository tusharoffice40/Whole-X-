
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateProductDescription(productName: string, category: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a compelling, SEO-optimized B2B wholesale description for a product named "${productName}" in the category "${category}". Focus on bulk benefits, quality, and reseller margins. Keep it under 100 words.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "Description could not be generated at this time.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error generating AI description.";
  }
}

export async function getMarketInsight(category: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Provide 3 short, punchy wholesale market insights for the ${category} industry in 2024. Format as a bulleted list.`,
    });
    return response.text;
  } catch (error) {
    return "Market insights currently unavailable.";
  }
}
