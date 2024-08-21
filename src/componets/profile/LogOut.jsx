import React from "react";
import { logOutUser } from "../../features/user/userSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function LogOut() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await dispatch(logOutUser());
    navigate("/");
    setTimeout(() => {
      window.location.reload(true);
    }, 2000);
  };

  return (
    <div className="w-full px-5 ">
      <div>
        <div className="bg-white shadow-lg rounded-xl p-4 ">
          <div className="flex flex-col items-center justify-center">
            <h5 className="py-5 text-center">
              Are you sure you want to Log Out?
            </h5>
            <div className="py-5">
              <button
                type="button"
                onClick={() => {
                  handleLogout();
                }}
                className="text-sm bg-black hover:bg-[red] text-white font-bold py-1 px-3 rounded-3xl transition duration-300 ease-in-out transform"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default LogOut;
