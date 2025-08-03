import React from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const FadeUp = ({ children, delay = 0, className = '', resetOnExit = true, ...props }) => {
  const [ref, isVisible] = useScrollAnimation({ resetOnExit });
  
  return (
    <div
      ref={ref}
      className={`fade-up-element ${isVisible ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
};

export default FadeUp; 