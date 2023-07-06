import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetCategoryDetails } from "../../../services";
import List from "../catgoryItem";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { addToWishlist } from "../../../../store/actions/wishlistActions";
import "./category.css";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "default",
      showBy: "10",
      display: "list",
      products: [],
      comparisonItems: JSON.parse(localStorage.getItem("comparisonItems"))
        ? JSON.parse(localStorage.getItem("comparisonItems"))
        : [],
    };
  }

  async componentDidMount() {
    await this.getDetails();
    const comarisionItems = JSON.parse(localStorage.getItem("comparisonItems"));
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

  async componentDidUpdate(prevProps) {
    const { catId, subId } = this.props.match.params;
    const prevCatId = prevProps.match.params.catId;
    const prevSubId = prevProps.match.params.subId;

    if (catId !== prevCatId || subId !== prevSubId) {
      await this.getDetails();
    }
    localStorage.setItem(
      "comparisonItems",
      JSON.stringify(this.state.comparisonItems)
    );
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
    const { products, sortBy, showBy, display } = this.state;

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
                  <div className="price-container">
                    {product.discountPer ? (
                      <div>
                        <h5 className="original-price">
                          <span
                            style={{
                              textDecoration: "line-through",
                              color: "gray",
                            }}
                          >
                            ${product.price}
                          </span>
                        </h5>
                      </div>
                    ) : (
                      <h5>${product.price}</h5>
                    )}
                    <div className="discount-price">
                      {/* {row.discountPer && ( */}
                      <div className="discount-tag">
                        -{product.discountPer}%
                      </div>

                      {product.discountPer && product.netPrice !== 0 ? (
                        <h5 className="net-price">${product.netPrice}</h5>
                      ) : null}
                    </div>
                  </div>
                  {/* <h5>{this.formatPrice(product.price)}</h5> */}
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
                    <div className="price-container">
                      {product.discountPer ? (
                        <div>
                          <h5 className="original-price">
                            <span
                              style={{
                                textDecoration: "line-through",
                                color: "gray",
                              }}
                            >
                              ${product.price}
                            </span>
                          </h5>
                        </div>
                      ) : (
                        <h5>${product.price}</h5>
                      )}
                      <div className="discount-price">
                        {/* {row.discountPer && ( */}
                        <div className="discount-tag">
                          -{product.discountPer}%
                        </div>

                        {product.discountPer && product.netPrice !== 0 ? (
                          <h5 className="net-price">${product.netPrice}</h5>
                        ) : null}
                      </div>
                    </div>
                    {/* <h5>${product.price}</h5> */}
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

  getDetails = async () => {
    const { catId, SubId } = this.props.match.params;

    try {
      const productList = await GetCategoryDetails.getProductListByCategory(
        catId,
        SubId
      );
      this.setState({ products: productList.data });
    } catch (error) {
      console.error("Error getting product list:", error);
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
    const { products, sortBy, showBy, display } = this.state;

    return (
      <div className="container">
        <div className="search-page">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-12 mob-hide">
              <div className="list-name">
                <List />
              </div>
            </div>

            <div className="col-lg-9 col-md-8 col-12">
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
                        <option value="lowToHigh">Price (Low & High)</option>
                        <option value="highToLow">Price (High & Low)</option>
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
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  wishItems: state.wish.wishItems,
});

export default connect(mapStateToProps, { addToCart, addToWishlist })(
  CategoryList
);
