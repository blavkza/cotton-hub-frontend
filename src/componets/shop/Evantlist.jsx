import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllEvant } from "../../features/evant/evantSlice";

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
    title: "Created At",
    dataIndex: "createdAt",
    sorter: (a, b) => a.createdAt.length - b.createdAt.length,
  },
  {
    title: "Expiry",
    dataIndex: "expiry",
  },

  {
    title: "Price",
    dataIndex: "price",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Discount",
    dataIndex: "discountPrice",
    sorter: (a, b) => a.discountPrice.length - b.discountPrice.length,
  },
  {
    title: "Stock",
    dataIndex: "stock",
    sorter: (a, b) => a.date.stock - b.date.stock,
  },
  {
    title: "Action",
    dataIndex: "action",
  },
];

function Evantlist() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllEvant());
  }, []);

  const evantState = useSelector((state) => state.evant.evants);

  console.log(evantState);

  const sellerState = useSelector((state) => state.seller.seller);

  const shopId = sellerState?._id;

  const filteredEvants = evantState?.filter(
    (evant) => evant.sellerId === shopId
  );
  const data1 = [];
  for (let i = 0; i < filteredEvants.length; i++) {
    data1.push({
      key: i + 1,
      title: filteredEvants[i].title,
      expiry: new Date(filteredEvants[i].expiry).toLocaleDateString(),
      createdAt:new Date(filteredEvants[i].createdAt).toLocaleDateString(),
      discountPrice: <p>R{filteredEvants[i].discountPrice}</p>,
      stock: filteredEvants[i].quantity - filteredEvants[i].sold,
      price: <p>R{filteredEvants[i].price}</p>,
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
          <h1 className="mb-4">Evants</h1>
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

export default Evantlist;
