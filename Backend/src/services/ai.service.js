import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_KEY,
})


export async function askPrompt(prompt) {
  const response = await model.invoke(prompt);
  return response.content;
}