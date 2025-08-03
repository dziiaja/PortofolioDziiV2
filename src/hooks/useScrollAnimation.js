import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options = {}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const { resetOnExit = true } = options;
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Set element as visible when it enters the viewport
      if (entry.isIntersecting) {
        setIsVisible(true);
        // We no longer unobserve automatically to support both scroll directions
      } else if (resetOnExit) {
        // Reset visibility when element leaves the viewport if resetOnExit is true
        setIsVisible(false);
      }
    }, {
      root: null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.1,
    });
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [options.rootMargin, options.threshold, resetOnExit]);
  
  return [ref, isVisible];
} 