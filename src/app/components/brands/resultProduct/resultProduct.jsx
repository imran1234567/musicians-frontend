import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from "react-notifications";
import List from "../../web/views/catgoryItem";
import { addToCart } from "../../../store/actions/cartActions";
import { addToWishlist } from "../../../store/actions/wishlistActions";


class resultProduct extends Component {
  state = {
    productList: [],
    isLoaded: false,
    error: null,
    sortBy: "default",
    showBy: "10",
    display: "list",
    comparisonItems: JSON.parse(localStorage.getItem("comparisonItems"))
        ? JSON.parse(localStorage.getItem("comparisonItems"))
        : [],

  };

  componentDidMount() {
    const { value } = this.props.location.state;
    const comarisionItems = JSON.parse(localStorage.getItem("comparisonItems"));
    this.fetchProducts(value);
    if (comarisionItems) {
      this.setState({ comarisionItems });
    }
  }

 addToComparison = (product) => {
    NotificationManager.success(
      `${product.name} added successfuly for comparsion!`
    );
    this.setState(
      (prevState) => ({
        comparisonItems: [...prevState.comparisonItems, product],
      }),
      () => {
        window.location.href = "/compare";
      }
    );
  };

  componentDidUpdate(prevProps) {
    const { value } = this.props.location.state;
    const prevValue = prevProps.location.state.value;

    if (value !== prevValue) {
      this.fetchProducts(value);
    }
    localStorage.setItem(
      "comparisonItems",
      JSON.stringify(this.state.comparisonItems)
    );
  }
  fetchProducts = async (searchKeyword) => {
    try {
      const response = await axios.get(
        "http://13.233.106.34:4000/api/product/gcatalogsearch/result",
        {
          params: {
            search: searchKeyword,
          },
        }
      );
      console.log("API Response:", response.data);
      const data = response.data.data[0];

      if (data && data.products) {
        const products = data.products;
        this.setState({
          productList: products,
          isLoaded: true,
        });
      } else {
        window.location.href = "/noProduct";
        // throw new Error("/noProduct");
      }
    } catch (error) {
      this.setState({
        error,
        isLoaded: true,
      });
    }
  };
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

  checkWishlist = (productId) => {
    const { wishItems } = this.props;
    const productExistsInWishlist = wishItems.some(
      (product) => product.id === productId
    );
    if (productExistsInWishlist) {
      return true;
    } else {
      return false;
    }
  };

