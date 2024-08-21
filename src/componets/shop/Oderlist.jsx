import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CustomModal from "../customModel";
import { getAllOder } from "../../features/seller/sellerSlice";


const columns = [
  {
    title: "Order Id",
    dataIndex: "orderId",
    key: "orderId",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
    sorter: (a, b) => new Date(a.date) - new Date(b.date),
  },
  {
    title: "Total",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Action",
    dataIndex: "action",
    key: "action",
  },
];

function Oderlist() {
  const dispatch = useDispatch();
  const sellerId = useSelector((state) => state.seller.seller._id);

  console.log(sellerId);

  useEffect(() => {
    if (sellerId) {
      dispatch(getAllOder(sellerId));
    }
  }, [dispatch, sellerId]);


  const orders = useSelector((state) => state.seller?.orders?.orders
  || []);

  const statuses = ["Processing","Deliver", "Shipping", "Received"];
  const filteredOrders = orders.filter((order) =>
    statuses.includes(order.status)
  );


  const data1 = filteredOrders.map((order, index) => {
    const totalQuantity = order.cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    console.log(order);
    return {
      key: index + 1,
      orderId: order._id,
      date: new Date(order.createdAt).toLocaleDateString('en-GB'),
      status: <p>{order.status}</p>,
      quantity: <p>{totalQuantity}</p>,
      price: <p>R{order.finalTotal}</p>,
      action: (
        <>
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/order/${order._id}`} className="">
            View
          </Link>
        </div>
      </>
      ),
    };
  });

  const numberOfBlogs = data1.length;


  return (
    <div className="w-full h-[100vh] overflow-y-auto p-4 relative pt-20">
      <div className="">
        <div className="flex items-center justify-between text-lg pb-2">
          <div className="flex flex-row gap-1">
            {" "}
            <h1 className="font-bold">Oders</h1>
          </div>
          <h1 className="mb-4 mr-4">
            Total: <span> {numberOfBlogs}</span>
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

export default Oderlist;
