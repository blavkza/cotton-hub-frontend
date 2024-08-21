import React, { useEffect, useState } from "react";
import { Table, Modal, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserOder, orderRefund } from "../../features/user/userSlice";
import { IoMdAddCircle } from "react-icons/io";
import { rating } from "../../features/product/productSlice";
import { useFormik } from "formik";
import ReactStars from "react-rating-stars-component";
import * as yup from "yup";

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

const schema = yup.object().shape({
  comment: yup.string().required("Comment is required"),
});

function Refund() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.getUser?._id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserOder(userId));
    }
  }, [dispatch, userId]);

  const orders = useSelector((state) => state.auth.userOder?.orders || []);

  const statuses = ["Requested Refund", "Refund In Process", "Refund Accepted"];
  const filteredOrders = orders.filter((order) =>
    statuses.includes(order.status)
  );

  const data1 = filteredOrders.map((order, index) => {
    const totalQuantity = order.cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    return {
      key: index + 1,
      orderId: order._id,
      date: new Date(order.createdAt).toLocaleDateString(),
      status: <p>{order.status}</p>,
      quantity: <p>{totalQuantity}</p>,
      price: <p>R{order.finalTotal}</p>,
      action: (
        <button
          onClick={() => {
            setSelectedOrder(order);
            setIsModalVisible(true);
          }}
        >
          View
        </button>
      ),
    };
  });

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  const handleStatusChange = async () => {
    if (selectedOrder && selectedStatus) {
      try {
        await dispatch(
          orderRefund({ id: selectedOrder?._id, status: selectedStatus })
        ).unwrap();
        message.success("Order Refund Request Canceled");
        dispatch(getUserOder(userId));
        setIsModalVisible(false);
      } catch (error) {
        console.error("Failed to update order status:", error);
        message.error("Failed to update order status");
      }
    } else {
      message.error("Status or Order not selected");
    }
  };

  return (
    <div className="w-full px-5">
      <div>
        <div className="flex items-center justify-between text-lg">
          <h1 className="mb-4">Orders</h1>
          <h1 className="mb-4 mr-4">
            Total: <span>{data1.length}</span>
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl">
          <Table
            columns={columns}
            dataSource={data1}
            pagination={{ pageSize: 3 }}
            scroll={{ x: "100%" }}
            responsive
          />
        </div>
      </div>

      {/* Modal for viewing order details */}
      <Modal
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={600}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {selectedOrder && (
          <div>
            <div className="flex items-center justify-between ">
              <div className="">
                <h2>
                  Status:{" "}
                  <p className="font-semibold text-lg">
                    {selectedOrder.status}
                  </p>
                </h2>
                <h3>
                  Date: {new Date(selectedOrder.createdAt).toLocaleDateString()}
                </h3>
                <h3>Shipping Address:</h3>
                <div>
                  <p>
                    {selectedOrder.shippingAddress.address1},{" "}
                    {selectedOrder.shippingAddress.address2},{" "}
                    {selectedOrder.shippingAddress.city},{" "}
                    {selectedOrder.shippingAddress.county}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <h2 className="py-1">Payment Method: </h2>
                  <p className="font-semibold">{selectedOrder.paymentMethod}</p>
                </div>
                <div className="flex items-center gap-1">
                  <h2 className="py-2">Total: </h2>
                  <p className="font-semibold">R{selectedOrder.finalTotal}</p>
                </div>
              </div>

              {selectedOrder.status === "Requested Refund" && (
                <button
                  onClick={() => {
                    setSelectedStatus("Received");
                    handleStatusChange();
                  }}
                  className=" rounded-full px-2 bg-black text-white "
                >
                  Cancel
                </button>
              )}
            </div>

            <h3>Products:</h3>
            <ul>
              {selectedOrder.cart.map((item, index) => (
                <div
                  className="flex items-center justify-between border-b-2 border-gray-300 pt-2"
                  key={index}
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-6 pb-2">
                      <div className="relative" style={{ width: "8%" }}>
                        <img
                          src={
                            item?.productId?.image[0]?.url ||
                            "placeholder-image-url"
                          }
                          alt="product-image"
                          className="w-full h-full"
                        />
                        <span className="absolute w-4 h-4 rounded-full text-xs text-center bg-black text-white -top-2 -right-2">
                          {item?.quantity}
                        </span>
                      </div>
                      <div className="text-gray-700">
                        <div className="flex items-center">
                          <h6>{item?.productId?.title}</h6>
                        </div>
                        <div className="flex items-center pt-1 gap-1">
                          <h6>Size:</h6>
                          <p className="text-xs">S</p>{" "}
                        </div>
                        <div className="flex items-center pt-2 gap-1">
                          <h6>Color:</h6>
                          <ul>
                            <li
                              className="w-[14px] h-[14px] rounded-full border border-black"
                              style={{ backgroundColor: item?.color?.title }}
                            ></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center justify-center gap-2">
                    {selectedOrder.status === "Received" && (
                      <button
                        className="flex items-center"
                        onClick={() => {
                          setSelectedProduct(item.productId);
                          setIsReviewModalVisible(true);
                        }}
                      >
                        <IoMdAddCircle size={32} />
                        <p className="text-xs font-extralight">Add Review</p>
                      </button>
                    )}
                    <div className="font-semibold text-lg">
                      <p>R{item?.price * item?.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Refund;
