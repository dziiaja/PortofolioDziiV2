// src/utils/preventInteractions.jsx
import React, { useEffect } from 'react';

export const PreventInteractions = () => {
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
    };

    // List of events to prevent
    const events = [
      'contextmenu', 
      'selectstart', 
      'dragstart',
      'copy', 
      'cut', 
      'paste'
    ];

    // Add event listeners
    events.forEach(event => {
      document.addEventListener(event, preventDefaults, { capture: true });
    });

    // Disable keyboard shortcuts
    const handleKeyDown = (e) => {
      // Prevent F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      // Added Ctrl+Shift+C for Opera and other browsers
      if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && (
          e.key === 'I' || 
          e.key === 'J' || 
          e.key === 'C'  // Added for Opera and other browsers
        )) ||
        (e.ctrlKey && e.key === 'u')
      ) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    // Detect Opera
    const isOpera = (!!window.opr && !!window.opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

    // Additional Opera-specific prevention
    if (isOpera) {
      // Block Ctrl+Shift+C specifically for Opera
      const handleOperaDevTools = (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'C') {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      };

      document.addEventListener('keydown', handleOperaDevTools, { capture: true });
    }

    document.addEventListener('keydown', handleKeyDown, { capture: true });

    // Disable text selection
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';

    // Attempt to disable dev tools
    const disableDevTools = () => {
      if (window.console) {
        console.log = () => {};
        console.error = () => {};
        console.warn = () => {};
      }
    };

    disableDevTools();

    // Cleanup function
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, preventDefaults, { capture: true });
      });
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      
      if (isOpera) {
        const handleOperaDevTools = (e) => {
          if (e.ctrlKey && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }
        };
        document.removeEventListener('keydown', handleOperaDevTools, { capture: true });
      }
    };
  }, []);

  return null;
};