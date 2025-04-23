import { useEffect, useState } from "react"
import Header from "./Header"
import Main from "./Main"

export default function App() {
  const [emojiElements, setEmojiElements] = useState([])
  
  useEffect(() => {
    const foodEmojis = ["🍕", "🍔", "🍟", "🌭", "🍿", "🧀", "🍗", "🥩", "🍖", "🌮", "🌯", "🥗", "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🍤", "🍙", "🍚", "🍘", "🍥", "🥠", "🥮", "🍡", "🥧", "🍰", "🎂", "🍮", "🍭", "🍬", "🍫", "🍩", "🍪", "🍯", "🧁", "🥛", "☕", "🍵", "🧃", "🍹", "🍷", "🍸"];
    
    const rows = 10;
    const cols = 9;
    const emojis = [];
    let id = 0;
    
    // Create a grid pattern
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const randomEmoji = foodEmojis[Math.floor(Math.random() * foodEmojis.length)];
        const rotation = Math.random() * 360;
        const fontSize = 20 + Math.random() * 20; // More variation in size
        
        // Calculate grid position with increased spacing for less density
        const xOffset = Math.random() * 2 - 1; // Slightly larger random offset ±1%
        const yOffset = Math.random() * 2 - 1;
        
        // Spacing of 110% ensures a bit more space between emojis
        const x = (110 / cols) * col + xOffset;
        const y = (110 / rows) * row + yOffset;
        
        emojis.push({
          id: id++,
          emoji: randomEmoji,
          style: {
            position: 'absolute',
            left: `${x}%`,
            top: `${y}%`,
            transform: `rotate(${rotation}deg)`,
            fontSize: `${fontSize}px`,
            opacity: 0.4,
            zIndex: 0
          }
        });
      }
    }
    
    setEmojiElements(emojis);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-200 relative overflow-hidden">
      {/* Emoji Background */}
      <div 
        className="absolute inset-0 overflow-hidden" 
        style={{ 
          transform: 'rotate(45deg) scale(1.4)',
          transformOrigin: 'center center'
        }}
      >
        {emojiElements.map(item => (
          <div key={item.id} style={item.style}>
            {item.emoji}
          </div>
        ))}
      </div>
      
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="flex flex-col gap-4 bg-white rounded-xl shadow-lg shadow-slate-200/50 p-6 mb-6">
          <Header />
          <Main />
        </div>
      </div>
    </div>
  )
} 