export type OpenAiCompletionResponse = {
  reply: string;
  model: string;
  createdAt: string;
};

export async function generateAiReply(message: string, context: string): Promise<OpenAiCompletionResponse> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      reply: `Cloud AI is ready for configuration. Request: "${message}". Context: ${context}. Add OPENAI_API_KEY to enable real ChatGPT/OpenAI responses.`,
      model: 'fallback-orchestrator',
      createdAt: new Date().toISOString()
    };
  }

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a secure creative workstation AI assistant. Be concise, practical, and privacy-aware. Do not make destructive changes without explicit user approval.'
        },
        {
          role: 'user',
          content: `Context: ${context}\nUser request: ${message}`
        }
      ],
      temperature: 0.6
    })
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`OpenAI API call failed: ${response.status} ${body}`);
  }

  const data = (await response.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
    model?: string;
  };

  const content = data.choices?.[0]?.message?.content?.trim();

  if (!content) {
    throw new Error('OpenAI response had no content.');
  }

  return {
    reply: content,
    model: data.model ?? process.env.OPENAI_MODEL ?? 'gpt-4o-mini',
    createdAt: new Date().toISOString()
  };
}
