import React from "react";
import axios from "axios";
import "./SearchItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faCodeCompare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "@material-ui/core";
import cat from "./../../../images/cat.jpg";
class SearchItem extends React.Component {
  state = {
    productData: [],
    isLoading: true,
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
      const products = response.data.data[0].products;

      this.setState({
        productData: products,
        isLoading: false,
      });
    } catch (error) {
      this.setState({
        error,
        isLoading: false,
      });
    }
  };

  handleReadMore = (productId) => {
    // Implement your logic here to handle the "Read More" functionality
    console.log(`Read More clicked for product with id: ${productId}`);
  };

  render() {
    const { productData, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    // checkCart = (productId) => {
    //   const { cartItems } = this.props;
    //   const productExistsInCart = cartItems.some(
    //     (product) => product.id === productId
    //   );
    //   if (productExistsInCart) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // };

    return (
      <div className="search-content">
        <div className="card-container">
          {productData.map((product) => (
            <div key={product.id} className="card">
              <img src={cat} alt="img" />
              <h3 style={{ color: "black" }}>{product.name}</h3>
              <p>{product.slug}</p>
              <p>{product.sortDesc}</p>
              {product.sortDesc.length > 3 && (
                <span
                  className="read-more"
                  onClick={() => this.handleReadMore(product.id)}
                >
                  Read More
                </span>
              )}
              <p>Price: {product.price}</p>
              <div class="add-cart">
                {/* {isProductInCart ? ( */}
                <Link to="/cart" className="cart-btn">
                  go to cart
                </Link>
                {/* ) : (
                            <a
                              href="javascript:void(0)"
                              class="cart-btn"
                              onClick={() => this.props.addToCart(row)}
                            >
                              add to cart
                            </a>
                          )} */}
                <div className="com">
                  <a href="/compare">
                    <FontAwesomeIcon
                      icon={faCodeCompare}
                      className="compare-icon"
                    />
                  </a>

                  {/* <a
                              href="javascript:void(0)"
                              onClick={() => this.props.addToWishlist(row)}
                            >
                              {" "} */}
                  <a href="/wishlist"></a>
                  <FontAwesomeIcon icon={faHeart} className="heart-icon" />
                  {/* </a> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default SearchItem;
