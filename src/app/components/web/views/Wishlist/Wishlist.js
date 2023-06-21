import React, { Component } from "react";
import "./wishlist.css";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { removeFromWishlist } from "../../../../store/actions/wishlistActions";
import { addToCart } from "../../../../store/actions/cartActions";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
import { Link } from 'react-router-dom';

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
    console.log("Add to cart:", item);
  };

  renderEmptyWishlist() {
    return (
      <div className="empty-wishlist">
        <h2>Your Wishlist is Empty</h2>
        <p>Add items to your wishlist</p>
        <img
          src="https://img.icons8.com/?size=512&id=vdpEj4CzpSMF&format=png" // Replace with the path to your empty wishlist image
          alt="Empty Wishlist"
          className="empty-wishlist-image"
        />
        <br />
        <div style={{ marginLeft: '32px' }}>
          <Link to="/" className="wishlist-link">
            Add Item
          </Link>
        </div>

      </div>
    );
  }


  render() {
    const { wishItems } = this.props;
    if (wishItems.length === 0) {
      return this.renderEmptyWishlist();
    } else {
      return (
        <div className="Wishlist-main">
          <ul className="wishlist">
            <h2 style={{ color: "#d71f7a" }}>WISHLIST</h2>
            {wishItems.map((item) => (
              <li key={item.id} className="wishlist-item">
                <div className="item-details">
                  <div className="item-info">
                    <img
                      src={item.photo}
                      alt={item.name}
                      className="item-image"
                    />
                    <div className="item-column">
                      <div className="item-name">
                        <h5>{item.name}</h5>
                      </div>
                      <br></br>
                      <div className="item-price">
                        <h6 style={{ color: "#2a6fc9" }}>
                          <b>${item.price}</b>
                        </h6>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", flexDirection: "row" }}>
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
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    onClick={() => {
                      this.props.addToCart(item);
                      this.props.removeFromWishlist(item);
                      NotificationManager.success(`${item.name} added successfuly in cart!`);
                    }}
                  >
                    <AiOutlineShoppingCart />
                  </button>
                  <button
                    className="delete-button"
                    style={{ background: "none", transition: "transform 0.3s" }}
                    onMouseEnter={(e) =>
                      (e.target.style.transform = "scale(1.1)")
                    }
                    onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                    onClick={() => { this.props.removeFromWishlist(item); NotificationManager.warning(`${item.name} remove successfuly from wishlist!`) }}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
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
