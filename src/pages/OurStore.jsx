import React, { useState, useEffect } from "react";
import BreadCrumb from "../componets/BreadCrumb";
import Meta from "../componets/Meta";
import ReactStars from "react-rating-stars-component";
import Color from "../componets/Color";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../features/product/productSlice";
import StoreProductCart from "../componets/StoreProductCart";

function OurStore() {
  const [category, setCategory] = useState('');
  const [availability, setAvailability] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [sort, setSort] = useState('manual');
  const productState = useSelector((state) => state.products?.products || []);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchProducts();
    window.scrollTo(0, 0);
  }, [category, availability, priceRange, colors, sizes, sort]);

  const fetchProducts = () => {
    dispatch(getProducts({ category, availability, priceRange, colors, sizes, sort }));
  };

  const handlePriceRangeChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (setter, value) => {
    setter(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  return (
    <>
      <Meta title="Our Store" />
      <BreadCrumb title="Our Store" />
      <div className="py-5 bg-[#e2e2eeee] px-12">
        <div className="flex gap-4 pt-4">
          <div className="w-1/4 gap-2">
            {/* Category Filter */}
            <div className="bg-white mb-2 rounded-md shadow-md px-5">
              <h5 className="font-bold py-4">Shop By Category</h5>
              <div className="py-4 text-sm text-gray-800">
                <ul className="cursor-pointer">
                  {['Watch', 'Radio', 'Phone', 'Laptop'].map(cat => (
                    <li
                      key={cat}
                      className={`mb-2 cursor-pointer ${category === cat ? 'text-blue-500' : ''}`}
                      onClick={() => setCategory(cat)}
                    >
                      {cat}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Filter By */}
            <div className="bg-white mb-2 rounded-md shadow-md px-5">
              <h5 className="font-bold py-5">Filter By</h5>
              
              {/* Availability */}
              <h5 className="font-bold text-sm pb-3">Availability</h5>
              <div className="text-xs pb-4">
                {['In stock', 'Out of stock'].map(status => (
                  <div key={status} className="form-check flex gap-1">
                    <input
                      type="checkbox"
                      value={status}
                      checked={availability.includes(status)}
                      onChange={() => handleCheckboxChange(setAvailability, status)}
                    />
                    <label>{status} ({Math.floor(Math.random() * 5)})</label>
                  </div>
                ))}
              </div>

              {/* Price */}
              <h5 className="font-bold text-sm pb-3">Price</h5>
              <div className="flex gap-2 pb-6">
                <input
                  type="number"
                  name="min"
                  placeholder="from"
                  value={priceRange.min}
                  onChange={handlePriceRangeChange}
                  className="block w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                />
                <input
                  type="number"
                  name="max"
                  placeholder="to"
                  value={priceRange.max}
                  onChange={handlePriceRangeChange}
                  className="block w-full px-4 py-2 text-sm text-gray-800 placeholder-gray-400 bg-white border border-gray-400 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300 ease-in-out"
                />
              </div>

              {/* Color */}
              <h5 className="font-bold text-sm pb-3">Color</h5>
              <Color selectedColors={colors} onColorChange={setColors} />

              {/* Size */}
              <h5 className="font-bold text-sm pb-3">Size</h5>
              <div className="text-xs pb-4">
                {['S', 'M', 'L', 'XL'].map(size => (
                  <div key={size} className="form-check flex gap-1">
                    <input
                      type="checkbox"
                      value={size}
                      checked={sizes.includes(size)}
                      onChange={() => handleCheckboxChange(setSizes, size)}
                    />
                    <label>{size} ({Math.floor(Math.random() * 5)})</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Tags */}
            <div className="bg-white mb-2 rounded-md shadow-md px-5">
              <h5 className="font-bold py-4">Product Tags</h5>
              <div className="flex flex-wrap items-center text-sm text-gray-800 gap-2 pb-4">
                {['New', 'Special'].map((tag, index) => (
                  <span key={index} className="bg-gray-200 rounded-md py-1 px-2">{tag}</span>
                ))}
              </div>
            </div>

            {/* Random Products */}
            <div className="bg-white rounded-md shadow-md px-5">
              <h5 className="font-bold py-4">Random Products</h5>
              <div>
                {[{
                  imgSrc: 'images/17908696-golden-watches-on-white-background.jpg',
                  title: 'Gold Smart Watch pro+',
                  price: 'R500.00'
                }, {
                  imgSrc: 'images/realistic-clock-watch-grey-stainless-steel-black-gold-face-luxury-for-men-on-white-background-vector.jpg',
                  title: 'Black Smart Watch pro+',
                  price: 'R450.00'
                }].map((product, index) => (
                  <div key={index} className={`flex items-center border-b ${index !== 0 ? 'border-gray-400' : ''}`}>
                    <div className="w-1/2">
                      <img
                        src={product.imgSrc}
                        alt="product"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="w-1/2">
                      <h5 className="text-sm">{product.title}</h5>
                      <ReactStars
                        count={5}
                        size={17}
                        value={3}
                        edit={false}
                        activeColor="#ffd700"
                      />
                      <p className="text-[#3279d6] text-sm pb-2">{product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="w-3/4">
            {/* Sorting and Products Display */}
            <div className="bg-white mb-2 rounded-md shadow-md">
              <div className="flex items-center justify-between py-5">
                <div className="flex gap-1">
                  <p className="mb-0 pl-3">Sort By:</p>
                  <select
                    name="sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-gray-200 py-1 rounded-md text-sm"
                  >
                    <option value="manual">Featured</option>
                    <option value="best-selling">Best selling</option>
                    <option value="title-ascending">Alphabetically, A-Z</option>
                    <option value="title-descending">Alphabetically, Z-A</option>
                    <option value="price-ascending">Price, low to high</option>
                    <option value="price-descending">Price, high to low</option>
                    <option value="created-ascending">Date, old to new</option>
                    <option value="created-descending">Date, new to old</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 pr-4">
                  <p className="text-gray-800 text-sm">
                    {productState.length} products
                  </p>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-2">
              <StoreProductCart data={productState} />
            </div>
          
          </div>
        </div>
      </div>
    </>
  );
}

export default OurStore;
