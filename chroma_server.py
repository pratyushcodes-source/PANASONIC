from chromadb import Client
from chromadb.config import Settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import chromadb.server.fastapi as chroma_api

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:5173"] for tighter security
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount Chroma's FastAPI endpoints
app.mount("/", chroma_api.fastapi_app())

# Run with: uvicorn chroma_server:app --port 8000
