import React, { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  applyACoupon,
  getAUser,
  getCart,
  resetState,
} from "../features/user/userSlice";
import { Country } from "country-state-city";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  coupon: yup.string().required("Coupon code is required"),
});
function Checkout() {
  const dispatch = useDispatch();
  const [latestOrder, setLatestOrder] = useState(null);
  const [updatedOrderData, setUpdatedOrderData] = useState(null);
  const [subtotal, setSubtotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [place, setPlace] = useState("");
  const [street, setStreet] = useState("");
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  const userId = useSelector((state) => state.auth.user?._id);

  useEffect(() => {
    const storedOrder = localStorage.getItem("latestOrder");
    dispatch(getCart());
    window.scrollTo(0, 0);
    if (storedOrder) {
      setLatestOrder(JSON.parse(storedOrder));
    }
  }, []);

  useEffect(() => {
    dispatch(getAUser(userId));
    const allCountries = Country.getAllCountries();
    setCountries(allCountries);
  }, [dispatch, userId]);

  const user = useSelector((state) => state.auth.user?.getUser);
  const address = useSelector((state) => state.auth.user?.getUser?.address);
  const cartState = latestOrder?.cart || [];
  const discountPrice = useSelector(
    (state) => state.auth?.coupon?.discount || ""
  );

  console.log(cartState);
  useEffect(() => {
    let sum = 0;
    cartState.forEach((item) => {
      sum += Number(item.quantity) * item.price;
    });
    setSubtotal(sum);
  }, [cartState]);

  useEffect(() => {
    if (selectedAddress) {
      const selected = address.find(
        (item) => item.addressType === selectedAddress
      );
      if (selected) {
        setCountry(selected.country || "");
        setCity(selected.city || "");
        setAddress1(selected.address1 || "");
        setAddress2(selected.address2 || "");
        setPlace(selected.place || "");
        setStreet(selected.street || "");
      }
    }
  }, [selectedAddress, address]);

  const handleSelectAddress = (value) => {
    setSelectedAddress(value);
  };

  const getCountryName = (countryCode) => {
    const country = countries.find((c) => c.isoCode === countryCode);
    return country ? country.name : "";
  };

  const formik = useFormik({
    initialValues: {
      coupon: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(applyACoupon({ coupon: values.coupon, cart: cartState }))
        .then((response) => {
          const { discount, discountPercent, shopId, selectedProduct } = response.payload;
          
          const updatedCartData = cartState.map((item) => {
            const updatedItem = { ...item };
            
            if (item.productId.sellerId === shopId && item.productId.title === selectedProduct) {
              const discountAmount = (updatedItem.price * discountPercent) / 100;
              updatedItem.price = updatedItem.price - discountAmount;
            }
            
            return updatedItem;
          });
          
          const newOrderData = {
            ...latestOrder,
            cart: updatedCartData,
          };
          setUpdatedOrderData(newOrderData);
          
          toast.success(`Coupon applied! Discount: R${discount}`);
        })
        .catch((error) => {
          toast.error(error.message);
        });
    },
  });
  
  

  const totalPrice = (subtotal - discountPrice).toFixed(2);

  const couponApplied = discountPrice > 0;

  const paymentSubmit = () => {
    if (address1 === "" || address2 === "" || country === "" || city === "") {
      toast.error("Please choose your delivery address!");
    } else {
      const shippingAddress = {
        address1,
        address2,
        country,
        city,
        place,
        street,
      };
      const orderData = {
        cart: updatedOrderData.cart,
        totalPrice,
        subtotal,
        discountPrice,
        shippingAddress,
        user,
        couponApplied,
      };

      localStorage.setItem("latestOrder", JSON.stringify(orderData));
      navigate("/shipping");
    }
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
                      <span className=" font-extrabold text-[#e7b13c]">
                        Checkout
                      </span>
                      <IoIosArrowForward />
                    </li>
                    <li className="flex items-center gap-1">
                      <span>Shipping</span>
                      <IoIosArrowForward />
                    </li>
                    <li className="flex items-center gap-1">
                      <span>Payment</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="pb-8">
                <div className="pb-6">
                  <h1 className="text-lg font-semibold ">
                    Contact Information
                  </h1>
                </div>
                <div className="flex items-center gap-2  text-sm pb-4">
                  <h6 className="uppercase ">
                    {user?.firstname} {user?.lastname}
                  </h6>
                  <p>({user?.email})</p>
                </div>
                <div className="flex items-center gap-2 text-sm ">
                  <input type="checkbox" value="" id="" />
                  <h4>Email me news and offers</h4>
                </div>
              </div>
              <div className="">
                <h1 className="text-lg font-semibold pb-4">Shipping Address</h1>
                <form action="">
                  <div className="pb-4">
                    <select
                      id="select"
                      name="select"
                      onChange={(e) => handleSelectAddress(e.target.value)}
                      onBlur={(e) => handleSelectAddress(e.target.value)}
                      value={selectedAddress}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                    >
                      <option value="" disabled>
                        Select Address
                      </option>
                      {address &&
                        address.map((item, index) => (
                          <option key={index} value={item?.addressType}>
                            {item?.addressType}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="flex items-center pb-4">
                    <input
                      type="text"
                      placeholder="Country"
                      value={getCountryName(country)}
                      onChange={(e) => setCountry(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 pb-4">
                    <input
                      type="text"
                      placeholder="Address 1"
                      value={address1}
                      onChange={(e) => setAddress1(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="pb-4">
                    <div className="pb-2">
                      <input
                        type="text"
                        placeholder="Address 2"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <BsInfoCircle />
                      <p className="text-xs">
                        Add a house number if you have one
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center pb-4">
                    <input
                      type="text"
                      placeholder="Apartment, flat, etc (optional)"
                      value={place}
                      onChange={(e) => setPlace(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-2 pb-4">
                    <input
                      type="text"
                      placeholder="City"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                    />
                    <input
                      type="text"
                      placeholder="Street, etc (optional)"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                    />
                  </div>
                </form>
                <div className="flex items-center justify-between mt-10">
                  <Link
                    onClick={(e) => {
                      backToCart();
                    }}
                    className="flex items-center gap-1"
                  >
                    <IoIosArrowBack className="size-5" />
                    <p>Return to cart</p>
                  </Link>
                  <div className="">
                    <button
                      onClick={paymentSubmit}
                      className="bg-black hover:bg-orange-600 hover:text-black text-white text-xs font-bold py-2 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform"
                    >
                      Continue Shopping
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
              {cartState &&
                cartState.map((item, index) => (
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
                <div className="flex items-center justify-between pb-2">
                  <h6>Subtotal:</h6>
                  <p className="font-semibold">R {subtotal}</p>
                </div>
                <div className="flex items-center justify-between pb-2">
                  <h6>Shipping fee:</h6>
                  <p className="text-xs">calculated at next step</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="flex justify-start items-center gap-2">
                    {" "}
                    <input
                      type="text"
                      className=" block w-[80%] h-[40px] px-3 py-2 bg-white border border-gray-400 rounded-md shadow-sm"
                      placeholder="Enter Coupon Code"
                      name="coupon"
                      value={formik.values.coupon}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <button
                      className={`w-[20%] h-[40px] border bg-[#e7b13c] text-center text-[#ffff] rounded-[3px] cursor-pointer`}
                      type="submit"
                    >
                      Apply Code
                    </button>
                  </div>
                </form>
                <div className="flex items-center justify-between py-2">
                  <h6>Discount:</h6>
                  <p className="font-semibold">
                    {discountPrice ? `- R ${discountPrice}` : ``}
                  </p>
                </div>
              </div>
              <div className="pt-4">
                <div className="flex items-center justify-between pb-2">
                  <h6>Total:</h6>
                  <p className="font-semibold">R {totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
