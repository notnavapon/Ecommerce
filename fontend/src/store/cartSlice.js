import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (product, thunkAPI) => {
    const toastId = toast.loading("adding..");
    try {
      const response = await api.post("cart/addcart", product);
      return (
        toast.success("Add cart successfully!", { id: toastId }), response.data
      );
    } catch (error) {
      toast.error(error.response?.data?.message, { id: toastId });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const getCart = createAsyncThunk("cart/getCart", async (thunkAPI) => {
  const toastId = toast.loading("adding..");
  try {
    const response = await api.get("cart/getcart");
    return (
      toast.success("Add cart successfully!", { id: toastId }), response.data
    );
  } catch (error) {
    toast.error(error.response?.data?.message, { id: toastId });
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
});

const initialState = {
  loadcart: [],
};

// ---------------------------
// Slice
// ---------------------------
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addProductToCart.fulfilled, (state, action) => {})

      .addCase(getCart.fulfilled, (state, action) => {
        state.loadcart = action.payload.cart;
        
      });
  },
});

export default cartSlice.reducer;
