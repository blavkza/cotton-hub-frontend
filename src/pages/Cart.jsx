import React, { useEffect, useState } from "react";
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProdctFromCart,
  getCart,
  updateCartProduct,
} from "../features/user/userSlice";

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState({});
  const [subtotal, setSubtotal] = useState(null);

  useEffect(() => {
    dispatch(getCart());
    window.scrollTo(0, 0);
  }, [dispatch]);

  const cartState = useSelector((state) => state.auth.cartProducts);
  console.log(cartState);
  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum = sum + Number(cartState[index]?.quantity) * cartState[index]?.price;
      setSubtotal(sum);
    }
  }, [cartState]);

  useEffect(() => {
    if (cartState) {
      const initialQuantities = {};
      cartState.forEach((item) => {
        initialQuantities[item._id] = item.quantity;
      });
      setQuantities(initialQuantities);
    }
  }, [cartState]);

  const deleteAProductFromCart = (id) => {
    dispatch(deleteProdctFromCart(id));
    setTimeout(() => {
      dispatch(getCart()).then(() => {
        if (cartState?.length === 0) {
          navigate("/");
        }
      });
    }, 100);
  };

  const updateCart = (id, quantity) => {
    if (quantity) {
      dispatch(updateCartProduct({ cartItemId: id, quantity }));
      setTimeout(() => {
        dispatch(getCart());
      }, 100);
    }
  };

  const handleQuantityChange = (id, quantity) => {
    setQuantities({ ...quantities, [id]: quantity });
    updateCart(id, quantity);
  };

  useEffect(() => {
    if (cartState?.length === 0) {
      navigate("/");
    }
  }, [cartState, navigate]);

  const paymentSubmit = () => {
    const orderData = { cart: cartState };

    localStorage.setItem("latestOrder", JSON.stringify(orderData));
    navigate("/checkout");
  };

  return (
    <div>
      <Meta title="cart" />
      <BreadCrumb title="Cart" />
      <div className="py-5 bg-[#e2e2eeee] px-12">
        <div className="container bg-white p-8 rounded-lg shadow-lg">
          <div className="flex items-center justify-between gap-10">
            <div
              className="flex justify-between text-gray-700 text-sm"
              style={{ width: "60%" }}
            >
              <h6>PRODUCT</h6>
              <h6>Price</h6>
            </div>
            <div
              className="flex justify-between text-gray-700 text-sm"
              style={{ width: "40%" }}
            >
              <h6>Quantity</h6>
              <h6>Total</h6>
            </div>
          </div>
          <div>
            {cartState &&
              cartState.map((item, index) => (
                <div
                  className="flex gap-8 items-center border-b-2 border-gray-300 pt-4"
                  key={index}
                >
                  <div className="" style={{ width: "60%" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 pb-8">
                        <div className="" style={{ width: "15%" }}>
                          <img
                            src={item?.productId?.image[0].url}
                            alt="product-image"
                            className="w-full h-full"
                          />
                        </div>
                        <div className="text-gray-700">
                          <div className="flex items-center">
                            <h5>{item?.productId?.title}</h5>
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
                      <div className="font-semibold">
                        <p>{item?.price}</p>
                      </div>
                    </div>
                  </div>
                  <div className="" style={{ width: "40%" }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min={1}
                          className="border px-2 border-gray-700 rounded-lg w-16"
                          onChange={(e) =>
                            handleQuantityChange(item._id, e.target.value)
                          }
                          value={quantities[item._id] || item?.quantity}
                        />
                        <button
                          onClick={() => deleteAProductFromCart(item?._id)}
                          className="bg-black rounded-full p-2 cursor-pointer"
                        >
                          <FaRegTrashAlt className="text-white size-3" />
                        </button>
                      </div>
                      <p className="font-bold">
                        R {item?.price * item?.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <div className="pt-20">
            <Link
              to="/store"
              className="bg-black hover:bg-orange-600 hover:text-black text-white font-bold py-2 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform"
            >
              Continue Shopping
            </Link>
          </div>
          <div className="text-end">
            <div className="text-gray-700 py-6 gap-2">
              <h6>Subtotal:</h6>
              <p className="">R {subtotal}</p>
            </div>
            <p className="py-1 mb-2 text-gray-700 text-xs">
              Taxes and shipping calculated at checkout
            </p>
            <button
              onClick={paymentSubmit}
              className="bg-black hover:bg-orange-600 hover:text-black text-white font-bold py-2 px-4 rounded-xl shadow-lg transition duration-300 ease-in-out transform"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
