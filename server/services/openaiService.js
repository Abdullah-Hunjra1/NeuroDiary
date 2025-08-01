import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const analyzeSentiment = async (text) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a helpful assistant that performs sentiment analysis. Only return the result in this format: Mood: <mood>, Score: <score>. Do not add any explanation.',
        },
        {
          role: 'user',
          content: `Analyze the following diary entry:\n\n${text}`,
        },
      ],
    });

    const reply = response.choices[0].message.content;

    // Optional: log the raw result for debugging
    console.log('AI Response:', reply);

    return reply;
  } catch (error) {
    console.error('OpenAI Error:', error.message);
    return null;
  }
};
