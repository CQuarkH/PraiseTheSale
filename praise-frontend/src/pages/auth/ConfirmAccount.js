import React, { useEffect, useState, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import Lottie from "lottie-react";
import axios from "axios";

function ConfirmAccount() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animationData, setAnimationData] = useState(null);

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const url = `http://localhost:8080/api/auth/confirm-account?token=${token}`;

  const hasConfirmed = useRef(false);

  useEffect(() => {
    if (!hasConfirmed.current) {
      hasConfirmed.current = true;
      axios
        .post(url)
        .then((response) => {})
        .catch((error) => {
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const fetchAnimationData = async () => {
      const url =
        "https://lottie.host/c7ce498c-a8e8-473d-8d09-213d514ab41c/qFiz1dqXv9.json";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error fetching animation data:", error);
      }
    };
    fetchAnimationData();
  }, []);

  if (loading) {
    return <div style={{ color: "white" }}>Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ color: "white" }}>
        An error occurred: {error.response.data}
      </div>
    );
  }

  return (
    <div className="overlay">
      <Lottie
        animationData={animationData}
        style={{ width: "200px", height: "200px" }}
      />
      <h3>Your account has been successfully confirmed!</h3>
    </div>
  );
}

export default ConfirmAccount;
