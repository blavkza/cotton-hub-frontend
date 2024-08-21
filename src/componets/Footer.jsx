import React from "react";
import { SiMinutemailer } from "react-icons/si";
import {
  BsFacebook,
  BsTwitterX,
  BsInstagram,
  BsYoutube,
  BsLinkedin,
} from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Footer() {
  const sellerState = useSelector((state) => state.seller.seller);

  return (
    <>
      <footer>
        <div className="flex items-center justify-between py-2 md:px-12 sm:px-4 px-2">
          <div className="">
            <div className="flex flex-row gap-2 items-center text-white md:font-bold md:text-lg sm:font-semibold sm:text-sm font-light text-xs">
              <SiMinutemailer className="md:text-2xl sm:text-xl text-sm text-gray-300" />
              <h2>For Newsletter</h2>
            </div>
          </div>
          <div className="">
            <div>
              <form class="flex gap-2 items-center justify-center ">
                <input
                  type="email"
                  placeholder="Enter your email"
                  class="w-[130px] sm:w-[220px] rounded-xl px-1 sm:px-3 sm:py-1 border-[2px] text-xs sm:text-sm hover:border-[orange]"
                />
                <button
                  type="submit"
                  class="w-[60px] sm:w-[100px] bg-[orange] text-xs sm:text-sm rounded-xl p-[2px] sm:p-[5px] text-white"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="flex items-center justify-between py-2 md:px-12 sm:px-4 px-2 text-white ">
          <div className="">
            <h3>Contact Us</h3>
            <div className="font-light text-xs py-2">
              <address className="mb-4">
                Thohoyandou 0950, <br /> Univesity of Venda <br /> PinCode:
                121234
              </address>
              <a className="block mb-4" href="tel:+27 71584 5118">
                +27 71484 5118
              </a>
              <a className="block mb-4" href="mailto:+27 71584 5118">
                cotton24@gmail.com
              </a>
              <div className="gap-3 text-sm pt-3 flex justify-between">
                <a href="">
                  <BsFacebook />
                </a>
                <a href="">
                  <BsTwitterX />
                </a>
                <a href="">
                  <BsInstagram />
                </a>
                <a href="">
                  <BsYoutube />
                </a>
                <a href="">
                  <BsLinkedin />
                </a>
              </div>
            </div>
          </div>
          <div className="">
            <h3>Information</h3>
            <div className="py-2 mb-1 text-xs flex flex-col">
              <Link to="privacy-policy" className=" py-2">
                Privacy Policy
              </Link>
              <Link to="refund-policy" className=" py-2">
                Refund Policy
              </Link>
              <Link to="shipping-policy" className=" py-2">
                Shipping Policy
              </Link>
              <Link to="terms-conditions" className=" py-2">
                Terms & Conditions
              </Link>
              <Link to="/blogs" className=" py-2">
                Blogs
              </Link>
            </div>
          </div>
          <div className="col-3">
            <h3>Accont</h3>
            <div className="py-2 mb-1 text-xs flex flex-col">
              <Link className=" py-2">Search</Link>
              <Link className=" py-2">About Us</Link>
              <Link className=" py-2">Feq</Link>
              <Link className=" py-2">Contact</Link>
              {!sellerState ? (
                <Link to={"/seller-register"} className=" py-2">
                  Become a seller
                </Link>
              ) : null}
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center mb-0 text-xs text-white ">
                &copy; {new Date().getFullYear()}: Powered by RSA_WILD
                Developers
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