  renderProducts = () => {
    const { productList, sortBy, showBy, display } = this.state;

    // Apply sorting based on sortBy value
    let sortedProducts = [...productList];
    if (sortBy === "NameAZ") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "NameZA") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "lowToHigh") {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === "highToLow") {
      sortedProducts.sort((a, b) => b.price - a.price);
    }

    // Apply showBy limit
    const showByLimit = parseInt(showBy, 10);
    const limitedProducts = sortedProducts.slice(0, showByLimit);
    if (display === "list") {
      return (
        <div className="featured-product-list">
          {limitedProducts.map((product, index) => {
            const isProductInCart = this.checkCart(product.id);
            const isProductInWishlist = this.checkWishlist(product.id);
            return (
              <div className="list-item" key={index}>
                <div className="product-image">
                  <img
                    src={product.photo}
                    alt="Product"
                    style={{ width: "120px", objectFit: "contain" }}
                  />
                </div>
                <div className="product-details" style={{ flex: 1 }}>
                  <Link
                    to={{
                      pathname: `/p/${product.slug}/${product.id}`,
                      state: product,
                    }}
                  >
                    <h6>{product.name}</h6>
                  </Link>
                  <h5>{this.formatPrice(product.price)}</h5>
                  <div className="add-cart">
                    {isProductInCart ? (
                      <Link to="/cart" className="fill-cart-btn">
                        Go To Cart
                      </Link>
                    ) : (
                      <a
                        href="javascript:void(0)"
                        className="fill-cart-btn"
                        onClick={() => {
                          this.props.addToCart(product);
                          NotificationManager.success(
                            `${product.name} added successfully to cart!`
                          );
                        }}
                      >
                        Add To Cart
                      </a>
                    )}
                    <div className="com">
                      {/* <a href="/compare">
                        <FontAwesomeIcon
                          icon={faCodeCompare}
                          className="compare-icon"
                        />
                      </a> */}

                            <a
                              href="javascript:void(0)"
                              onClick={() => {
                                this.addToComparison(product);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCodeCompare}
                                className="compare-icon"
                              />
                            </a>
                      <a
                        href="javascript:void(0)"
                        onClick={() => {
                          if (isProductInWishlist) {
                            // Redirect to wishlist page
                            window.location.href = "/wishlist";
                          } else {
                            this.props.addToWishlist(product);
                            NotificationManager.success(
                              `${product.name} added successfully to the wishlist!`
                            );
                          }
                        }}
                      >
                        <FontAwesomeIcon
                          icon={faHeart}
                          className="heart-icon"
                          style={{
                            color: isProductInWishlist ? "red" : "gray",
                          }}
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="featured-product-list row">
          {limitedProducts.map((product, index) => {
            const isProductInCart = this.checkCart(product.id);
            const isProductInWishlist = this.checkWishlist(product.id);
            return (
              <div className="col-lg-4 col-md-4 col-6" key={index}>
                <div className="product-box">
                  <div className="product-image">
                    <img
                      src={product.photo}
                      alt="Product"
                      style={{ width: "100%", height: "auto" }}
                    />
                  </div>
                  <div className="product-text">
                    <Link
                      to={{
                        pathname: `/p/${product.slug}/${product.id}`,
                        state: product,
                      }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <h6>{product.name}</h6>
                    </Link>
                    <h5>${product.price}</h5>
                    <div className="add-cart">
                      {isProductInCart ? (
                        <Link to="/cart" className="fill-cart-btn">
                          Go To Cart
                        </Link>
                      ) : (
                        <a
                          href="javascript:void(0)"
                          className="fill-cart-btn"
                          onClick={() => {
                            this.props.addToCart(product);
                            NotificationManager.success(
                              `${product.name} added successfully to cart!`
                            );
                          }}
                          style={{ width: "100%" }}
                        >
                          Add To Cart
                        </a>
                      )}
                      <div className="com">
                        {/* <a href="/compare">
                          <FontAwesomeIcon
                            icon={faCodeCompare}
                            className="compare-icon"
                          />
                        </a> */}
                          <a
                              href="javascript:void(0)"
                              onClick={() => {
                                this.addToComparison(product);
                              }}
                            >
                              <FontAwesomeIcon
                                icon={faCodeCompare}
                                className="compare-icon"
                              />
                            </a>
                        <a
                          href="javascript:void(0)"
                          onClick={() => {
                            if (isProductInWishlist) {
                              // Redirect to wishlist page
                              window.location.href = "/wishlist";
                            } else {
                              this.props.addToWishlist(product);
                              NotificationManager.success(
                                `${product.name} added successfully to the wishlist!`
                              );
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="heart-icon"
                            style={{
                              color: isProductInWishlist ? "red" : "gray",
                            }}
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      );
    }
  };

  checkCart = (productId) => {
    const { cartItems } = this.props;
    const productExistsInCart = cartItems.some(
      (product) => product.id === productId
    );
    if (productExistsInCart) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { isLoaded, error, sortBy, showBy, display } = this.state;

    if (!isLoaded) {
      return <CircularProgress color="secondary" />;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div className="container">
        <div className="search-page">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-6 mob-hide">
              <div className="list-name">
                <List />
              </div>
            </div>

            <div className="col-md-9">
              <section className="featured-product" style={{ padding: 0 }}>
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
                      <h5
                        style={{
                          margin: "0",
                          marginRight: "10px",
                          alignSelf: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <b>Display: </b>
                      </h5>
                      <button
                        className={`display-button ${
                          display === "list" ? "active" : ""
                        }`}
                        onClick={() => this.handleDisplayChange("list")}
                      >
                        List
                      </button>
                      <button
                        className={`display-button ${
                          display === "grid" ? "active" : ""
                        }`}
                        onClick={() => this.handleDisplayChange("grid")}
                      >
                        Grid
                      </button>
                    </div>

                    <div className="range">
                      <h5>
                        <b>Sort By: </b>
                      </h5>
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
                      </select>
                    </div>

                    <div className="show">
                      <h5>
                        <b>Show: </b>
                      </h5>
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

                  <div
                    className={`product-list ${
                      display === "grid" ? "grid-view" : ""
                    }`}
                  >
                    {this.renderProducts()}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
      // </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  wishItems: state.wish.wishItems,
});

export default connect(mapStateToProps, { addToCart, addToWishlist })(
  resultProduct
);
