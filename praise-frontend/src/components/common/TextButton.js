import React from "react";
import { motion } from "framer-motion";

function TextButton({ style, text, onClick, canAnimate = true }) {
  return (
    <motion.div
      style={style}
      className="text-button"
      onClick={onClick}
      whileHover={canAnimate && { scale: 1.01 }}
      whileTap={canAnimate && { scale: 0.99 }}
    >
      {typeof text === "string" ? <h3>{text}</h3> : text}
    </motion.div>
  );
}

export default TextButton;
