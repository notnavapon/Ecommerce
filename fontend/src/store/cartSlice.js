import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

export const addProductToCart = createAsyncThunk(
  "cart/addProductToCart",
  async (product, thunkAPI) => {
    const toastId = toast.loading("adding..");
    try {
      const response = await api.post("cart/", product);
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
  // const toastId = toast.loading("adding..");
  try {
    const response = await api.get("cart/");
    return (
      // toast.success("Load cart successfully!", { id: toastId })
      response.data
    );
  } catch (error) {
    // toast.error(error.response?.data?.message, { id: toastId });
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
});

export const deleteCart = createAsyncThunk("cart/deleteCart", async (data, thunkAPI) => {
  console.log("[cartSlice] deletecart inputdata:",data)
  const toastId = toast.loading("removing..");
  try {
    const response = await api.delete("cart/", {data});
    return (
      toast.success("Remove cart successfully!", { id: toastId }), response.data
    );
  } catch (error) {
    toast.error(error.response?.data?.message, { id: toastId });
    return thunkAPI.rejectWithValue(
      error.response?.data || "Something went wrong"
    );
  }
});


export const updateCart = createAsyncThunk("cart/deleteCart", async (data, thunkAPI) => {
  console.log("[cartSlice] updatecart inputdata:",data)
  const toastId = toast.loading("removing..");
  try {
    const response = await api.patch("cart/", data);
    return (
      toast.success("Update cart successfully!", { id: toastId }), response.data
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
  reload: true
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

      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.reload = true
      })

      .addCase(getCart.fulfilled, (state, action) => {
        state.loadcart = action.payload.cart;
        state.reload = false
      })

      .addCase(deleteCart.fulfilled, (state, action) => {
        state.reload = true
      })
    
    ;
  },
});

export default cartSlice.reducer;
