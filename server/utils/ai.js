// Optional AI helper. If AI_API_KEY is missing, everything returns safe defaults
// and the system keeps working normally.
export const isAIEnabled = () => Boolean(process.env.AI_API_KEY);

export const analyzeComplaint = async (title, description) => {
  const AI_KEY = process.env.AI_API_KEY;
  if (!AI_KEY) {
    return { category: 'general', priority: 'medium', aiSuggestion: '' };
  }
  try {
    const resp = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${AI_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.AI_MODEL || 'llama-3.1-8b-instant',
        max_tokens: 300,
        messages: [
          {
            role: 'user',
            content: `Categorize this PG complaint. Reply ONLY with JSON: {"category": one of [maintenance, cleanliness, food, wifi, security, billing, general], "priority": one of [low, medium, high], "aiSuggestion": short reply suggestion for the admin}.\n\nTitle: ${title}\nDescription: ${description}`,
          },
        ],
      }),
    });
    const data = await resp.json();
    const text = data.choices?.[0]?.message?.content || '';
    const parsed = JSON.parse(text.replace(/```json|```/g, '').trim());
    return {
      category: parsed.category || 'general',
      priority: parsed.priority || 'medium',
      aiSuggestion: parsed.aiSuggestion || '',
    };
  } catch (err) {
    console.error('AI analysis failed, falling back:', err.message);
    return { category: 'general', priority: 'medium', aiSuggestion: '' };
  }
};
