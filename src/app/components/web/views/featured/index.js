import React, { Component } from "react";
import { connect } from "react-redux";
import GroceryStampleDetails from "../../../services/GroceryStampleDetails";
import { addToCart } from "../../../../store/actions/cartActions";
import { addToWishlist } from "../../../../store/actions/wishlistActions";
import { CircularProgress } from "@material-ui/core";
import cat1 from "../../../../../assets/cat-1.jpeg";
import { Link } from "react-router-dom";
import { GetUserLogin } from "../../../services";
import Login from "../../../../auth/login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import "./feature.css";
import { NotificationManager } from "react-notifications";

class Featured extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      productList: [],
      isLoaded: false,
      comparisonItems: JSON.parse(localStorage.getItem("comparisonItems"))
        ? JSON.parse(localStorage.getItem("comparisonItems"))
        : [],
    };
  }

  async componentDidMount() {
    let list = await GroceryStampleDetails.getAllGroceryStaple();
    let cookies = await GetUserLogin.isAuthenticate();
    this.setState({
      token: cookies,
    });
    if (list) {
      this.setState({
        productList: list,
        isLoaded: true,
      });
    }
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

  componentDidUpdate() {
    localStorage.setItem(
      "comparisonItems",
      JSON.stringify(this.state.comparisonItems)
    );
  }

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

  render() {
    let list = this.state.productList?.product;
    const {token} = this.state;
    return (
      <section class="featured-product">
        <div class="container-fluid">
          <h2 class="sec-title">Featured Products</h2>
          <div class="featured-product-list row">
            {!this.state.isLoaded ? (
              <div className="progress-bar-bk">
                <CircularProgress color="secondary" />
              </div>
            ) : (
              list.map((row, index) => {
                const isProductInCart = this.checkCart(row.id);
                const isProductInWishlist = this.checkWishlist(row.id);
                const discountedPrice =
                  row.price - (row.price * row.discountPer) / 100;
                const netPrice = row.price - discountedPrice;
                return (
                  <div class="col-lg-3 col-md-4 col-6" key={index}>
                    <div class="product-box">
                      <div class="product-image">
                        <img src={row.photo} alt="product" />
                      </div>
                      <div class="product-text">
                        <Link
                          to={{
                            pathname: `/p/${row.slug}/${row.id}`,
                            state: row,
                          }}
                        >
                          <h6>{row.name}</h6>
                        </Link>
                        <div className="price-container">
                          {row.discountPer ? (
                            <div>
                              <h5 className="original-price">
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    color: "gray",
                                  }}
                                >
                                  ${row.price}
                                </span>
                              </h5>
                            </div>
                          ) : (
                            <h5>${row.price}</h5>
                          )}
                          <div className="discount-price">
                            {/* {row.discountPer && ( */}
                            <div className="discount-tag">
                              -{row.discountPer}%
                            </div>

                            {row.discountPer && row.netPrice !== 0 ? (
                              <h5 className="net-price">${row.netPrice}</h5>
                            ) : null}
                          </div>
                        </div>

                        {/* <h5>${row.price}</h5>
                        {row.discountPer && (
                          <div className="discount-tag">
                            -{row.discountPer}%
                          </div>
                        )} */}
                        <div class="add-cart">
                          {!token ? <a data-target="#bd-example-modal" data-toggle="modal" className="fill-cart-btn">
                          Add To Cart
                        </a>: isProductInCart ? (
                            <Link to="/cart" className="fill-cart-btn">
                              Go To Cart
                            </Link>
                          ) : (
                            <a
                              href="javascript:void(0)"
                              class="fill-cart-btn"
                              onClick={() => {
                                this.props.addToCart(row);
                                NotificationManager.success(
                                  `${row.name} added successfuly in cart!`
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
                                this.addToComparison(row);
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
                                  this.props.addToWishlist(row);
                                  NotificationManager.success(
                                    `${row.name} added successfully to the wishlist!`
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
              })
            )}
          </div>
        </div>
        <Login />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItems: state.cart.cartItems,
  wishItems: state.wish.wishItems,
});

export default connect(mapStateToProps, { addToCart, addToWishlist })(Featured);
