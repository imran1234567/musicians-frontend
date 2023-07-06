import React, { useEffect, useState } from "react";
import "./BrandsList.css"; // Import the CSS file for styling
import { Link } from "react-router-dom";

const BrandsList = () => {
  const [brands, setBrands] = useState([]);
  const [filteredBrands, setFilteredBrands] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://13.233.106.34:4000/api/product/brands"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch brands");
        }
        const data = await response.json();
        setBrands(data.brands);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterBrandsByAlphabet = async (alphabet) => {
    try {
      const response = await fetch(
        `http://13.233.106.34:4000/api/product/gcatalogsearch/result?brand=${alphabet}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      // Handle the data for displaying the products
    } catch (error) {
      setError(error.message);
    }
  };
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
              onClick={() => filterBrandsByAlphabet(alphabet)}
              className="active"
            >
              {alphabet}
            </button>
          ))}
        </div>
        <div className="policy-text">
          <div className="brands-table">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                </tr>
              </thead>
              <tbody>
                {(filteredBrands.length > 0 ? filteredBrands : brands).map(
                  (brand, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/products/${brand.brand}`}>
                          {brand.brand}
                        </Link>
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandsList;
