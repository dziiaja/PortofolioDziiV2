import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaGithub, FaInstagram, FaLinkedin, FaDiscord, FaYoutube, FaEnvelope, FaCopy, FaCheck, FaWhatsapp, FaExternalLinkAlt } from 'react-icons/fa';

const ContactCard = ({ icon: Icon, title, value, delay, action, color }) => {
  const [copied, setCopied] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.3 });
  
  const handleCopy = () => {
    if (value) {
      navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };
  
  const handleAction = () => {
    if (action) {
      window.open(action, '_blank', 'noopener,noreferrer');
    } else {
      handleCopy();
    }
  };
  
  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: delay * 0.1 + 0.2, duration: 0.5 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="relative group"
      onClick={handleAction}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-gray-800/50 to-gray-700/30 group-hover:from-gray-700/70 group-hover:to-gray-600/50 transform transition-all duration-300"></div>
      
      <div className="relative p-6 rounded-xl backdrop-blur-md border border-white/5 cursor-pointer overflow-hidden">
        {/* Hover glow effect */}
        <div className={`absolute top-0 right-0 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-300`} style={{ background: color, transform: 'translate(30%, -30%)' }}></div>
        
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg text-white`} style={{ background: color, boxShadow: `0 0 20px ${color}50` }}>
            <Icon size={24} />
          </div>
          
          <div className="flex-1">
            <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
            <p className="text-white font-semibold mt-1 truncate max-w-[200px]">{value}</p>
          </div>
          
          {action ? (
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <FaExternalLinkAlt />
            </motion.div>
          ) : (
            <motion.div
              animate={copied ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
              className="text-gray-400 hover:text-white transition-colors"
            >
              {copied ? <FaCheck className="text-green-500" /> : <FaCopy />}
            </motion.div>
          )}
        </div>
        
        {/* Background pattern */}
        <div className="absolute -bottom-4 -right-4 w-20 h-20 opacity-10 rounded-full" style={{ background: color }}></div>
      </div>
    </motion.div>
  );
};

const SocialLink = ({ icon: Icon, href, color, delay }) => {
  const linkRef = useRef(null);
  const isInView = useInView(linkRef, { once: false, amount: 0.5 });
  
  return (
    <motion.a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.3, type: "spring", stiffness: 300 }}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="relative group flex items-center justify-center w-12 h-12 rounded-full"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300" style={{ background: color }}></div>
      
      {/* Border */}
      <div className="absolute inset-0 rounded-full border-2 border-white/10 group-hover:border-white/20 transition-colors duration-300"></div>
      
      {/* Icon */}
      <div className="text-white z-10">
        <Icon size={22} />
      </div>
    </motion.a>
  );
};

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);
  const dividerRef = useRef(null);
  const socialsRef = useRef(null);
  
  const isInView = useInView(sectionRef, { once: false, margin: "-10% 0px" });
  const isTitleInView = useInView(titleRef, { once: false, amount: 0.5 });
  const isDividerInView = useInView(dividerRef, { once: false, amount: 0.7 });
  const isSocialsInView = useInView(socialsRef, { once: false, amount: 0.5 });
  const isCtaInView = useInView(ctaRef, { once: false, amount: 0.8 });
  
  // Contact information - replace with your actual details
  const contactInfo = [
    {
      icon: FaEnvelope,
      title: "Email",
      value: "me@haikaldev.my.id",
      color: "rgb(239, 68, 68)", // red
      delay: 1
    },
    {
      icon: FaDiscord,
      title: "Discord",
      value: "haikalmabrur",
      action: "https://discord.com/users/804720825109315605",
      color: "rgb(88, 101, 242)", // discord blue
      delay: 4
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      value: "(+62) 896-7573-2001",
      action: "https://wa.me/6289675732001",
      color: "rgb(37, 211, 102)", // blue
      delay: 5
    },
  ];
  
  // Social links for the bottom section
  const socialLinks = [
    { icon: FaGithub, href: "https://github.com/AnakTentara", color: "#333", delay: 1 },
    { icon: FaInstagram, href: "https://instagram.com/haikal_mabrur", color: "#E1306C", delay: 2 },
    { icon: FaLinkedin, href: "https://linkedin.com/in/haikal-mabrur/", color: "#0077B5", delay: 3 },
    { icon: FaWhatsapp, href: "https://wa.me/6289675732001", color: "#25D366", delay: 4 },
    { icon: FaYoutube, href: "https://youtube.com/@AnakTentaraIDN", color: "#FF0000", delay: 5 },

  ];
  
  return (
    <section id="contact" ref={sectionRef} className="py-24">
      <div className="container mx-auto px-4 relative">
        {/* Background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-40 -left-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"></div>
          <div className="absolute bottom-40 -right-20 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
        </div>
        
        {/* Section header */}
        <div className="text-center mb-16" ref={titleRef}>
          <div 
            ref={headingRef} 
            className="w-full max-w-3xl mx-auto px-4 flex flex-col items-center py-10 relative"
          >
            {/* Visual center guide - left */}
            <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 w-[5%] h-[1px] bg-gradient-to-r from-transparent to-blue-500/50"></div>
            
            {/* Content */}
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold text-center w-full"
            >
              <strong className='font-bold bg-gradient-to-r from-blue-400 via-purple-600 to-pink-500 bg-clip-text text-transparent uppercase tracking-wider'>Let's Connect</strong>
            </motion.h2>

            <motion.div 
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full my-6"
              initial={{ width: 0 }}
              animate={isTitleInView ? { width: 96 } : { width: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 text-lg text-center max-w-2xl"
            >
              Feel free to reach out for collaborations, inquiries, or just a friendly hello! 
              Here are the best ways to connect with me.
            </motion.p>
            
            {/* Visual center guide - right */}
            <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 w-[5%] h-[1px] bg-gradient-to-l from-transparent to-purple-500/50"></div>
          </div>
        </div>
        
        {/* Contact info cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {contactInfo.map((info, index) => (
            <ContactCard key={index} {...info} />
          ))}
        </div>
        
        {/* Divider with gradient */}
        <div className="my-20 max-w-4xl mx-auto px-4" ref={dividerRef}>
          <motion.div 
            className="relative"
            initial={{ opacity: 0 }}
            animate={isDividerInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-500/30 to-transparent"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="bg-gray-900 px-6 text-gray-400 text-sm">or find me on</span>
            </div>
          </motion.div>
        </div>
        
        {/* Social links */}
        <motion.div 
          ref={socialsRef}
          className="flex flex-wrap justify-center gap-5"
          initial={{ opacity: 0 }}
          animate={isSocialsInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.2 }}
        >
          {socialLinks.map((link, index) => (
            <SocialLink key={index} {...link} />
          ))}
        </motion.div>
        
        {/* CTA message */}
        <motion.div
          ref={ctaRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isCtaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-gray-300 text-lg font-light">
            Looking forward to creating something amazing together!
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Response time: <span className="text-green-500">Usually within 24 hours</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;