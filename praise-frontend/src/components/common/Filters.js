import React, {useState, useEffect, memo, useCallback} from 'react'
import { motion } from 'framer-motion';
import { formatProp } from './utils';

function Filters({ elements, filterGroups, onFilterChange, sortByDateDescending = false }) {

  const [activeFilters, setActiveFilters] = useState([]);

  const handleSortByDateDescending = (a, b) => {
    const dateA = new Date(a.dateTime);
    const dateB = new Date(b.dateTime);
    return dateB - dateA;
  }
  

  useEffect(() => {
    let results = elements;

    for (let filterFn of activeFilters) {
      results = results.filter(filterFn);
    }
    
    if(sortByDateDescending){
      results.sort(handleSortByDateDescending); 
    }

    onFilterChange(results);
  }, [elements, activeFilters, onFilterChange]);


  const filtersChangeHandler = useCallback((filterOption) => {
    const newActiveFilters = [...activeFilters];
    if (newActiveFilters.includes(filterOption.filterFn)) {
      newActiveFilters.splice(newActiveFilters.indexOf(filterOption.filterFn), 1);
    } else {
      newActiveFilters.push(filterOption.filterFn);
    }
    setActiveFilters(newActiveFilters);
  }, [activeFilters]);

  return (
    <div className='page-filters'>
        <h3>Filters</h3>
        {Object.entries(filterGroups).map(([group, filters]) => (
        <div key={group} className= 'page-filters-group'>
          <h4>{formatProp(group)}</h4>
          {filters.map(filterOption => (
            <div className='page-filters-item'>
            <motion.input 
            id={filterOption.id}
            key={filterOption.id}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            className='page-filters-checkbox'
            type="checkbox"
            checked={activeFilters.includes(filterOption.filterFn)}
            onChange={() => filtersChangeHandler(filterOption)}/>
             <label htmlFor={filterOption.id}>{filterOption.label}</label>
            </div>
           
          ))}
        </div>
      ))}
    </div>
  )
}

export default memo(Filters);