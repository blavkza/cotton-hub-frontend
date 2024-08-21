import React from "react";
import { TailSpin } from "react-loader-spinner";
function Loader() {
  return (
    <div className="bg-[#1a191930] h-[100vh] w-full flex items-center justify-center">
      <TailSpin
        visible={true}
        height="180"
        width="180"
        color="black"
        ariaLabel="tail-spin-loading"
        radius="2"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

export default Loader;
