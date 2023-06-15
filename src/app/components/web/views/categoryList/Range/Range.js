import React, { Component } from "react";
import "rc-slider/assets/index.css";
import "./range.css";

class Range extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "default",
      showBy:"10",
      products: [
        // Your product data goes here
      ],
    };
  }

  
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
      </div>
    ));
  };

  render() {

    const { sortBy, showBy,display } = this.state;

    return (
      <div className="filter-container">
      <div className="price-sort-row">

        <div className="display-options" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' ,  marginTop:'10px'}}>
          <h5 style={{ margin: '0', marginRight: '10px', alignSelf: 'center', fontWeight:'bold' }}><b>Display: </b></h5>
          <button
            className={`display-button ${display === 'list' ? 'active' : ''}`}
            onClick={() => this.handleDisplayChange('list')}
            style={{
             
              padding: '4px 12px',
              backgroundColor: display === 'list' ? '#ccc' : '#f0f0f0',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              color: display === 'list' ? '#000000' : '#333',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            List
          </button>
          <button
            className={`display-button ${display === 'grid' ? 'active' : ''}`}
            onClick={() => this.handleDisplayChange('grid')}
            style={{

              padding: '4px 12px',
              backgroundColor: display === 'list' ? '#ccc' : '#f0f0f0',
              border: 'none',
              borderRadius: '5px',
              fontSize: '14px',
              color: display === 'list' ? '#000000' : '#333',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease'
            }}
          >
            Grid
          </button>
        </div>
        &nbsp; &nbsp;
        <div className="range">
          <h5><b>Sort By: </b></h5>
          <select
            id="sortBy"
            value={sortBy}
            onChange={this.handleSortByChange}
            placeholder="Default"
          >
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
          <h5><b>Show: </b></h5>
          <select
            id="showBy"
            value={showBy}
            onChange={this.handleShowByChange}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="75">75</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
    
      <div className="product-list">{this.renderProducts()}</div>
    </div>
    );
  }
}

export default Range;
