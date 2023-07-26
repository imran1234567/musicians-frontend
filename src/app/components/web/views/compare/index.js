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
    comarisionItems: [],
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

  componentDidMount() {
    const comarisionItems = JSON.parse(localStorage.getItem("comparisonItems"));
    if (comarisionItems) {
      this.setState({ comarisionItems });
    }
  }

  render() {
    const { selectedProduct, selectedProducts, products, comarisionItems } =
      this.state;
    return (
      <div className="comparison-page">
        <h1 className="mb-4 mt-4 sec-title">Instrument Comparison</h1>
        <div className="container">
          <div className="comparison-page-section">
            {/* <h2>Available Instruments</h2> */}
          </div>

          {comarisionItems.length > 0 && (
            <div className="comparison-page-section">
              <h2>Selected Instruments</h2>
              <div class="table-responsive">
                <table className="comparison-table table-bordered">
                  <thead>
                    <tr>
                      <th>Product Name</th>
                      {comarisionItems.map((product) => {
                        return <th key={product.id}>{product.name}</th>;
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Product Image</td>
                      {comarisionItems.map((product) => {
                        return (
                          <td key={product.id}>
                            <img
                              src={product.photo}
                              style={{ height: "200px", width: "200px" }}
                            ></img>
                          </td>
                        );
                      })}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Brand</td>
                      {comarisionItems.map((product) => {
                        return <td key={product.id}>{product.brand}</td>;
                      })}
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Price</td>
                      {comarisionItems.map((product) => {
                        return <td key={product.id}>${product.buyerPrice}</td>;
                      })}
                    </tr>
                    {/* Add more attributes as needed */}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default compare;
