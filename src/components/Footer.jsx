import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaInstagram, FaWhatsapp, FaDiscord, FaYoutube } from 'react-icons/fa';
import { SiX } from "react-icons/si";
import $icon from '../../images/icon.png'
import { Link as RouterLink, useLocation } from "react-router-dom";
import { Link as ScrollLink, animateScroll } from "react-scroll";

const Footer = () => {
  const icon = $icon;
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const currentPath = location.pathname;

  const scrollOrNavigate = (targetId) => {
    if (currentPath !== "/") {
      // If not on home page, navigate to home page with hash
      window.location.href = `/#${targetId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const socialLinks = [
    {
      icon: FaGithub,
      link: 'https://github.com/AnakTentara',
      name: 'GitHub'
    },
    {
      icon: FaInstagram,
      link: 'https://instagram.com/haikal_mabrur',
      name: 'Instagram'
    },
    {
      icon: SiX,
      link: 'https://x.com/AnakTentara2',
      name: 'X (Twitter)'
    },
    {
      icon: FaWhatsapp,
      link: 'https://wa.me/6289675732001',
      name: 'WhatsApp'
    },
    {
      icon: FaDiscord,
      link: 'https://discord.com/users/804720825109315605',
      name: 'Discord'
    },
    {
      icon: FaYoutube,
      link: 'https://youtube.com/@AnakTentaraIDN',
      name: 'YouTube'
    }
  ];

  return (
    <footer className="relative mt-20 z-10">
      {/* Divider with gradient */}
      <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
      
      {/* Footer content with solid background - using multiple techniques to ensure opacity */}
      <div 
        className="relative bg-gray-900 py-12 px-4 z-10" 
        style={{ 
          backgroundColor: '#111827',
          position: 'relative',
          isolation: 'isolate'
        }}
      >
        {/* Additional background overlay to ensure opacity */}
        <div 
          className="absolute inset-0 bg-gray-900" 
          style={{ 
            backgroundColor: '#111827',
            zIndex: -1
          }}
        ></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Column 1: Logo and Description */}
            <div>
              <motion.div
                whileTap={{
                  scale: 1.05,
                  rotate: [0, 5, -5, 1],
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }
                }}
                className="flex items-center space-x-4 mb-4"
              >
                <motion.img
                  src={icon}
                  alt="Haikal Mabrur Logo"
                  className="w-16 h-16"
                  whileHover={{ rotate: 5 }}
                  whileTap={{ rotate: 375 }}
                />
                <motion.h2 whileTap={{ scale: 0.98, rotate: 5 }} whileHover={{ scale: 1.05, rotate: -5 }} className="text-white text-2xl font-bold">Haikal Mabrur</motion.h2>
              </motion.div>
              <motion.p whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className="text-gray-400">
                Saya Dzikri, Pelajar jurusan RPL yang antusias terhadap pemrograman. Bagi saya, setiap proyek adalah peluang untuk belajar, tumbuh, dan menciptakan solusi bermakna dengan karakter dan desain yang kuat.
              </motion.p>
            </div>

            {/* Column 2: Quick Links */}
            <motion.div>
              <motion.h3 whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.03 }} className="text-xl text-white font-semibold mb-4">Quick Links</motion.h3>
              <motion.ul whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.01 }} className="space-y-2 p-2">
                <motion.li 
                  whileTap={{ scale: 0.98 }} 
                  whileHover={{ scale: 1.03 }} 
                  onClick={() => scrollOrNavigate("home")} 
                  className="text-gray-400 hover:text-primary-500 transition cursor-pointer"
                >
                  Home
                </motion.li>
                {currentPath === "/" && (
                  <>
                    <motion.li 
                      whileTap={{ scale: 0.98 }} 
                      whileHover={{ scale: 1.03 }} 
                      onClick={() => scrollOrNavigate("about")} 
                      className="text-gray-400 hover:text-primary-500 transition cursor-pointer"
                    >
                      About
                    </motion.li>
                    <motion.li 
                      whileTap={{ scale: 0.98 }} 
                      whileHover={{ scale: 1.03 }} 
                      onClick={() => scrollOrNavigate("projects")} 
                      className="text-gray-400 hover:text-primary-500 transition cursor-pointer"
                    >
                      Projects
                    </motion.li>
                    <motion.li 
                      whileTap={{ scale: 0.98 }} 
                      whileHover={{ scale: 1.03 }} 
                      onClick={() => scrollOrNavigate("contact")} 
                      className="text-gray-400 hover:text-primary-500 transition cursor-pointer"
                    >
                      Contact
                    </motion.li>
                  </>
                )}
                <div>
                  <RouterLink to='/more-about'>
                    <motion.li whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.03 }} className="text-gray-400 hover:text-primary-500 transition">More About Me</motion.li>
                  </RouterLink>
                </div>
                <div>
                  <RouterLink to='/more-projects'>
                    <motion.li whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.03 }} className="text-gray-400 hover:text-primary-500 transition">More Projects</motion.li>
                  </RouterLink>
                </div>
                <div>
                  <RouterLink to='/downloads'>
                    <motion.li whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.03 }} className="text-gray-400 hover:text-primary-500 transition">Downloads</motion.li>
                  </RouterLink>
                </div>
              </motion.ul>
            </motion.div>

            {/* Column 3: Contact Info */}
            <motion.div whileTap={{ scale: 0.98 }}>
              <motion.h3 whileTap={{ scale: 0.98 }} whileHover={{ scale: 1.02 }} className="text-xl text-white font-semibold mb-4">Connect with Me</motion.h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{
                      scale: 1.3,
                      rotate: [0, 5, -5, 0],
                      transition: {
                        type: "tween",
                        stiffness: 300,
                        damping: 10
                      }
                    }}
                    whileTap={{ scale: 0.9 }}

                    className="text-gray-400 hover:text-primary-500 transition"
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Copyright */}
          <motion.div whileTap={{ scale: 0.98 }} className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-500">
              © {currentYear} Haikal Mabrur. All Rights Reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;