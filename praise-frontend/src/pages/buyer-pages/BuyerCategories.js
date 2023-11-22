import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SearchBarComponent from "../../components/common/SearchBarComponent";
import ListView from "../../components/common/ListView";
import CustomCard from "../../components/common/CustomCard";
import Header from "../../components/common/Header";
import { useAxios } from "../../api/useAxios";

function BuyerCategories() {
  const axiosInstance = useAxios("buyer");
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/categories")
      .then((response) => {
        setCategories(response.data.categories);
        setFilteredCategories(response.data.categories);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchBarComponent = useMemo(
    () => (
      <SearchBarComponent
        elements={categories}
        setFilteredElements={setFilteredCategories}
      />
    ),
    [setFilteredCategories]
  );

  return (
    <div>
      <div className="page">
        <Header
          title="Categories"
          description="Explore a diverse range of products by browsing through our categories. Find exactly what you're looking for with ease."
          searchBar={searchBarComponent}
        />
        <div className="page-content">
          <ListView
            key="buyer-categories"
            elements={filteredCategories}
            ElementComponent={CategoryComponent}
            grid={true}
          />
        </div>
      </div>
    </div>
  );
}

function CategoryComponent({ element: category }) {
  const iconMap = {
    productLength: <Inventory2Icon />,
  };

  const onFalsyProps = {
    productLength: "No products available",
  };

  return (
    <AnimatePresence>
      <CustomCard
        element={category}
        propsToShow={["productLength", "categoryDescription"]}
        propsLabel={{ productLength: "products" }}
        onFalsyProps={onFalsyProps}
        iconMap={iconMap}
        propFormat={{ description: "p" }}
        propRoute={["name"]}
        linkRoute={"/buyer-categories/"}
      />
    </AnimatePresence>
  );
}

export default BuyerCategories;
