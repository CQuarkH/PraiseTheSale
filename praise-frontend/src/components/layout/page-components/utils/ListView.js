import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lottie from "lottie-react";
import { useInView } from 'react-intersection-observer';
import { useDisplayedElements } from './DisplayedElementsContext';
import { useLocation } from 'react-router-dom';


function ListView({ elements, ElementComponent, grid = false }) {

  const { displayed, setDisplayed } = useDisplayedElements();
  const location = useLocation();

  const containerVariants = {
    hidden: { opacity: 1, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const [animationData, setAnimationData] = useState(null);
  const url = 'https://lottie.host/c15558fa-6032-4811-b494-e36ae258faf4/VMceORoHBr.json';

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error('Error fetching animation data:', error);
      }
    };
    fetchAnimationData();
  }, [url]);

  const [displayedElements, setDisplayedElements] = useState(location.state?.displayedElements || elements.slice(0, 10));

  const [ref, inView] = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      const nextElements = elements.slice(displayedElements.length, displayedElements.length + 10);
      setDisplayedElements(prev => [...prev, ...nextElements]);
      setDisplayed(prev => [...prev, ...nextElements.map(e => e.id)]);
  
     
      location.state = { ...location.state, displayedElements: [...displayedElements, ...nextElements] };
    }
  }, [inView]);

  return (
    <motion.div className={grid ? "grid" : "list"} variants={containerVariants} initial="hidden" animate="visible">
      {displayedElements.length === 0 ? (
        <motion.div className="empty-list-message" style={grid ? { width: '100%' } : {}} initial={{ opacity: 0, y: -100 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
          <Lottie animationData={animationData} style={{ width: '200px', height: '200px' }} />
          <p>Oops! It looks like there are no items available at the moment.</p>
          <p>Please check back later or try a different search.</p>
        </motion.div>
      ) : (
        <>
          {displayedElements.map((element, index) => (
            <ElementComponent key={element.id} element={element} animate={!displayed.includes(element.id)} />
          ))}
          <div ref={ref}></div> 
        </>
      )}
    </motion.div>
  );
}

export default ListView;
