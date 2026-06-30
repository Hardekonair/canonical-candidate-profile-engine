import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

import resumePrompt from "../prompts/resumePrompt.js";

dotenv.config();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

class GeminiExtractor {

    async extract(resumeText) {

        try {

            const prompt = resumePrompt(resumeText);

            const response = await ai.models.generateContent({

                model: "gemini-2.5-flash",

                contents: prompt

            });

            let text = response.text.trim();

            // Remove markdown if Gemini accidentally returns it
            text = text
                .replace(/```json/g, "")
                .replace(/```/g, "")
                .trim();

            const json = JSON.parse(text);

            return json;

        }

        catch (error) {

            console.error("\n❌ Gemini Extraction Failed\n");

            throw error;

        }

    }

}

export default new GeminiExtractor();