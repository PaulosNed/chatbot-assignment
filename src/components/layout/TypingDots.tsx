import React from 'react';

export default function TypingDots() {
  return (
    <div className="flex gap-1 py-2">
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce1"></div>
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce2"></div>
      <div className="w-2 h-2 rounded-full bg-primary animate-bounce3"></div>
    </div>
  );
}
