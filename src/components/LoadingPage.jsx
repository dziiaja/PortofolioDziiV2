import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCode } from 'react-icons/fa';

const LoadingPage = () => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // Update loading text based on progress
    const textInterval = setInterval(() => {
      setLoadingText(current => {
        const texts = ['Initializing', 'Loading Assets', 'Preparing UI', 'Almost Ready'];
        const currentIndex = texts.indexOf(current);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 2000);

    return () => {
      clearInterval(interval);
      clearInterval(textInterval);
    };
  }, []);

  // Enhanced particle effect
  const ParticleEffect = () => {
    return (
      <>
        {[...Array(30)].map((_, index) => (
          <motion.div
            key={index}
            initial={{ 
              opacity: 0, 
              scale: 0,
              x: Math.random() * window.innerWidth - window.innerWidth / 2,
              y: Math.random() * window.innerHeight - window.innerHeight / 2
            }}
            animate={{
              opacity: [0, 0.5, 0],
              scale: [0, 1.5, 0],
              x: [
                Math.random() * window.innerWidth - window.innerWidth / 2, 
                Math.random() * window.innerWidth - window.innerWidth / 2,
                Math.random() * window.innerWidth - window.innerWidth / 2
              ],
              y: [
                Math.random() * window.innerHeight - window.innerHeight / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2,
                Math.random() * window.innerHeight - window.innerHeight / 2
              ]
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              repeatType: 'loop',
              ease: 'easeInOut'
            }}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              background: `rgba(255, 255, 255, ${Math.random() * 0.3 + 0.1})`,
              filter: 'blur(1px)'
            }}
          />
        ))}
      </>
    );
  };

  return (
    <motion.div 
      className="fixed inset-0 z-[9999] bg-[#0a0a0a] overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Enhanced Particle Background */}
      <div className="absolute inset-0">
        <ParticleEffect />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>
      <div className="absolute inset-0 bg-gradient-to-tr from-black/90 to-black/70"></div>

      {/* Loading Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-md mx-auto px-4">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ 
            scale: 1,
            rotate: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 20
            }
          }}
          className="relative mb-12"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.5)",
                "0 0 40px rgba(139, 92, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.5)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 p-0.5"
          >
            <div className="w-full h-full rounded-xl bg-black flex items-center justify-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: "easeInOut"
                }}
              >
                <FaCode className="text-4xl text-blue-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Rotating border effect */}
          <motion.div
            className="absolute inset-0 rounded-xl"
            style={{
              border: '2px solid transparent',
              backgroundImage: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
              backgroundClip: 'padding-box, border-box',
              backgroundOrigin: 'border-box'
            }}
            animate={{
              rotate: 360
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Loading Text with Animation */}
        <AnimatePresence mode='wait'>
          <motion.div
            key={loadingText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-center"
          >
            <h2 className="text-xl font-medium text-white mb-2">{loadingText}</h2>
            <p className="text-sm text-gray-400 mb-6">Please wait while we set things up</p>
          </motion.div>
        </AnimatePresence>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
            initial={{ width: 0 }}
            animate={{ width: `${loadingProgress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>

        {/* Progress Percentage */}
        <motion.p
          className="mt-2 text-sm text-gray-500 font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {loadingProgress}%
        </motion.p>
      </div>
    </motion.div>
  );
};

export default LoadingPage;