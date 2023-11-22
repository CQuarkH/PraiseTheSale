import React, { createContext, useState, useContext, useCallback } from "react";
import { useAxios } from "../api/useAxios";
import updateOrCreateProductService from "../services/updateOrCreateProductService";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [salesHistory, setSalesHistory] = useState([]);
  const axiosInstance = useAxios();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosInstance.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, [axiosInstance]);

  const fetchSalesHistory = async () => {
    try {
      const response = await axiosInstance.get("/sales-history");
      setSalesHistory(response.data.salesHistory);
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  };

  const createOrUpdateProduct = async (productData, fileSelect) => {
    try {
      const response = await updateOrCreateProductService(
        axiosInstance,
        productData,
        fileSelect
      );

      const updatedProducts = [...products];

      if (productData.id) {
        const productIndex = updatedProducts.findIndex(
          (product) => product.id === productData.id
        );

        updatedProducts[productIndex] = { ...productData, ...response };
      } else {
        updatedProducts.unshift(response);
      }

      setProducts(updatedProducts);
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axiosInstance.delete(`/products/${productId}`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
      setSalesHistory((prevSales) =>
        prevSales.filter((sale) => sale.product.id !== productId)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const markProductAsSold = async (soldProduct) => {
    try {
      await axiosInstance.put(`/products/${soldProduct.id}/mark-as-sold`);
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== soldProduct.id)
      );
      setSalesHistory((prevSales) => [soldProduct, ...prevSales]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const unmarkProductAsSold = async (unsoldProduct) => {
    try {
      await axiosInstance.put(`/products/${unsoldProduct.id}/unmark-as-sold`);
      console.log(unsoldProduct.id);
      setProducts((prevProducts) => [...prevProducts, unsoldProduct]);
      setSalesHistory((prevSales) =>
        prevSales.filter((sale) => sale.product.id !== unsoldProduct.id)
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        salesHistory,
        fetchProducts,
        fetchSalesHistory,
        createOrUpdateProduct,
        deleteProduct,
        unmarkProductAsSold,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
