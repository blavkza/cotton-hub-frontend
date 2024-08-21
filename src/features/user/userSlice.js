import { createSlice, createAsyncThunk, createAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import authService from "./userService";
import { toast } from "react-toastify";

export const registerUser = createAsyncThunk(
  "auth/register-user",
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const otpVerification = createAsyncThunk(
  "auth/oto-verifty",
  async (data, thunkAPI) => {
    try {
      return await authService.otpVerify(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login-user",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getAUser = createAsyncThunk(
  "auth/get-user",
  async (id, thunkAPI) => {
    try {
      return await authService.getUser(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const logOutUser = createAsyncThunk(
  "auth/logout-user",
  async (thunkAPI) => {
    try {
      Cookies.remove("user");
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const resetAPassword = createAsyncThunk(
  "auth/reset-Password",
  async (data, thunkAPI) => {
    try {
      return await authService.resetPassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const passwordToken = createAsyncThunk(
  "auth/Password-token",
  async (data, thunkAPI) => {
    try {
      return await authService.forgetPasswordToken(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const ChangeAPassword = createAsyncThunk(
  "auth/change-password",
  async (data, thunkAPI) => {
    try {
      return await authService.changePassword(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateAUser = createAsyncThunk(
  "auth/update-user",
  async (user, thunkAPI) => {
    try {
      const response = await authService.updateUser(user);
      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unknown error occurred";
      return thunkAPI.rejectWithValue({ message: errorMessage });
    }
  }
);

export const saveAUserAddress = createAsyncThunk(
  "auth/save-address",
  async (data, thunkAPI) => {
    try {
      return await authService.saveUserAddress(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const removeAUserAddress = createAsyncThunk(
  "auth/removeAUserAddress",
  async (addressType) => {
    try {
      return await authService.removeAddress(addressType);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserWishlist = createAsyncThunk(
  "auth/wishlist",
  async (thunkAPI) => {
    try {
      return await authService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const addTocart = createAsyncThunk(
  "cart/add-to-cart",
  async (cartData, thunkAPI) => {
    try {
      return await authService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getCart = createAsyncThunk("cart/get-cart", async (thunkAPI) => {
  try {
    return await authService.getCart();
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateCartProduct = createAsyncThunk(
  "cart/cart/product/update",
  async ({ cartItemId, quantity }, thunkAPI) => {
    try {
      return await authService.updateCartProduct(cartItemId, quantity);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteProdctFromCart = createAsyncThunk(
  "cart/cart/product/delete",
  async (id, thunkAPI) => {
    try {
      return await authService.deleteFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const applyACoupon = createAsyncThunk(
  "cart/cart/apply-coupon",
  async ({ coupon, cart }, thunkAPI) => {
    try {
      return await authService.applyCoupon(coupon,cart);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const cartOder = createAsyncThunk(
  "cart/cart/oder",
  async ({ oderData }, thunkAPI) => {
    try {
      return await authService.oder(oderData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getUserOder = createAsyncThunk(
  "auth/getUser-Oder",
  async (id, thunkAPI) => {
    try {
      return await authService.getUserOder(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const orderRefund = createAsyncThunk(
  "order/update-order-status",
  async ({ id, status }, thunkAPI) => {
    try {
      return await authService.orderRefund(id, status);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const resetState = createAction("auth/resetState");

const getUserFromCookie = () => {
  const userCookie = Cookies.get("user");
  return userCookie ? JSON.parse(userCookie) : null;
};

const initialState = {
  user: getUserFromCookie(),
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        toast.info("OTP Is Sent Check Your Email");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(otpVerification.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(otpVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.verifiedUser = action.payload;
        toast.info("User Registed successfully");
      })
      .addCase(otpVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
        Cookies.set("user", JSON.stringify(action.payload), { expires: 1 });
        toast.info("Login successfully!!");
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.user = null;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(passwordToken.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(passwordToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.passwordToken = action.payload;
        toast.info("Please Check Your Email!!");
      })
      .addCase(passwordToken.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.payload.message);
      })
      .addCase(resetAPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(resetAPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.resetPassword = action.payload;
        toast.info("Password Updated Successfully");
      })
      .addCase(resetAPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.payload.message);
      })
      .addCase(ChangeAPassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(ChangeAPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.password = action.payload;
        toast.info("Password Updated Successfully");
      })
      .addCase(ChangeAPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.payload.message);
      })
      .addCase(getAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(logOutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.logoutUser = action.payload;
        toast.info("Log Out successfully!!");
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(updateAUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateAUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedUser = action.payload;
        toast.info("User Updated successfully!!");
      })
      .addCase(updateAUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        toast.error(action.payload.message);
      })
      .addCase(saveAUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveAUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.savedAddress = action.payload;
        toast.info("Address Added successfully!!");
      })
      .addCase(saveAUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        toast.error("Address Type Already Exists");
      })
      .addCase(removeAUserAddress.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeAUserAddress.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.removedAddress = action.payload;
        toast.info("Address Removed successfully!!");
      })
      .addCase(removeAUserAddress.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error.message;
        toast.error(action.payload.message);
      })
      .addCase(getUserWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
      })
      .addCase(getUserWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addTocart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTocart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cart = action.payload;
        toast.info("Added to Cart!");
      })
      .addCase(addTocart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(getCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(updateCartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updateCartProduct = action.payload;
        toast.info("Product updated successfuly");
      })
      .addCase(updateCartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error("Something went wrong");
      })
      .addCase(deleteProdctFromCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProdctFromCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        toast.info("Product removed successfuly");
      })
      .addCase(deleteProdctFromCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
        toast.error("Something went wrong");
      })
      .addCase(applyACoupon.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(applyACoupon.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.coupon = action.payload;
        toast.info("Coupon Applied");
      })
      .addCase(applyACoupon.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(cartOder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(cartOder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.oderData = action.payload;
        toast.info("Oder successfuly");
      })
      .addCase(cartOder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        toast.error(action.payload.message);
      })
      .addCase(getUserOder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserOder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.userOder = action.payload;
      })
      .addCase(getUserOder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(orderRefund.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(orderRefund.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        
      })
      .addCase(orderRefund.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export default authSlice.reducer;
