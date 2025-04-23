import { OpenAI } from "openai";
import Anthropic from "@anthropic-ai/sdk";

const SYSTEM_PROMPT = `
You are a professional chef assistant that receives a list of ingredients that a user has and suggests a recipe they could make with some or all of those ingredients. You don't need to use every ingredient they mention in your recipe. The recipe can include additional ingredients they didn't mention, but try not to include too many extra ingredients. 

Format your response in markdown with the following sections:
1. A title with the name of the recipe (using # heading)
2. A brief introduction about the dish
3. Ingredients list (using - for bullet points)
4. Step-by-step instructions (using numbered list)
5. Serving suggestions
`

// Initialize Anthropic and OpenAI clients with user-provided keys
function getAnthropicClient(apiKey) {
  return new Anthropic({
    apiKey: apiKey || process.env.ANTHROPIC_API_KEY || "", 
    dangerouslyAllowBrowser: true,
  });
}

function getOpenAIClient(apiKey) {
  return new OpenAI({
    apiKey: apiKey || process.env.OPENAI_API_KEY || "",
    dangerouslyAllowBrowser: true,
  });
}

export async function getRecipeFromClaude(ingredientsArr, apiKey) {
  const ingredientsString = ingredientsArr.join(", ");
  
  // Check for API key
  if (!apiKey) {
    return "Please provide an Anthropic API key in the settings to use Claude.";
  }

  try {
    const anthropic = getAnthropicClient(apiKey);
    const response = await anthropic.messages.create({
      model: "claude-3-haiku-20240307",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: [
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` },
      ],
    });
    return response.content[0].text;
  } catch (error) {
    console.error("Error generating recipe with Claude:", error);
    if (error.message?.includes("401") || error.message?.includes("403")) {
      return "Authentication error: Please check your Anthropic API key.";
    }
    return getFallbackRecipe(ingredientsArr);
  }
}

export async function getRecipeFromGPT(ingredientsArr, apiKey) {
  const ingredientsString = ingredientsArr.join(", ");
  
  // Check for API key
  if (!apiKey) {
    return "Please provide an OpenAI API key in the settings to use GPT.";
  }

  try {
    const openai = getOpenAIClient(apiKey);
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make!` }
      ],
      max_tokens: 1024,
    });
    
    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Error generating recipe with GPT:", error);
    if (error.message?.includes("401") || error.message?.includes("403")) {
      return "Authentication error: Please check your OpenAI API key.";
    }
    return getFallbackRecipe(ingredientsArr);
  }
}

// Fallback function in case the API calls fail
function getFallbackRecipe(ingredientsArr) {
  const mainIngredient = ingredientsArr[0] || "food";
  const secondIngredient = ingredientsArr[1] || "ingredients";
  
  return `# Simple ${mainIngredient.charAt(0).toUpperCase() + mainIngredient.slice(1)} Recipe

A quick and easy recipe using your available ingredients.

## Ingredients
${ingredientsArr.map(ingredient => `- ${ingredient}`).join('\n')}
- Salt and pepper to taste
- 2 tablespoons olive oil

## Instructions
1. Gather all ingredients.
2. Heat olive oil in a pan over medium heat.
3. Add ${mainIngredient} and cook for 5 minutes.
4. Add ${secondIngredient} and continue cooking.
5. Season with salt and pepper to taste.
6. Serve hot and enjoy!

## Serving Suggestion
Best served fresh with your favorite side dish.`;
} 