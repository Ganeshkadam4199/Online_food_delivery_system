import React from "react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <div className="container text-center mt-5 p-5">
      <i className="fas fa-check-circle fa-5x text-success"></i>
      <h1>Thank You</h1>
      <h2>Your Order Successfully</h2>
      <h5>With in 1 Hour Your Food will be Delivered In your Address</h5>
      <Link to="/" className="btn btn-primary mt-3">
        Home
      </Link>
      <Link to="/orders" className="btn btn-danger mt-3">
        View Order
      </Link>
    </div>
  );
};

export default OrderSuccess;
