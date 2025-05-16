import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"

dotenv.config()
const API_KEY = process.env.API_KEY
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const heart = async (req, res) => {
  const { PROMPT } = req.body
  try {
    const result = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: PROMPT,
    })

    const resultent_text = result.candidates[0].content.parts[0].text
    const jsonPart = resultent_text.split('```json')[1].split('```')[0].trim();
    const parsedResponse = JSON.parse(jsonPart)
    res.status(200).json(parsedResponse)
  } catch (error) {
    res.status(400).json({ error: error.message })
    console.log(error)
  }
}