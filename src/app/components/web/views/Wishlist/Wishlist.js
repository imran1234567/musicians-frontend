import React, { Component } from "react";
import "./wishlist.css";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { removeFromWishlist } from "../../../../store/actions/wishlistActions";
import { addToCart } from "../../../../store/actions/cartActions";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import Login from "../../../../auth/login";
import { GetUserLogin } from "../../../services";

class Wishlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishlistItems: [
        {
          id: 1,
          name: "Guiter",
          price: 10,
          image:
            "https://cdn.pixabay.com/photo/2013/07/12/15/06/guitar-149427_1280.png",
        },
        {
          id: 2,
          name: "Violine",
          price: 20,
          image:
            "https://cdn.pixabay.com/photo/2013/07/13/10/06/violin-156558_1280.png",
        },
        {
          id: 3,
          name: "Violine2",
          price: 15,
          image:
            "https://cdn.pixabay.com/photo/2012/04/13/20/54/violin-33610_1280.png",
        },
        {
          id: 4,
          name: "Saxophone",
          price: 25,
          image:
            "https://cdn.pixabay.com/photo/2012/04/12/12/30/saxophone-29816_1280.png",
        },
      ],
      token: "",
    };
  }

  handleDeleteItem = (itemId) => {
    this.setState((prevState) => ({
      wishlistItems: prevState.wishlistItems.filter(
        (item) => item.id !== itemId
      ),
    }));
  };
  handleAddToCart = (item) => {
    // Implement the logic to add the item to the cart
  };

  async componentDidMount() {
    let cookies = await GetUserLogin.isAuthenticate();
    this.setState({ token: cookies });
  }

  renderEmptyWishlist() {
    return (
      <div className="empty-wishlist">
        <div className="container">
          <div className="inner-order">
            <h1 className="mb-4 sec-title">Your Wishlist is Empty</h1>
            <p>Add items to your wishlist</p>
            <img
              src="https://img.icons8.com/?size=512&id=vdpEj4CzpSMF&format=png" // Replace with the path to your empty wishlist image
              alt="Empty Wishlist"
              className="empty-wishlist-image"
            />
            <br />
            <div className="empty-item" style={{ marginLeft: "32px" }}>
              <Link to="/" className="wishlist-link cart-btn">
                Add Item
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { wishItems } = this.props;
    const { token } = this.state;

    if (wishItems.length === 0) {
      return this.renderEmptyWishlist();
    } else {
      return (
        <>
          <section class="breadcrumbs py-4">
            <div class="container-fluid">
              <div class="b-crumb pb-2">
                <ul class="breadcrumbs-list">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>WishList</li>
                </ul>
              </div>
            </div>
          </section>
          <div className="Wishlist-main">
            <div className="container">
              <h2 className="mb-4 mt-4 sec-title">WISHLIST</h2>
              <ul className="wishlist">
                {wishItems.map((item) => (
                  <li key={item.id} className="wishlist-item">
                    <div className="item-details">
                      <div className="item-info">
                        <div className="img-wish">
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="item-image"
                          />
                        </div>
                        <div className="item-column">
                          <div className="item-name">
                            <Link
                              to={{
                                pathname: `/p/${item.slug}/${item.id}`,
                                state: item,
                              }}
                            >
                              <h5>{item.name}</h5>
                            </Link>
                          </div>

                          <div className="item-price">
                            <h6>${item.price}</h6>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      {token ? (
                        <button
                          className="add-to-cart-button"
                          style={{
                            background: "none",
                            transition: "transform 0.3s",
                            marginLeft: "20px",
                            paddingRight: "0",
                          }}
                          onMouseEnter={(e) =>
                            (e.target.style.transform = "scale(1.1)")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.transform = "scale(1)")
                          }
                          onClick={() => {
                            this.props.addToCart(item);
                            this.props.removeFromWishlist(item);
                            NotificationManager.success(
                              `${item.name} added successfuly in cart!`
                            );
                          }}
                        >
                          <AiOutlineShoppingCart />
                        </button>
                      ) : (
                        <a
                          className="add-to-cart-button"
                          style={{
                            background: "none",
                            transition: "transform 0.3s",
                            marginLeft: "20px",
                            paddingRight: "0",
                          }}
                          data-target="#bd-example-modal"
                          data-toggle="modal"
                        >
                          <AiOutlineShoppingCart />
                        </a>
                      )}
                      <button
                        className="delete-button"
                        style={{
                          background: "none",
                          transition: "transform 0.3s",
                        }}
                        onMouseEnter={(e) =>
                          (e.target.style.transform = "scale(1.1)")
                        }
                        onMouseLeave={(e) =>
                          (e.target.style.transform = "scale(1)")
                        }
                        onClick={() => {
                          this.props.removeFromWishlist(item);
                          NotificationManager.warning(
                            `${item.name} remove successfuly from wishlist!`
                          );
                        }}
                      >
                        <AiOutlineClose />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Login />
          </div>
        </>
      );
    }
  }
}

export default connect(
  (state) => ({
    wishItems: state.wish.wishItems,
  }),
  { removeFromWishlist, addToCart }
)(Wishlist);
