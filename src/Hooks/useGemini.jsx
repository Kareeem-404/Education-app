/**
 * useGemini - Custom React hook for integrating Google's Gemini AI.
 * Handles AI API calls and manages message state.
 *
 * Returns:
 * - response: API response from Gemini
 * - loading: Loading state during API call
 * - sendMSG: Function to send message to Gemini
 * - MSG: Current message state
 * - setMSG: Function to update message state
 */
import { GoogleGenAI } from "@google/genai";
import { useState } from "react";

export default function useGemini() {
  // State for user message input
  const [MSG, setMSG] = useState("");
  // State for API response
  const [response, setResponse] = useState(null);
  // Loading state to track API call status
  const [loading, setLoading] = useState(false);

  // Gemini API key (should be moved to environment variables for security)
  // const gemini_api_key = 
  const gemini_api_key = import.meta.env.VITE_GEMINI_API_KEY;


  // Initialize Gemini AI client
  const ai = new GoogleGenAI({
    apiKey: gemini_api_key,
  });

  /**
   * sendMSG - Async function to send message to Gemini AI.
   * Clears previous response, sets loading state, and handles errors.
   */
  const sendMSG = async () => {
    try {
      setResponse(null); // Clear previous response
      setLoading(true); // Set loading state

      // Make API call to Gemini
      const responseApi = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: MSG }],
          },
        ],
      });
      const text = responseApi.candidates?.[0]?.content?.parts?.[0]?.text;
      // Store the response
      console.log("Gemini result:", responseApi);

      setResponse(text || "no answer from gemini");
    } catch (err) {
      // Log any errors that occur
      console.error("Gemini error:", err);
    } finally {
      // Always stop loading after API call completes
      setLoading(false);
    }
  };

  // Return hook values and functions
  return { response, loading, sendMSG, MSG, setMSG };
}
