import React from "react";

export default function TipsSection() {
  return (
    <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
      <div className="flex items-start">
        <div className="flex-shrink-0 bg-amber-100 text-amber-700 rounded-full p-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-amber-800">
            Tips for best results
          </h3>
          <ul className="mt-2 text-sm text-amber-700 list-disc list-inside space-y-1">
            <li>Add at least 3 ingredients to generate a recipe</li>
            <li>
              Include proteins, vegetables, or starches for more variety
            </li>
            <li>Specify herbs and spices for more flavorful results</li>
            <li>
              The more ingredients you add, the more tailored your recipe
              will be
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 