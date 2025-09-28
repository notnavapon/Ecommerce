// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

// ---------------------------
// Async Action: Register User
// ---------------------------
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, thunkAPI) => {
    const toastId = toast.loading("Registering...");
    try {
      console.log(userData);
      const response = await api.post("/auth/register", userData);
      toast.success("Registered successfully!", { id: toastId });
      return response.data;
    } catch (error) {
      toast.error(error.response?.data?.message, { id: toastId });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, thunkAPI) => {
    const toastId = toast.loading("Logining in...");
    try {
      const response = await api.post("/auth/login", userData);
      toast.success("Login successfully!", { id: toastId });
      // return แค่ user
      return response.data.user;
    } catch (error) {
      // console.log(error)
      toast.error(error.response?.data?.message || "Login failed.", {
        id: toastId,
      });
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const checkCurrentUser = createAsyncThunk(
  "auth/checkCurrentUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/auth/checkauth");
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Not logged in");
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/loginUser",
  async (_, thunkAPI) => {
    try {
      const response = await api.post("/auth/logout");
      return response.data.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || "Not logged in");
    }
  }
);

// ---------------------------
// Initial State
// ---------------------------
const initialState = {
  user: null,
  loading: null,
  error: null,
};

// ---------------------------
// Slice
// ---------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, // ไม่มี logout เพราะเน้น register อย่างเดียว
  extraReducers: (builder) => {
    builder

      //register
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = "error";
        state.error = action.payload;
      })

      //login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //checkAuth
      .addCase(checkCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(checkCurrentUser.rejected, (state) => {
        state.user = null;
        state.loading = false;
      });
  },
});

// ---------------------------
// Export Reducer
// ---------------------------
export default authSlice.reducer;
