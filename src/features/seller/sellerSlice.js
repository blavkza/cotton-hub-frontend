import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import sellerService from "./sellerService";

export const registerSeller = createAsyncThunk(
  "seller/registerSeller",
  async (sellerData, thunkAPI) => {
    try {
      return await sellerService.registerSeller(sellerData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginSeller = createAsyncThunk(
  "seller/loginSeller",
  async (seller, thunkAPI) => {
    try {
      return await sellerService.loginSeller(seller);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAllOder = createAsyncThunk(
  "seller/allOder",
  async (id, thunkAPI) => {
    try {
      return await sellerService.getAllOder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAOder = createAsyncThunk(
  "seller/Oder",
  async (id, thunkAPI) => {
    try {
      return await sellerService.getOder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getASeller = createAsyncThunk(
  "seller/get-seller",
  async (id, thunkAPI) => {
    try {
      return await sellerService.getSeller(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getBalance = createAsyncThunk(
  "seller/get-seller-balance",
  async (id, thunkAPI) => {
    try {
      return await sellerService.getSellerBalance(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);


export const resetState = createAction("seller/resetState");

const getSellerFromLocalStorage = localStorage.getItem("seller")
  ? JSON.parse(localStorage.getItem("seller"))
  : null;

const initialState = {
  seller: getSellerFromLocalStorage,
  balance: 0, 
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.seller = action.payload;
        toast.info("Seller created successfully!!");
      })
      .addCase(registerSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(loginSeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginSeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.seller = action.payload;
        localStorage.setItem("seller", JSON.stringify(action.payload));
        toast.info("Seller logged in successfully!!");
      })
      .addCase(loginSeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(getAllOder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orders = action.payload;
      
      })
      .addCase(getAllOder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.message;
     
      })
      .addCase(getAOder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAOder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.order = action.payload;
      
      })
      .addCase(getAOder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.message;
     
      })
      .addCase(getASeller.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getASeller.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.seller = action.payload;
      
      })
      .addCase(getASeller.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.seller = null;
        state.message = action.payload.message;
     
      })
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.balance = action.payload.balance;
      
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.seller = null;
        state.message = action.payload.message;
     
      })
      
  },
});

export default sellerSlice.reducer;
