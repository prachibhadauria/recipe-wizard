import React from 'react';

export default function RecipeDisplay(props) {
    const { recipe, model } = props;
    const modelName = model === "claude" ? "Claude AI" : "GPT";
    const [copied, setCopied] = React.useState(false);
    
    const handleCopy = () => {
        navigator.clipboard.writeText(recipe);
        setCopied(true);
        setTimeout(() => setCopied(false), 5000);
    };
    
    return (
        <section className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 bg-amber-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">Generated Recipe 😋</h2>
                <p className="text-white text-sm">Created with {modelName}</p>
            </div>
            
            <div className="p-6 lg:p-8 prose prose-amber max-w-none">
                <div 
                    className="markdown-recipe"
                    dangerouslySetInnerHTML={{ 
                        __html: recipe
                            .replace(/^# (.*$)/gm, '<h1>$1</h1>')
                            .replace(/^## (.*$)/gm, '<h2>$1</h2>')
                            .replace(/^### (.*$)/gm, '<h3>$1</h3>')
                            .replace(/\n- (.*$)/gm, '<li>$1</li>')
                            .replace(/<li>(.+)<\/li>/g, function(match) {
                                return '<ul>' + match + '</ul>';
                            })
                            .replace(/\n(\d+)\. (.*$)/gm, '<li>$2</li>')
                            .replace(/<li>(.+)<\/li>/g, function(match) {
                                return '<ol>' + match + '</ol>';
                            })
                    }}
                />
            </div>
            
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                <div className="flex space-x-2">
                    <button 
                        onClick={handleCopy}
                        className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors flex items-center cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        {copied ? 'Copied!' : 'Copy Recipe'}
                    </button>
                </div>
            </div>
        </section>
    )
} 