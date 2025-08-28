
// import { NlpManager } from 'node-nlp';
// import diaryModel from '../models/diaryModel.js';
// import groqProvider from '../providers/groqProvider.js';

// class VoiceController {
//   constructor() {
//     this.manager = new NlpManager({ languages: ['en'], forceNER: true });
//     this.initializeNLP();
//   }

//   async initializeNLP() {
//     // Train intents for diary operations
//     this.manager.addDocument('en', 'create a new diary', 'create.diary');
//     this.manager.addDocument('en', 'write diary', 'create.diary');
//     this.manager.addDocument('en', 'new entry', 'create.diary');
//     this.manager.addDocument('en', 'start journaling', 'create.diary');

//     this.manager.addDocument('en', 'show my last entry', 'read.last');
//     this.manager.addDocument('en', 'read last entry', 'read.last');
//     this.manager.addDocument('en', 'what did I write last', 'read.last');

//     this.manager.addDocument('en', 'what was my mood last week', 'mood.summary');
//     this.manager.addDocument('en', 'show mood trends', 'mood.summary');
//     this.manager.addDocument('en', 'mood analysis', 'mood.summary');
//     this.manager.addDocument('en', 'how have I been feeling', 'mood.summary');

//     this.manager.addDocument('en', 'analyze my sentiment', 'sentiment.analyze');
//     this.manager.addDocument('en', 'how am I feeling', 'sentiment.analyze');
//     this.manager.addDocument('en', 'what is my current mood', 'sentiment.analyze');

//     // Add answers
//     this.manager.addAnswer('en', 'create.diary', 'Sure! What would you like to write today?');
//     this.manager.addAnswer('en', 'read.last', 'Fetching your most recent diary entry...');
//     this.manager.addAnswer('en', 'mood.summary', 'Analyzing your recent moods...');
//     this.manager.addAnswer('en', 'sentiment.analyze', 'Let me analyze your current emotional state...');

//     await this.manager.train();
//     this.manager.save();
//   }

//   async handleVoiceCommand(req, res) {
//     try {
//       const { command } = req.body;
//       const userId = req.user._id;

//       if (!command || command.trim().length === 0) {
//         return res.status(400).json({ 
//           success: false, 
//           message: 'Command is required and cannot be empty' 
//         });
//       }

//       // Process the command with NLP
//       const result = await this.manager.process('en', command.toLowerCase());
//       const intent = result.intent;
//       const confidence = result.score;

//       console.log(`Intent: ${intent}, Confidence: ${confidence}`);

//       // Handle specific intents
//       if (confidence > 0.5) {
//         switch (intent) {
//           case 'read.last':
//             return await this.handleLastEntry(userId, res);
          
//           case 'mood.summary':
//             return await this.handleMoodSummary(userId, res);
          
//           case 'sentiment.analyze':
//             return await this.handleSentimentAnalysis(command, userId, res);
          
//           case 'create.diary':
//             return await this.handleCreateDiary(command, userId, res);
//         }
//       }

//       // For general journaling input or low confidence intents → send to Groq AI
//       return await this.handleGeneralJournaling(command, userId, res);
      
//     } catch (error) {
//       console.error('Voice command error:', error);
//       return res.status(500).json({ 
//         success: false, 
//         message: 'Internal server error',
//         error: process.env.NODE_ENV === 'development' ? error.message : undefined
//       });
//     }
//   }

//   async handleLastEntry(userId, res) {
//     try {
//       const lastEntry = await diaryModel.findOne({ userId }).sort({ createdAt: -1 });
      
//       if (!lastEntry) {
//         return res.json({
//           success: true,
//           intent: 'read.last',
//           response: 'No diary entries found. Would you like to create your first entry?',
//         });
//       }

//       const formattedDate = lastEntry.createdAt.toLocaleDateString('en-US', {
//         weekday: 'long',
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       });

