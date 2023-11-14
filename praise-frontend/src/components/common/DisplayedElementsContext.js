import React, { createContext, useContext, useState } from 'react';

const DisplayedElementsContext = createContext();

export const useDisplayedElements = () => {
  return useContext(DisplayedElementsContext);
};

export const DisplayedElementsProvider = ({ children }) => {
  const [displayed, setDisplayed] = useState([]);

  return (
    <DisplayedElementsContext.Provider value={{ displayed, setDisplayed }}>
      {children}
    </DisplayedElementsContext.Provider>
  );
};
