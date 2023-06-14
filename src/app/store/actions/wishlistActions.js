import { NotificationManager } from "react-notifications";
import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "./types";

export const addToWishlist = (product) => (dispatch, getState) => {
  const wishItems = getState().wish.wishItems.slice();
  let alreadyExists = false;
  wishItems.forEach((x) => {
    if (x.id === product.id) {
      alreadyExists = true;
    }
  });
  if (!alreadyExists) {
    wishItems.push({ ...product });
  }
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: { wishItems, alreadyExists },
  });
  // checkCart(product.id);
  localStorage.setItem("wishItems", JSON.stringify(wishItems));
};

export const removeFromWishlist = (product) => (dispatch, getState) => {
  const wishItems = getState().wish.wishItems.slice().filter((x) => x.id !== product.id);
  dispatch({ type: REMOVE_FROM_WISHLIST, payload: { wishItems } });
  localStorage.setItem("wishItems", JSON.stringify(wishItems));
};


