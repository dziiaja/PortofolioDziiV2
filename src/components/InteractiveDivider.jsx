import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const InteractiveDivider = () => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  
  // Motion setup with smooth response
  const x = useMotionValue(0);
  const smoothX = useSpring(x, {
    stiffness: 150,
    damping: 15,
    mass: 0.5
  });

  useEffect(() => {
    // Check if device supports touch
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      
    const handleResize = () => {
        setContainerWidth(containerRef.current.offsetWidth);
      };
      
    window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);
  
  // Adjust text width based on screen size
  const textWidth = isTouchDevice ? 280 : 380;
  const boundary = {
    left: -(containerWidth / 2 - textWidth / 2),
    right: (containerWidth / 2 - textWidth / 2)
  };
    
    const handleMouseMove = (e) => {
    if (isTouchDevice) return; // Skip mouse handling on touch devices
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const targetX = Math.max(boundary.left, Math.min(boundary.right, mouseX));
    x.set(targetX);
  };

  const handleTouch = (e) => {
    const touch = e.touches[0];
    if (!touch) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const touchX = touch.clientX - rect.left - rect.width / 2;
    const targetX = Math.max(boundary.left, Math.min(boundary.right, touchX));
    x.set(targetX);
  };
  
  return (
    <div 
      ref={containerRef}
      className="relative w-full h-28 flex items-center justify-center overflow-hidden"
      style={{ 
        background: 'linear-gradient(to bottom, rgba(15, 7, 30, 0.9), rgba(25, 15, 40, 0.85))'
      }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouch}
    >
      <motion.div
        style={{ x: smoothX }}
        className="flex items-center justify-center"
        drag="x"
        dragConstraints={boundary}
        dragElastic={0.05}
        whileDrag={{ scale: 0.97 }}
      >
        <h1 
          className={`font-bold tracking-wider ${isTouchDevice ? 'text-5xl' : 'text-7xl'}`}
              style={{
            background: 'linear-gradient(to right,rgb(96, 188, 250),rgb(18, 214, 248))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: '0 0 25px rgba(55, 175, 255, 0.78), 0 0 45px rgba(13, 201, 248, 0.85)',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            touchAction: 'none'
          }}
        >
          Dzikri
        </h1>
      </motion.div>

      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[95%] h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[95%] h-[1px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent" />
    </div>
  );
};

export default InteractiveDivider; 