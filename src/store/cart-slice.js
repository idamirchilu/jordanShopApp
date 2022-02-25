import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    replace(state, action) {
      state.cartItems = action.payload;
    },
    addToCart(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index === -1) {
        state.cartItems = [...state.cartItems, action.payload];
        //console.log(state.cartItems, index);
      } else {
        state.cartItems[index].quantity++;
        //console.log(state.cartItems, "-1", index);
      }
    },
    removeItemFromCart(state, action) {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      state.cartItems[index].quantity--;
      if (state.cartItems[index].quantity < 1) {
        state.cartItems.splice(index, 1);
      }
    },
  },
});

export const fetchCartData = (id) => {
  return async (dispatch) => {
    if (!!id !== false) {
      const identifire = id
        .split("@")[0]
        .split("")
        .filter(
          (item) =>
            !Number(item) && item !== "." && item !== "_" && item !== "-"
        )
        .join("");
      try {
        const res = await fetch(
          `https://fir-project-1b826-default-rtdb.firebaseio.com/${identifire}.json`
        );
        const data = await res.json();

        if (!res.ok) throw new Error("failed to fetch cart data");

        if (data) {
          dispatch(cartSlice.actions.replace(data));
        } else {
          dispatch(cartSlice.actions.replace([]));
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
};

export const sendCartData = (cartData, id) => {
  return async () => {
    if (!!id !== false) {
      const identifire = id
        .split("@")[0]
        .split("")
        .filter(
          (item) =>
            !Number(item) && item !== "." && item !== "_" && item !== "-"
        )
        .join("");
      try {
        const res = await fetch(
          `https://fir-project-1b826-default-rtdb.firebaseio.com/${identifire}.json`,
          {
            method: "PUT",
            body: JSON.stringify(cartData),
          }
        );
        if (!res.ok) {
          throw new Error("failed to send cart data");
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
