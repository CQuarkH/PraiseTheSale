import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import { useLocation } from "react-router-dom";

function ListView({ elements, ElementComponent, grid = false }) {
  const location = useLocation();
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      const url =
        "https://lottie.host/c15558fa-6032-4811-b494-e36ae258faf4/VMceORoHBr.json";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error fetching animation data:", error);
      }
    };
    fetchAnimationData();
  }, []);

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

  return (
    <motion.div
      className={grid ? "grid" : "list"}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {elements.length === 0 ? (
        <motion.div
          className="empty-list-message"
          style={grid ? { width: "100%" } : {}}
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <Lottie
            animationData={animationData}
            style={{ width: "200px", height: "200px" }}
          />
          <p>Oops! It looks like there are no items available at the moment.</p>
          <p>Please check back later or try a different search.</p>
        </motion.div>
      ) : (
        <>
          {elements.map((element) => (
            <ElementComponent
              key={element.id}
              element={element}
              locationState={location.state}
            />
          ))}
        </>
      )}
    </motion.div>
  );
}

export default ListView;
