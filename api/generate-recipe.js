import { OpenAI } from 'openai';
import { Anthropic } from '@anthropic-ai/sdk';
import { StreamingTextResponse } from 'ai';

// System prompt for recipe generation
const SYSTEM_PROMPT = `
You are a professional chef assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 

Format your response in markdown with the following sections:
1. A title with the name of the recipe (using # heading)
2. A brief introduction about the dish
3. Ingredients list (using - for bullet points)
4. Step-by-step instructions (using numbered list)
5. Serving suggestions
`;

export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const { ingredients = [], model = 'claude', apiKey = '' } = await req.json();
  
  // Get the ingredients string
  const ingredientsString = ingredients.join(', ');
  
  // Check if we have enough ingredients
  if (ingredients.length < 3) {
    return new Response('Please provide at least 3 ingredients', { status: 400 });
  }
  
  // Check if API key is provided
  if (!apiKey) {
    return new Response(`Please provide an API key for ${model}`, { status: 400 });
  }
  
  try {
    let stream;
    
    // Generate recipe with Claude
    if (model === 'claude') {
      const anthropic = new Anthropic({
        apiKey,
      });
      
      stream = await anthropic.messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1024,
        system: SYSTEM_PROMPT,
        messages: [
          { role: 'user', content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
        stream: true,
      });
    } 
    // Generate recipe with GPT
    else {
      const openai = new OpenAI({
        apiKey,
      });
      
      stream = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
        ],
        stream: true,
        max_tokens: 1024,
      });
    }
    
    // Return streaming response
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('Error generating recipe:', error);
    return new Response(`Error generating recipe: ${error.message}`, { status: 500 });
  }
} 