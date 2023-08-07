import React, { Component } from "react";
import "./BrandsList.css"; // Import the CSS file for styling

class BrandsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      filteredBrands: [],
      error: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async () => {
    try {
      const response = await fetch(
        "http://13.233.106.34:4000/api/product/brands"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch brands");
      }
      const data = await response.json();
      this.setState({
        brands: data.brands,
        loading: false,
      });
    } catch (error) {
      this.setState({
        error: error.message,
        loading: false,
      });
    }
  };

  handleClickSearch = (brandName) => {
    this.props.history.push({
      pathname: "/resultProduct",
      state: { value: brandName },
    });
  };

  filterBrandsByAlphabet = (alphabet) => {
    const { brands } = this.state;
    const filtered = brands.filter(
      (brand) => brand.brand.charAt(0).toUpperCase() === alphabet.toUpperCase()
    );
    this.setState({
      filteredBrands: filtered,
    });
  };

  render() {
    const { brands, filteredBrands, error, loading } = this.state;
    const alphabetList = Array.from(Array(26)).map((_, index) =>
      String.fromCharCode(65 + index)
    );

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    return (
      <div className="container">
        <div className="info-site">
          <h1 className="mb-4 mt-4 sec-title">Brands List</h1>
          <div className="alphabet-buttons">
            {alphabetList.map((alphabet) => (
              <button
                key={alphabet}
                onClick={() => this.filterBrandsByAlphabet(alphabet)}
                className="active"
              >
                {alphabet}
              </button>
            ))}
          </div>

          <div className="brands-item">
            <div className="row justify-content-start">
              {" "}
              {(filteredBrands.length > 0 ? filteredBrands : brands).map(
                (brand, index) => (
                  <div className="col-lg-2 col-md-3 col-6">
                    <div
                      className="brand-box"
                      key={index}
                      style={{ cursor: "pointer" }}
                      onClick={() => this.handleClickSearch(brand.brand)}
                    >
                      {/* <h4 style={{ color: "var(--primary-color)" }}>
                        {index + 1}
                      </h4> */}
                      <h4 style={{ color: "var(--primary-color)" }}>
                        {brand.brand}
                      </h4>
                    </div>
                  </div>
                )
              )}
            </div>
            {/* <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  {(filteredBrands.length > 0 ? filteredBrands : brands).map(
                    (brand, index) => (
                      <tr
                        key={index}
                        style={{ cursor: "pointer" }}
                        onClick={() => this.handleClickSearch(brand.brand)}
                      >
                        <td style={{ color: "var(--primary-color)" }}>
                          {index + 1}
                        </td>
                        <td style={{ color: "var(--primary-color)" }}>
                          {brand.brand}
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table> */}
          </div>
        </div>
      </div>
    );
  }
}

export default BrandsList;
