import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAxios } from "../../api/useAxios";
import LoadingSpinner from "../shared/LoadingSpinner";
import PageNotFound from "../shared/PageNotFound";
import CustomCard from "../../components/common/CustomCard";
import Rating from "react-rating-stars-component";
import TextButton from "../../components/common/TextButton";
import { toast } from "react-toastify";
import AsyncButton from "../../components/common/AsyncButton";

function BuyerRateSeller() {
  const location = useLocation();
  const [seller, setSeller] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [ratingSent, setRatingSent] = useState(false);

  const axiosInstance = useAxios();

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const sendRating = async () => {
    try {
      const params = new URLSearchParams({
        token: token,
        rating: rating,
      });

      await axiosInstance.post(`/rate-seller?${params.toString()}`);
      setRatingSent(true);
    } catch (error) {
      console.error(error);
      toast.error("Error rating seller! " + error.response.data);
    }
  };

  const getQueryParams = () => {
    return new URLSearchParams(location.search);
  };

  const queryParams = getQueryParams();
  const productId = queryParams.get("productId");
  const token = queryParams.get("token");

  useEffect(() => {
    axiosInstance
      .get(`/products/${productId}`)
      .then((response) => {
        setSeller(response.data.seller);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && seller === null) {
    return <PageNotFound />;
  } 

  return (
    <div className="profile-overlay">
      <div className="dialog-card" style={{ width: "20%", color: "white" }}>
        <div className="flex-aligned-container">
          <h4>Rate Seller</h4>
        </div>
        <div
          className="block-tile ml-0"
          style={{ alignItems: "center", padding: "10px" }}
        >
          <div className="block-tile ml-0">
            <div>
              <img
                src={seller.imageLink}
                style={{
                  objectFit: "cover",
                  borderRadius: "10px",
                  height: "250px",
                  width: "200px",
                }}
              />
              <h5> {seller.name} </h5>
            </div>
          </div>
          <div className="block-tile ml-0">
            {!ratingSent ? (
              <>
                <Rating
                  count={5}
                  onChange={handleRating}
                  size={24}
                  activeColor="#ffd700"
                />
                <AsyncButton
                  text="Send Rating"
                  asyncOnClick={sendRating}
                  style={{ width: "200px", height: "50px" }}
                />
              </>
            ) : (
              <p>Rating sent!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BuyerRateSeller;