//       return res.json({
//         success: true,
//         intent: 'read.last',
//         response: `Your last entry from ${formattedDate} was titled "${lastEntry.title}". ${lastEntry.content ? lastEntry.content.substring(0, 150) + '...' : ''}`,
//         data: lastEntry
//       });
//     } catch (error) {
//       throw new Error(`Failed to fetch last entry: ${error.message}`);
//     }
//   }

//   async handleMoodSummary(userId, res) {
//     try {
//       const last7Days = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
//       const entries = await diaryModel.find({ 
//         userId, 
//         createdAt: { $gte: last7Days } 
//       }).sort({ createdAt: -1 });

//       if (entries.length === 0) {
//         return res.json({
//           success: true,
//           intent: 'mood.summary',
//           response: 'No entries found in the last 7 days. Start journaling to track your mood patterns!',
//         });
//       }

//       const moods = entries.filter(e => e.mood).map(e => e.mood);
//       const moodSummary = moods.reduce((acc, mood) => {
//         acc[mood] = (acc[mood] || 0) + 1;
//         return acc;
//       }, {});

//       const totalEntries = entries.length;
//       const moodEntries = moods.length;

//       let summaryText = `Over the last 7 days, you've made ${totalEntries} entries`;
//       if (moodEntries > 0) {
//         const dominantMood = Object.entries(moodSummary).reduce((a, b) => a[1] > b[1] ? a : b)[0];
//         summaryText += ` with mood tracking. Your most frequent mood was ${dominantMood}.`;
//       } else {
//         summaryText += `, but no mood data was recorded.`;
//       }

//       return res.json({ 
//         success: true, 
//         intent: 'mood.summary', 
//         response: summaryText,
//         data: {
//           summary: moodSummary,
//           totalEntries,
//           moodEntries,
//           period: '7 days'
//         }
//       });
//     } catch (error) {
//       throw new Error(`Failed to generate mood summary: ${error.message}`);
//     }
//   }

//   async handleSentimentAnalysis(command, userId, res) {
//     try {
//       // Get recent entries for context
//       const recentEntries = await diaryModel.find({ userId })
//         .sort({ createdAt: -1 })
//         .limit(3);

//       const contextText = recentEntries.map(entry => entry.content).join(' ').substring(0, 500);
      
//       const prompt = `
//         Analyze the sentiment and emotional state based on:
        
//         Current input: "${command}"
//         Recent journal context: "${contextText}"
        
//         Please provide:
//         1. Current emotional state assessment
//         2. Detected sentiment (positive/negative/neutral) with confidence
//         3. Key emotional indicators
//         4. Brief supportive response
//         5. One actionable recommendation
        
//         Format as a supportive, empathetic response.
//       `;

//       const aiResponse = await groqProvider.generate(prompt);
      
//       return res.json({
//         success: true,
//         intent: 'sentiment.analyze',
//         response: aiResponse.text,
//         type: 'sentiment_analysis'
//       });
//     } catch (error) {
//       throw new Error(`Failed to analyze sentiment: ${error.message}`);
//     }
//   }

//   async handleCreateDiary(command, userId, res) {
//     try {
//       const prompt = `
//         The user wants to create a diary entry and said: "${command}"
        
//         Help them start journaling by:
//         1. Acknowledging their intent
//         2. Asking a thoughtful follow-up question to help them reflect
//         3. Providing a gentle prompt to get them started
        
//         Be warm, encouraging, and supportive.
//       `;

//       const aiResponse = await groqProvider.generate(prompt);
      
//       return res.json({
//         success: true,
//         intent: 'create.diary',
//         response: aiResponse.text,
//         type: 'diary_creation_prompt'
//       });
//     } catch (error) {
//       throw new Error(`Failed to handle diary creation: ${error.message}`);
//     }
//   }

