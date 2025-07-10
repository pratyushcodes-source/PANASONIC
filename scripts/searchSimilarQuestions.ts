// scripts/searchSimilarQuestions.ts
export async function searchSimilarQuestions(query: string): Promise<string[]> {
  try {
    const response = await fetch('http://localhost:9000/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch suggestions from FastAPI backend.');
    }

    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('❌ Error fetching similar questions:', error);
    return [];
  }
}
