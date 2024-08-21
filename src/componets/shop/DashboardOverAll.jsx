import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { getASeller, getAllOder, getBalance, resetState } from "../../features/seller/sellerSlice";
import { getProducts } from "../../features/product/productSlice";
import { getAllEvant } from "../../features/evant/evantSlice";

function DashboardOverAll() {
  const dispatch = useDispatch();
  const sellerId = useSelector((state) => state.seller.seller._id);

  useEffect(() => {
    if (sellerId) {
      dispatch(getBalance(sellerId));
      dispatch(getAllOder(sellerId));
      dispatch(getProducts());

    }
  }, [dispatch, sellerId]);

  const orders = useSelector((state) => state.seller?.orders?.orders || []);
  const products = useSelector((state) => state.products.products || []);
  const accountBalance = useSelector(
    (state) => state?.seller?.balance 
  );

  const productsInStock = useMemo(() => {
    return products
      .filter((product) => product.sellerId === sellerId)
      .reduce((acc, product) => acc + product.quantity, 0);
  }, [products, sellerId]);

  const receivedOrdersCount = useMemo(() => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    return orders.filter(
      (order) =>
        order.status === "Received" &&
        new Date(order.createdAt) >= startOfMonth &&
        new Date(order.createdAt) <= endOfMonth
    ).length;
  }, [orders]);

  return (
    <div className="w-full h-full overflow-y-auto p-4 pt-20">
      <div className="flex flex-col pt-4">
        <h1 className="font-bold px-2">Dashboard</h1>
        <div className="flex items-center justify-between gap-2 text-gray-700 px-2 pt-4">
          <div className="flex justify-between bg-white rounded-xl shadow-lg p-4 md:gap-20">
            <div className="flex flex-col gap-4 justify-center">
              <p>
                Total: <br /> R{accountBalance}
              </p>
              <Link className="px-2 py-1 text-center hover:bg-slate-700 bg-black rounded-full text-white text-xs">
                Withdraw
              </Link>
            </div>
            <div className="text-end text-sm">
              <p>Account Balance</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-xl shadow-lg p-4 md:gap-20">
            <div className="flex flex-col gap-4 justify-center">
              <p>Total: {productsInStock}</p>
              <Link className="px-2 py-1 text-center hover:bg-slate-700 bg-black rounded-full text-white text-xs">
                View
              </Link>
            </div>
            <div className="text-end text-sm">
              <p>Products In Stock</p>
            </div>
          </div>
          <div className="flex justify-between bg-white rounded-xl shadow-lg p-4 md:gap-20">
            <div className="flex flex-col gap-4 justify-center">
              <p>Total: {receivedOrdersCount}</p>
              <Link className="px-2 py-1 text-center hover:bg-slate-700 bg-black rounded-full text-white text-xs">
                View
              </Link>
            </div>
            <div className="text-end text-sm">
              <p>
                Mounthly Orders
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 pt-2">
          <OrderList />
        </div>
        <div className="mt-6 pt-2">
          <ProductList />
        </div>
        <div className="mt-6 pt-2 flex gap-2">
          <div className="w-1/2">
            <EventList />
          </div>
          <div className="w-1/2">
            <ReceivedOder />
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderList() {
  const dispatch = useDispatch();
  const sellerId = useSelector((state) => state.seller.seller._id);

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

  useEffect(() => {
    if (sellerId) {
      dispatch(getAllOder(sellerId));
    }
  }, [dispatch, sellerId]);

  const orders = useSelector((state) => state.seller?.orders?.orders || []);

  const statuses = ["Processing", "Deliver", "Shipping"];
  const filteredOrders = orders.filter((order) =>
    statuses.includes(order.status)
  );

  const data = filteredOrders.map((order) => {
    const totalQuantity = order.cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );

    return {
      key: order._id,
      orderId: order._id,
      date: new Date(order.createdAt).toLocaleDateString("en-GB"),
      status: <p>{order.status}</p>,
      quantity: <p>{totalQuantity}</p>,
      price: <p>R{order.finalTotal}</p>,
      action: (
        <div className="flex items-center gap-3">
          <Link to={`/dashboard/order/${order._id}`} className="">
            View
          </Link>
        </div>
      ),
    };
  });

  return (
    <div className="w-full p-4 relative ">
      <div>
        <div className="flex items-center justify-between text-lg pb-2">
          <h1 className="font-bold">Open Orders</h1>
          <h1 className="mb-4 mr-4">
            Total: <span>{data.length}</span>
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

function ProductList() {
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
      title: "Category",
      dataIndex: "category",
      sorter: (a, b) => a.category.length - b.category.length,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => a.stock - b.stock,
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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const productState = useSelector((state) => state.products.products || []);

  const sellerState = useSelector((state) => state.seller.seller);

  const shopId = sellerState?._id;

  const filteredProducts = productState?.filter(
    (product) => product.sellerId === shopId && product.quantity <= 5
  );

  const data = filteredProducts.map((product, index) => ({
    key: index + 1,
    title: product.title,
    category: product.category,
    stock: product.quantity,
    price: <p>R{product.price}</p>,
    action: (
      <div className="flex items-center gap-3">
        <Link to="/" className="">
          <BiEdit />
        </Link>
        <Link className="" to="/">
          <AiFillDelete />
        </Link>
      </div>
    ),
  }));

  return (
    <div className="w-full overflow-y-auto p-4">
      <div>
        <div className="flex items-center justify-between text-lg">
          <h1 className="mb-4 font-bold">
            Out Of Stock Products <span className="text-sm">(less than 5)</span>
          </h1>
          <h1 className="mb-4 mr-4">
            Total: <span>{data.length}</span>
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

function EventList() {
  const columns = [
    {
      title: "Created At",
      dataIndex: "createdAt",
      sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
    },
    {
      title: "Expiry Date",
      dataIndex: "expiry",
      sorter: (a, b) => new Date(a.expiry) - new Date(b.expiry),
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Discount Price",
      dataIndex: "discountPrice",
    },
    {
      title: "Action",
      dataIndex: "action",
    },
  ];

  const dispatch = useDispatch();
  const sellerId = useSelector((state) => state.seller.seller._id);

  useEffect(() => {
    if (sellerId) {
      dispatch(getAllEvant(sellerId))
    }
  }, [dispatch, sellerId]);

  const eventState = useSelector((state) => state?.evant?.evants || []);

  const data = eventState.map((event, index) => ({
    key: index + 1,
    title: event.title,
    createdAt: new Date(event?.createdAt).toLocaleDateString("en-GB"),
    expiry: new Date(event?.expiryDate).toLocaleDateString("en-GB"),
    stock: event?.quantity,
    price: <p>R{event.price}</p>,
    discountPrice: <p>R{event.discountPrice}</p>,
    action: (
      <div className="flex items-center gap-3">
        <Link to="/" className="">
          <BiEdit />
        </Link>
        <Link className="" to="/">
          <AiFillDelete />
        </Link>
      </div>
    ),
  }));

  return (
    <div className="">
      <div>
        <div className="flex items-center justify-between text-lg">
          <h1 className="mb-4 font-bold">Events</h1>
          <h1 className="mb-4 mr-4">
            Total: <span>{data.length}</span>
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

function ReceivedOder() {
  const columns = [
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
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
  ];

  const dispatch = useDispatch();
  const sellerId = useSelector((state) => state.seller.seller._id);


  useEffect(() => {
    if (sellerId) {
      dispatch(getAllOder(sellerId));
    }
  }, [dispatch, sellerId]);

  const orders = useSelector((state) => state.seller.orders?.orders || []);

  const statuses = ["Received"];
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
      date: new Date(order.createdAt).toLocaleDateString("en-GB"),
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
    <div className="">
      <div>
        <div className="flex items-center justify-between text-lg">
          <h1 className="mb-4 font-bold">
            Received Orders <span className="text-sm">(paid)</span>
          </h1>
          <h1 className="mb-4 mr-4">
            Total: <span> {numberOfBlogs}</span>
          </h1>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-4 overflow-x-auto">
          <Table
            columns={columns}
            dataSource={data1}
            pagination={{ pageSize: 10 }}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardOverAll;
