import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export const useTypingText = (text, speed = 40) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;
    if (isTyping && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, speed);
    } else if (displayText.length === text.length) {
      setIsTyping(false);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, text, speed]);

  return () => (
    <span>
      {displayText}
      <motion.span
        animate={{
          opacity: [1, 0],
          transition: {
            duration: 0.7,
            repeat: Infinity,
            repeatType: 'reverse'
          }
        }}
        className="inline-block bg-primary w-1.5 h-5 ml-1"
      />
    </span>
  );
};