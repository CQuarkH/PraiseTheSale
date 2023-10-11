import {React, useState, useMemo} from 'react';
import SearchBarComponent from './utils/SearchBarComponent';
import { productList } from '../test-api/products/Product';
import ListView from './utils/ListView';
import Filters from './utils/Filters';
import ProductTile from './utils/ProductTile';
import Header from './utils/Header';

function ProductListComponent({
  title, 
  description, 
  filterGroups, 
  searchByList, 
  customPageHeader, 
  customElements,
  button}) {

    const products = customElements ?? productList;

    const [filteredProducts, setFilteredProducts] = useState(products);

    const filters = useMemo(() => ( filterGroups ?? {
      categories: [
        { id: 'electronics', label: 'Electronics', filterFn: product => product.category === 'electronics'},
        { id: 'clothing', label: 'Clothing', filterFn: product => product.category === 'clothing'},
        { id: 'books', label: 'Books', filterFn: product => product.category === 'books'},
        { id: 'toys', label: 'Toys', filterFn: product => product.category === 'toys' },
        { id: 'sports', label: 'Sports', filterFn: product => product.category === 'sports' },
        { id: 'vehicles', label: 'Vehicles', filterFn: product => product.category === 'vehicles' },
      ],
      condition: [
        { id: 'new', label: 'New', filterFn: product => product.condition === 'new' },
        { id: 'used', label: 'Used', filterFn: product => product.condition === 'used' },
      ],
      priceRange: [
        { id: 'low', label: '0 - 50', filterFn: product => product.price >= 0 && product.price <= 50 },
        { id: 'medium', label: '51 - 100', filterFn: product => product.price >= 51 && product.price <= 100 },
        { id: 'high', label: '101 - 200', filterFn: product => product.price >= 101 && product.price <= 200 },
      ]
    }), []);

    const searchBy = useMemo(() => searchByList ?? ['name', 'id', 'category'], []);

    const searchBarComponent = useMemo(() => (
      <SearchBarComponent 
            elements={products} 
            setFilteredElements={setFilteredProducts}
            searchBy={searchBy}/>
    ), [setFilteredProducts]);
  

    return (
      <div className='page'>
      <Header
      title={title}
      description={description}
      customHeader={customPageHeader}
      searchBar={searchBarComponent}/>
      <div className='page-content'>
        <ListView elements={filteredProducts} ElementComponent={ProductTile}/>
        <Filters elements={products} filterGroups={filters} onFilterChange={setFilteredProducts}/>
        {
          button && (
           button
          )
        }
      </div>
     
      </div>
  
    )
  }
  
  
  export default ProductListComponent