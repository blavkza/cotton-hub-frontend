
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/user/userSlice";
import  productSlice  from "../features/product/productSlice";
import blogSlice from "../features/blogs/blogSlice";
import equirieSlice from "../features/equiries/equirieSlice";
import sellerSlice from "../features/seller/sellerSlice";
import colorSlice from "../features/colors/colorSlice";
import  prodCategorySlice  from "../features/prodCategory/prodCategorySlice";
import  uploadSlice  from "../features/upload/uploadSlice";
import evantSlice from "../features/evant/evantSlice";
import couponSlice from "../features/coupon/couponSlice";






export const store = configureStore({
  reducer: {
    auth : authSlice,
    products: productSlice,
    blog:blogSlice,
    enquiry:equirieSlice,
    seller:sellerSlice,
    colors:colorSlice,
    prodCategory:prodCategorySlice,
    upload:uploadSlice,
    evant:evantSlice,
    coupons: couponSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),

});