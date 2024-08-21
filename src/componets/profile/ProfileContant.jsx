import {  useSelector } from "react-redux";
import Profile from "./Profile";
import AllOrders from "./AllOrders.jsx";
import Refund from "./Refund.jsx";
import TrackOder from "./TrackOder.jsx";
import PaymentMethod from "./PaymentMethod.jsx";
import Address from "./Address.jsx";
import ChangePassword from "./ChangePassword.jsx";
import LogOut from "./LogOut.jsx";

function ProfileContent({ active }) {
  const user = useSelector((state) => state.auth.user);
  const userId = user?._id;

  return (
    <div className="w-full h-[100vh] px-5">
      {/* Profile */}
      {active === 1 && <Profile />}
      {/* Orders */}
      {active === 2 && <AllOrders />}
      {/* Refund */}
      {active === 3 && <Refund />}
      {/* track oder */}
      {active === 5 && <TrackOder />}
      {/* payment */}
      {active === 6 && <PaymentMethod />}
      {/* Address */}
      {active === 7 && <Address userId={userId} />}
      {/* change password */}
      {active === 9 && <ChangePassword userId={userId} />}
      {/* Address */}
      {active === 8 && <LogOut />}
    </div>
  );
}



export default ProfileContent;
