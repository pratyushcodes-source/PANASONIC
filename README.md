# Panasonic Self-Help Chatbot (Gemini Powered)

This project is a chatbot application designed to provide self-help and support for Panasonic products, with a focus on the Indian market. It is powered by Google's Gemini API for its conversational AI capabilities.

## Key Features

*   **Conversational AI:** Utilizes the Google Gemini API (`gemini-2.5-flash-preview-04-17`) for natural language understanding and response generation.
*   **India-Centric Support:** Tailored to provide information and assistance relevant to Panasonic products and services in India.
*   **Product Information & Troubleshooting:** Answers user queries about product features, specifications, and helps troubleshoot common issues.
*   **Review Summarization:** Can find and summarize publicly available user reviews for Panasonic products.
*   **Google Search Grounding:** Leverages Google Search to provide up-to-date information and access a wider range of public knowledge.
*   **Source Display:** When information is sourced from the web, the chatbot can display links to the original sources.
*   **Streaming Responses:** Bot responses are streamed in real-time for a more interactive experience.
*   **Suggested Questions:** Presents a list of "Popular Questions" to help users quickly find common information.
*   **Responsive Design:** Built with Tailwind CSS for a responsive user interface that works across various screen sizes.
*   **Modern UI:** Clean and intuitive chat interface built with React.

## Tech Stack

*   **Frontend:**
    *   React (v19 via CDN)
    *   TypeScript
    *   Tailwind CSS (v3 via CDN)
*   **AI & API:**
    *   Google Gemini API (`@google/genai` library via CDN)
*   **Icons:**
    *   Lucide Icons (via CDN)
*   **Development:**
    *   Served directly from `index.html` using ES Modules (no traditional bundler like Webpack/Vite in this setup).

## Project Structure

```
.
├── README.md                 # This file
├── index.html                # Main HTML entry point, loads CDNs and scripts
├── index.tsx                 # Initializes and renders the React application
├── App.tsx                   # Main React application component (UI, state management)
├── services/
│   └── geminiService.ts      # Logic for interacting with the Gemini API, chat initialization
├── components/               # Reusable UI components
│   ├── ChatInput.tsx         # Input field and send button
│   ├── Header.tsx            # Application header
│   ├── LoadingIndicator.tsx  # Loading animation
│   ├── MessageBubble.tsx     # Displays individual chat messages
│   ├── SuggestedQuestions.tsx # Displays FAQ/popular question boxes
│   └── icons/                # SVG icon components (BotIcon, SendIcon, UserIcon)
├── types.ts                  # TypeScript type definitions (ChatMessage, Sender, etc.)
└── metadata.json             # Basic metadata about the application
