import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (userData, thunkAPI) => {
    const toastId = toast.loading("adding..");
    try {
      console.log(userData);
      const response = await api.post("/product/add", userData);
      toast.success("Add product successfully!", { id: toastId });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message, { id: toastId });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const checkProduct = createAsyncThunk(
  "product/checkProduct",
  async (thunkAPI) => {
    try {
      const response = await api.get("/product/checkproduct");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const initialState = {
  product: null,
  listProduct: [],
  error: null,
};

// ---------------------------
// Slice
// ---------------------------
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      //addProduct
      .addCase(addProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.product = action.payload.product;
        if (action.payload?.product) {
          state.listProduct.push(action.payload.product); // อัปเดตทันที
        }
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      //checkProduct
      .addCase(checkProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(checkProduct.fulfilled, (state, action) => {
        state.listProduct = action.payload.listProduct;
      })
      .addCase(checkProduct.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default productSlice.reducer;
