import React, { Component } from "react";
import { Link } from "react-router-dom";
import { GetCategoryDetails } from "../../../services";
import List from "../catgoryItem";
import cat1 from "../../../../../assets/cat-1.jpeg";
import { connect } from "react-redux";
import { addToCart } from "../../../../store/actions/cartActions";
import "./category.css";

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
    };
  }

  async componentDidMount() {
    await this.getDetails();
  }

  async componentDidUpdate(prevProps) {
    const { catId, subId } = this.props.match.params;
    const prevCatId = prevProps.match.params.catId;
    const prevSubId = prevProps.match.params.subId;

    if (catId !== prevCatId || subId !== prevSubId) {
      await this.getDetails();
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
      } 
  
      // Apply showBy limit
      const showByLimit = parseInt(showBy, 10);
      const limitedProducts = sortedProducts.slice(0, showByLimit);
      return (
        <div className="featured-product-list row">
          {limitedProducts.map((product, index) => {
            const isProductInCart = this.checkCart(product.id);
      
            return (
              <div className="col-lg-4 col-md-4 col-12" key={index}>
                <div className="product-box">
                  <div className="product-image">
                    <img src={cat1} alt="Product" />
                  </div>
                  <div className="product-text">
                    <Link
                      to={{
                        pathname: `/p/${product.slug}/${product.id}`,
                        state: product,
                      }}
                    >
                      <h6>
                        <b>{product.name}</b>
                      </h6>
                    </Link>
                    <h5>${product.price}</h5>
                    <div className="add-cart">
                      {isProductInCart ? (
                        <Link to="/cart" className="cart-btn">
                          go to cart
                        </Link>
                      ) : (
                        <a
                          href="javascript:void(0)"
                          className="cart-btn"
                          onClick={() => this.props.addToCart(product)}
                        >
                          add to cart
                        </a>
                      )}
                      <div className="com">
                        <a href="/compare">
                          <FontAwesomeIcon
                            icon={faCodeCompare}
                            className="compare-icon"
                          />
                        </a>
                        <a href="/wishlist">
                          <FontAwesomeIcon
                            icon={faHeart}
                            className="heart-icon"
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
    const { products, sortBy, showBy,display  } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3">
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
                    <h5 style={{ margin: "0", marginRight: "10px", alignSelf: "center", fontWeight: "bold" }}>
                      <b>Display: </b>
                    </h5>
                    <button
                      className={`display-button ${display === "list" ? "active" : ""}`}
                      onClick={() => this.handleDisplayChange("list")}
                      style={{
                        padding: "4px 12px",
                        backgroundColor: display === "list" ? "#ccc" : "#f0f0f0",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "14px",
                        color: display === "list" ? "#000000" : "#333",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      List
                    </button>
                    <button
                      className={`display-button ${display === "grid" ? "active" : ""}`}
                      onClick={() => this.handleDisplayChange("grid")}
                      style={{
                        padding: "4px 12px",
                        backgroundColor: display === "grid" ? "#ccc" : "#f0f0f0",
                        border: "none",
                        borderRadius: "5px",
                        fontSize: "14px",
                        color: display === "grid" ? "#000000" : "#333",
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      }}
                    >
                      Grid
                    </button>
                  </div>
                  &nbsp; &nbsp;
                  <div className="range">
                    <h5>
                      <b>Sort By: </b>
                    </h5>
                    <select id="sortBy" value={sortBy} onChange={this.handleSortByChange} placeholder="Default">
                      <option value="default">Default</option>
                      <option value="NameAZ">Name (A-Z)</option>
                      <option value="NameZA">Name (Z-A)</option>
                      <option value="lowToHigh">Price (Low &gt; High)</option>
                      <option value="highToLow">Price (High &gt; Low)</option>
                    </select>
                  </div>
                  &nbsp;&nbsp;
                  <div className="show">
                    <h5>
                      <b>Show: </b>
                    </h5>
                    <select id="showBy" value={showBy} onChange={this.handleShowByChange}>
                      <option value="10">10</option>
                      <option value="25">25</option>
                      <option value="50">50</option>
                      <option value="75">75</option>
                      <option value="100">100</option>
                    </select>
                  </div>
                </div>

                <div className={`product-list ${display === "grid" ? "grid-view" : ""}`}>{this.renderProducts()}</div>
              </div>
              
              {/* <div className="featured-product-list row">
                {products.map((row, index) => {
                  const isProductInCart = this.checkCart(row.id);
                  return (
                    <div className="col-lg-4 col-md-4 col-12" key={index}>
                      <div className="product-box">
                        <div className="product-image">
                          <img src={cat1} alt="Product" />
                        </div>
                        <div className="product-text">
                          <Link
                            to={{
                              pathname: `/p/${row.slug}/${row.id}`,
                              state: row,
                            }}
                          >
                            <h6>
                              <b>{row.name}</b>
                            </h6>
                          </Link>
                          <h5>${row.price}</h5>
                          <div className="add-cart">
                            {isProductInCart ? (
                              <Link to="/cart" className="cart-btn">
                                go to cart
                              </Link>
                            ) : (
                              <a
                                href="javascript:void(0)"
                                class="cart-btn"
                                onClick={() => this.props.addToCart(row)}
                              >
                                add to cart
                              </a>
                            )}
                            <div className="com">
                              <a href="/compare">
                                <FontAwesomeIcon
                                  icon={faCodeCompare}
                                  className="compare-icon"
                                />
                              </a>
                              <a href="/wishlist">
                                {" "}
                                <FontAwesomeIcon
                                  icon={faHeart}
                                  className="heart-icon"
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div> */}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
});

export default connect(mapStateToProps, { addToCart })(CategoryList);
