import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";



export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (userData, thunkAPI) => {
    const toastId = toast.loading("adding..");
    try {
      console.log("addprodcut in slice: ", userData);
      const response = await api.post("/product/add", userData);
      return (
        toast.success("Add product successfully!", { id: toastId }),
        response.data
      );
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
      return (response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
export const updateProduct = createAsyncThunk(
  "product/updateProduct ",
  async ({ id, data }, thunkAPI) => {
    const toastId = toast.loading("Updating product..");
    try {
      const response = await api.patch("/product/updateproduct/" + id, data);
      toast.success("Update product successfully!", { id: toastId });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message, { id: toastId });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);
export const updateStockProduct = createAsyncThunk(
  "product/updateStockProduct",
  async ({ id, data }, thunkAPI) => {
    const toastId = toast.loading("Updating stock product..");
    try {
      console.log("id:", id, ", data:", data);
      const response = await api.patch("/product/updatestock/" + id, data);
      toast.success("Update stock product successfully!", { id: toastId });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message, { id: toastId });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id, thunkAPI) => {
    const toastId = toast.loading("Deleting product..");
    console.log(id);
    try {
      const response = await api.delete("/product/deleteproduct/" + id);
      toast.success("Deleted product successfully!", { id: toastId });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message, { id: toastId });
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

      //updateProduct
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload.productUpdate;
        // state.listProduct = state.listProduct.map(product => product.id === updateProduct.id ? updatedProduct : product);
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      //updateStock
      .addCase(updateStockProduct.fulfilled, (state, action) => {
        state.product = action.payload.updateStockProduct;
      })
      .addCase(updateStockProduct.rejected, (state, action) => {
        state.error = action.payload;
      })

      //deleteProduct
      .addCase(deleteProduct.fulfilled, (state, action) => {
        const deletedId = action.meta.arg; // id 
        state.listProduct = state.listProduct.filter((p) => p.id !== deletedId);
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
