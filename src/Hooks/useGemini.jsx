import { GoogleGenAI } from "@google/genai";


export default function useGemini() {
    const [MSG, setMSG] = useState("");
  const [response, setResponse] = useState(null);
  const [laoding, setLoading] = useState(false);

  const gemini_api_key = "AIzaSyD-l32bnVTcdDZg8Ki-TuT26AmdpVBgwZQ";

  const ai = new GoogleGenAI({
    apiKey: gemini_api_key,
  });

  const sendMSG = async () => {
    try {
      setResponse(null);
      setLoading(true);
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: MSG }],
          },
        ],
      });
      setResponse(response);

    } catch (err) {
      console.error("Gemini error:", err);
    } finally {
      setLoading(false);
    }
  };
}