import React, { useEffect, useState, useMemo } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router-dom";
import { Select, Spin } from "antd";
import { AiOutlineUpload, AiOutlineClose } from "react-icons/ai";
import { getColors } from "../../features/colors/colorSlice";
import { getProdCategory } from "../../features/prodCategory/prodCategorySlice";
import { deleteImg } from "../../features/upload/uploadSlice";
import { createEvant, resetState } from "../../features/evant/evantSlice";

let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  discountPrice: yup.number().required("Discount price is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("tags is Required"),
  brands: yup.string().required("Brand is Required"),
  quantity: yup.number().required("Quantity is Required"),
  expiry: yup.string().required("Expiry Date is Required"),
  color: yup
    .array()
    .min(1, "Pick at least one color")
    .required("Color is Required"),
});

function AddEvant() {
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const [color, setColor] = useState([]);

  useEffect(() => {
    dispatch(getProdCategory());
    dispatch(getColors());
  }, [dispatch]);

  const brandsState = useSelector((state) => state.seller.seller);

  const colorsState = useSelector((state) => state.colors.colors);
  const prodCategoryState = useSelector(
    (state) => state.prodCategory.prodCategories
  );

  const newEvant = useSelector((state) => state.evant);

  const { isSuccess, isError, createdEvant } = newEvant;
  useEffect(() => {
    if (isSuccess && createdEvant) {
      toast.success("Evant Created Successfullly!");
      navigate("/dashboard");
    }
    if (isError) {
      toast.error("Something Went Wrong!");
    }
  }, [isSuccess, isError, isLoading, navigate]);

  const formik = useFormik({
    initialValues: {
      title: "",
      quantity: "",
      description: "",
      price: "",
      discountPrice: "",
      brands: brandsState?.shopname,
      category: "",
      tags: "",
      color: [],
      image: [],
      sellerId: brandsState?._id,
      expiry: "",
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      if (image) {
        await handleImageUpload();
      }
      dispatch(
        createEvant({
          ...values,
          color: values.color,
          sellerId: brandsState?._id,
          image: images.map((image) => ({
            public_id: image.public_id,
            url: image.url,
          })),
        })
      );
      formik.resetForm();
      setColor([]);
      setImages([]);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const colorOptions = useMemo(
    () =>
      colorsState.map((color) => ({
        value: color._id,
        label: color.name,
      })),
    [colorsState]
  );

  const handleColors = (selectedColors) => {
    setColor(selectedColors);
    formik.setFieldValue("color", selectedColors);
  };

  const handleImgChange = async (acceptedFiles) => {
    if (images.length + acceptedFiles.length > 4) {
      toast.error("You can only add 4 images!");
      return;
    }
    setIsLoading(true);
    try {
      const uploadedImages = await Promise.all(
        acceptedFiles.map(async (file) => {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("cloud_name", "dhqutbesl");
          formData.append("upload_preset", "vhuhwavhoovh");

          const response = await fetch(
            "https://api.cloudinary.com/v1_1/dhqutbesl/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );

          const imgData = await response.json();
          return { public_id: imgData.public_id, url: imgData.secure_url };
        })
      );
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
      formik.setFieldValue("image", [
        ...formik.values.image,
        ...uploadedImages,
      ]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/*",
    onDrop: handleImgChange,
  });

  const handleRemoveImage = (index) => {
    const removedImage = images?.splice(index, 1)[0];
    setImages([...images]);
    dispatch(deleteImg(removedImage?.public_id));
  };
  return (
    <div className="w-full h-full overflow-y-auto p-4 pt-20">
      <div>
        <div className="text-lg">
          <h3 className="mb-4 font-bold">Add Evant</h3>
        </div>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4 bg-white shadow-lg rounded-xl p-4">
            <div className="mt-6">
              <div className="mb-4">
                <label>
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.title}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-900"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="error text-red-600 text-xs my-4">
                    {formik.errors.title}
                  </div>
                )}
              </div>
              <div className="mb-4">
              <label>
                  Description <span className="text-red-500">*</span>
                </label>
                <ReactQuill
                  theme="snow"
                  name="description"
                  onChange={(value) =>
                    formik.setFieldValue("description", value)
                  }
                  value={formik.values.description}
                  
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="error text-red-600 text-xs my-4">
                    {formik.errors.description}
                  </div>
                )}
              </div>
              <div className="mb-4">
              <label>
                 Original Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.price}
                 
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-900"
                />
                {formik.touched.price && formik.errors.price && (
                  <div className="error text-red-600 text-xs my-4">
                    {formik.errors.price}
                  </div>
                )}
              </div>
              <div className="mb-4">
              <label>
                 Discount Price <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="discountPrice"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.discountPrice}
                 
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-900"
                />
                {formik.touched.discountPrice &&
                  formik.errors.discountPrice && (
                    <div className="error text-red-600 text-xs my-4">
                      {formik.errors.discountPrice}
                    </div>
                  )}
              </div>

              <div className="mb-4">
              <label>
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.category}
                  className="bg-white py-3 border  border-gray-300 rounded shadow-sm w-full"
                >
                  <option value="" disabled>
                   
                  </option>
                  {prodCategoryState.map((category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="error text-red-600 text-xs my-4">
                    {formik.errors.category}
                  </div>
                )}
              </div>
              <div className="mb-4">
              <label>
                  Tags <span className="text-red-500">*</span>
                </label>
                <select
                  name="tags"
                  mode="multiple"
                  allowClear
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tags}
                  className="bg-white py-3 border border-gray-300 rounded shadow-sm w-full"
                >
                  <option value="" disabled>
                   
                  </option>
                  <option value="spacial">spacial</option>
                  <option value="fetures">fetured</option>
                  <option value="new">new</option>
                  <option value="tranding">popular</option>
                </select>
                {formik.touched.tags && formik.errors.tags && (
                  <div className="error text-red-600 text-xs my-4">
                    {formik.errors.tags}
                  </div>
                )}
              </div>
              <div className="mb-4">
              <label>
                  Colors <span className="text-red-500">*</span>
                </label>
                <Select
                  mode="multiple"
                  allowClear
                  className="w-full h-12 font-medium"
                  value={color}
                  onChange={handleColors}
                  options={colorOptions}
                />
                {formik.touched.color && formik.errors.color && (
                  <div className="error text-red-600 text-xs my-4">
                    {formik.errors.color}
                  </div>
                )}
              </div>
              <div className="mb-4">

              <label>
                  Quantity/stock <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="quantity"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.quantity}
                  className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-900"
                />
                {formik.touched.quantity && formik.errors.quantity && (
                  <div className="error text-red-600 text-xs my-4">
                    {formik.errors.quantity}
                  </div>
                )}
              </div>
              <label>
                  Evant Expriry Date <span className="text-red-500">*</span>
                </label>
              <input
                type="date"
                name="expiry"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.expiry}
                id="expiry"
                className="appearance-none block w-full px-3 py-3 border border-gray-300 rounded shadow-sm placeholder-gray-900"
              />
              {formik.touched.expiry && formik.errors.expiry && (
                <div className="error text-red-600 text-xs my-4">
                  {formik.errors.expiry}
                </div>
              )}
              <div
                className="my-4 text-center bg-white px-3 py-3 border border-gray-300 border-1 p-5"
                {...getRootProps()}
              >
                <div className="p-4 w-full max-w-xs mx-auto">
                  <input {...getInputProps()} />
                  {isLoading ? (
                    <div className="flex justify-center my-4">
                      <Spin />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3">
                      <p>
                        Drag and drop images here, or click to select images
                      </p>
                      <AiOutlineUpload className="text-center size-8" />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-start items-center w-full gap-2">
                {images.map((img, index) => (
                  <div key={index} className="relative">
                    <img
                      src={img.url}
                      alt="Product"
                      className="w-[200px] h-[250px] object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 rounded-full p-2"
                    >
                      <AiOutlineClose className="size-5" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="my-4">
                <button
                  type="submit"
                  className="w-full py-2 px-4 border font-medium rounded-lg text-lg text-white bg-[rgb(225,159,27)] hover:bg-gray-900"
                  disabled={isLoading}
                >
                  Add Evant
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEvant;
