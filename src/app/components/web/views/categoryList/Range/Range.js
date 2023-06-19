import React, { Component } from "react";

import "./range.css";

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "default",
      showBy: "10",
      display: "list",
      products: [
        { id: 1, name: "Product 1", price: 10, model: "Model A" },
        { id: 2, name: "Product 2", price: 20, model: "Model B" },
        { id: 3, name: "Product 3", price: 15, model: "Model C" },
        { id: 4, name: "Product 4", price: 12, model: "Model D" },
        { id: 5, name: "Product 5", price: 18, model: "Model E" },
        { id: 6, name: "Product 6", price: 25, model: "Model F" },
        { id: 7, name: "Product 7", price: 30, model: "Model G" },
        { id: 8, name: "Product 8", price: 22, model: "Model H" },
        { id: 9, name: "Product 9", price: 17, model: "Model I" },
        // { id: 10, name: "Product 10", price: 16, model: "Model J" },
        // { id: 11, name: "Product 11", price: 19, model: "Model K" },
        // { id: 12, name: "Product 12", price: 14, model: "Model L" },
        // { id: 13, name: "Product 13", price: 23, model: "Model M" },
        // { id: 14, name: "Product 14", price: 28, model: "Model N" },
        // { id: 15, name: "Product 15", price: 32, model: "Model O" },
      ],
    };
  }

  // componentDidMount() {
  //   // Fetch the product data from an API using Axios
  //   axios
  //     .get("https://example.com/api/products")
  //     .then((response) => {
  //       this.setState({ products: response.data });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching product data:", error);
  //     });
  // }

  // Sort By changes function
  handleSortByChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  // Show By changes function
  handleShowByChange = (event) => {
    this.setState({ showBy: event.target.value });
  };

  handleDisplayChange = (displayType) => {
    this.setState({ display: displayType });
  };

  formatPrice = (value) => {
    return `$${value}`;
  };

  renderProducts = () => {
    const { products, sortBy, showBy } = this.state;

    // Apply sorting based on sortBy value
    let sortedProducts = [...products];
    if (sortBy === "NameAZ") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "NameZA") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortBy === "ModelAZ") {
      sortedProducts.sort((a, b) => a.model.localeCompare(b.model));
    } else if (sortBy === "ModelZA") {
      sortedProducts.sort((a, b) => b.model.localeCompare(a.model));
    }

    // Apply showBy limit
    const showByLimit = parseInt(showBy, 10);
    const limitedProducts = sortedProducts.slice(0, showByLimit);

    // Generate JSX elements for the filtered and sorted products
    return limitedProducts.map((product) => (
      // Render each product item
      <div key={product.id}>
        {/* Product details */}
        <p>Name: {product.name}</p>
        <p>Price: {this.formatPrice(product.price)}</p>
        <p>Model: {product.model}</p>
      </div>
    ));
  };

  render() {
    const { sortBy, showBy, display } = this.state;

    return (
      <div className="filter-container">
        <div className="price-sort-row">
          <div
            className="display-options"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <h5 style={{ margin: "0", marginRight: "10px", alignSelf: "center", fontWeight: "bold" }}>
              <b>Display: </b>
            </h5>
            <button
              className={`display-button ${display === "list" ? "active" : ""}`}
              onClick={() => this.handleDisplayChange("list")}
              style={{
                padding: "4px 12px",
                backgroundColor: display === "list" ? "#ccc" : "#f0f0f0",
                border: "none",
                borderRadius: "5px",
                fontSize: "14px",
                color: display === "list" ? "#000000" : "#333",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              List
            </button>
            <button
              className={`display-button ${display === "grid" ? "active" : ""}`}
              onClick={() => this.handleDisplayChange("grid")}
              style={{
                padding: "4px 12px",
                backgroundColor: display === "grid" ? "#ccc" : "#f0f0f0",
                border: "none",
                borderRadius: "5px",
                fontSize: "14px",
                color: display === "grid" ? "#000000" : "#333",
                cursor: "pointer",
                transition: "background-color 0.3s ease",
              }}
            >
              Grid
            </button>
          </div>
          &nbsp; &nbsp;
          <div className="range">
            <h5>
              <b>Sort By: </b>
            </h5>
            <select id="sortBy" value={sortBy} onChange={this.handleSortByChange} placeholder="Default">
              <option value="default">Default</option>
              <option value="NameAZ">Name (A-Z)</option>
              <option value="NameZA">Name (Z-A)</option>
              <option value="lowToHigh">Price (Low &gt; High)</option>
              <option value="highToLow">Price (High &gt; Low)</option>
              <option value="ModelAZ">Model (A-Z)</option>
              <option value="ModelZA">Model (Z-A)</option>
            </select>
          </div>
          &nbsp;&nbsp;
          <div className="show">
            <h5>
              <b>Show: </b>
            </h5>
            <select id="showBy" value={showBy} onChange={this.handleShowByChange}>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
              <option value="75">75</option>
              <option value="100">100</option>
            </select>
          </div>
        </div>

        <div className={`product-list ${display === "grid" ? "grid-view" : ""}`}>{this.renderProducts()}</div>
      </div>
    );
  }
}

export default Range;
