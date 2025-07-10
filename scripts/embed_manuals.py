# scripts/embed_manuals.py

import os
import fitz  # PyMuPDF
from chromadb import Client
import requests

manuals_dir = "data/manuals"
chroma = Client()
collection = chroma.get_or_create_collection(name="panasonic-manuals")

# 🧠 Get embedding from Ollama
def get_embedding(text):
    res = requests.post("http://localhost:11434/api/embeddings", json={
        "model": "nomic-embed-text",
        "prompt": text
    })
    return res.json()["embedding"]

# 📄 Read and store from PDFs
for filename in os.listdir(manuals_dir):
    if filename.endswith(".pdf"):
        filepath = os.path.join(manuals_dir, filename)
        print(f"📘 Processing: {filename}")
        doc = fitz.open(filepath)

        for page_num, page in enumerate(doc):
            text = page.get_text()
            if not text.strip():
                continue

            # Optionally chunk long text
            chunks = [text[i:i+500] for i in range(0, len(text), 500)]
            for i, chunk in enumerate(chunks):
                embedding = get_embedding(chunk)
                collection.add(
                    ids=[f"{filename}-{page_num}-{i}"],
                    embeddings=[embedding],
                    documents=[chunk],
                    metadatas=[{"source": filename}]
                )
