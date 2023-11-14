import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { formatProp } from './utils';

function SearchBarComponent({ elements, setFilteredElements, searchBy = ['name'], placeholder = "Search Here..." }) {
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProp, setSelectedProp] = useState(searchBy[0]);

  useEffect(() => {
    if (!searchTerm.trim()) {
        setFilteredElements(elements);
        return;
    }
    const results = elements.filter(element => {
      const value = element[selectedProp]?.toString();
      return value && value.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredElements(results);
  }, [searchTerm, elements, selectedProp]);
  

  

  return (
    <div className='searchbar-container' style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <SearchIcon />
      <input 
        className='page-header-search-bar'
        type="text" 
        placeholder={placeholder} 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <FormControl variant="outlined" size="small" style={{ marginLeft: '10px'}}>
        
        <Select
          style={{color: 'whitesmoke'}}
          labelId="select-label"
          value={selectedProp}
          onChange={e => setSelectedProp(e.target.value)}
          IconComponent={() => <KeyboardArrowDownIcon style={{ color: 'white' }} />}
          MenuProps={{
            anchorOrigin: {
              vertical: "bottom",
              horizontal: "left"
            },
            transformOrigin: {
              vertical: "top",
              horizontal: "left"
            },
            classes: { paper: 'menu-paper' } 
          }}
        >
          {searchBy.map(prop => (
            <MenuItem key={prop} value={prop} style={{color: 'white' }}>
             {formatProp(prop)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default SearchBarComponent;

