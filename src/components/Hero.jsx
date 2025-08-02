import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { scrollToSection } from '../utils/scrollToSection';
import { useTypingText } from '../utils/typingAnimation';
import $icon from '../../images/icon.png';
import { FaArrowDown, FaCode, FaServer, FaRobot } from 'react-icons/fa';

const Hero = () => {
  const icon = $icon;
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  // Enhanced scroll transformations
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 10]);
  
  // Parallax effects for different elements
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const badgeY = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const skillsY = useTransform(scrollYProgress, [0, 1], [0, 75]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 25]);

  // Handle mouse movement for parallax effect
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    
    setMousePosition({
      x: (clientX / innerWidth - 0.5) * 30,
      y: (clientY / innerHeight - 0.5) * 30
    });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);

    // Create grid points with improved parameters
    const points = [];
    const spacing = 100; // Increased spacing
    
    for (let x = 0; x < canvas.width + spacing; x += spacing) {
      for (let y = 0; y < canvas.height + spacing; y += spacing) {
        points.push({
          x,
          y,
          originalX: x,
          originalY: y,
          size: Math.random() * 2 + 1, // Larger points
          color: `rgba(255, ${Math.floor(Math.random() * 100) + 155}, ${Math.floor(Math.random() * 100) + 155}, ${Math.random() * 0.7 + 0.3})`, // More vibrant colors
          velocity: {
            x: Math.random() * 0.3 - 0.15,
            y: Math.random() * 0.3 - 0.15
          }
        });
      }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Enhanced gradient background
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, 'rgba(8, 8, 28, 0.95)');
      gradient.addColorStop(0.5, 'rgba(20, 8, 35, 0.95)');
      gradient.addColorStop(1, 'rgba(35, 8, 45, 0.95)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      points.forEach(point => {
        point.x += point.velocity.x;
        point.y += point.velocity.y;
        
        if (point.x < 0 || point.x > canvas.width) point.velocity.x *= -1;
        if (point.y < 0 || point.y > canvas.height) point.velocity.y *= -1;
        
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
        ctx.fillStyle = point.color;
        ctx.fill();
        
        points.forEach(otherPoint => {
          const dx = point.x - otherPoint.x;
          const dy = point.y - otherPoint.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) { // Increased connection distance
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.15 * (1 - distance / 150)})`; // Brighter lines
            ctx.lineWidth = 0.8; // Thicker lines
            ctx.moveTo(point.x, point.y);
            ctx.lineTo(otherPoint.x, otherPoint.y);
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const description = "Saya Dzikri, Pelajar jurusan RPL yang antusias terhadap pemrograman. Bagi saya, setiap proyek adalah peluang untuk belajar, tumbuh, dan menciptakan solusi bermakna dengan karakter dan desain yang kuat.";
  const TypingText = useTypingText(description);

  const skills = [
    { icon: FaCode, text: "Web Development", delay: 0.2 },
    { icon: FaServer, text: "Database Setup", delay: 0.4 },
    { icon: FaRobot, text: "AI Implementation", delay: 0.6 },
    { icon: FaRobot, text: "Content Creator", delay: 0.8 }
  ];

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen overflow-hidden pt-16 md:pt-24"
      style={{ perspective: "1000px" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        style={{ pointerEvents: 'none' }}
      />

      <motion.div 
        className="absolute inset-0 z-10 flex items-center justify-center"
        style={{
          opacity,
          scale,
          filter: `blur(${blur}px)`,
          rotateX: rotate,
          height: "100%"
        }}
      >
        <div className="container mx-auto px-4 sm:px-6 py-0 flex items-center justify-center h-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 items-center max-w-5xl mx-auto w-full">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-white space-y-4 md:space-y-5 order-2 md:order-1 text-center md:text-left"
              style={{ y: titleY }}
            >
              {/* Developer Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-block"
                style={{ y: badgeY }}
              >
                <div className="relative group cursor-pointer">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-full opacity-75 group-hover:opacity-100 blur transition duration-300"></div>
                  <div className="relative px-3 py-1 md:px-4 md:py-1.5 bg-black bg-opacity-90 backdrop-filter backdrop-blur-sm rounded-full flex items-center gap-2 border border-white/10">
                    <span className="text-xs md:text-sm font-medium bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                      Student Developer
                    </span>
                  </div>
                </div>
              </motion.div>
              
              {/* Main Heading */}
              <motion.h1 
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{ 
                  transform: `translate3d(${mousePosition.x * 0.3}px, ${mousePosition.y * 0.3}px, 0px)`,
                  textShadow: "0 10px 30px rgba(0,0,0,0.5)",
                  y: titleY
                }}
              >
                I'm <span className="bg-gradient-to-r from-[#ff3d4d] to-[#ff6d7e] bg-clip-text text-transparent inline-block hover:scale-105 transition-transform duration-300">Dzikri</span>
              </motion.h1>
              
              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md mx-auto md:mx-0 font-light"
                style={{ 
                  transform: `translate3d(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px, 0px)`,
                  y: titleY
                }}
              >
                <TypingText />
              </motion.div>
              
              {/* Skills */}
              <motion.div 
                className="flex flex-wrap gap-2 md:gap-3 pt-2 md:pt-3 justify-center md:justify-start"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                style={{ y: skillsY }}
              >
                {skills.map((skill, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: skill.delay + 0.7, duration: 0.5 }}
                    className="flex items-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/15 transition-all duration-300 cursor-pointer"
                    whileHover={{ 
                      scale: 1.05,
                      y: -5,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <skill.icon className="text-[#ff3d4d] text-xs md:text-sm" />
                    <span className="text-xs md:text-sm font-medium text-white">{skill.text}</span>
                  </motion.div>
                ))}
              </motion.div>
              
              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="pt-3 md:pt-4 flex justify-center md:justify-start"
                style={{ y: buttonY }}
              >
                <motion.button
                  onClick={() => scrollToSection('contact')}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 30px rgba(255, 61, 77, 0.5)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-[#ff3d4d] to-[#ff6d7e] text-white px-5 py-2 md:px-6 md:py-2.5 rounded-full transition duration-300 flex items-center space-x-2 text-xs md:text-sm font-medium shadow-lg hover:shadow-xl"
                >
                  <span>Get in Touch</span>
                  <motion.div
                    animate={{ 
                      y: [0, 5, 0],
                      transition: { repeat: Infinity, duration: 1.5 }
                    }}
                  >
                    <FaArrowDown className="text-xs md:text-sm" />
                  </motion.div>
                </motion.button>
              </motion.div>
            </motion.div>
            
            {/* Right Content: Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex justify-center md:justify-end items-center order-1 md:order-2 md:pr-8"
              style={{ 
                transform: `translate3d(${mousePosition.x * -0.2}px, ${mousePosition.y * -0.2}px, 0px)`,
                y: imageY
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                {/* Enhanced glowing effect */}
                <motion.div 
                  className="absolute inset-0 rounded-[20px] md:rounded-[30px] bg-gradient-to-r from-[#ff3d4d] to-[#ff6d7e] blur-xl md:blur-2xl opacity-30 group-hover:opacity-40 transition-opacity duration-300"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3]
                  }}
                  transition={{ 
                    repeat: Infinity,
                    duration: 3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Profile image container */}
                <motion.div
                  className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gradient-to-br from-gray-900 to-black rounded-[20px] md:rounded-[30px] p-1 md:p-1.5 relative z-10 overflow-hidden shadow-2xl"
                  style={{ boxShadow: "0 0 40px rgba(255, 61, 77, 0.2)" }}
                >
                  <div className="w-full h-full rounded-[15px] md:rounded-[25px] overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 p-2 md:p-3 backdrop-blur-xl backdrop-filter">
                    <img
                      src={icon}
                      alt="Dzikri"
                      className="w-full h-full object-cover rounded-[15px] md:rounded-[20px] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  
                  {/* Animated border */}
                  <motion.div 
                    className="absolute inset-0 rounded-[20px] md:rounded-[30px] border-2 border-[#ff3d4d] opacity-50 group-hover:opacity-70 transition-opacity duration-300"
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.05, 1]
                    }}
                    transition={{ 
                      rotate: { repeat: Infinity, duration: 10, ease: "linear" },
                      scale: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                    }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      {/* Enhanced scroll indicator */}
      <motion.div 
        className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        style={{ opacity }}
        animate={{ 
          y: [0, 10, 0],
          transition: { repeat: Infinity, duration: 1.5 }
        }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          className="flex items-center justify-center cursor-pointer group"
        >
          <motion.div
            className="absolute w-6 h-6 md:w-8 md:h-8 bg-[#ff3d4d] rounded-full opacity-20 group-hover:opacity-30 blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <FaArrowDown 
            className="text-[#ff3d4d] text-lg md:text-xl relative z-10" 
            style={{ filter: "drop-shadow(0 0 12px rgba(255, 61, 77, 0.6))" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;