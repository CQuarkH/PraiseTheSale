import React, { useState } from "react";
import TextButton from "./TextButton";

const AsyncButton = ({ text, asyncOnClick, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      await asyncOnClick();
    } catch (error) {
      console.error("AsyncButton error! ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const buttonStyle = isLoading
    ? { ...props.style, backgroundColor: "#6b77ae" }
    : props.style;

  return (
    <TextButton
      {...props}
      onClick={handleClick}
      disabled={isLoading}
      canAnimate={!isLoading}
      style={buttonStyle}
      text={isLoading ? <div className="loader" /> : text}
    />
  );
};

export default AsyncButton;
