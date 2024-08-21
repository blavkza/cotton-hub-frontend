import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getProducts } from "../../features/product/productSlice";

function SellerInfo({ data }) {
  const dispatch = useDispatch();

  const handleGoBack = () => {
    navigate(-1);
  };

  const location = useLocation();

  const shopId = location.pathname.split("/")[2];

  const productState = useSelector((state) => state.products?.products);

  const filteredProducts = productState?.filter(
    (product) => product.sellerId === shopId
  );

  const sellerState = useSelector((state) => state.seller.seller);


  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = () => {
    dispatch(getProducts());
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full pt-14 pb-4 px-2 items-center">
      <div className=" rounded-lg ">
        <img
          src="https://yt3.ggpht.com/yti/ANjgQV9i5fISqhQeFUaV0hz76kuGg9rMq2Ho1FlNYI6Udz1Q3Kzk=s88-c-k-c0x00ffffff-no-rj"
          alt="Profile Picture"
          className="rounded-full w-12 h-12 object-cover border border-orange-600"
        />
      </div>

      <h1 className="text-2xl font-semibold">{filteredProducts?.brands}</h1>
      <div className="flex flex-col gap-4 pt-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">Address:</h1>
          <h4>Thohoyandou, 0945 Shayandima</h4>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">Email:</h1>
          <h4>Vvhuwavho@gmail.com</h4>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">Total Products:</h1>
          <h4>Cotton-Hub</h4>
        </div>

        <div className="flex flex-col gap-1">
          <h1 className="text-md font-semibold">Joined At:</h1>
          <h4>2024-09-23</h4>
        </div>
      </div>

    </div>
  );
}

export default SellerInfo;
