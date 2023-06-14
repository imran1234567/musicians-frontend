import React, { Component } from "react";
import "./wishlist.css";
import { AiOutlineClose, AiOutlineShoppingCart } from "react-icons/ai";
import { removeFromWishlist } from '../../../../store/actions/wishlistActions';
import { addToCart } from '../../../../store/actions/cartActions';
import { connect } from 'react-redux';

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

  render() {
    const { wishItems } = this.props;

    return (
      <div className="Wishlist-main">

        <ul className="wishlist">
          <h2>Wishlist</h2>
          {wishItems.map((item) => (
            <li key={item.id} className="wishlist-item">
              <div className="item-details">
                <div className="item-info">
                  <img
                    src={"https://cdn.pixabay.com/photo/2012/04/13/20/54/violin-33610_1280.png"}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-column">
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">${item.price}</div>
                  </div>
                </div>
              </div>
              <button
                className="add-to-cart-button"
                style={{ background: "none", transition: "transform 0.3s", marginLeft: "20px", paddingRight: "0", }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                onClick={() => { this.props.addToCart(item); this.props.removeFromWishlist(item) }}
              >
                <AiOutlineShoppingCart />
              </button>
              <button
                className="delete-button"
                style={{ background: "none", transition: "transform 0.3s" }}
                onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
                onClick={() => this.props.removeFromWishlist(item)}
              >
                <AiOutlineClose />
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}



export default connect(
  (state) => ({
    wishItems: state.wish.wishItems,
  }),
  { removeFromWishlist, addToCart }
)(Wishlist);
