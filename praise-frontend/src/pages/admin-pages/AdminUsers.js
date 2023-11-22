import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StarRateIcon from "@mui/icons-material/StarRate";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SearchBarComponent from "../../components/common/SearchBarComponent";
import ListView from "../../components/common/ListView";
import CustomCard from "../../components/common/CustomCard";
import Header from "../../components/common/Header";
import Tab from "../../components/common/Tab";
import { useAxios } from "../../api/useAxios";
import SellerCard from "../../components/layout/SellerCard";

const containerVariants = {
  hidden: { opacity: 1, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function AdminUsers() {
  const [activeTab, setActiveTab] = useState("sellers");

  const [filteredUsers, setFilteredUsers] = useState([]);

  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);

  const axiosInstance = useAxios();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const buyersResponse = await axiosInstance.get("/users/buyers");
        setBuyers(buyersResponse.data.users);

        const sellersResponse = await axiosInstance.get("/users/sellers");
        setSellers(sellersResponse.data.sellers);

        setFilteredUsers(sellersResponse.data.sellers);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUsers();
  }, []);

  console.log(sellers);

  const searchBarComponent = useMemo(
    () => (
      <SearchBarComponent
        searchBy={["name", "id"]}
        elements={activeTab === "sellers" ? sellers : buyers}
        setFilteredElements={setFilteredUsers}
      />
    ),
    [activeTab]
  );

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setFilteredUsers(tab === "sellers" ? sellers : buyers);
  };

  return (
    <div>
      <div className="page">
        <Header
          title="Users"
          description="Manage and oversee all user accounts, ensuring a secure and vibrant community for seamless platform interactions."
          searchBar={searchBarComponent}
        />
        <motion.div
          className="page-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="tabs">
            <Tab
              label="Sellers"
              isActive={activeTab === "sellers"}
              onClick={() => handleTabChange("sellers")}
            />
            <Tab
              label="Buyers"
              isActive={activeTab === "buyers"}
              onClick={() => handleTabChange("buyers")}
            />
          </div>
          {
            <ListView
              grid={true}
              elements={filteredUsers}
              ElementComponent={
                activeTab === "sellers" ? SellerCard : BuyerComponent
              }
            />
          }
        </motion.div>
      </div>
    </div>
  );
}

function BuyerComponent({ element: buyer }) {
  return (
    <AnimatePresence>
      <CustomCard
        key={`buyer-${buyer.id}`}
        layoutID={`buyer-${buyer.id}`}
        element={buyer}
        propsToShow={["description"]}
        propFormat={{ description: "p" }}
        iconMap={{}}
        linkRoute="/admin-users/"
        propRoute={["id"]}
      />
    </AnimatePresence>
  );
}

export default AdminUsers;
