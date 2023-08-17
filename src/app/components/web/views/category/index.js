import React, { Component } from "react";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./category.css";
import noImage from "../../../../../assets/noImage.jpg";
class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      loading: true,
      error: null,
      currentPage: 1,
      itemsPerPage: 7, // Adjust as needed
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://13.233.106.34:4000/api/product/getAllproductList"
      );
      const data = response.data.product;

      // Check if the response data is an array or an object with a 'data' property
      const products = Array.isArray(data) ? data : data.data || [];

      const featuredProducts = products.filter(
        (product) => product.featured === true
      );
      this.setState({ products: featuredProducts, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  // Calculate the total number of pages based on itemsPerPage
  getTotalPages = () =>
    Math.ceil(this.state.products.length / this.state.itemsPerPage);

  // Update currentPage in state and fetch new data based on the page
  handlePageChange = (newPage) => {
    this.setState({ currentPage: newPage });
  };

  render() {
    const { products, loading, error, currentPage, itemsPerPage } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error}</div>;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const displayedProducts = products.slice(startIndex, endIndex);

    var settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 2,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 3,
            infinite: true,
            dots: false,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
          },
        },
      ],
    };

    return (
      <div style={{ background: "#fff" }}>
        <div className="container" id="header-category-bk">
          <Slider {...settings}>
            {displayedProducts.map((product) => (
              <div className="item" key={product.id}>
                <div className="category-item">
                  <Link
                    to={{
                      pathname: `/p/${product.slug}/${product.id}`,
                      state: product,
                    }}
                  >
                    <img
                      className="img-fluid"
                      src={product.photo || noImage} // Use noImage as fallback
                      alt={product.name}
                    />
                  </Link>
                  <Link
                    to={{
                      pathname: `/p/${product.slug}/${product.id}`,
                      state: product,
                    }}
                  >
                    <h6>{product.name}</h6>
                  </Link>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
  }
}

export default Category;
