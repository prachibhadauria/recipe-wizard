export default function IngredientsList({ ingredients, removeIngredient, clearIngredients }) {
    if (ingredients.length === 0) return null;
    
    return (
        <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-medium text-gray-800">Your ingredients:</h3>
                {ingredients.length > 0 && (
                    <button 
                        onClick={clearIngredients}
                        className="text-xs text-gray-500 hover:text-red-500 transition-colors flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Clear all
                    </button>
                )}
            </div>
            
            <div className="flex flex-wrap gap-2">
                {ingredients.map((ingredient, index) => (
                    <div 
                        key={index} 
                        className="bg-amber-50 border border-amber-100 rounded-full px-3 py-1 text-sm text-amber-800 flex items-center group"
                    >
                        {ingredient}
                        <button 
                            onClick={() => removeIngredient(ingredient)}
                            className="ml-2 text-amber-400 hover:text-red-500 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}