import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getCart } from "../features/user/userSlice";
import { Link } from "react-router-dom";

function Cart({ setOpenCart }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, []);

  const cartState = useSelector((state) => state.auth.cartProducts);



  return (
    <div>
      <div className="bg-[#6a686866] w-full h-[100vh] fixed top-0 left-0 z-50 ">
        <div className="w-[80%] md:w-[40%] h-[100vh] bg-white  fixed top-0 right-0 flex flex-col overflow-y-auto">
          <div className="flex justify-end pt-2 pr-2">
            <RxCross1
              size={16}
              className="cursor-pointer"
              onClick={() => setOpenCart(false)}
            />
          </div>
          {cartState ? (
            <div className="">
              {cartState?.length === 0 && (
                <div className="flex items-center justify-center pt-10">
                  <h1 className="text-center"> NO PRODUCT ADDED TO CART</h1>
                </div>
              )}
              <div className=" ">
                {cartState &&
                  cartState?.map((item, index) => {
                    return (
                      <div className="flex flex-row items-center border-b border-gray-300 pt-2">
                        <div className="flex items-center gap-4 pl-1  pb-2">
                          <div className="relative  " style={{ width: "10%" }}>
                            <img
                              src={item?.productId?.image[0].url}
                              alt="product-image"
                              className="w-full h-full ob"
                            />
                            <span className=" absolute w-4 h-4  rounded-full text-xs text-center bg-black text-white -top-2 -right-2">
                              {item?.quantity}
                            </span>
                          </div>

                          <div className="flex flex-col gap-2 text-gray-700 text-sm">
                            <div className="flex items-center h-[90%] truncate ">
                              <h6>{item?.productId?.title}</h6>
                            </div>
                            <div className="flex items-center pt-1 gap-1">
                              <h6>Color:</h6>
                              <ul>
                                <li
                                  className="w-[14px] h-[14px] rounded-full border border-black"
                                  style={{
                                    backgroundColor: item?.color?.title,
                                  }}
                                ></li>
                              </ul>
                            </div>
                          </div>
                        </div>

                        <div className="mr-4 text-xs">
                          <p>R{item?.price * item?.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center pt-10">
              <h1 className="text-center">
                {" "}
                Please
                <Link
                  to="/login"
                  onClick={() => setOpenCart(false)}
                  className="text-blue-600 pl-2 underline"
                >
                  Login
                </Link>{" "}
                to add product to cart
              </h1>
            </div>
          )}

          <div className="flex items-center justify-center text-xs py-6">
            {cartState && cartState.length > 0 && (
              <div className="flex items-center justify-center text-xs py-6">
                <Link
                  to="/cart"
                  onClick={() => setOpenCart(false)}
                  className="bg-black hover:bg-orange-600  text-white font-bold py-2 px-5 rounded-3xl transition duration-300 ease-in-out transform"
                >
                  Open Cart
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
