import fetch from 'node-fetch';
import { ChromaClient } from 'chromadb-client'; // ✅ Correct


const qaPairs = [
  {
    question: "What does U11 error mean on my Panasonic washing machine?",
    answer: "U11 means the washer is unable to drain. Clean the drain filter and check the outlet pipe."
  },
  {
    question: "How to reset a Panasonic microwave?",
    answer: "Unplug the unit for 30 seconds. Then plug it back in. This resets most Panasonic microwaves."
  },
  {
    question: "How long is the Panasonic AC warranty?",
    answer: "Typically, Panasonic air conditioners have 1 year product + 5 years compressor warranty."
  },
  // Add more real Q&A pairs here
];

async function getEmbedding(prompt: string): Promise<number[]> {
  const res = await fetch('http://localhost:11434/api/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'nomic-embed-text', prompt })
  });

  const data = await res.json();
  return data.embedding;
}

async function run() {
  const client = new ChromaClient();
  const collection = await client.getOrCreateCollection({ name: 'panasonic-faq' });

  for (const { question, answer } of qaPairs) {
    const embedding = await getEmbedding(question);
    await collection.add({
      ids: [question],
      embeddings: [embedding],
      documents: [answer],
      metadatas: [{ source: 'manual' }]
    });
    console.log(`✅ Stored: ${question}`);
  }

  console.log('🎉 All Q&A embedded and stored in Chroma.');
}

run().catch(console.error);
