import { GoogleGenAI } from "@google/genai";
import { useState, useRef } from "react";

export default function useGemini() {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const cache = useRef({}); // cache لكل node

    // Gemini API key (should be moved to environment variables for security)
  const gemini_api_key = "AIzaSyD44mfMA6MVQ-pkky3ZbLmuJNQoY6CeTwU";

  const ai = new GoogleGenAI({
    apiKey: gemini_api_key,
  });

  const sendMSG = async (text) => {
    if (!text || loading) return;

    // لو اتسأل قبل كده رجّع من الكاش
    if (cache.current[text]) {
      setResponse(cache.current[text]);
      return;
    }

    try {
      setLoading(true);
      setResponse(null);

      const responseApi = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text }],
          },
        ],
      });

      const answer =
        responseApi.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No answer";

      cache.current[text] = answer; // خزّن الرد
      setResponse(answer);
    } catch (err) {
      console.error("Gemini error:", err);
      setResponse("⚠️ حصل خطأ أو تم الوصول للحد الأقصى");
    } finally {
      setLoading(false);
    }
  };

  return { response, loading, sendMSG };
}
