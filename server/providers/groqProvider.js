import Groq from "groq-sdk";

const client = new Groq({ apiKey: process.env.GROQ_API_KEY });

export default {
  generate: async ({ prompt }, opts = {}) => {
    const completion = await client.chat.completions.create({
      model: opts.model || "llama3-70b-8192", // or "llama3-70b-8192"
      messages: [
        { role: "system", content: "You are an AI diary sentiment analyzer." },
        { role: "user", content: prompt }
      ],
      max_tokens: opts.max_tokens || 512,
      temperature: opts.temperature ?? 0.7
    });

    return { text: completion.choices[0]?.message?.content || "" };
  }
};
