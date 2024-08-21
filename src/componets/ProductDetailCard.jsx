import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAProduct } from "../features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import Color from "../componets/Color";
import { toast } from "react-toastify";
import { addTocart, getCart } from "../features/user/userSlice";
import { FaCodeCompare, FaHeart } from "react-icons/fa6";

const productCard = ({ setOpen, data }) => {
  const [click, setClick] = useState(false);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    getProduct();
    getACart();
  }, []);

  const getProduct = () => {
    dispatch(getAProduct(data));
  };

  const productState = useSelector((state) => state.products.singileProduct);

  const image = productState?.image;

  const addToCart = () => {
    {
      color === null
        ? toast.error("Please add color")
        : dispatch(
            addTocart({
              productId: productState?._id,
              price: productState?.price,
              color,
              quantity,
            })
          );
    }
  };

  const getACart = () => {
    dispatch(getCart());
  };

  const cartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (data === cartState[index]?.data?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  useEffect(() => {
    if (image) {
      const imageArray = Array.isArray(image) ? productState.image : [];

      setImages(imageArray);
      setMainImage(imageArray[0]?.url || "");
    }
  }, [image]);

  const handleImageClick = (image) => {
    setMainImage(image.url || "");
  };

  return (
    <>
      <div className="bg-white">
        {productState ? (
          <div className="fixed w-full h-screen top-0 left-0 bg-[#1a191930] z-30 flex items-center justify-center">
            <div className="w-[85%] 800px:w-[60%] h-[85vh] 800px:h-[75vh] overflow-y-auto rounded-md bg-white shadow-sm relative p-4">
              <RxCross1
                size={20}
                className="absolute right-3 top-3 z-50 cursor-pointer"
                onClick={() => setOpen(false)}
              />

              <div className="flex flex-col sm-flex-rom items-center justify-between gap-2">
                <div className="h-[50%] w-full">
                  <div
                    className="overflow-hidden m-1 bg-white rounded-sm shadow"
                    style={{ width: "100%", height: "350px" }}
                  >
                    <img
                      src={mainImage}
                      alt="product"
                      className="h-full w-full object-cover"
                    />
                  </div>

                  <div className="flex flex-raw items-center justify-between gap-1 w-full py-2 m-1 ">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        style={{ width: "100%", height: "150px" }}
                      >
                        <img
                          src={image.url}
                          alt="product"
                          className="h-full w-full object-cover cursor-pointer bg-white rounded-sm shadow-lg"
                          onClick={() => handleImageClick(image)}
                        />
                      </div>
                    ))}
                  </div>
                </div>{" "}
                <div claclassName="h-[50%] w-full">
                  <div className=" sm:pl-10 ">
                    <div className="py-2 border-b border-gray-200">
                      <h3 className="text-md font-semibold ">
                        {productState?.title}
                      </h3>
                    </div>
                    <div className="py-2 border-b border-gray-200">
                      <p className="font-mediam text-gray-800 ">
                        R {productState?.price}
                      </p>
                    </div>

                    <div className=" py-2 border-b border-gray-200">
                      <div className="flex items-center gap-4 py-1">
                        <h4 className="text-sm font-medium ">Brand :</h4>
                        <Link
                          to={"/shop/" + productState?.sellerId}
                          onClick={() => setOpen(false)}
                          className="text-xs text-gray-600 capitalize hover:underline"
                        >
                          {productState?.brands}
                        </Link>
                      </div>
                      <div className="flex items-center gap-4 py-1">
                        <h4 className="text-sm font-medium">Category :</h4>
                        <p className="text-xs text-gray-600 capitalize hover:underline">
                          {productState?.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-4 py-1">
                        <h4 className="text-sm font-medium">Avalability :</h4>
                        <p className="text-xs text-gray-600">
                          {productState?.quantity} Products
                        </p>
                      </div>

                      <div className=" flex flex-col gap-4 py-1">
                        {alreadyAdded === false && (
                          <>
                            <h4 className="text-sm font-medium">Color :</h4>
                            <Color
                              setColor={setColor}
                              colorData={productState?.color}
                              selectedColor={color}
                            />
                          </>
                        )}
                      </div>
                      <div className="flex flex-col gap-4 py-1">
                        <div class="flex items-center gap-2 ">
                          {alreadyAdded === false && (
                            <>
                              <h4 className="text-sm font-medium">
                                Quantity :
                              </h4>
                              <div className="pt-1 w-20 relative">
                                <input
                                  type="number"
                                  placeholder="1"
                                  min={1}
                                  class="block w-full h-8 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                                  onChange={(e) => setQuantity(e.target.value)}
                                  value={quantity}
                                />{" "}
                              </div>
                            </>
                          )}

                          <button
                            className="bg-[#0d101be1] mt-1 p-2 rounded-2xl hover:bg-gray-600  text-white text-xs"
                            onClick={() => {
                              alreadyAdded ? navigate("/cart") : addToCart();
                            }}
                          >
                            {alreadyAdded ? "Go To Cart" : " Add Cart"}
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-xs gap-3 mt-2 text-gray-700">
                      <div>
                        <a href="" className="flex items-center gap-1">
                          <FaHeart />
                          Add Wishlist
                        </a>
                      </div>
                    </div>
                    <div className=" hidden sm:flex flex-col mt-4 gap-4 py-1">
                      <h4 className="text-sm font-medium text-gray-900">
                        Shipping & Returns
                      </h4>
                      <p className="text-xs text-gray-600">
                        Delivery will take between <b> 1 - 3 working days</b>{" "}
                        <br /> You have the right to return your order within{" "}
                        <b>14 days</b> from the day on which the goods were
                        delivered to you.{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default productCard;
