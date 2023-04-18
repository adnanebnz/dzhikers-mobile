import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCartOpen: false,
  cart: [],
  items: [],
};
const init = {
  notifs: [],
  hikesInfos: [],
};

export const notifsSlice = createSlice({
  name: "notifs",
  initialState: init,
  reducers: {
    setNotifs: (state, action) => {
      state.notifs = action.payload;
    },
    setHikesInfos: (state, action) => {
      state.hikesInfos = action.payload;
    },
  },
});

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart = [];
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },

    addToCart: (state, action) => {
      if (state.cart.find((item) => item._id === action.payload.item._id)) {
        console.log("item already in cart");
        return;
      } else {
        state.cart = [...state.cart, action.payload.item];
      }
    },

    removeFromCart: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload._id);
    },

    increaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id && item.quantity > item.count) {
          item.count++;
        }
        return item;
      });
    },

    decreaseCount: (state, action) => {
      state.cart = state.cart.map((item) => {
        if (item._id === action.payload._id && item.count > 1) {
          item.count--;
        }
        return item;
      });
    },

    setIsCartOpen: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
  },
});

export const {
  clearCart,
  setItems,
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  setIsCartOpen,
} = cartSlice.actions;

export const { setNotifs, setHikesInfos } = notifsSlice.actions;

export default cartSlice.reducer;
