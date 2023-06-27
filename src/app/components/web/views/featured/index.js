import React, { Component } from "react";
import { connect } from "react-redux";
import GroceryStampleDetails from "../../../services/GroceryStampleDetails";
import { addToCart } from "../../../../store/actions/cartActions";
import { addToWishlist } from "../../../../store/actions/wishlistActions";
import { CircularProgress } from "@material-ui/core";
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
      comparisonItems: []
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
  }

  addToComparison = (product) => {
    NotificationManager.success(
      `${product.name} added successfuly for comparsion!`
    );
    this.setState((prevState) => ({
      comparisonItems: [...prevState.comparisonItems, product]
    }),()=>{
      window.location.href = '/comare'
    })
  }

  componentDidUpdate() {
    localStorage.setItem('comparisonItems', JSON.stringify(this.state.comparisonItems))
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

  render() {
    let list = this.state.productList?.product;
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
                return (
                  <div class="col-lg-3 col-md-4 col-12" key={index}>
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
                        <h5>${row.price}</h5>
                        <div class="add-cart">
                          {isProductInCart ? (
                            <Link to="/cart" className="cart-btn">
                              Go To Cart
                            </Link>
                          ) : (
                            <a
                              href="javascript:void(0)"
                              class="cart-btn"
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
                            <a href="javascript:void(0)" onClick={() => {
                              this.addToComparison(row)
                            }}>
                              <FontAwesomeIcon
                                icon={faCodeCompare}
                                className="compare-icon"
                              />
                            </a>

                            <a
                              href="javascript:void(0)"
                              onClick={() => {
                                this.props.addToWishlist(row);
                                NotificationManager.success(
                                  `${row.name} added successfuly in wishlist!`
                                );
                              }}
                            >
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
