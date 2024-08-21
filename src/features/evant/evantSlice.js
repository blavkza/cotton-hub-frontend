import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";

import { toast } from "react-toastify";
import evantService from "./evantService";

export const createEvant = createAsyncThunk(
  "evant/create-Evant",
  async (evantData, thunkAPI) => {
    try {
      return await evantService.createEvant(evantData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAllEvant = createAsyncThunk(
  "evant/get-allevant",
  async (thunkAPI) => {
    try {
      return await evantService.getAllEvants();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAEvant = createAsyncThunk(
  "evant/get-evant",
  async (id, thunkAPI) => {
    try {
      return await evantService.getAEvant(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



export const resetState = createAction("Reset_all");

const initialState = {
  evants: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const evantSlice = createSlice({
  name: "evants",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEvant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdEvant = action.payload;
      })
      .addCase(createEvant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAllEvant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEvant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.evants = action.payload;
      })
      .addCase(getAllEvant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = state.message = action.error.message;
      })
      .addCase(getAEvant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAEvant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.singileEvant = action.payload;
      })
      .addCase(getAEvant.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
     
  },
});
export default evantSlice.reducer;
