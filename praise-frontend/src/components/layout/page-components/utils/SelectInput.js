import React from 'react';
import { Controller } from 'react-hook-form';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

function SelectInput({ control, name, label, options, rules, defaultValue = "", error }) {

  return (
    <div className='standout-list-tile-invert-column'>
      <h4> {label} {error && <span style={{color: 'red', marginLeft: '10px'}}>({error.message})</span>}</h4>
      <div className='standout-list-tile'>
        <FormControl fullWidth error={!!error}>
          <InputLabel id={`${name}-label`} style={{color: 'white'}}>{label}</InputLabel>
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            rules={rules}
            render={({ field }) => (
              <Select 
                IconComponent={() => <KeyboardArrowDownIcon style={{ color: 'white' }} />}
                labelId={`${name}-label`} 
                label={label} {...field} 
                className='select-input'
                MenuProps={{
                  anchorOrigin: {
                    vertical: "bottom",
                    horizontal: "left"
                  },
                  transformOrigin: {
                    vertical: "top",
                    horizontal: "left"
                  },
                  getContentAnchorEl: null,
                  classes: { paper: 'menu-paper' } 
                }}>
                {options.map((option) => (
                  <MenuItem key={option.value} value={option.value} className='select-input-option'>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      </div>
    </div>
  );
}

export default SelectInput;
