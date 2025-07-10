# 🤖 Panasonic Self-Help Chatbot

An AI-powered chatbot that delivers instant, accurate answers to customer queries using Panasonic product manuals and user reviews. Designed to reduce customer support load and improve the self-service experience.

---

## 📌 Table of Contents
- [Overview](#-project-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Screenshots](#-screenshots)
- [Planned Enhancements](#-planned-enhancements)
- [License](#-license)
- [Acknowledgements](#-acknowledgements)

---

## 🚀 Project Overview

This project aims to create an intelligent self-help assistant for Panasonic product users. It reads product manuals (in PDF format), converts them into searchable knowledge using vector embeddings, and answers user questions via a React-based chat interface.

The chatbot:
- Loads content from Panasonic product manuals
- Uses **Ollama** (local LLM) for embeddings
- Leverages **ChromaDB** for fast semantic search
- Dynamically updates suggested follow-up questions based on user input

---

## ✨ Features

✅ **PDF Parsing** – Extracts structured content from Panasonic manuals  
✅ **Vector Embedding** – Converts text into semantic vectors for better recall  
✅ **Local AI Models** – Uses Ollama to generate context-aware answers  
✅ **ChromaDB Integration** – Efficient vector search for document-level context  
✅ **Dynamic Suggestions** – Follow-up questions auto-update as the user types  
✅ **React Frontend** – Modern, responsive chat UI  
✅ **Modular Codebase** – Easy to extend or swap components  

---

## 🛠 Tech Stack

| Layer        | Technology                  |
|--------------|-----------------------------|
| Frontend     | React + TypeScript          |
| Backend      | Node.js + Python (scripts)  |
| Vector DB    | ChromaDB (local)            |
| Embeddings   | Ollama (local LLM)          |
| Data Sources | Panasonic Manuals (PDF), Reviews |

---

<pre lang="markdown"> ## 📁 Folder Structure
 ``` selfhelpbot-my-new-branch/ 
 ├── public/ # Static assets ├── 
 src/ 
 │ ├── components/ # React components 
 │ ├── services/ 
 │ │ └── geminiService.ts # Gemini API integration (optional) 
 │ └── App.tsx # Main application 
 ├── data/ # Extracted product manual content 
 ├── scripts/ # Data loaders and vector embedding tools
 ├── chroma/ # ChromaDB local setup 
 ├── chroma_server.py # Starts ChromaDB service
 ├── search_server.py # Backend search API 
 ├── start_chroma_server.py # Combined startup script
 ├── package.json # Node.js dependencies 
 └── README.md # Project documentation ``` </pre>



---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/pratyushcodes-source/PANASONIC.git
cd PANASONIC
2. Install Node.js Dependencies
bash
npm install
3. Start the Frontend
bash
npm run dev
4. Start the Chroma Search Server
bash
python start_chroma_server.py
⚠️ Note: Make sure you have Ollama installed and running locally with a supported model (e.g., llama3, mistral) before starting the vector search server.
Your PDF data should be preprocessed and embedded into the vector DB using your custom scripts.
 License
This project is developed for educational and internal research purposes only.
Please consult Panasonic before using it commercially or deploying it publicly.
---
🙌 Acknowledgements
📘 Panasonic official manuals and support material

🧠 Ollama — Run local LLMs

🗃 ChromaDB — Open-source vector DB

🔗 Gemini API (experimental feature)

💼 Internship support and guidance from the Panasonic team (2025)


