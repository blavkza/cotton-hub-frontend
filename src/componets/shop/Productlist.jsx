import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProducts } from "../../features/product/productSlice";

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Title",
    dataIndex: "title",
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: "Brand",
    dataIndex: "brand",
  
  },
  {
    title: "Category",
    dataIndex: "category",
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    sorter: (a, b) => a.date.stock - b.date.stock,
  },
  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

function Productlist() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.products.products);

  const sellerState = useSelector((state) => state.seller.seller);

  const shopId = sellerState?._id;

  const filteredProducts = productState?.filter(
    (product) => product.sellerId === shopId
  );

  const data1 = [];
  for (let i = 0; i < filteredProducts.length; i++) {
    data1.push({
      key: i + 1,
      title: filteredProducts[i].title,
      brand: filteredProducts[i].brands,
      category: filteredProducts[i].category,
      stock: filteredProducts[i].quantity,
      price: <p>R{filteredProducts[i].price}</p>,
      action: (
        <>
          <div className="flex items-center gap-3">
            <Link to="/" className="">
              <BiEdit />
            </Link>
            <Link className="" to="/">
              <AiFillDelete />
            </Link>
          </div>
        </>
      ),
    });
  }

  const numberOfProducts = data1.length;

  return (
    <div className="w-full h-full overflow-y-auto p-4 pt-20">
      <div className="">
        <div className="flex items-center justify-between text-lg">
          <h1 className="mb-4">Products</h1>
          <h1 className="mb-4 mr-4">
            Total: <span> {numberOfProducts}</span>
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4">
          <div className="">
            <Table columns={columns} dataSource={data1} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productlist;
