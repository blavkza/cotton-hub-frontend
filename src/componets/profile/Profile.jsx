import { useFormik } from "formik";
import React, { useRef, useState, useEffect } from "react";
import { MdOutlineCameraAlt } from "react-icons/md";
import avatar from "../../images/user-125-512.png";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getAUser, updateAUser } from "../../features/user/userSlice";

function Profile({ userId }) {
  const [profilePicture, setProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);

  useEffect(() => {
    dispatch(getAUser(userId));
  }, [dispatch, userId]);

  const user = useSelector((state) => state.auth.user.getUser);


  const userImage = user?.image; 
  useEffect(() => {
    if (userImage) {
      setProfilePicture(userImage);
    }
  }, [userImage]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: user?.firstname || "",
      lastname: user?.lastname || "",
      email: user?.email || "",
      mobile: user?.mobile || "",
      image: profilePicture || "",
    },
    onSubmit: async (values) => {
      try {
        await dispatch(updateAUser({ ...values, image: profilePicture }));
      } catch (error) {
        console.error("Error in submitForm:", error);
      }
    },
  });

  const handleImgChange = async (event) => {
    const files = event.target.files;
    if (!files.length) return;

    if (files.length > 1) {
      toast.error(
        "You can only upload one image at a time for the profile picture!"
      );
      return;
    }

    setIsLoading(true);
    try {
      const file = files[0];
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
      setProfilePicture(imgData.secure_url);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileInputClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex justify-center w-full">
        <div className="relative w-[120px] h-[120px] rounded-full object-cover border-[3px] border-[#9b9e9b] overflow-hidden ">
          {isLoading ? (
            <div className=" absolute  right-11 top-11">
              <Spin />
            </div>
          ) : (
            <img
              src={profilePicture || avatar}
              alt="profile-picture"
              className="w-full h-full object-cover "
            />
          )}

          <div
            onClick={handleFileInputClick}
            className="absolute p-1 rounded-2xl bg-white items-center justify-center cursor-pointer border-[2px] border-[#cac8c8] right-3 bottom-3"
          >
            <MdOutlineCameraAlt />
          </div>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImgChange}
            style={{ display: "none" }}
          />
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex flex-col">
          <div className="w-full sm:flex flex-row gap-2 pb-3 ">
            <div className="sm:w-[50%] w-full">
              <label>First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstname}
                placeholder="Your Name"
                className="w-full capitalize px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
              />
            </div>
            <div className="sm:w-[50%] w-full">
              <label>Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastname"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lastname}
                placeholder="Your Name"
                className="w-full px-4 py-2 capitalize rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
              />
            </div>
          </div>
          <div className="w-full sm:flex flex-row gap-2 pb-3 ">
            <div className="sm:w-[50%] w-full">
              <label>Email</label>
              <input
                type="text"
                id="email"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
              />
            </div>
            <div className="sm:w-[50%] w-full">
              <label>Phone</label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.mobile}
                placeholder="Your Phone"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
              />
            </div>
          </div>
          <div className="text-sm flex justify-center pt-4">
            <button
              type="submit"
              className="bg-black hover:bg-[red] text-white font-bold py-2 px-5 rounded-3xl transition duration-300 ease-in-out transform"
            >
              Update Profile
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Profile;
