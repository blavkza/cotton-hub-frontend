import { RxPerson } from "react-icons/rx";
import { CgShoppingBag } from "react-icons/cg";
import { RiRefund2Fill, RiMessage3Line, RiTruckLine } from "react-icons/ri";
import { MdOutlinePayment, MdLogout } from "react-icons/md";
import { PiAddressBookThin } from "react-icons/pi";
import { RiLockPasswordLine } from "react-icons/ri";
import { CiShop } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileSlider({ setActive, active }) {
  const sellerState = useSelector((state) => state.seller.seller);

  return (
    <div>
      <div className="flex flex-col gap-8 w-full bg-white rounded-md shadow-md p-4 pt-6 ">
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(1);
          }}
        >
          <RxPerson size={20} color={active === 1 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 1 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Profile
          </span>
        </div>
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(2);
          }}
        >
          <CgShoppingBag size={20} color={active === 2 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 2 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Oders
          </span>
        </div>
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(3);
          }}
        >
          <RiRefund2Fill size={20} color={active === 3 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 3 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Refund
          </span>
        </div>
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(4);
          }}
        >
          <RiMessage3Line size={20} color={active === 4 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 4 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Inbox
          </span>
        </div>
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(5);
          }}
        >
          <RiTruckLine size={20} color={active === 5 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 5 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Trace Oder
          </span>
        </div>
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(6);
          }}
        >
          <MdOutlinePayment size={20} color={active === 6 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 6 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Payment
          </span>
        </div>
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(7);
          }}
        >
          <PiAddressBookThin size={20} color={active === 7 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 7 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Address
          </span>
        </div>
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(9);
          }}
        >
          <RiLockPasswordLine size={20} color={active === 9 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 9 ? "text-[red]" : ""
            } hidden sm:block`}
          >
            Password
          </span>
        </div>
        {sellerState && (
          <Link
            className="flex items-center w-full cursor-pointer "
            onClick={() => {
              setActive(9);
            }}
            to={"/dashboard"} 
          >
            <CiShop size={20} color={active === 9 ? "red" : ""} />
            <span
              className={`pl-6 ${
                active === 9 ? "text-[red]" : ""
              } hidden sm:block`}
            >
              My Shop
            </span>
          </Link>
        )}
        <div
          className="flex items-center w-full cursor-pointer "
          onClick={() => {
            setActive(8);
          }}
        >
          <MdLogout size={20} color={active === 8 ? "red" : ""} />
          <span
            className={`pl-6 ${
              active === 8 ? "text-[red]" : ""
            } hidden md:block`}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default ProfileSlider;
