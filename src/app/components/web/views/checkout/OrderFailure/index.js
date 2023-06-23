import React from "react";
import "./OrderFailure.css";

const OrderFailure = () => {
  return (
    <div className="order-failure-page">
      <img
        src="https://th.bing.com/th/id/R.6e5c8337fb2fce4afc16f6bcdc7a35a1?rik=5SlT89vnvKsnfA&riu=http%3a%2f%2f4.bp.blogspot.com%2f-3COrhYW7glE%2fUkxdoBarJfI%2fAAAAAAAAAwc%2flgigiGxjObc%2fs1600%2fx_mark_red_circle.png&ehk=AnVg5OeHP0FUPL9Z94NcrNnCZc3Tt3q3OPhGVgTBKbg%3d&risl=&pid=ImgRaw&r=0"
        alt="failed"
        style={{ height: "200px" }}
      />
      <h1 style={{ color: "black" }}>Order Failed</h1>
      <p>Sorry, your order could not be processed.</p>
      <p>Please contact customer support for assistance.</p>
      <br></br>
      <button style={{ width: "400px", backgroundColor: "firebrick" }}>
        Try Again{" "}
      </button>
    </div>
  );
};

export default OrderFailure;
