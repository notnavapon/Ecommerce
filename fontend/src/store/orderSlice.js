import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";


export const addOrder = createAsyncThunk(
  "order/addOrder",
  async (product, thunkAPI) => {
    const toastId = toast.loading("adding..");
    try {
      const response = await api.post("order/", product);
      return (
        toast.success("Check out successfully!", { id: toastId }), response.data
      );
    } catch (error) {
      toast.error(error.response?.data?.message, { id: toastId });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const getOrderUser = createAsyncThunk("order/getOrderUser", async (thunkAPI) => {
  // const toastId = toast.loading("adding..");
  try {
    const response = await api.get("order/");
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


// export const deleteCart = createAsyncThunk("cart/deleteCart", async (data, thunkAPI) => {
//   console.log("[cartSlice] deletecart inputdata:",data)
//   const toastId = toast.loading("removing..");
//   try {
//     const response = await api.delete("cart/", {data});
//     return (
//       toast.success("Remove cart successfully!", { id: toastId }), response.data
//     );
//   } catch (error) {
//     toast.error(error.response?.data?.message, { id: toastId });
//     return thunkAPI.rejectWithValue(
//       error.response?.data || "Something went wrong"
//     );
//   }
// });



const initialState = {
  loadOrder: [],
  reload: true
};


const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(addOrder.fulfilled, (state, action) => {
        state.reload = true
      })

      .addCase(getOrderUser.fulfilled, (state, action) => {
        state.loadOrder = action.payload.order;
        state.reload = false
      })
  },
});

export default orderSlice.reducer;



