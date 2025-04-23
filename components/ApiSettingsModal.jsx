import React from "react";

export default function ApiSettingsModal({ 
  showApiSettings, 
  setShowApiSettings, 
  activeModel, 
  setActiveModel, 
  anthropicKey, 
  setAnthropicKey, 
  openaiKey, 
  setOpenaiKey, 
  saveApiKeys 
}) {
  if (!showApiSettings) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800">API Settings</h3>
            <button 
              onClick={() => setShowApiSettings(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Enter your API keys to use the AI models. These will be stored in your browser and never sent to our servers.
          </p>
          
          {/* Model Selector */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">Select AI Model</label>
            <div className="inline-flex rounded-md shadow-sm w-full" role="group">
              <button
                type="button"
                onClick={() => setActiveModel("claude")}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-l-lg ${
                  activeModel === "claude"
                    ? "bg-amber-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
                }`}
              >
                Claude
              </button>
              <button
                type="button"
                onClick={() => setActiveModel("gpt")}
                className={`flex-1 px-4 py-2 text-sm font-medium rounded-r-lg ${
                  activeModel === "gpt"
                    ? "bg-amber-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300 border-l-0"
                }`}
              >
                GPT
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="anthropic-key" className="block text-sm font-medium text-gray-700">Anthropic API Key (for Claude)</label>
              <input
                type="password"
                id="anthropic-key"
                value={anthropicKey}
                onChange={(e) => setAnthropicKey(e.target.value)}
                placeholder="sk-ant-..."
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-600"
              />
            </div>
            
            <div>
              <label htmlFor="openai-key" className="block text-sm font-medium text-gray-700">OpenAI API Key (for GPT)</label>
              <input
                type="password"
                id="openai-key"
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                placeholder="sk-..."
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none text-gray-600"
              />
            </div>
            
            <div className="mt-6 flex justify-end">
              <button
                onClick={saveApiKeys}
                className="bg-amber-600 hover:bg-amber-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
              >
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 