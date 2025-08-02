import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import $iconGR from '../../images/icon-bggradient.png'

const NavbarOther = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Handle scroll behavior for navbar persistence
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Only hide navbar after scrolling down more than 50px
    if (latest > 50) {
      const isScrollingDown = latest > lastScrollY;
      setVisible(!isScrollingDown);
    } else {
      setVisible(true);
    }
    setLastScrollY(latest);
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Check if a path is active (exact match or starts with for nested routes)
  const isActive = (path) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath === path || currentPath.startsWith(`${path}/`);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'More About', path: '/more-about' },
    { name: 'More Projects', path: '/more-projects' },
    { name: 'Downloads', path: '/downloads' },
  ];

  return (
    <motion.nav
      className="fixed w-full top-3 md:top-4 left-0 right-0 z-50"
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: 1,
        scale: 1,
        y: visible ? 0 : -100
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
    >
      <div className="container mx-auto rounded-full w-11/12 md:w-3/4 backdrop-blur-xl">
        <motion.div
          className="relative bg-white/90 dark:bg-gray-900/90 
          rounded-full shadow-2xl border border-gray-200/50 dark:border-gray-800/50 
          py-3 md:py-4 px-5 md:px-8 max-w-5xl mx-auto flex items-center justify-center transition-all duration-300"
          initial={{
            scale: 0.9,
            boxShadow: '0 0 6px -1px rgba(255,255,255,0.3), 0 -4px 4px -1px rgba(255, 255, 255, 0.06)'
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: '2px 2px 25px -5px rgba(255,255,255,0.3), 0 0 10px -5px rgba(255, 255, 255, 0.3)',
            transition: {
              type: "tween",
              stiffness: 300,
              damping: 10,
              duration: 0.1
            }
          }}
          animate={{
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20
          }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <motion.img
                src={$iconGR}
                alt="Logo"
                className="w-8 h-8 md:w-10 md:h-10"
                whileHover={{ rotate: 10 }}
                whileTap={{ scale: 0.9 }}
              />
              <motion.span 
                className="text-white font-bold text-base md:text-xl"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Haikal Mabrur
              </motion.span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navLinks.map((link, index) => (
                <Link 
                  key={index} 
                  to={link.path}
                  className="relative group"
                >
                  <motion.span 
                    className={`text-sm font-medium transition-colors duration-300 ${
                      isActive(link.path) 
                        ? 'text-blue-400' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                  >
                    {link.name}
                  </motion.span>
                  {/* Active indicator */}
                  {isActive(link.path) && (
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-400"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  {/* Hover indicator */}
                  {!isActive(link.path) && (
                    <motion.div 
                      className="absolute bottom-0 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-300 hover:text-white focus:outline-none"
              >
                {isOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Mobile Menu */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ 
          height: isOpen ? 'auto' : 0,
          opacity: isOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-gray-800 mt-2 mx-auto w-11/12 md:w-3/4 rounded-xl"
      >
        <div className="container mx-auto px-4 py-2">
          {navLinks.map((link, index) => (
            <Link 
              key={index} 
              to={link.path}
              className="block py-2.5 border-b border-gray-700 last:border-0"
            >
              <motion.span 
                className={`text-sm font-medium ${
                  isActive(link.path) 
                    ? 'text-[#ff3d4d]' 
                    : 'text-gray-300'
                }`}
                whileHover={{ x: 5 }}
                whileTap={{ x: 0 }}
              >
                {link.name}
              </motion.span>
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default NavbarOther;