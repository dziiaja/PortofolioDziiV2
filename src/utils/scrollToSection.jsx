export const scrollToSection = (sectionId, navigate, offset = 100) => {
  if (window.location.pathname !== '/') {
    navigate('/', { 
      state: { 
        scrollTo: sectionId,
        scrollOffset: offset
      } 
    });
  } else {
    const section = document.getElementById(sectionId);
    if (section) {
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }
};