//   async handleGeneralJournaling(command, userId, res) {
//     try {
//       // Get user's recent entries for personalized context
//       const recentEntries = await diaryModel.find({ userId })
//         .sort({ createdAt: -1 })
//         .limit(2);

//       let contextPrompt = '';
//       if (recentEntries.length > 0) {
//         const recentMoods = recentEntries.filter(e => e.mood).map(e => e.mood);
//         if (recentMoods.length > 0) {
//           contextPrompt = `\nRecent mood context: The user's recent moods have been ${recentMoods.join(', ')}.`;
//         }
//       }

//       const prompt = `
//         The user said: "${command}"${contextPrompt}
        
//         You are a compassionate AI journaling companion. Please:
        
//         1. **Listen & Acknowledge**: Reflect what they've shared with empathy
//         2. **Analyze Sentiment**: Identify the emotional tone (positive/negative/mixed/neutral)
//         3. **Provide Insight**: Offer a gentle observation or reflection
//         4. **Support**: Give one specific, actionable suggestion for their wellbeing
//         5. **Encourage**: End with supportive, forward-looking words
        
//         Keep your response warm, personal, and under 200 words. Focus on being genuinely helpful rather than generic.
//       `;

//       const aiResponse = await groqProvider.generate(prompt, {
//         temperature: 0.7,
//         max_tokens: 300
//       });

//       return res.json({
//         success: true,
//         intent: 'general.journal',
//         response: aiResponse.text,
//         type: 'general_journaling'
//       });
//     } catch (error) {
//       throw new Error(`Failed to process general journaling: ${error.message}`);
//     }
//   }
// }

// // Create a singleton instance
// const voiceController = new VoiceController();

// export const handleVoiceCommand = voiceController.handleVoiceCommand.bind(voiceController);






// -------------------------------- 







import { NlpManager } from 'node-nlp';
import diaryModel from '../models/diaryModel.js';
import groqProvider from '../providers/groqProvider.js';

class VoiceController {
  constructor() {
    this.manager = new NlpManager({ languages: ['en'], forceNER: true });
    this.initializeNLP();
  }

  async initializeNLP() {
    // Train intents for diary operations
    this.manager.addDocument('en', 'create a new diary', 'create.diary');
    this.manager.addDocument('en', 'write diary', 'create.diary');
    this.manager.addDocument('en', 'new entry', 'create.diary');
    this.manager.addDocument('en', 'start journaling', 'create.diary');

    this.manager.addDocument('en', 'show my last entry', 'read.last');
    this.manager.addDocument('en', 'read last entry', 'read.last');
    this.manager.addDocument('en', 'what did I write last', 'read.last');

    this.manager.addDocument('en', 'what was my mood last week', 'mood.summary');
    this.manager.addDocument('en', 'show mood trends', 'mood.summary');
    this.manager.addDocument('en', 'mood analysis', 'mood.summary');
    this.manager.addDocument('en', 'how have I been feeling', 'mood.summary');
    this.manager.addDocument('en', 'mood chart', 'mood.summary');
    this.manager.addDocument('en', 'mood statistics', 'mood.summary');

    this.manager.addDocument('en', 'give me recommendations', 'recommendations');
    this.manager.addDocument('en', 'what should I do', 'recommendations');
    this.manager.addDocument('en', 'wellness tips', 'recommendations');
    this.manager.addDocument('en', 'self care advice', 'recommendations');

    this.manager.addDocument('en', 'analyze my sentiment', 'sentiment.analyze');
    this.manager.addDocument('en', 'how am I feeling', 'sentiment.analyze');
    this.manager.addDocument('en', 'what is my current mood', 'sentiment.analyze');

    // Add answers
    this.manager.addAnswer('en', 'create.diary', 'Sure! What would you like to write today?');
    this.manager.addAnswer('en', 'read.last', 'Fetching your most recent diary entry...');
    this.manager.addAnswer('en', 'mood.summary', 'Analyzing your recent moods...');
    this.manager.addAnswer('en', 'sentiment.analyze', 'Let me analyze your current emotional state...');
    this.manager.addAnswer('en', 'recommendations', 'Generating personalized recommendations...');

    await this.manager.train();
    this.manager.save();
  }

