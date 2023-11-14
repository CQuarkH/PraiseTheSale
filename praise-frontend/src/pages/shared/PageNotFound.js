import React, { useState, useEffect } from 'react';
import Lottie from "lottie-react";

function PageNotFound() {
  
  const [ animationData, setAnimationData ] = useState(null);

  useEffect(() => {

    const fetchAnimationData = async () => {
      const url = "https://lottie.host/c72d119b-bedc-463a-88b3-4173cd8cffe3/ZrEslVj7Fo.json";
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

  }, []);

  return (
    <div className='empty-list-message'>
         <Lottie animationData={animationData} style={{ width: '50%', height: '50%' }} />
         <div>
         <h2>404 - Page Not Found </h2>
         <h3>Sorry, the page you are looking for does not exist.</h3>
         </div>
    </div>
  )
}

export default PageNotFound