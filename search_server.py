from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from chromadb import Client
import requests

app = FastAPI()

# CORS to allow frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Later restrict to ["http://localhost:5173"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request schema
class SearchQuery(BaseModel):
    text: str

# Init Chroma
chroma_client = Client()
collection = chroma_client.get_or_create_collection(name="panasonic-faq")

# POST /search
@app.post("/search")
async def search_similar_questions(query: SearchQuery):
    # 🔸 Step 1: Get embedding using Ollama
    embedding_response = requests.post(
        "http://localhost:11434/api/embeddings",
        json={"model": "nomic-embed-text", "prompt": query.text},
    )
    embedding = embedding_response.json()["embedding"]

    # 🔸 Step 2: Query Chroma using embedding
    results = collection.query(
        query_embeddings=[embedding],
        n_results=5,
        include=["documents"]
    )

    # Debug print to verify matching
    print("🔍 Search results:", results)

    return {"results": results.get("documents", [[]])[0]}
