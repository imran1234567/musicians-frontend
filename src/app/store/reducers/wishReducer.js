import { ADD_TO_WISHLIST, REMOVE_FROM_WISHLIST } from "../actions/types";

export const wishReducer = (
  state = { wishItems: JSON.parse(localStorage.getItem("wishItems") || "[]")},
  action
) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      return { wishItems: action.payload.wishItems };

    case REMOVE_FROM_WISHLIST:
      return { wishItems: action.payload.wishItems };

    default:
      return state;
  }
};
