import React from "react";
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { BsEnvelopeFill, BsFillTelephoneFill, BsHouseDoorFill, BsInfoCircleFill } from "react-icons/bs";
import { createEnquiry } from "../features/equiries/equirieSlice";


const schema = yup.object().shape({
  name: yup.string().required("Name is Required"),
  mobile: yup.string().matches(/^[0-9]+$/, "Mobile must be a number").required("Mobile is Required"),
  email: yup.string().email("Email should be valid").required("Email is Required"),
  comment: yup.string().required("Comment is Required"),
});

function Contact() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      email: "",
      comment: "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      dispatch(createEnquiry(values));
      formik.resetForm();
    },
  });

  return (
    <>
      <Meta title="Contact" />
      <BreadCrumb title="Contact Us" />
      <div className="py-5 bg-[#e2e2eeee] px-12">
        <div className="container">
          <div className="row">
            <div>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28954.164836177035!2d30.419176750899528!3d-22.990161785383687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1ec5c688650ab8cf%3A0x507f331174fe941f!2sUniversity%20of%20Venda!5e0!3m2!1sen!2sza!4v1715294779614!5m2!1sen!2sza"
                style={{ width: "100%" }}
                height="400"
                className="border-0 w-100 rounded-sm"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="container mt-4">
              <div className="flex gap-4 bg-white p-8 rounded-lg shadow-lg">
                <div style={{ width: "60%" }}>
                  <h2 className="text-xl font-semibold mb-4">Contact Us</h2>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Name"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
                      />
                      {formik.touched.name && formik.errors.name && (
                        <div className="text-red-600 text-xs mt-2">{formik.errors.name}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Email"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
                      />
                      {formik.touched.email && formik.errors.email && (
                        <div className="text-red-600 text-xs mt-2">{formik.errors.email}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="mobile" className="block text-gray-700 font-medium mb-2">
                        Phone
                      </label>
                      <input
                        type="text"
                        id="mobile"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Phone"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
                      />
                      {formik.touched.mobile && formik.errors.mobile && (
                        <div className="text-red-600 text-xs mt-2">{formik.errors.mobile}</div>
                      )}
                    </div>
                    <div className="mb-4">
                      <label htmlFor="comment" className="block text-gray-700 font-medium mb-2">
                        Comment
                      </label>
                      <textarea
                        id="comment"
                        name="comment"
                        rows="4"
                        value={formik.values.comment}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Comment"
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 bg-gray-100"
                      ></textarea>
                      {formik.touched.comment && formik.errors.comment && (
                        <div className="text-red-600 text-xs mt-2">{formik.errors.comment}</div>
                      )}
                    </div>
                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-3 rounded-lg font-medium hover:bg-blue-600 transition duration-300"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
                <div className="pl-10" style={{ width: "40%" }}>
                  <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                  <div className="pt-4">
                    <ul>
                      <li className="flex gap-2 mb-4 items-center font-extralight text-xs text-gray-700">
                        <BsHouseDoorFill />
                        <address>University Rd, Thohoyandou, 0950</address>
                      </li>
                      <li className="flex gap-2 mb-4 items-center font-extralight text-xs text-gray-700">
                        <BsFillTelephoneFill />
                        <a href="tel:+27715845118">+27 71484 5118</a>
                      </li>
                      <li className="flex gap-2 mb-4 items-center font-extralight text-xs text-gray-700">
                        <BsEnvelopeFill />
                        <a href="mailto:cotton24@gmail.com">cotton24@gmail.com</a>
                      </li>
                      <li className="flex gap-2 mb-4 items-center font-extralight text-xs text-gray-700">
                        <BsInfoCircleFill />
                        <p>We work 24/7</p>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Contact;
