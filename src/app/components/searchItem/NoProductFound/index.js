import React from "react";
import "./NoProductFound.css";

const NoProductFound = () => {
  return (
    <div className="no-product-found">
      <img
        src="https://th.bing.com/th/id/R.9bcb4cee4917034baeb52743304a0f63?rik=%2bsFtfJsfzeV%2fpA&riu=http%3a%2f%2fwww.swadeshimart.in%2fimages%2fno-products-found.png&ehk=ah%2fEy80CotuZzqnYuPTXhz8mgmFfiKPEV7MThdqxzok%3d&risl=&pid=ImgRaw&r=01"
        alt="product"
      />
      <p>Sorry, we couldn't find any products matching your search.</p>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default NoProductFound;
