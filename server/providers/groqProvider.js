import Groq from "groq-sdk";

class GroqProvider {
  constructor() {
    this.client = new Groq({ 
      apiKey: process.env.GROQ_API_KEY 
    });
  }

  async generate(prompt, options = {}) {
    try {
      let inputPrompt = prompt;

      // ✅ Allow both: generate("string") OR generate({ prompt: "string" })
      if (typeof prompt === "object" && prompt?.prompt) {
        inputPrompt = prompt.prompt;
      }

      if (!inputPrompt || typeof inputPrompt !== "string") {
        throw new Error("Prompt is required and must be a string");
      }

      const defaultOptions = {
        model: "llama3-70b-8192",
        max_tokens: 512,
        temperature: 0.7,
        top_p: 1,
        stream: false,
        raw: false // return only text by default
      };

      const settings = { ...defaultOptions, ...options };

      const completion = await this.client.chat.completions.create({
        model: settings.model,
        messages: [
          {
            role: "system",
            content: `You are an empathetic AI journaling companion and sentiment analyzer. You help users with:
            - Emotional support and validation
            - Sentiment analysis of their thoughts and feelings  
            - Personalized wellness recommendations
            - Encouraging self-reflection and growth
            
            Always be:
            - Warm, compassionate, and non-judgmental
            - Specific and actionable in your advice
            - Supportive of mental health and wellbeing
            - Respectful of boundaries and privacy
            
            If someone seems in distress, gently suggest professional help while still providing immediate support.`
          },
          { role: "user", content: inputPrompt }
        ],
        max_tokens: settings.max_tokens,
        temperature: settings.temperature,
        top_p: settings.top_p,
        stream: settings.stream
      });

      const response = completion.choices[0]?.message?.content;

      if (!response) {
        throw new Error("No response generated from Groq API");
      }

      // ✅ Minimal mode for diary entries
      if (!settings.raw) {
        return { text: response.trim() };
      }

      // ✅ Raw mode with metadata
      return {
        text: response.trim(),
        model: settings.model,
        usage: completion.usage
      };

    } catch (error) {
      console.error("Groq API Error:", error);

      if (error.status === 401) {
        throw new Error("Invalid Groq API key");
      } else if (error.status === 429) {
        throw new Error("Groq API rate limit exceeded. Please try again later.");
      } else if (error.status === 500) {
        throw new Error("Groq service is temporarily unavailable");
      }

      throw new Error(`Groq API error: ${error.message || "Unknown error"}`);
    }
  }

  async analyzeSentiment(text, options = {}) {
    const sentimentPrompt = `
      Analyze the sentiment and emotional content of the following text:
      
      "${text}"
      
      Provide a JSON response with:
      - sentiment: "positive" | "negative" | "neutral" | "mixed"
      - confidence: number between 0-1
      - emotions: array of detected emotions
      - intensity: "low" | "medium" | "high"
      - keywords: array of key emotional words/phrases
      - summary: brief emotional summary
      
      Example format:
      {
        "sentiment": "positive",
        "confidence": 0.8,
        "emotions": ["joy", "gratitude"],
        "intensity": "medium",
        "keywords": ["happy", "thankful"],
        "summary": "The text expresses gratitude and contentment"
      }
    `;

    try {
      const response = await this.generate(sentimentPrompt, {
        ...options,
        temperature: 0.3, // lower temperature for consistent JSON
        raw: false
      });

      try {
        return {
          analysis: JSON.parse(response.text),
          raw: response.text
        };
      } catch (parseError) {
        console.warn("Could not parse sentiment analysis as JSON:", parseError);
        return {
          analysis: null,
          raw: response.text
        };
      }
    } catch (error) {
      throw new Error(`Sentiment analysis failed: ${error.message}`);
    }
  }

  async generateJournalPrompt(context = "") {
    const prompt = `
      Generate a thoughtful journaling prompt${context ? ` based on this context: "${context}"` : ""}.
      
      The prompt should:
      - Be open-ended and reflective
      - Encourage emotional exploration
      - Be specific enough to inspire writing
      - Be appropriate for mental health journaling
      
      Return just the prompt, no additional formatting.
    `;

    try {
      const response = await this.generate(prompt, { temperature: 0.8 });
      return response.text;
    } catch (error) {
      throw new Error(`Journal prompt generation failed: ${error.message}`);
    }
  }

  // ✅ Health check
  async healthCheck() {
    try {
      const response = await this.generate("Hello", { max_tokens: 10 });
      return {
        status: "healthy",
        response: response.text
      };
    } catch (error) {
      return {
        status: "unhealthy",
        error: error.message
      };
    }
  }
}

// ✅ Singleton instance
const groqProvider = new GroqProvider();

export default groqProvider;
