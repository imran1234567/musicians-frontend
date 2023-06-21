import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import { NotificationManager } from "react-notifications";
import cat1 from "../../../assets/cat-1.jpeg";
import Login from "../../auth/login";
import List from "../web/views/catgoryItem";
import { addToCart } from "../../store/actions/cartActions";
import { addToWishlist } from "../../store/actions/wishlistActions";
import "./SearchItem.css";

class SearchItem extends Component {
  state = {
    productList: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    const { value } = this.props.location.state;
    this.fetchProducts(value);
  }

  componentDidUpdate(prevProps) {
    const { value } = this.props.location.state;
    const prevValue = prevProps.location.state.value;

    if (value !== prevValue) {
      this.fetchProducts(value);
    }
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
        throw new Error("No products found");
      }
    } catch (error) {
      this.setState({
        error,
        isLoaded: true,
      });
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
    const { productList, isLoaded, error } = this.state;

    if (!isLoaded) {
      return <CircularProgress color="secondary" />;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <section className="featured-product">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-12">
              <div className="list-name">
                <List />
              </div>
            </div>
            <div className="col-lg-9 col-md-9 col-12">
              <div
                className="featured-product-list row"
                style={{ width: "1040px" }}
              >
                {productList.map((product) => {
                  const isProductInCart = this.checkCart(product.id);
                  return (
                    <div className="col-lg-3 col-md-3 col-12" key={product.id}>
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
                            <h6>{product.name}</h6>
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
                                onClick={() => {
                                  this.props.addToCart(product);
                                  NotificationManager.success(
                                    `${product.name} added successfully to cart!`
                                  );
                                }}
                                style={{ width: "300px" }}
                              >
                                add to cart
                              </a>
                            )}
                            &nbsp; &nbsp;
                            <div className="com">
                              <a href="/compare">
                                <FontAwesomeIcon
                                  icon={faCodeCompare}
                                  className="compare-icon"
                                />
                              </a>
                              <a
                                href="javascript:void(0)"
                                onClick={() => {
                                  this.props.addToWishlist(product);
                                  NotificationManager.success(
                                    `${product.name} added successfully to wishlist!`
                                  );
                                }}
                              >
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
            </div>
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

export default connect(mapStateToProps, { addToCart, addToWishlist })(
  SearchItem
);
