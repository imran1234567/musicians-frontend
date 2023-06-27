import React from "react";
import { useHistory } from "react-router-dom";
import "./OrderSuccess.css";

const OrderSuccess = () => {
  const history = useHistory();

  const handleTrackOrder = () => {
    history.push("/account/order/list");
  };

  return (
    <div className="order-success">
      <div className="container">
        <div className="inner-order">
          <img
            src="https://th.bing.com/th?id=OIP.sODpEp75dhRTXZKaQ4MZVgHaHN&w=253&h=246&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2"
            alt="order"
          />
          <h1>Order Placed Successfully!</h1>
          <p>
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <p>
            An email with the order details has been sent to your registered
            email address.
          </p>
          <br />
          <button onClick={handleTrackOrder}>Track Your Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
