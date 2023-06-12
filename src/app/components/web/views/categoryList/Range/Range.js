import React, { Component } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./range.css";

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      priceRange: {
        min: 0,
        max: 1000,
      },
      sortBy: "lowToHigh",
      products: [
        // Your product data goes here
      ],
    };
  }

  handlePriceRangeChange = (value) => {
    this.setState((prevState) => ({
      priceRange: {
        min: value[0],
        max: value[1],
      },
    }));
  };

  handleSortByChange = (event) => {
    this.setState({ sortBy: event.target.value });
  };

  formatPrice = (value) => {
    return `$${value}`;
  };

  renderProducts = () => {
    const { min, max } = this.state.priceRange;
    const { sortBy, products } = this.state;

    // Filter products based on the price range
    const filteredProducts = products.filter((product) => {
      return product.price >= min && product.price <= max;
    });

    // Sort products based on the selected sorting option
    const sortedProducts = filteredProducts.sort((a, b) => {
      if (sortBy === "lowToHigh") {
        return a.price - b.price;
      } else if (sortBy === "highToLow") {
        return b.price - a.price;
      }
      return 0; // No sorting
    });

    // Generate JSX elements for the filtered and sorted products
    return sortedProducts.map((product) => (
      <div key={product.id}>
        <h2>{product.name}</h2>
        <p>Price: {this.formatPrice(product.price)}</p>
        {/* Additional product details */}
      </div>
    ));
  };

  render() {
    const { min, max } = this.state.priceRange;
    const { sortBy } = this.state;

    return (
      <div className="filter-container">
        <h4 style={{ color: "blue" }}>Price Range</h4>
        <div className="price-range">
          <div className="price-values">
            <span>{this.formatPrice(min)}</span>
            <Slider
              className="slider"
              range
              min={100}
              max={10000}
              defaultValue={[min, max]}
              onChange={this.handlePriceRangeChange}
              trackStyle={[{ backgroundColor: "#2874f0" }]}
              handleStyle={[
                {
                  borderColor: "#2874f0",
                  backgroundColor: "#2874f0",
                },
                {
                  borderColor: "#2874f0",
                  backgroundColor: "#2874f0",
                },
              ]}
              railStyle={{ backgroundColor: "#c2c2c2" }}
            />
            <span>{this.formatPrice(max)}</span>
          </div>
        </div>
        <br></br>
        <div className="range">
          <label htmlFor="sortBy">
            <h5>
              <b>Sort By: </b>
            </h5>
          </label>
          <select id="sortBy" value={sortBy} onChange={this.handleSortByChange}>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>
        </div>
        <div className="product-list">{this.renderProducts()}</div>
      </div>
    );
  }
}

export default Range;
