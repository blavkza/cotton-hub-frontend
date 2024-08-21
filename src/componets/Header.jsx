import React, { useState, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  BsFillBagFill,
  BsFillHeartFill,
  BsFillPersonFill,
} from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { BiGitCompare } from "react-icons/bi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaBars } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAProduct, getProducts } from "../features/product/productSlice";
import Cart from "../componets/Cart";
import { getAUser, getCart, resetState } from "../features/user/userSlice";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  useEffect(() => {
    dispatch(getAUser(authState?._id));
  }, [dispatch]);

  const authState = useSelector((state) => state?.auth?.user?.getUser);

  console.log(authState);

  useEffect(() => {
    getAllProducts();
    dispatch(getCart());
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dispatch]);

  const cartState = useSelector((state) => state.auth.cartProducts);

  const cartTotal = cartState?.length;

  const getAllProducts = () => {
    dispatch(getAProduct());
  };
  const productState = useSelector((state) => state.products?.products);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() === "") {
      setSearchResults(null);
      setShowSearchResults(false);
    } else {
      const filteredProducts = productState?.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredProducts);
      setShowSearchResults(true);
    }
  };

  const handleClickOutside = (e) => {
    if (inputRef.current && !inputRef.current.contains(e.target)) {
      setShowSearchResults(false);
    }
  };

  return (
    <>
      <div>
        {" "}
        {/* <header className="hidden sm:flex items-center justify-between py-3 px-4 header-top-strip ">
        <div className="">
          <p className="text-white text-xs mb-0 select-none">
            Free Shipping Over R700 & Free Return{" "}
          </p>
        </div>
        <div className="">
          <p className="text-end text-white text-xs mb-0 ">
            Hotline:{" "}
            <a className="" href="tel:+27 715845118">
              +27 714845118
            </a>
          </p>
        </div>
      </header>*/}
      </div>
      <header className="hidden sm:flex items-center justify-between py-3 px-4 header-upper">
        <div className="">
          <h2 className="text-xl font-extrabold text-[#bf6e04] select-none">
            <Link to="/">COTTON.HUB </Link>
          </h2>
        </div>
        <div className="">
          <div className=" relative">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="pl-3 pr-20 py-1 w-full border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
            />
            <div className=" absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div>
          {showSearchResults && searchResults && searchResults?.length > 0 ? (
            <div className="absolute w-[300px]  max-h-[60vh] bg-slate-50 shadow-sm-2 z-[9] p-4 overflow-y-auto rounded-md shadow-lg ">
              {searchResults.map((i, index) => {
                const d = i.title;
                const Product_name = d.replace(/\s+/g, "-");
                return (
                  <Link
                    to={"/product/" + i?._id}
                    onClick={() => {
                      setShowSearchResults(false);
                    }}
                    key={index}
                  >
                    <div className="w-full flex items-start py-3 ">
                      {" "}
                      <img
                        src={i?.image[0].url}
                        alt=""
                        className="w-[40px] h-[40px] mr-[10px]"
                      />
                      <h1>{i.title}</h1>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : null}
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="px-3">
              <Link to="wishlist">
                <BsFillHeartFill className="text-2xl text-gray-400" />
              </Link>
            </div>
            <div className="px-3">
              {authState ? (
                <Link to="/profile">
                  <BsFillPersonFill className="text-gray-400 text-2xl" />
                </Link>
              ) : (
                <Link to="/login">
                  <BsFillPersonFill className="text-gray-400 text-2xl" />
                </Link>
              )}
            </div>
            <div className="px-3 relative">
              <button
                type="button"
                onClick={() => {
                  setOpenCart(true);
                }}
                className="flex items-center"
              >
                <BsFillBagFill className="text-2xl text-gray-400" />
                <div className="flex flex-colom absolute ml-4 mb-3 ">
                  {cartTotal > 0 ? (
                    <span className="w-4 h-4 rounded-full text-xs text-center bg-white text-black">
                      {cartTotal}
                    </span>
                  ) : null}
                </div>
              </button>
            </div>
          </div>

          {/*cart*/}
          {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
        </div>
      </header>
      <header className="hidden sm:flex header-bottom items-center justify-between py-3 px-4 text-white">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="menu-botton flex items-center">
                <div>
                  <div className="relative ml-10 inline-block text-left">
                    <button
                      onClick={toggleDropdown}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md px-4 py-2 bg-transparent text-sm"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      Shop Categories
                      <RiArrowDropDownLine className="-mr-1 ml-2 h-5 w-5" />
                    </button>

                    {/* Dropdown menu */}
                    {isOpen && (
                      <div
                        className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg text-black bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[9] max-h-[40vh] overflow-y-auto"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        {productState &&
                          [...new Set(productState.map((i) => i.category))].map(
                            (category, index) => {
                              return (
                                <div className="py-1" role="none" key={index}>
                                  <Link
                                    to="#"
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 hover:text-gray-900"
                                    role="menuitem"
                                  >
                                    <h6>{category}</h6>
                                  </Link>
                                </div>
                              );
                            }
                          )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between menu-links">
                  <div className="ml-4">
                    <NavLink
                      exact
                      to="/"
                      className={({ isActive }) =>
                      isActive && " text-yellow-500" 
                    }
                      
                    >
                      Home
                    </NavLink>
                  </div>
                  <div className="ml-4">
                    <NavLink
                      to="/store"
                      className={({ isActive }) =>
                      isActive && " text-yellow-500"
                    }
                    >
                      Our Store
                    </NavLink>
                  </div>
                  <div className="ml-4">
                    <NavLink
                      to="/blogs"
                      className={({ isActive }) =>
                      isActive && " text-yellow-500"
                    }
                    >
                      Blogs
                    </NavLink>
                  </div>
                  <div className="ml-4">
                    <NavLink
                      to="/contact"
                      className={({ isActive }) =>
                      isActive && " text-yellow-500"
                    }
                    >
                      Contact
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/*modile header */}
      {
        <header className="flex sm:hidden items-center justify-between py-6 px-4 header-upper fixed top-0 left-0 z-50 w-full shadow-lg">
          <div className="">
            <h2 className="flex gap-4 items-center text-xl font-extrabold text-[#bf6e04] select-none">
              <button className="text-gray-300">
                <FaBars />
              </button>
              <Link to="/">COTTON.HUB </Link>
            </h2>
          </div>

          <div className="">
            <div className="flex justify-between">
              <div className="px-3 hidden md:flex">
                <Link to="/compere">
                  <BiGitCompare className="text-2xl text-gray-400" />
                </Link>
              </div>
              <div className="px-3">
                <Link to="wishlist">
                  <BsFillHeartFill className="text-2xl text-gray-400" />
                </Link>
              </div>
              <div className="px-3">
                {authState ? (
                  <Link to="/profile">
                    <BsFillPersonFill className="text-gray-400 text-2xl" />
                  </Link>
                ) : (
                  <Link to="/login">
                    <BsFillPersonFill className="text-gray-400 text-2xl" />
                  </Link>
                )}
              </div>
              <div className="px-3 relative">
                <button
                  type="button"
                  onClick={() => {
                    setOpenCart(true);
                  }}
                  className="flex items-center"
                >
                  <BsFillBagFill className="text-2xl text-gray-400" />
                  <div className="flex flex-colom absolute ml-4 mb-3 ">
                    {cartTotal > 0 ? (
                      <span className="w-4 h-4 rounded-full text-xs text-center bg-white text-black">
                        {cartTotal}
                      </span>
                    ) : null}
                  </div>
                </button>
              </div>
            </div>

            {/*cart*/}
            {openCart ? <Cart setOpenCart={setOpenCart} /> : null}
          </div>
        </header>
      }
    </>
  );
}

export default Header;
