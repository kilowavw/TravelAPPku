import { GoogleGenAI, Type } from "@google/genai";
import { TravelPreferences, ItineraryResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTravelPlan = async (prefs: TravelPreferences): Promise<ItineraryResponse> => {
  const prompt = `Buatkan rencana perjalanan wisata ke ${prefs.destination} selama ${prefs.duration} hari. 
  Budget saya adalah ${prefs.budget}. Minat saya meliputi: ${prefs.interests}.
  
  Instruksi Khusus:
  1. Berikan deskripsi singkat (1-2 kalimat) yang menarik untuk setiap aktivitas.
  2. Berikan 'imageKeyword' dalam bahasa INGGRIS yang spesifik untuk men-generate gambar aktivitas tersebut (contoh: "beautiful sunset at Tanah Lot temple bali" atau "eating nasi goreng in jakarta street food").
  3. Gunakan bahasa Indonesia yang persuasif dan vibe liburan yang menyenangkan.
  
  Berikan output dalam format JSON yang valid.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          tripTitle: { type: Type.STRING, description: "Judul perjalanan yang menarik" },
          summary: { type: Type.STRING, description: "Ringkasan singkat tentang vibe perjalanan ini" },
          itinerary: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                day: { type: Type.INTEGER },
                theme: { type: Type.STRING, description: "Tema hari ini, misal: Eksplorasi Budaya" },
                activities: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      time: { type: Type.STRING, description: "Waktu aktivitas, misal: 09:00 - 11:00" },
                      activity: { type: Type.STRING, description: "Nama aktivitas utama" },
                      location: { type: Type.STRING, description: "Nama tempat/lokasi spesifik untuk pencarian maps" },
                      description: { type: Type.STRING, description: "Deskripsi singkat dan menarik tentang aktivitas ini" },
                      imageKeyword: { type: Type.STRING, description: "Keyword spesifik dalam bahasa Inggris untuk generate gambar pemandangan/aktivitas ini" }
                    },
                    required: ["time", "activity", "location", "description", "imageKeyword"]
                  }
                }
              },
              required: ["day", "theme", "activities"]
            }
          }
        },
        required: ["tripTitle", "summary", "itinerary"]
      }
    }
  });

  if (response.text) {
    return JSON.parse(response.text) as ItineraryResponse;
  }
  
  throw new Error("Gagal menghasilkan rencana perjalanan.");
};