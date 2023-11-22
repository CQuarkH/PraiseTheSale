import { React, useState, useMemo, useEffect } from "react";
import SearchBarComponent from "../../components/common/SearchBarComponent";
import ListView from "../../components/common/ListView";
import Header from "../../components/common/Header";
import { useAxios } from "../../api/useAxios";
import SellerCard from "../../components/layout/SellerCard";

function BuyerSellers() {
  const [filteredSellers, setFilteredSellers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const axiosInstance = useAxios("buyer");

  useEffect(() => {
    axiosInstance
      .get("/sellers")
      .then((response) => {
        setSellers(response.data.sellers);
        setFilteredSellers(response.data.sellers);
        console.log(response.data.sellers);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const searchBarComponent = useMemo(
    () => (
      <SearchBarComponent
        searchBy={["name", "id"]}
        elements={sellers}
        setFilteredElements={setFilteredSellers}
      />
    ),
    [setFilteredSellers, sellers]
  );

  return (
    <div>
      <div className="page">
        <Header
          searchBar={searchBarComponent}
          title="Sellers"
          description="Discover trusted sellers on our platform. Browse profiles, view product listings, and choose your preferred vendor."
        />

        <div className="page-content">
          <ListView
            elements={filteredSellers}
            ElementComponent={SellerCard}
            grid={true}
          />
        </div>
      </div>
    </div>
  );
}

export default BuyerSellers;
