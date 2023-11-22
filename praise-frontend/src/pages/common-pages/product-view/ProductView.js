import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProductLayout from "./ProductLayout";
import { useAuth } from "../../../context/AuthContext";
import { useProducts } from "../../../context/ProductContext";
import PageNotFound from "../../shared/PageNotFound";
import LoadingSpinner from "../../shared/LoadingSpinner";

function ProductView() {
  const { productID } = useParams();
  const navigate = useNavigate();
  const { authData } = useAuth();
  const { products, fetchProducts } = useProducts();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!products.length) {
      fetchProducts().then(() => setIsLoading(false));
    } else {
      const foundProduct =
        products.find((p) => p.id === Number(productID)) || null;
      setProduct(foundProduct);
      setIsLoading(false);
    }
  }, [productID, products, fetchProducts]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && product === null) {
    return <PageNotFound />;
  }

  return (
    <ProductLayout
      product={product}
      seller={product.seller}
      authRole={authData.role}
      onBackClick={() => navigate(-1)}
    />
  );
}

export default ProductView;
