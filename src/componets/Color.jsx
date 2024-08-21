import React from "react";

function Color(props) {
  const { colorData, setColor, selectedColor } = props;

  return (
    <div>
      <div>
        <ul className="flex flex-wrap gap-1 pb-4">
          {colorData &&
            colorData.map((item, index) => (
              <li
                key={index}
                onClick={() => setColor(item?._id)}
                className={`w-[20px] h-[20px] rounded-full cursor-pointer ${
                  selectedColor === item?._id ? "border-2 border-[red]" : "border border-black"
                }`}
                style={{ backgroundColor: item?.title }}
              ></li>
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Color;
