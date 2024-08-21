import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAOder } from "../../features/seller/sellerSlice";
import { IoArrowBackSharp } from "react-icons/io5";

function SingleOrderPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const orderId = location.pathname.split("/")[3];

  useEffect(() => {
    if (orderId) {
      dispatch(getAOder(orderId));
    }
  }, [dispatch, orderId]);

  const order = useSelector((state) => state.seller?.order?.order || {});

  const cart = order?.cart || [];
  const address = order?.shippingAddress || {};
  const userInfo = order?.user || {};
  const totalPrice = order?.finalTotal || 0;
  const stutas = order?.status || "";
  const paymentMethod = order?.paymentMethod || "";
  const createdAt = order?.createdAt || "";

  const formattedDate = new Date(createdAt).toLocaleDateString('en-GB');

  const shippingAddress = {
    county: address?.county,
    city: address?.city,
    address1: address?.address1,
    address2: address?.address2,
    place: address?.place,
    street: address?.street,
  };

  const user = {
    firstname: userInfo?.firstname,
    lastname: userInfo?.lastname,
    email: userInfo?.email,
    mobile: userInfo?.mobile,
    _id: userInfo?._id,
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="container text-[#5c5b5b]">
      <div className="flex">
        <div className="" style={{ width: "50%" }}>
          <div className="bg-white py-5 px-12">
            
            <div className="pb-2">
            <div
              onClick={() => {
                handleGoBack();
              }}
              className="flex gap-3 justify-start items-center pb-6 cursor-pointer"
            >
              <IoArrowBackSharp />
              <span>Go Back</span>
            </div>
            <div className="flex items-center gap-2 pb-4 text-gray-700 font-semibold">
                <h6>Order Id: </h6>
                <p>{orderId}</p>
              </div>
              <div className="pb-4">
                <h1 className="text-lg font-semibold">Order Information</h1>
              </div>

              <div className="flex items-center gap-2 pb-4 text-sm">
                <h6>ORDER STATUS: </h6>
                <p>{stutas}</p>
              </div>
              <div className="flex items-center gap-2 pb-4 text-sm">
                <h6>PAYMENT MATHOD: </h6>
                <p>{paymentMethod}</p>
              </div>
              <div className="flex items-center gap-2 pb-4 text-sm">
            <h6 >ORDER DATE:</h6>
            <p>{formattedDate}</p>
          </div>
            </div>
            <div className="">
              <div className="pb-4">
                <h1 className="text-lg font-semibold pb-4">Shipping Address</h1>
                <div className="pb-4">
                  <div className="">
                    <div className="flex items-center gap-2">
                      <p>Country: </p>
                      <span>{shippingAddress?.county}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>City/Town: </p>
                      <span>{shippingAddress?.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>Address 1: </p>
                      <span>{shippingAddress?.address1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>Address 2: </p>
                      <span>{shippingAddress?.address2}</span>
                    </div>
                    {shippingAddress?.place && (
                      <div className="flex items-center gap-2">
                        <p>Apartment, flat, etc: </p>
                        <span>{shippingAddress?.place}</span>
                      </div>
                    )}
                    {shippingAddress?.street && (
                      <div className="flex items-center gap-2">
                        <p>Street, etc: </p>
                        <span>{shippingAddress?.street}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-[#f3f3f8e7] fixed top-0 right-0 z-50 h-[100vh] overflow-y-auto"
          style={{ width: "50%" }}
        >
          <div className="px-6">
            {cart.map((item, index) => (
              <div
                className="flex items-center justify-between border-b-2 border-gray-300 pt-4"
                key={index}
              >
                <div className="flex flex-col">
                  <div className="flex items-center gap-6 pb-2">
                    <div className="relative" style={{ width: "10%" }}>
                      <img
                        src={item?.productId?.image[0]?.url}
                        alt="product-image"
                        className="w-full h-full"
                      />
                      <span className="absolute w-4 h-4 rounded-full text-xs text-center bg-black text-white -top-2 -right-2">
                        {item?.quantity}
                      </span>
                    </div>
                    <div className="text-gray-700">
                      <div className="flex items-center">
                        <h6>{item?.productId?.title}</h6>
                      </div>
                      <div className="flex items-center pt-1 gap-1">
                        <h6>Size:</h6>
                        <p className="text-xs">S</p>
                      </div>
                      <div className="flex items-center pt-2 gap-1">
                        <h6>Color:</h6>
                        <ul>
                          <li
                            className="w-[14px] h-[14px] rounded-full border border-black"
                            style={{ backgroundColor: item?.color?.title }}
                          ></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="font-semibold">
                  <p>R{item?.price * item?.quantity}</p>
                </div>
              </div>
            ))}
            <div className="pt-4">
              <div className="flex items-center justify-between pb-2">
                <h6>Total:</h6>
                <p className="font-semibold">R{totalPrice}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleOrderPage;
