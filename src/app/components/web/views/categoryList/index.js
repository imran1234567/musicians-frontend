import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetCategoryDetails, GetUserLogin } from "../../../services";
import List from "../catgoryItem";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import { addToWishlist } from "../../../../store/actions/wishlistActions";
import "./category.css";
import { NotificationManager } from "react-notifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import offerImage from "../../../../../images/special-offer.png";
import Login from "../../../../auth/login";
import noImage from "../../../../../assets/noImage.jpg";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "default",
      showBy: "10",
      display: "list",
      products: [],
      token: "",
      totalProducts: 0,
      comparisonItems: JSON.parse(localStorage.getItem("comparisonItems"))
        ? JSON.parse(localStorage.getItem("comparisonItems"))
        : [],
      currentPage: 1,
      productsPerPage: 10,
    };
  }

  async componentDidMount() {
    try {
      const cookies = await GetUserLogin.isAuthenticate();
      this.setState({ token: cookies });
      await this.getDetails();
  
      const comparisonItems = JSON.parse(localStorage.getItem("comparisonItems"));
      this.setState({ comparisonItems });
  
      // Set the initial totalProducts value based on fetched products
      this.setState({ totalProducts: this.state.products.length });
    } catch (error) {
      console.error(error);
    }
  }

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // You can change this to "auto" for instant scrolling
    });
  };


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
  
      // After fetching details, update totalProducts and localStorage
      this.setState({ totalProducts: this.state.products.length }, () => {
        localStorage.setItem(
          "comparisonItems",
          JSON.stringify(this.state.comparisonItems)
        );
      });
    }
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
  // paginate = (pageNumber) => {
  //   this.setState({ currentPage: pageNumber }, () => {
  //     window.scrollTo({ top: 0, behavior: "smooth" });
  //   });
  // };
  
  renderPagination = () => {
    const { currentPage, productsPerPage, totalProducts } = this.state;
    const totalPages = Math.ceil(totalProducts / productsPerPage);

    return (
      <ul className="pagination">
        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => this.handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {Array.from({ length: totalPages }, (_, index) => (
          <li
            key={index}
            className={`page-item ${currentPage === index + 1 ? "active" : ""}`}
          >
            <button
              className="page-link"
              onClick={() => this.handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
        >
          <button
            className="page-link"
            onClick={() => this.handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    );
  };

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber }, () => {
      this.scrollToTop();// Scroll to the top after setting the page number
    });
  };

  renderProducts = () => {
    const {
      products,
      sortBy,
      showBy,
      display,
      token,
      currentPage,
      productsPerPage,
    } = this.state;


    // ... filtering logic ...

    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    let filteredProducts = [...products];

    if (sortBy === "special") {
      filteredProducts = filteredProducts.filter(
        (product) => product.special === true
      );
    }

    // Apply sorting based on sortBy value
    let sortedProducts = [...filteredProducts];
    if (sortBy === "NameAZ") {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "NameZA") {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === "lowToHigh") {
      sortedProducts.sort((a, b) => a.netPrice - b.netPrice);
    } else if (sortBy === "highToLow") {
      sortedProducts.sort((a, b) => b.netPrice - a.netPrice);
    }

    // Apply showBy limit
    const showByLimit = parseInt(showBy, 10);
    const limitedProducts = sortedProducts.slice(startIndex, endIndex);

    if (display === "list") {
      return (
        <div className="featured-product-list">
          {limitedProducts.map((product, index) => {
            const isProductInCart = this.checkCart(product.id);
            const isProductInWishlist = this.checkWishlist(product.id);

            // Check if product has a photo, otherwise use the default image
            const productImage = product.photo || noImage;

            return (
              <div
                className={`list-item ${
                  product.special ? "special-product" : ""
                }`}
                key={index}
              >
                {/* Add offerImage for special offer products */}
                {product.special && (
                  <img
                    src={offerImage}
                    alt="Special Offer"
                    className="special-offer-image"
                  />
                )}
                <div className="product-image">
                  <Link
                    to={{
                      pathname: `/p/${product.slug}/${product.id}`,
                      state: product,
                    }}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img src={product.photo || noImage} alt="Product" />
                  </Link>
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
          <Login />
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
                <div
                  className={`product-box ${
                    product.special ? "special-product" : ""
                  }`}
                >
                  {/* Add offerImage for special offer products */}
                  {product.special && (
                    <img
                      src={offerImage}
                      alt="Special Offer"
                      className="special-offer-image"
                    />
                  )}
                  <div className="product-image">
                    <Link
                      to={{
                        pathname: `/p/${product.slug}/${product.id}`,
                        state: product,
                      }}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <img src={product.photo || noImage} alt="Product" />
                    </Link>
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
          <Login />
        </div>
      );
    }
  };

  getDetails = async () => {
    const { catId, SubId } = this.props.match.params;

    try {
      const products = await GetCategoryDetails.getProductListByCategory(
        catId,
        SubId
      );
      this.setState({ products: products.data });
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
    const { products, sortBy, showBy, display, currentPage, itemsPerPage } =
      this.state;

    let filteredProducts = [...products];

    // ... filtering logic ...

    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(filteredProducts.length / itemsPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

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
                        <option value="special">Special Offer</option>
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
                  <div className="pagination-container">
                    {this.renderPagination()}
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
