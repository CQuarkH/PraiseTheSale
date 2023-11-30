import { React, useState, useMemo, useEffect } from "react";
import SearchBarComponent from "../common/SearchBarComponent";
import ListView from "../common/ListView";
import Filters from "../common/Filters";
import ProductTile from "../common/ProductTile";
import Header from "../common/Header";

function ProductListComponent({
  title,
  description,
  filterGroups,
  searchByList,
  customPageHeader,
  products,
  button,
}) {
  const [filteredProducts, setFilteredProducts] = useState(products);

  const filters = useMemo(
    () =>
      filterGroups ?? {
        categories: [
          {
            id: "electronics",
            label: "Electronics",
            filterFn: (product) => product.category === "ELECTRONICS",
          },
          {
            id: "fashion",
            label: "Fashion",
            filterFn: (product) => product.category === "FASHION",
          },
          {
            id: "books",
            label: "Books",
            filterFn: (product) => product.category === "BOOKS",
          },
          {
            id: "toys",
            label: "Toys",
            filterFn: (product) => product.category === "TOYS",
          },
          {
            id: "sports",
            label: "Sports",
            filterFn: (product) => product.category === "SPORTS",
          },
          {
            id: "vehicles",
            label: "Vehicles",
            filterFn: (product) => product.category === "VEHICLES",
          },
        ],
        condition: [
          {
            id: "new",
            label: "New",
            filterFn: (product) => product.condition === "NEW",
          },
          {
            id: "used",
            label: "Used",
            filterFn: (product) => product.condition === "USED",
          },
        ],
        priceRange: [
          {
            id: "low",
            label: "0 - 50",
            filterFn: (product) => product.price >= 0 && product.price <= 50,
          },
          {
            id: "medium",
            label: "51 - 100",
            filterFn: (product) => product.price >= 51 && product.price <= 100,
          },
          {
            id: "high",
            label: "101 - 200",
            filterFn: (product) => product.price >= 101 && product.price <= 200,
          },
        ],
      },
    []
  );

  const searchBy = useMemo(() => searchByList ?? ["name", "id"], []);

  const searchBarComponent = useMemo(
    () => (
      <SearchBarComponent
        elements={products}
        setFilteredElements={setFilteredProducts}
        searchBy={searchBy}
      />
    ),
    [setFilteredProducts, products]
  );

  return (
    <div className="page">
      <Header
        title={title}
        description={description}
        customHeader={customPageHeader}
        searchBar={searchBarComponent}
      />
      <div className="page-content">
        <ListView
          key="product-listview"
          elements={filteredProducts}
          ElementComponent={ProductTile}
        />
        <Filters
          key="product-list-component-filters"
          elements={products}
          filterGroups={filters}
          onFilterChange={setFilteredProducts}
        />
        {button && button}
      </div>
    </div>
  );
}

export default ProductListComponent;
