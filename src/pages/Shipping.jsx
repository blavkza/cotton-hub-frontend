import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { getCart } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

function Shipping() {
  const dispatch = useDispatch();
  const [latestOrder, setLatestOrder] = useState(null);
  const [shippingFee, setShippingFee] = useState(0);
  const navigate = useNavigate(); 

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    dispatch(getCart());
    window.scrollTo(0, 0);
    if (storedOrder) {
      setLatestOrder(JSON.parse(storedOrder));
    }
  }, []);

  const cartState = useSelector((state) => state?.auth?.cartProducts || []);
  console.log(cartState);

  useEffect(() => {
    if (latestOrder) {
      calculateShippingFee();
    }
  }, [latestOrder]);

  const calculateShippingFee = () => {
    const totalPrice = latestOrder?.totalPrice || 0;
    const currentDate = new Date();
    const isWeekend = currentDate.getDay() === 6 || currentDate.getDay() === 0;

    if (totalPrice >= 750 || isWeekend) {
      setShippingFee(0);
    } else {
      setShippingFee(75);
    }
  };


  const cart = latestOrder?.cart;
  const address = latestOrder?.shippingAddress;
  const userInfo = latestOrder?.user;
  const discountPrice = latestOrder?.discountPrice;
  const subtotal = latestOrder?.subtotal;
  const totalPrice = latestOrder?.totalPrice;
  const couponApplied = latestOrder?.couponApplied;

 
console.log(cart);

  const shippingAddress = {
    county: address?.country,
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

  const finalTotal = (Number(totalPrice) + Number(shippingFee)).toFixed(2);

  const paymentSubmit = () => {
    navigate("/payment"); 
    const orderData = {
      cart,
      totalPrice,
      subtotal,
      discountPrice,
      shippingFee,
      finalTotal,
      shippingAddress,
      user,
      couponApplied
    };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
  };

  const backToCart = () => {
    navigate("/cart");
    window.location.reload();
  };

  return (
    <div>
      <div className="container text-[#5c5b5b]">
        <div className="flex">
          <div className="" style={{ width: "50%" }}>
            <div className="bg-white py-5 px-12">
              <div className="pb-4">
                <Link to="/" className="text-2xl font-semibold pb-6">
                  COTTON HUB
                </Link>
                <div className="text-sm py-4">
                  <ul className="flex items-center gap-4 ">
                    <li className="flex items-center gap-1">
                      <span
                        onClick={(e) => {
                          backToCart();
                        }}
                        className=" font-extrabold text-[#e7b13c] cursor-pointer"
                      >
                        Cart
                      </span>
                      <IoIosArrowForward />
                    </li>
                    <li className="flex items-center gap-1">
                      <Link
                        to="/checkout"
                        className=" font-extrabold text-[#e7b13c]"
                      >
                        Checkout
                      </Link>
                      <IoIosArrowForward />
                    </li>
                    <li className="flex items-center gap-1">
                      <span className=" font-extrabold text-[#e7b13c]">
                        Shipping
                      </span>
                      <IoIosArrowForward />
                    </li>
                    <li className="flex items-center gap-1">
                      <span>Payment</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pb-2">
                <div className="pb-4">
                  <h1 className="text-lg font-semibold ">Contact Infomation</h1>
                </div>
                <div className="flex items-center gap-2  text-sm pb-2">
                  <h6 className="uppercase ">
                    {user?.firstname} {user?.lastname}
                  </h6>
                  <p>({user?.email})</p>
                </div>
                <div className="flex items-center gap-2 pb-4 text-sm">
                  <h6>Mobile/Phone Number : </h6>
                  <p>{user?.mobile}</p>
                </div>
              </div>
              <div className="">
                <h1 className="text-lg font-semibold pb-4">Shipping Address</h1>
                <div className="pb-4">
                  <div className="">
                    <div className="flex items-center gap-2">
                      <p>Country : </p>
                      <span>{shippingAddress?.county}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>City/Town : </p>
                      <span>{shippingAddress?.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>Address 1 : </p>
                      <span>{shippingAddress?.address1}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <p>Address 2 : </p>
                      <span>{shippingAddress?.address2}</span>
                    </div>
                    {shippingAddress?.place ? (
                      <div className="flex items-center gap-2">
                        <p>Apartment, flat, etc : </p>
                        <span>{shippingAddress?.place}</span>
                      </div>
                    ) : null}
                    {shippingAddress?.place ? (
                      <div className="flex items-center gap-2">
                        <p>Street, etc : </p>
                        <span>{shippingAddress?.street}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="pb-4">
                  <h1 className="text-lg font-semibold pb-4">Shipping Cost</h1>
                  <div className="flex items-center gap-2 pb-4 text-sm">
                    <p>
                      Shipping is free for orders of R750 or more, or on
                      weekends. <br />
                      For orders below R750 on weekdays, a R75 shipping fee
                      applies.
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between my-5">
                  <Link to="/checkout" className="flex items-center gap-1">
                    <IoIosArrowBack className="size-5" />
                    <p>Return to checkout</p>
                  </Link>
                  <div className="">
                    <button
                      onClick={paymentSubmit} // Use the function directly
                      className="bg-black hover:bg-orange-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform "
                    >
                      Continue Payment
                    </button>
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
              {cart &&
                cart.map((item, index) => (
                  <div
                    className="flex items-center justify-between border-b-2 border-gray-300 pt-4"
                    key={index}
                  >
                    <div className="flex flex-col">
                      <div className="flex items-center gap-6  pb-2">
                        <div className="relative" style={{ width: "10%" }}>
                          <img
                            src={item?.productId?.image[0].url}
                            alt="product-image"
                            className="w-full h-full"
                          />
                          <span className="absolute w-4 h-4  rounded-full text-xs text-center bg-black text-white -top-2 -right-2">
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
              <div className="text-sm pt-2 border-b-2 border-gray-300">
                {discountPrice ? (
                  <div className="flex items-center justify-between pb-2">
                    <h6>Total Before Discount:</h6>
                    <p className="font-semibold">R {subtotal}</p>
                  </div>
                ) : null}

                {discountPrice ? (
                  <div className="flex items-center justify-between py-2">
                    <h6>Discount:</h6>
                    <p className="font-semibold">
                      {discountPrice ? `- R ${discountPrice}` : `R 0`}
                    </p>
                  </div>
                ) : null}

                <div className="flex items-center justify-between pb-2">
                  <h6>Sub Total:</h6>
                  <p className="font-semibold">R {totalPrice}</p>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <h6>Shipping fee:</h6>
                  <p className="bold">
                    {" "}
                    {shippingFee ? `+ R ${shippingFee}` : `Free Shipping`}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between pb-2">
                  <h6>Total:</h6>
                  <p className="font-semibold">R{finalTotal}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shipping;
