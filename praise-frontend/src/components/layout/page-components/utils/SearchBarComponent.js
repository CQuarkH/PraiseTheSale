import {React, useState, useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';

function SearchBarComponent({elements, setFilteredElements, searchBy = ['name']}) {
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!searchTerm.trim()) {
        setFilteredElements(elements);
        return;
    }
    const results = elements.filter(element => {
      for (let prop of searchBy) {
        const value = element[prop].toString();
        if (value && value.toLowerCase().includes(searchTerm.toLowerCase())) {
          return true;
        }
      }
      return false;
    });

    setFilteredElements(results);
  }, [searchTerm, elements, searchBy]);

  
  return (
    <div className='searchbar-container'>
    <SearchIcon/>
    <input 
          className='page-header-search-bar'
          type="text" 
          placeholder="Search here..." 
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          />
    </div>
  )
}

export default SearchBarComponent;
