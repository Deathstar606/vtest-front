import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StaggeredText } from "../Animations";

function Cod() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
          window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          navigate("/home", { state: { scrollTo: "deal" } });
        }
        return prev - 1;
      });
    }, 1800);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="d-flex justify-content-center vh-100">
      <div className="text-center" style={{ marginTop: "20vh" }}>
        <h1 className="pb-2">
          <StaggeredText text={"Cash On Delivery Has Been Accepted"} />
        </h1>
        <p>Thank you for your order. Your request for cash on delivery has been accepted.</p>
        <p className="mt-5 text-sm text-gray-500">Redirecting to home in {countdown}...</p>
      </div>
    </div>
  );
}

export default Cod;
