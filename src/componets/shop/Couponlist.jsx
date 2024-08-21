import React, { useEffect, useState } from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteACoupon, getCoupons } from "../../features/coupon/couponSlice";
import CustomModal from "../customModel";
import AddCoupon from "./AddCoupon";

const columns = [
  {
    title: "no",
    dataIndex: "key",
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: "Expiry",
    dataIndex: "expiry",
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: "Min Amount",
    dataIndex: "minAmount",
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },
  {
    title: "Max Amount",
    dataIndex: "maxAmount",
    sorter: (a, b) => a.expiry.length - b.expiry.length,
  },

  {
    title: "Discount",
    dataIndex: "discount",
    sorter: (a, b) => a.discount.length - b.discount.length,
  },

  {
    title: "Action",
    dataIndex: "action",
  },
];

function Couponlist() {
  const [open, setOpen] = useState(false);
  const [addCoupon, setAddCoupon] = useState(false);
  const [couponId, setcouponId] = useState("");
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const sellerState = useSelector((state) => state.seller.seller);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCoupons(sellerState?._id));
  }, []);

  const couponsState = useSelector((state) => state.coupons.coupons);

  const data1 = [];
  for (let i = 0; i < couponsState.length; i++) {
    data1.unshift({
      key: i + 1,
      name: couponsState[i].name,
      expiry: new Date(couponsState[i].expiry).toLocaleDateString('en-GB'),
      minAmount: <p>R {couponsState[i].minAmount}</p>,
      maxAmount: <p>R {couponsState[i].minAmount}</p>,
      discount: <p>{couponsState[i].discount} %</p>,

      action: (
        <>
          <div className="flex items-center gap-3">
            <Link to={`/dashboard/add-coupon/${couponsState[i]._id}`} className="">
              <BiEdit />
            </Link>
            <button className="" onClick={() => showModal(couponsState[i]._id)}>
              <AiFillDelete />
            </button>
          </div>
        </>
      ),
    });
  }

  const numberOfBlogs = data1.length;

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));

    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons(sellerState?._id));
    }, 300);
  };

  return (
    <div className="w-full h-[100vh] overflow-y-auto p-4 relative pt-20">
      <div className="">
        <div className="flex items-center justify-between text-lg">
          <div className="flex flex-row gap-1">
            {" "}
            <h1 className="font-bold">Coupons</h1>
            {/*  <div>
              <button
                onClick={() => {
                  setAddCoupon(true);
                }}
                type="submit"
                className="w-full p-y px-2 border font-medium rounded-full text-sm text-white hover:bg-[rgb(225,159,27)] bg-gray-900"
              >
                {addCoupon !== true ? " + Add Coupon":""}
               
              </button>
              {addCoupon === true ? (
                <div className=" absolute h-full w-full z-30">
                  <AddCoupon setAddCoupon={setAddCoupon} />
                </div>
              ) : null}
            </div> */}
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
        <CustomModal
          hideModal={hideModal}
          open={open}
          performAction={() => {
            deleteCoupon(couponId);
          }}
          title="Are you sure you want to delete this COUPON?"
        />
      </div>
    </div>
  );
}

export default Couponlist;
