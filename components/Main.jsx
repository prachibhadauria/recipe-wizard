import React, { useState, useEffect } from "react";
import IngredientsList from "./IngredientsList";
import RecipeDisplay from "./RecipeDisplay";
import ApiSettingsModal from "./ApiSettingsModal";
import IngredientInput from "./IngredientInput";
import TipsSection from "./TipsSection";
import RecipePlaceholder from "./RecipePlaceholder";
import GenerateRecipeButton from "./GenerateRecipeButton";
import { getRecipeFromClaude, getRecipeFromGPT } from "../services/ai";

// Common ingredients to randomly select from
const commonIngredients = [
  "chicken", "pasta", "rice", "potatoes", "tomatoes", "onions", "garlic",
  "bell peppers", "carrots", "broccoli", "spinach", "eggs", "cheese", "milk",
  "butter", "olive oil", "beef", "pork", "salmon", "shrimp", "lemon", "lime",
  "soy sauce", "honey", "canned beans", "mushrooms", "zucchini", "bread"
];

// Get random ingredients from the common list
const getRandomIngredients = (count = 5) => {
  const shuffled = [...commonIngredients].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export default function Main() {
  const [ingredients, setIngredients] = useState(() => getRandomIngredients(4));
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [activeModel, setActiveModel] = useState(() => localStorage.getItem("active_model") || "claude"); // "claude" or "gpt"
  const [showApiSettings, setShowApiSettings] = useState(false);
  const [anthropicKey, setAnthropicKey] = useState(() => localStorage.getItem("anthropic_api_key") || "");
  const [openaiKey, setOpenaiKey] = useState(() => localStorage.getItem("openai_api_key") || "");
  
  // Save API keys to localStorage when they change
  useEffect(() => {
    if (anthropicKey) localStorage.setItem("anthropic_api_key", anthropicKey);
    if (openaiKey) localStorage.setItem("openai_api_key", openaiKey);
    localStorage.setItem("active_model", activeModel);
  }, [anthropicKey, openaiKey, activeModel]);

  async function getRecipe() {
    if (ingredients.length < 3) return;
    
    // Check if the API key for the selected model is available
    if ((activeModel === "claude" && !anthropicKey) || 
        (activeModel === "gpt" && !openaiKey)) {
      setShowApiSettings(true);
      return;
    }

    setIsLoading(true);
    
    try {
      let generatedRecipe;
      
      if (activeModel === "claude") {
        generatedRecipe = await getRecipeFromClaude(ingredients, anthropicKey);
      } else {
        generatedRecipe = await getRecipeFromGPT(ingredients, openaiKey);
      }
      
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function addIngredient(e) {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setIngredients((prevIngredients) => [
      ...prevIngredients,
      inputValue.trim(),
    ]);
    setInputValue("");
  }

  function removeIngredient(ingredientToRemove) {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient !== ingredientToRemove)
    );
  }

  function clearIngredients() {
    setIngredients([]);
    setRecipe("");
  }

  function saveApiKeys() {
    setShowApiSettings(false);
  }

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* API Settings Modal */}
      <ApiSettingsModal 
        showApiSettings={showApiSettings}
        setShowApiSettings={setShowApiSettings}
        activeModel={activeModel}
        setActiveModel={setActiveModel}
        anthropicKey={anthropicKey}
        setAnthropicKey={setAnthropicKey}
        openaiKey={openaiKey}
        setOpenaiKey={setOpenaiKey}
        saveApiKeys={saveApiKeys}
      />
      
      <div className="flex flex-col gap-8">
        <div>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">
                What's in your kitchen?
              </h2>
              <button 
                onClick={() => setShowApiSettings(!showApiSettings)}
                className="text-amber-600 hover:text-amber-700 text-sm flex items-center gap-1"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

                API Settings
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Add the ingredients you have on hand and Chef Claude will create a
              delicious recipe for you.
            </p>

            <IngredientInput 
              inputValue={inputValue}
              setInputValue={setInputValue}
              addIngredient={addIngredient}
            />

            {ingredients.length > 0 && (
              <IngredientsList
                ingredients={ingredients}
                removeIngredient={removeIngredient}
                clearIngredients={clearIngredients}
              />
            )}

            {ingredients.length >= 3 && (
              <div>
                <GenerateRecipeButton 
                  isLoading={isLoading}
                  handleClick={getRecipe}
                />
              </div>
            )}
          </div>

          <TipsSection />
        </div>

        <div>
          {recipe ? (
            <RecipeDisplay recipe={recipe} model={activeModel} />
          ) : (
            <RecipePlaceholder />
          )}
        </div>
      </div>
    </main>
  );
}
