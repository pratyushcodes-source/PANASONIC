import fs from 'fs';
import fetch from 'node-fetch';
import { ChromaClient } from 'chromadb';

const chroma = new ChromaClient({ path: 'http://localhost:8000' });
const collectionName = 'panasonic-faq';

async function getEmbedding(prompt) {
  const response = await fetch('http://localhost:11434/api/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'nomic-embed-text', prompt }),
  });

  const data = await response.json();
  return data.embedding;
}

async function run() {
  const raw = fs.readFileSync('./data/manual_qa.json', 'utf-8');
  const qaPairs = JSON.parse(raw);

  const collection = await chroma.getOrCreateCollection({ name: collectionName });

  for (let i = 0; i < qaPairs.length; i++) {
    const { question, answer } = qaPairs[i];
    const embedding = await getEmbedding(question);

    await collection.add({
      ids: [`q-${i}`],
      embeddings: [embedding],
      documents: [answer],
      metadatas: [{ source: 'manual' }]
    });

    console.log(`✅ Embedded Q${i + 1}: ${question}`);
  }

  console.log('🎉 All manual Q&A pairs embedded!');
}

run().catch(console.error);
