import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.warn('Gemini API key not configured');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface SessionFeedback {
  summary: string;
  insights: string[];
  recommendations: string[];
  motivationalMessage: string;
}

export async function getSessionFeedback(
  goal: string,
  duration: number,
  focusRating: number
): Promise<SessionFeedback> {
  if (!genAI) {
    return {
      summary: 'Session completed',
      insights: ['Keep up the good work'],
      recommendations: ['Set clearer goals for next session'],
      motivationalMessage: 'You are building great focus habits!',
    };
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = `Provide feedback for a focus session with these metrics:
    Goal: ${goal}
    Duration: ${duration} minutes
    Focus Rating: ${focusRating}/10
    
    Respond in JSON format with: summary, insights (array), recommendations (array), and motivationalMessage (string).`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const feedback = JSON.parse(text);
      return feedback;
    } catch {
      return {
        summary: text,
        insights: ['Session data recorded'],
        recommendations: ['Continue building your focus practice'],
        motivationalMessage: 'Great effort on your focus session!',
      };
    }
  } catch (error) {
    console.error('Error fetching Gemini feedback:', error);
    return {
      summary: 'Session completed successfully',
      insights: ['You showed commitment to your goal'],
      recommendations: ['Review your next session goals'],
      motivationalMessage: 'Keep pushing towards your goals!',
    };
  }
}

export async function generateMotivationalQuote(): Promise<string> {
  if (!genAI) {
    return 'You have the power to achieve your goals. Stay focused!';
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const prompt = 'Generate a short motivational quote for someone about to start a focus session.';
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch {
    return 'Focus is the gateway to success. You got this!';
  }
}
