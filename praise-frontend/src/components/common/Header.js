import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function Header({ searchBar, title, description, customHeader }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <motion.div className={`page-header-sticky ${scrolled ? 'scrolled' : ''}`}>
      {
        customHeader ?? (
          <>
            <div>
              <h2>{title}</h2>
              <span className='hide-on-responsive' style={scrolled ? {display: 'none'} : {}}>{description}</span>
            </div>
          </>
        )
      }
      {searchBar && searchBar}
    </motion.div>
  );
}

export default Header;


