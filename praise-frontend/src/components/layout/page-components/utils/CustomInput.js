import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function CustomInput({ 
  label, placeholder, type, isTextarea, style, control, name, rules, defaultValue, invert = true, error, variants }) {

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const containerClass = invert ? "standout-list-tile-invert-column" : "standout-list-tile-column";
  const tileClass = invert ? "standout-list-tile" : "standout-list-tile-invert";
  const inputClass = error ? "input-error" : "";
  const inputStyle = {width: '93%', backgroundColor: 'transparent'};

  const fadeInOut = {
    hidden: { opacity: 0, y: "-50%" },
    visible: { opacity: 1, y: "0%" }
};


  return (
    <motion.div className={containerClass} style={style} variants={variants}>
      <h4> {label}  {
          error && (
            <motion.span 
              layoutId={error.message}
              style={{color: 'red', marginLeft: '10px'}}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={fadeInOut}
            >
              ({ error.message})
            </motion.span>
          )
        } </h4>
      <div className={tileClass} style={{height: '100%'}}>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          rules={rules}
          render={({ field }) => 
            isTextarea ? (
              <textarea 
                className={`complaint-block-input-container ${inputClass}`}
                style={{...inputStyle, flex: 1, fontSize: '16px', height: '90%'}}
                placeholder={placeholder}
                {...field}
              />
            ) : (
              <div style={{ position: 'relative', width: '100%' }}>
                <input 
                  className={inputClass}
                  style={inputStyle}
                  type={type === 'password' && !showPassword ? 'password' : 'text'}
                  placeholder={placeholder}
                  {...field}
                />
                {type === 'password' && (
                  <span 
                    style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)', cursor: 'pointer' }}
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </span>
                )}
              </div>
            )
          }
        />
      </div>
    </motion.div>
  );
}

export default CustomInput;
