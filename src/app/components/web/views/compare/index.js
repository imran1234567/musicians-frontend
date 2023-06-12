import React, { Component } from "react";
import "./compare.css"; // Import the CSS file for styling

class compare extends Component {
  state = {
    selectedProduct: null,
    selectedProducts: [1], // Set the default selected product ID here
    products: [
      { id: 1, name: "Guitar", price: 500, brand: "Fender" },
      { id: 2, name: "Piano", price: 2000, brand: "Yamaha" },
      { id: 3, name: "Drums", price: 800, brand: "Pearl" },
      { id: 4, name: "Violin", price: 300, brand: "Stradivarius" },
      { id: 5, name: "Saxophone", price: 1500, brand: "Selmer" },
      { id: 6, name: "Trumpet", price: 700, brand: "Bach" },
      { id: 7, name: "Keyboard", price: 400, brand: "Casio" },
      { id: 8, name: "Flute", price: 250, brand: "Yamaha" },
      { id: 9, name: "Bass Guitar", price: 600, brand: "Ibanez" },
      { id: 10, name: "Cello", price: 1200, brand: "Daddario" },
    ],
  };

  handleProductSelect = (event) => {
    const selectedProductId = parseInt(event.target.value);
    this.setState({ selectedProduct: selectedProductId });
  };

  handleAddToComparison = (productId) => {
    const { selectedProducts } = this.state;

    if (!selectedProducts.includes(productId)) {
      this.setState((prevState) => ({
        selectedProducts: [...prevState.selectedProducts, productId],
      }));
    }
  };

  render() {
    const { selectedProduct, selectedProducts, products } = this.state;

    return (
      <div className="comparison-page">
        <h1 className="comparison-page-title">Instrument Comparison</h1>
        <div className="comparison-page-section">
          <h2>Available Instruments</h2>
          <div className="dropdown-container">
            <select
              value={selectedProduct || ""}
              onChange={this.handleProductSelect}
              className="product-dropdown"
            >
              <option value="">Select an instrument</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
            <button
              className="add-to-comparison-button"
              onClick={() => this.handleAddToComparison(selectedProduct)}
              disabled={!selectedProduct}
            >
              Add to Compare
            </button>
          </div>
        </div>

        {selectedProducts.length > 0 && (
          <div className="comparison-page-section">
            <h2>Selected Instruments</h2>
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Attribute</th>
                  {selectedProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    return <th key={productId}>{product.name}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Brand</td>
                  {selectedProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    return <td key={productId}>{product.brand}</td>;
                  })}
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>Price</td>
                  {selectedProducts.map((productId) => {
                    const product = products.find((p) => p.id === productId);
                    return <td key={productId}>${product.price}</td>;
                  })}
                </tr>
                {/* Add more attributes as needed */}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default compare;
