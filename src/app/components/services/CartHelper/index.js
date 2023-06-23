const emptyCart = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cartItems")) {
      localStorage.removeItem("cartItems");
      window.location.href = "/orderSuccess";
    }
  }
  return [];
};

export default {
  emptyCart,
};