  async handleVoiceCommand(req, res) {
    try {
      const { command } = req.body;
      const userId = req.user._id;

      if (!command || command.trim().length === 0) {
        return res.status(400).json({ 
          success: false, 
          message: 'Command is required and cannot be empty' 
        });
      }

      // Process the command with NLP
      const result = await this.manager.process('en', command.toLowerCase());
      const intent = result.intent;
      const confidence = result.score;

      console.log(`Intent: ${intent}, Confidence: ${confidence}`);

      // Handle specific intents
      if (confidence > 0.5) {
        switch (intent) {
          case 'read.last':
            return await this.handleLastEntry(userId, res);
          
          case 'mood.summary':
            return await this.handleMoodSummary(userId, res);
          
          case 'recommendations':
            return await this.handleRecommendations(userId, res);
          
          case 'sentiment.analyze':
            return await this.handleSentimentAnalysis(command, userId, res);
          
          case 'create.diary':
            return await this.handleCreateDiary(command, userId, res);
        }
      }

      // For general journaling input or low confidence intents → send to Groq AI
      return await this.handleGeneralJournaling(command, userId, res);
      
    } catch (error) {
      console.error('Voice command error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  }

  async handleMoodSummary(userId, res) {
    try {
      const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const entries = await diaryModel.find({ 
        userId, 
        createdAt: { $gte: last30Days } 
      }).sort({ createdAt: -1 });

      if (entries.length === 0) {
        return res.json({
          success: true,
          intent: 'mood.summary',
          response: 'No entries found in the last 30 days. Start journaling to track your mood patterns!',
          type: 'mood_chart',
          chartData: null
        });
      }

      // Process mood data for charts
      const moodData = this.processMoodDataForCharts(entries);
      
      return res.json({ 
        success: true, 
        intent: 'mood.summary', 
        response: `Mood analysis complete! You've made ${entries.length} entries in the last 30 days.`,
        type: 'mood_chart',
        chartData: moodData
      });
    } catch (error) {
      throw new Error(`Failed to generate mood summary: ${error.message}`);
    }
  }

  async handleRecommendations(userId, res) {
    try {
      const recentEntries = await diaryModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(5);

      if (recentEntries.length === 0) {
        return res.json({
          success: true,
          intent: 'recommendations',
          response: 'Start journaling to get personalized recommendations!',
          type: 'recommendations_chart',
          chartData: null
        });
      }

      const recommendations = await this.generatePersonalizedRecommendations(recentEntries);
      
      return res.json({
        success: true,
        intent: 'recommendations',
        response: 'Here are your personalized wellness recommendations based on your recent entries.',
        type: 'recommendations_chart',
        chartData: recommendations
      });
    } catch (error) {
      throw new Error(`Failed to generate recommendations: ${error.message}`);
    }
  }

  processMoodDataForCharts(entries) {
    // Weekly mood trends
    const weeklyMoods = {};
    const moodCounts = {};
    const dailyMoods = [];

    entries.forEach(entry => {
      if (entry.mood) {
        // Count overall moods
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
        
        // Weekly grouping
        const week = this.getWeekLabel(entry.createdAt);
        if (!weeklyMoods[week]) weeklyMoods[week] = {};
        weeklyMoods[week][entry.mood] = (weeklyMoods[week][entry.mood] || 0) + 1;
        
        // Daily data
        dailyMoods.push({
          date: entry.createdAt.toISOString().split('T')[0],
          mood: entry.mood,
          moodScore: this.moodToScore(entry.mood),
          title: entry.title
        });
      }
    });

    // Prepare chart data
    const chartData = {
      // Pie chart data for mood distribution
      moodDistribution: Object.entries(moodCounts).map(([mood, count]) => ({
        name: mood,
        value: count,
        percentage: Math.round((count / entries.length) * 100)
      })),

      // Line chart data for mood trends over time
      moodTrends: dailyMoods.sort((a, b) => new Date(a.date) - new Date(b.date)),

      // Bar chart data for weekly averages
      weeklyAverages: Object.entries(weeklyMoods).map(([week, moods]) => {
        const totalScore = Object.entries(moods).reduce((sum, [mood, count]) => {
          return sum + (this.moodToScore(mood) * count);
        }, 0);
        const totalEntries = Object.values(moods).reduce((sum, count) => sum + count, 0);
        
        return {
          week,
          averageScore: Math.round((totalScore / totalEntries) * 10) / 10,
          totalEntries
        };
      }),

      // Summary statistics
      summary: {
        totalEntries: entries.length,
        moodEntries: entries.filter(e => e.mood).length,
        dominantMood: Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b)?.[0] || 'none',
        averageMoodScore: this.calculateAverageMoodScore(entries)
      }
    };

    return chartData;
  }

  async generatePersonalizedRecommendations(entries) {
    const recentMoods = entries.filter(e => e.mood).map(e => e.mood);
    const recentContent = entries.map(e => e.content).join(' ').substring(0, 500);
    
    // Analyze patterns
    const moodCounts = recentMoods.reduce((acc, mood) => {
      acc[mood] = (acc[mood] || 0) + 1;
      return acc;
    }, {});

    const dominantMood = Object.entries(moodCounts).reduce((a, b) => a[1] > b[1] ? a : b)?.[0];
    
    // Generate recommendations based on mood patterns
    const recommendations = {
      categories: [
        {
          name: 'Physical Wellness',
          score: this.calculateWellnessScore('physical', recentMoods),
          recommendations: this.getPhysicalRecommendations(dominantMood),
          color: '#10b981'
        },
        {
          name: 'Mental Health',
          score: this.calculateWellnessScore('mental', recentMoods),
          recommendations: this.getMentalHealthRecommendations(dominantMood),
          color: '#3b82f6'
        },
        {
          name: 'Social Connection',
          score: this.calculateWellnessScore('social', recentMoods),
          recommendations: this.getSocialRecommendations(dominantMood),
          color: '#8b5cf6'
        },
        {
          name: 'Self Care',
          score: this.calculateWellnessScore('selfcare', recentMoods),
          recommendations: this.getSelfCareRecommendations(dominantMood),
          color: '#f59e0b'
        }
      ],
      overallScore: this.calculateOverallWellnessScore(recentMoods),
      priorityActions: this.getPriorityActions(dominantMood, recentMoods),
      moodInsight: `Your recent mood pattern shows ${dominantMood ? `predominantly ${dominantMood}` : 'varied'} emotions.`
    };

    return recommendations;
  }

  // Helper methods
  getWeekLabel(date) {
    const week = Math.ceil((date.getDate() - date.getDay()) / 7);
    const month = date.toLocaleString('default', { month: 'short' });
    return `${month} Week ${week}`;
  }

  moodToScore(mood) {
    const moodScores = {
      'very_happy': 5,
      'happy': 4,
      'neutral': 3,
      'sad': 2,
      'very_sad': 1,
      'anxious': 2,
      'excited': 4,
      'angry': 1,
      'calm': 4,
      'stressed': 2
    };
    return moodScores[mood] || 3;
  }

  calculateAverageMoodScore(entries) {
    const moodEntries = entries.filter(e => e.mood);
    if (moodEntries.length === 0) return 3;
    
    const totalScore = moodEntries.reduce((sum, entry) => {
      return sum + this.moodToScore(entry.mood);
    }, 0);
    
    return Math.round((totalScore / moodEntries.length) * 10) / 10;
  }

  calculateWellnessScore(category, recentMoods) {
    const avgMoodScore = recentMoods.length > 0 
      ? recentMoods.reduce((sum, mood) => sum + this.moodToScore(mood), 0) / recentMoods.length
      : 3;
    
    // Adjust score based on category and recent mood patterns
    const baseScore = (avgMoodScore / 5) * 100;
    const categoryMultipliers = {
      'physical': 0.9,
      'mental': 1.1,
      'social': 0.95,
      'selfcare': 1.0
    };
    
    return Math.round(baseScore * (categoryMultipliers[category] || 1));
  }

  calculateOverallWellnessScore(recentMoods) {
    if (recentMoods.length === 0) return 60;
    
    const avgScore = recentMoods.reduce((sum, mood) => sum + this.moodToScore(mood), 0) / recentMoods.length;
    return Math.round((avgScore / 5) * 100);
  }

  getPhysicalRecommendations(dominantMood) {
    const recommendations = {
      'happy': ['Continue your current exercise routine', 'Try a new outdoor activity'],
      'sad': ['Take a gentle walk in nature', 'Try light stretching or yoga'],
      'anxious': ['Practice deep breathing exercises', 'Try progressive muscle relaxation'],
      'stressed': ['Go for a run or bike ride', 'Try high-intensity interval training'],
      'neutral': ['Establish a regular exercise routine', 'Try a new fitness class']
    };
    return recommendations[dominantMood] || recommendations['neutral'];
  }

  getMentalHealthRecommendations(dominantMood) {
    const recommendations = {
      'happy': ['Practice gratitude journaling', 'Share your positive energy with others'],
      'sad': ['Consider talking to a counselor', 'Practice self-compassion exercises'],
      'anxious': ['Try meditation or mindfulness', 'Limit caffeine and news consumption'],
      'stressed': ['Practice time management techniques', 'Consider delegating tasks'],
      'neutral': ['Explore mindfulness practices', 'Set small, achievable goals']
    };
    return recommendations[dominantMood] || recommendations['neutral'];
  }

  getSocialRecommendations(dominantMood) {
    const recommendations = {
      'happy': ['Organize a gathering with friends', 'Volunteer for a cause you care about'],
      'sad': ['Reach out to a trusted friend', 'Join a support group or community'],
      'anxious': ['Schedule low-pressure social activities', 'Practice social skills in safe spaces'],
      'stressed': ['Communicate your needs to others', 'Set healthy boundaries'],
      'neutral': ['Join a new club or hobby group', 'Reconnect with old friends']
    };
    return recommendations[dominantMood] || recommendations['neutral'];
  }

  getSelfCareRecommendations(dominantMood) {
    const recommendations = {
      'happy': ['Celebrate your achievements', 'Try a new creative hobby'],
      'sad': ['Take a warm bath or shower', 'Listen to uplifting music'],
      'anxious': ['Create a calming evening routine', 'Practice aromatherapy'],
      'stressed': ['Schedule regular breaks', 'Try a digital detox'],
      'neutral': ['Establish a morning routine', 'Explore new self-care practices']
    };
    return recommendations[dominantMood] || recommendations['neutral'];
  }

  getPriorityActions(dominantMood, recentMoods) {
    const lowMoodCount = recentMoods.filter(m => this.moodToScore(m) <= 2).length;
    
    if (lowMoodCount >= recentMoods.length * 0.6) {
      return [
        'Consider speaking with a mental health professional',
        'Focus on basic self-care: sleep, nutrition, and gentle exercise',
        'Reach out to trusted friends or family members'
      ];
    }
    
    return [
      'Continue your current positive practices',
      'Try one new wellness activity this week',
      'Maintain regular journaling to track patterns'
    ];
  }

  // Keep existing methods (handleLastEntry, handleSentimentAnalysis, etc.)
  async handleLastEntry(userId, res) {
    try {
      const lastEntry = await diaryModel.findOne({ userId }).sort({ createdAt: -1 });
      
      if (!lastEntry) {
        return res.json({
          success: true,
          intent: 'read.last',
          response: 'No diary entries found. Would you like to create your first entry?',
        });
      }

      const formattedDate = lastEntry.createdAt.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return res.json({
        success: true,
        intent: 'read.last',
        response: `Your last entry from ${formattedDate} was titled "${lastEntry.title}". ${lastEntry.content ? lastEntry.content.substring(0, 150) + '...' : ''}`,
        data: lastEntry
      });
    } catch (error) {
      throw new Error(`Failed to fetch last entry: ${error.message}`);
    }
  }

  async handleSentimentAnalysis(command, userId, res) {
    try {
      const recentEntries = await diaryModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(3);

      const contextText = recentEntries.map(entry => entry.content).join(' ').substring(0, 500);
      
      const prompt = `
        Analyze the sentiment and emotional state based on:
        Current input: "${command}"
        Recent journal context: "${contextText}"
        
        Please provide:
        1. Current emotional state assessment
        2. Detected sentiment (positive/negative/neutral) with confidence
        3. Key emotional indicators
        4. Brief supportive response
        5. One actionable recommendation
        
        Format as a supportive, empathetic response.
      `;

      const aiResponse = await groqProvider.generate(prompt);
      
      return res.json({
        success: true,
        intent: 'sentiment.analyze',
        response: aiResponse.text,
        type: 'sentiment_analysis'
      });
    } catch (error) {
      throw new Error(`Failed to analyze sentiment: ${error.message}`);
    }
  }

  async handleCreateDiary(command, userId, res) {
    try {
      const prompt = `
        The user wants to create a diary entry and said: "${command}"
        Help them start journaling by:
        1. Acknowledging their intent
        2. Asking a thoughtful follow-up question to help them reflect
        3. Providing a gentle prompt to get them started
        
        Be warm, encouraging, and supportive.
      `;

      const aiResponse = await groqProvider.generate(prompt);
      
      return res.json({
        success: true,
        intent: 'create.diary',
        response: aiResponse.text,
        type: 'diary_creation_prompt'
      });
    } catch (error) {
      throw new Error(`Failed to handle diary creation: ${error.message}`);
    }
  }

  async handleGeneralJournaling(command, userId, res) {
    try {
      const recentEntries = await diaryModel.find({ userId })
        .sort({ createdAt: -1 })
        .limit(2);

      let contextPrompt = '';
      if (recentEntries.length > 0) {
        const recentMoods = recentEntries.filter(e => e.mood).map(e => e.mood);
        if (recentMoods.length > 0) {
          contextPrompt = `\nRecent mood context: The user's recent moods have been ${recentMoods.join(', ')}.`;
        }
      }

      const prompt = `
        The user said: "${command}"${contextPrompt}
        
        You are a compassionate AI journaling companion. Please:
        1. **Listen & Acknowledge**: Reflect what they've shared with empathy
        2. **Analyze Sentiment**: Identify the emotional tone (positive/negative/mixed/neutral)
        3. **Provide Insight**: Offer a gentle observation or reflection
        4. **Support**: Give one specific, actionable suggestion for their wellbeing
        5. **Encourage**: End with supportive, forward-looking words
        
        Keep your response warm, personal, and under 200 words. Focus on being genuinely helpful rather than generic.
      `;

      const aiResponse = await groqProvider.generate(prompt, {
        temperature: 0.7,
        max_tokens: 300
      });

      return res.json({
        success: true,
        intent: 'general.journal',
        response: aiResponse.text,
        type: 'general_journaling'
      });
    } catch (error) {
      throw new Error(`Failed to process general journaling: ${error.message}`);
    }
  }
}

// Create a singleton instance
const voiceController = new VoiceController();

export const handleVoiceCommand = voiceController.handleVoiceCommand.bind(voiceController);