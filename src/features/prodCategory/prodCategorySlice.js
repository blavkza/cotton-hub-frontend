import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import prodCategoryService from "./prodCategoryService";

export const getProdCategory = createAsyncThunk(
  "prodCategory/get-Category",
  async (thunkAPI) => {
    try {
      return await prodCategoryService.getProdCategory();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getProdCategorie = createAsyncThunk(
  "prodCategory/get-Categorie",
  async (id, thunkAPI) => {
    try {
      return await prodCategoryService.getProdCategorie(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createProdCategory = createAsyncThunk(
  "prodCategory/create-Category",
  async (categoryData, thunkAPI) => {
    try {
      return await prodCategoryService.createProdCategory(categoryData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateProdCategory = createAsyncThunk(
  "prodCategory/update-Category",
  async (category, thunkAPI) => {
    try {
      return await prodCategoryService.updateProdCategory(category);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteProdCategory = createAsyncThunk(
  "prodCategory/delete-Category",
  async (id, thunkAPI) => {
    try {
      return await prodCategoryService.deleteProdCategory(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("Reset_all");

const initialState = {
  prodCategories: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};
export const prodCategorySlice = createSlice({
  name: "prodCategories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProdCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProdCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.prodCategories = action.payload;
      })
      .addCase(getProdCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = state.message = action.error.message;
      })
      .addCase(createProdCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProdCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.createdCategory = action.payload;
      })
      .addCase(createProdCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getProdCategorie.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProdCategorie.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.categoryName = action.payload.title;
      })
      .addCase(getProdCategorie.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(updateProdCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProdCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedProdCategory = action.payload;
      })
      .addCase(updateProdCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteProdCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProdCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedBrand = action.payload;
      })
      .addCase(deleteProdCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(resetState, () => initialState);
  },
});
export default prodCategorySlice.reducer;
