import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice"

const store = configureStore({
  reducer: {
    auth: authReducer, // slice auth 
    product: productReducer,
    cart: cartReducer
  },
});

export default store;
