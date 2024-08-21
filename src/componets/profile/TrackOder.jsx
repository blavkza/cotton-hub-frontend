import React, { useEffect, useState } from "react";
import { Table, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getUserOder } from "../../features/user/userSlice";
import { FcHome } from "react-icons/fc";
import { LiaShippingFastSolid } from "react-icons/lia";
import { GoPackageDependents } from "react-icons/go";
import { FcProcess } from "react-icons/fc";
import { CgTrack } from "react-icons/cg";


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

function TrackOder() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.user?.getUser?._id);

  useEffect(() => {
    if (userId) {
      dispatch(getUserOder(userId));
    }
  }, [dispatch, userId]);

  const orders = useSelector((state) => state.auth.userOder?.orders || []);

  const statuses = ["Processing", "Shipping", "Deliver", "Received"];
  const filteredOrders = orders.filter(
    (order) => statuses.includes(order.status) && order.status !== "Received"
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
      updatedDate: new Date(order.updatedAt).toLocaleDateString(),
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
          <CgTrack size={25} />
        </button>
      ),
    };
  });

  const handleCancel = () => {
    setIsModalVisible(false);
    setSelectedOrder(null);
  };

  return (
    <div className="w-full px-5">
      <div>
        <div className="flex items-center justify-between text-lg">
          <h1 className="mb-4">Track Orders</h1>
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
        width={700}
        bodyStyle={{ maxHeight: "80vh", overflowY: "auto" }}
      >
        {selectedOrder && (
          <div>
            <div className="p-2 max-w-lg mx-auto">
              <h1 className="text-2xl font-bold mb-4">Order Tracking</h1>
              <h2 className="text-lg font-semibold">
                ORDER ID : {selectedOrder._id}
              </h2>
              <h3 className="text-md font-medium mt-2">
                STATUS : {selectedOrder.status}
              </h3>
              <h3 className="text-md font-medium mt-2">
                ORDER PLACED AT :{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </h3>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex sm:flex-row flex-col items-start  gap-12 sm:justify-between px-4 py-6">
                {statuses.map((status, index) => (
                  <div
                    key={status}
                    className="flex flex-row sm:flex-col items-center gap-6 sm:justify-between"
                  >
                    <div className="flex flex-col justify-between">
                      <p className="pb-2">{status}</p>
                      <div
                        className={`flex items-center justify-center w-12 h-12 rounded-full ${
                          selectedOrder.status === status
                            ? "bg-slate-900 text-white"
                            : "bg-slate-400 "
                        } ${
                          selectedOrder.status !== status &&
                          statuses.indexOf(selectedOrder.status) >
                            statuses.indexOf(status)
                            ? ""
                            : ""
                        }`}
                      >
                        {status === "Processing" && <FcProcess size={24} />}
                        {status === "Shipping" && <GoPackageDependents size={24} />}
                        {status === "Deliver" && <LiaShippingFastSolid size={24} />}
                        {status === "Received" && <FcHome size={24} />}
                      </div>
                    </div>

                    {selectedOrder.status === status && (
                      <div className="pt-4 text-sm font-light flex flex-col gap-2">
                        {status === "Processing" && (
                          <>
                            <p>
                              The system is verifying <br />
                              the order details
                            </p>
                            <p>
                              Date:{" "}
                              {new Date(
                                selectedOrder.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          </>
                        )}
                        {status === "Shipping" && (
                          <>
                            <p>
                              Your order is being shipped <br />
                              to warehouse
                            </p>
                            <p>
                              Date:{" "}
                              {new Date(
                                selectedOrder.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          </>
                        )}
                        {status === "Deliver" && (
                          <>
                            <p>
                              Your order is on the way. Please <br />
                              check your email for confirmation.
                            </p>
                            <p>
                              Date:{" "}
                              {new Date(
                                selectedOrder.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          </>
                        )}
                        {status === "Received" && (
                          <>
                            <p>
                              Your order has been received. <br />
                              Thank you for your purchase!
                            </p>
                            <p>
                              Date:{" "}
                              {new Date(
                                selectedOrder.updatedAt
                              ).toLocaleDateString()}
                            </p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TrackOder;
