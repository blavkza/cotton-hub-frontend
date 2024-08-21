import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { cartOder } from "../features/user/userSlice";
import { useDispatch } from "react-redux";

function Payment() {
  const [latestOrder, setLatestOrder] = useState(null);
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit Card", 
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    window.scrollTo(0, 0);
    if (storedOrder) {
      setLatestOrder(JSON.parse(storedOrder));
    }
  }, []);


  const cart = latestOrder?.cart;
  const shippingAddress = latestOrder?.shippingAddress;
  const userInfo = latestOrder?.user;
  const discountPrice = latestOrder?.discountPrice;
  const priceBeforeDiscount = latestOrder?.subtotal;
  const totalPrice = latestOrder?.totalPrice;
  const finalTotal = latestOrder?.finalTotal;
  const shippingFee = latestOrder?.shippingFee;

  const user = {
    firstname: userInfo?.firstname,
    lastname: userInfo?.lastname,
    email: userInfo?.email,
    mobile: userInfo?.mobile,
    _id: userInfo?._id
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const orderData = {
      cart,
      shippingAddress,
      user,
      finalTotal,
      paymentInfo,
    };
  
    try {
      await dispatch(cartOder({ oderData: orderData }));
      navigate("/OrderSuccess"); 
      setTimeout(() => {
        localStorage.removeItem("latestOrder");
        window.location.reload(true);
      }, 500);
    } catch (error) {
      console.error("Order submission failed:", error);
      
    }
  };
  

  const backToCart = () => {
    navigate("/cart");
    window.location.reload();
  };

  return (
    <div className="container text-[#5c5b5b]">
      <div className="flex">
        <div className="" style={{ width: "50%" }}>
          <div className="bg-white py-5 px-12">
            <div className="pb-4">
              <Link to="/" className="text-2xl font-semibold pb-6">
                COTTON HUB
              </Link>
              <div className="text-sm py-4">
                <ul className="flex items-center gap-4">
                  <li className="flex items-center gap-1">
                    <span
                      onClick={() => backToCart()}
                      className="font-extrabold text-[#e7b13c] cursor-pointer"
                    >
                      Cart
                    </span>
                    <IoIosArrowForward />
                  </li>
                  <li className="flex items-center gap-1">
                    <Link to="/checkout" className="font-extrabold text-[#e7b13c]">
                      Checkout
                    </Link>
                    <IoIosArrowForward />
                  </li>
                  <li className="flex items-center gap-1">
                    <Link to="/shipping" className="font-extrabold text-[#e7b13c]">Shipping</Link>
                    <IoIosArrowForward />
                  </li>
                  <li className="flex items-center gap-1">
                    <span className="font-extrabold text-[#e7b13c]">Payment</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pb-2">
              <div className="pb-4">
                <h1 className="text-lg font-semibold">Contact Information</h1>
              </div>
              <div className="flex items-center gap-2 text-sm pb-2">
                <h6 className="uppercase">
                  {user?.firstname} {user?.lastname}
                </h6>
                <p>({user?.email})</p>
              </div>
              <div className="flex items-center gap-2 pb-4 text-sm">
                <h6>Mobile/Phone Number: </h6>
                <p>{user?.mobile}</p>
              </div>
            </div>
            <div className="">
              <div className="pb-4">
                <div className="pb-4">
                  <h1 className="text-lg font-semibold pb-4">Payment Information</h1>
                  <form onSubmit={handleSubmit} className="pb-4">
                    {/* Payment Method Selection */}
                    <div className="pb-4">
                      <label className="block text-sm font-medium">Payment Method</label>
                      <div className="flex items-center gap-4 mt-2">
                        <label>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="credit Card"
                            checked={paymentInfo.paymentMethod === "credit Card"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Credit Card
                        </label>
                        <label>
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash On Delivery"
                            checked={paymentInfo.paymentMethod === "cash On Delivery"}
                            onChange={handleInputChange}
                            className="mr-2"
                          />
                          Cash on Delivery
                        </label>
                      </div>
                    </div>

                    {/* Credit Card Details */}
                    {paymentInfo.paymentMethod === "credit Card" && (
                      <>
                        <div className="pb-4">
                          <label htmlFor="cardNumber" className="block text-sm font-medium">Card Number</label>
                          <input
                            type="text"
                            id="cardNumber"
                            name="cardNumber"
                            value={paymentInfo.cardNumber}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="pb-4">
                          <label htmlFor="cardName" className="block text-sm font-medium">Cardholder Name</label>
                          <input
                            type="text"
                            id="cardName"
                            name="cardName"
                            value={paymentInfo.cardName}
                            onChange={handleInputChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            placeholder="Cardholder Name"
                            required
                          />
                        </div>
                        <div className="pb-4 flex gap-4">
                          <div className="w-1/2">
                            <label htmlFor="expiryDate" className="block text-sm font-medium">Expiry Date</label>
                            <input
                              type="text"
                              id="expiryDate"
                              name="expiryDate"
                              value={paymentInfo.expiryDate}
                              onChange={handleInputChange}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded"
                              placeholder="MM/YY"
                              required
                            />
                          </div>
                          <div className="w-1/2">
                            <label htmlFor="cvv" className="block text-sm font-medium">CVV</label>
                            <input
                              type="text"
                              id="cvv"
                              name="cvv"
                              value={paymentInfo.cvv}
                              onChange={handleInputChange}
                              className="mt-1 block w-full p-2 border border-gray-300 rounded"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="flex items-center justify-between my-5 pt-4">
                      <Link to="/checkout" className="flex items-center gap-1">
                        <IoIosArrowBack className="size-5" />
                        <p>Return to checkout</p>
                      </Link>
                      <button
                        type="submit"
                        className="bg-black hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out"
                      >
                        Complete Payment
                      </button>
                    </div>
                  </form>
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
                    <div className="flex items-center gap-6 pb-2">
                      <div className="relative" style={{ width: "10%" }}>
                        <img
                          src={item?.productId?.image[0].url}
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
            <div className="text-sm pt-2 border-b-2 border-gray-300">
              {discountPrice ? (
                <div className="flex items-center justify-between pb-2">
                  <h6>Total Before Discount:</h6>
                  <p className="font-semibold">R {priceBeforeDiscount}</p>
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
  );
}

export default Payment;
