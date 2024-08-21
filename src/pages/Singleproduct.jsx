import React, { useState } from "react";
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import ProductCard from "../componets/ProductCard";
import ReactStars from "react-rating-stars-component";
import Color from "../componets/Color";
import { Link, useNavigate } from "react-router-dom";
import { FaCodeCompare, FaHeart } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IoArrowForward, IoArrowBack } from "react-icons/io5";
import { useFormik } from "formik";
import * as yup from "yup";

import moment from "moment";
import {
  getAProduct,
  getProducts,
  rating,
} from "../features/product/productSlice";
import { toast } from "react-toastify";
import { addTocart, getCart, getUserOder } from "../features/user/userSlice";

const schema = yup.object().shape({
  comment: yup.string().required("Comment is required"),
});

function Singleproduct() {
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState();
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [oderedProduct, setoderedProduct] = useState(true);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [brand, setBrand] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const getProductId = location.pathname.split("/")[2];
  const userId = useSelector((state) => state.auth.user?.getUser?._id);

  useEffect(() => {
    getProduct();
    getAllProducts();
    getACart();
    window.scrollTo(0, 0);
    setTimeout(() => {
      dispatch(getAProduct());
    }, 3000);
  }, []);

  const getProduct = () => {
    dispatch(getAProduct(getProductId));
  };

  const getACart = () => {
    dispatch(getCart());
  };

  useEffect(() => {
    if (userId) {
      dispatch(getUserOder(userId));
    }
  }, [dispatch, userId]);

  const productState = useSelector((state) => state.products.singileProduct);

  const productAvalable = productState?.quantity
  
  const cartState = useSelector((state) => state.auth.cartProducts);


  const getAllProducts = () => {
    dispatch(getProducts());
  };
  const allProductState = useSelector((state) => state.products?.products);

  const ratings = productState?.ratings || [];

  const calculateAverageRating = () => {
    if (!ratings || ratings.length === 0) return 0;
    const totalRating = ratings.reduce((acc, review) => acc + review.star, 0);
    return Number((totalRating / ratings.length).toFixed(1));
  };

  const averageRating = calculateAverageRating();

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

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
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

  const handleNextImage = () => {
    if (currentImageIndex === images.length - 1) {
      return;
    }
    setCurrentImageIndex(currentImageIndex + 1);
  };

  const handlePrevImage = () => {
    if (currentImageIndex === 0) {
      return;
    }
    setCurrentImageIndex(currentImageIndex - 1);
  };

  const copyToClipboard = (text) => {
    var textField = document.createElement("textarea");
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand("copy");
    textField.remove();
  };

  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      const reviewData = {
        ...values,
        prodId: selectedProduct?._id,
      };
      dispatch(rating(reviewData));
      setIsReviewModalVisible(false);
    },
  });

  return (
    <div>
      <Meta title="product" />
      <BreadCrumb title="Product" />
      <div className="py-2 bg-[#e2e2eeee] px-12">
        <div className="flex bg-white p-4 rounded-lg shadow-lg">
          <div style={{ width: "60%" }}>
            <div
              className="overflow-hidden m-1 bg-white rounded-lg shadow"
              style={{ width: "100%", height: "97%" }}
            >
              {images.length > 0 && (
                <div className="h-full relative">
                  <img
                    src={images[currentImageIndex].url}
                    alt="product"
                    className="h-full w-full object-cover"
                  />{" "}
                  <div
                    className="absolute top-1/2 left-6"
                    onClick={handlePrevImage}
                  >
                    {" "}
                    {currentImageIndex !== 0 ? (
                      <div className="text-2xl p-2 bg-white hover:text-[#434343] text-[#a4a2a2] shadow-xl rounded-full  ">
                        <IoArrowBack />
                      </div>
                    ) : null}
                  </div>
                  <div
                    className="absolute top-1/2 right-6"
                    onClick={handleNextImage}
                  >
                    {currentImageIndex !== images.length - 1 ? (
                      <div className="  text-2xl p-2 bg-white hover:text-[#434343] text-[#a4a2a2] shadow-xl rounded-full ">
                        <IoArrowForward />{" "}
                      </div>
                    ) : null}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="" style={{ width: "40%" }}>
            <div className=" pl-10">
              <div className="pb-2 border-b border-gray-200">
                <h3 className="text-xl font-semibold pb-1">
                  {productState?.title}
                </h3>
              </div>
              <div className="py-4 border-b border-gray-200">
                <p className="font-mediam text-gray-800 pb-1">
                  R {productState?.price}
                </p>
              </div>
              <div className=" py-4 border-b border-gray-200">
                <div className="flex items-center gap-2 pb-1">
                  <ReactStars
                    count={5}
                    size={22}
                    value={averageRating}
                    edit={false}
                    activeColor="black"
                  />
                  <p className="text-sm text-gray-700">
                    {ratings.length > 0 ? ratings.length : "0"} Reviews
                  </p>
                </div>

                <div className="pb-1">
                  {oderedProduct && (
                    <div className="text-xm text-gray-600 underline">
                      <a href="#review">Write a Review</a>
                    </div>
                  )}
                </div>
              </div>

              <div className=" py-4 border-b border-gray-200">
                <div className="flex items-center gap-4 py-2">
                  <h4 className="text-sm font-medium">Type :</h4>
                  <p className="text-xs text-gray-600">
                    {productState?.category}
                  </p>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <h4 className="text-sm font-medium">Brand:</h4>
                  <div className="relative">
                    <div>
                      <p
                        className="text-xs text-gray-600 capitalize cursor-pointer hover:underline"
                        onClick={() => setBrand(!brand)}
                      >
                        {productState?.brands}
                      </p>
                    </div>

                    {brand && (
                      <div className="bg-white shadow-2xl absolute -top-4 left-0 mt-8 p-5 w-max rounded-md">
                        <div className="flex flex-col gap-2">
                          <div className="flex gap-2 items-center text-xs capitalize">
                            <p>Shop Name:</p>
                            <p>{productState?.brands}</p>
                          </div>
                          <div className="flex gap-2 items-center text-xs capitalize">
                            <p>Products No:</p>
                            <p>100 Products</p>
                          </div>
                          <div className="flex items-start justify-start">
                            <Link
                              to={"/shop/" + productState?.sellerId}
                              onClick={() => setBrand(false)}
                              className="bg-black text-xs hover:bg-orange-600 hover:text-black text-white py-1 px-2 rounded-3xl transition duration-300 ease-in-out transform"
                            >
                              Visit Shop
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <h4 className="text-sm font-medium">Category :</h4>
                  <p className="text-xs text-gray-600">
                    {productState?.category}
                  </p>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <h4 className="text-sm font-medium">Tages :</h4>
                  <p className="text-xs text-gray-600">{productState?.tags}</p>
                </div>
                <div className="flex items-center gap-4 py-2">
                  <h4 className="text-sm font-medium">Avalability :</h4>
                  <p className="text-xs text-gray-600">
                    {productAvalable} Products Avalable
                  </p>
                </div>
                <div className=" items-center gap-4 py-2">
                  <h4 className="text-sm font-medium">Size :</h4>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <span className="border border-gray-500 w-4 text-xs text-center">
                      S
                    </span>
                    <span className="border border-gray-500 w-4 text-xs text-center">
                      M
                    </span>
                    <span className="border border-gray-500 w-4 text-xs text-center">
                      L
                    </span>
                  </div>
                </div>
                <div className=" flex flex-col gap-4 py-2">
                  <h4 className="text-sm font-medium">Color :</h4>
                  <Color
                    setColor={setColor}
                    colorData={productState?.color}
                    selectedColor={color}
                  />
                </div>
                <div className="flex flex-col gap-4 py-2">
                  <div class="flex items-center gap-2 ">
                    <h4 className="text-sm font-medium">Quantity :</h4>
                    <div className="pt-2 w-20 relative">
                      <input
                        type="number"
                        placeholder="1"
                        min={1}
                        class="block w-full h-8 px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                        onChange={(e) => setQuantity(e.target.value)}
                        value={quantity}
                      />{" "}
                    </div>

                    <button
                      className="bg-[#0d101be1] mt-2 p-2 rounded-2xl hover:bg-gray-600  text-white text-xs"
                      onClick={() => {
                        addToCart();
                      }}
                    >
                      Add Cart
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-xs gap-3 mt-2 text-gray-700">
                <div>
                  <a href="" className="flex items-center gap-1">
                    <FaCodeCompare />
                    Add Compare{" "}
                  </a>
                </div>
                <div>
                  <a href="" className="flex items-center gap-1">
                    <FaHeart />
                    Add Wishlist
                  </a>
                </div>
              </div>
              <div className="flex flex-col mt-4 gap-4 py-2">
                <h4 className="text-sm font-medium text-gray-900">
                  Shipping & Returns
                </h4>
                <p className="text-xs text-gray-600">
                  Delivery will take between <b> 1 - 3 working days</b> <br />{" "}
                  You have the right to return your order within <b>14 days</b>{" "}
                  from the day on which the goods were delivered to you.{" "}
                </p>
              </div>
              <div className="flex flex-col mt-4 gap-4 py-2">
                <h4 className="text-sm font-medium text-gray-900  ">
                  Copy <b className="cursor-pointer underline">Product Link</b>
                </h4>
                <a
                  href="javascript:void(0)"
                  onClick={() => copyToClipboard(window.location.href)}
                  cla
                ></a>
              </div>
            </div>
          </div>
        </div>

        <div className="py-5">
          <h3 className="font-semibold py-2">Discription</h3>
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <p
              className="text-sm text-gray-700"
              dangerouslySetInnerHTML={{
                __html: productState?.description,
              }}
            ></p>
          </div>
        </div>

        <div id="review" className="py-8">
          <h3 className="font-semibold py-2">Reviews</h3>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex items-center justify-between border-b  border-gray-400">
              <div className="pb-6">
                <h4 className="font-semibold">Customer Reviews</h4>
                <div className="flex items-center gap-2 ">
                  <ReactStars
                    count={5}
                    size={22}
                    value={formik.values.star}
                    edit={true}
                    activeColor="black"
                    onChange={(newRating) => formik.setFieldValue("star", newRating)}
                  />
                </div>
              </div>
              <div className="pb-2">
                {oderedProduct && (
                  <div className="text-sm font-semibold underline">
                    <a href="#">Write a Review</a>
                  </div>
                )}
              </div>
            </div>
            <div className="py-6 border-b  border-gray-400">
              <h4 className="text-sm pb-2">Write Your Review</h4>
              <form onSubmit={formik.handleSubmit}>
                <div>
                  <textarea
                    name="comment"
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    rows="4"
                    placeholder="Comment"
                    class="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
                  ></textarea>
                </div>
                <div class="mt-6">
                  <button
                    type="submit"
                    className="mt-2 p-2 bg-black hover:bg-gray-800 text-white w-full rounded-lg"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            </div>

            <div className="py-6 border-b border-gray-400">
              <div className="flex gap-2 py-2">
                <h5 className="font-semibold uppercase py-2">Vhuhwavho</h5>
                <ReactStars
                  count={5}
                  size={20}
                  value="averageRating"
                  edit={false}
                  activeColor="#ffd700"
                />
              </div>
              <p className="text-sm text-gray-600">
                With long-lasting battery life and water resistance, it's ready
                to accompany you
              </p>
            </div>
          </div>
        </div>

        <div className="py-4">
          <div className="font-semibold">
            <h3>Related Products</h3>
          </div>
          <div className="flex flex-row  gap-2 overflow-y-scroll ">
            <ProductCard data={allProductState} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Singleproduct;
