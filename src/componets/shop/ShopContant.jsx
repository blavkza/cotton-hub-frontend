import React, { useEffect } from "react";
import { getProducts } from "../../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../ProductCard";

function ShopContant({ active }) {
  const productState = useSelector((state) => state.products?.products);
  const location = useLocation();
  const shopId = location.pathname.split("/")[2];

  const dispatch = useDispatch();
  useEffect(() => {
    getAllProducts();
    window.scrollTo(0, 0);
  }, []);

  const getAllProducts = () => {
    dispatch(getProducts());
  };

  const filteredProducts = productState?.filter(
    (product) => product.sellerId === shopId
  );

  return (
    <div className="px-6 pt-20">
      {active === 1 && (
        <div className="grid grid-cols-5 gap-2">
          {filteredProducts ? <ProductCard data={filteredProducts} /> : null}
        </div>
      )}
    </div>
  );
}

export default ShopContant;
