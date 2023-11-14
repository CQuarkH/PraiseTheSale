import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import AnimatedTile from './AnimatedTile';

function ImageUploaderButton({ control, name, rules, error, defaultValue, onFileSelect }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      if (onFileSelect) {
        onFileSelect(file); 
      }
    }
  };


  return (
    <div className='standout-list-tile-invert-column' style={{ height: '100%' }}>
      <h4> Product Image {error && <span style={{ color: 'red', marginLeft: '10px' }}>({error.message})</span>}</h4>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { onChange, ...restField } }) => (
          <>
            <input
              type="file"
              id="image-upload"
              accept="image/*"
              onChange={(e) => {
                 handleImageChange(e);
                if (e.target.files && e.target.files[0]) {
                 onChange(e.target.files[0]); 
                }
              }}
              style={{ display: 'none', width: '100%' }}
            />
            {(defaultValue || image) ? (
              <img src={image || defaultValue} 
              style={{objectFit: 'cover'}}
              alt="Selected" 
              className='selected-image' />
            ) : (
              <div className='centered-content'>
                <h5> Not selected yet </h5>
              </div>
            )}
            <AnimatedTile whileHoverScale={1.02}>
              <label htmlFor="image-upload" className="expanded-button">
                Select Image
              </label>
            </AnimatedTile>
          </>
        )}
      />
    </div>
  );
}

export default ImageUploaderButton;
