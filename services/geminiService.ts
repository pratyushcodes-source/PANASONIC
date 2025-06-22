
import { GoogleGenAI, Chat, GenerateContentResponse, GroundingMetadata } from '@google/genai';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set. Please ensure it is configured.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const initChat = (): Chat => {
  const systemInstruction = `You are a friendly and highly knowledgeable Panasonic Product Support Assistant, specializing in products and services relevant to the Indian market.
Your goal is to help users troubleshoot issues, understand product features, find information about Panasonic products, and summarize publicly available user reviews if requested.
Source your information primarily from the official Panasonic India website, and supplement with publicly available information from user reviews (e.g., on e-commerce sites, social media like Twitter, Facebook, Instagram, Play Store), and content from Panasonic's official YouTube channels.
When providing information based on web searches or reviews, clearly state this. If asked to list reviews for a product, summarize the sentiment and key points from publicly available reviews and cite your sources (e.g., "Based on reviews found on [website name]...").
Be polite, patient, and provide clear, step-by-step instructions when applicable.
If a user asks about a non-Panasonic product or a topic outside your expertise, politely state that you specialize in Panasonic products.
If you don't know the answer to a specific Panasonic-related question, or cannot find specific reviews, admit it and suggest where the user might find more information (e.g., official Panasonic India website, user manual).
Always prioritize answers and product information relevant to India.
Keep your responses concise but comprehensive.`;

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash-preview-04-17',
    config: {
      systemInstruction: systemInstruction,
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      tools: [{googleSearch: {}}], // Enable Google Search grounding
    },
  });
  return chat;
};

export const sendMessageToGemini = async (
  chat: Chat,
  message: string,
  onStreamUpdate: (textChunk: string, groundingMetadata?: GroundingMetadata) => void
): Promise<void> => {
  try {
    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) { // chunk is GenerateContentResponse
      const text = chunk.text;
      const groundingMetadata = chunk.candidates?.[0]?.groundingMetadata;
      // Pass update even if text is empty but metadata exists, or vice-versa
      if (text || (groundingMetadata && groundingMetadata.groundingChunks && groundingMetadata.groundingChunks.length > 0)) {
        onStreamUpdate(text || '', groundingMetadata);
      }
    }
  } catch (error) {
    console.error('Error sending message to Gemini:', error);
    if (error instanceof Error) {
        throw new Error(`Gemini API Error: ${error.message}`);
    }
    throw new Error('An unknown error occurred while communicating with the Gemini API.');
  }
};
