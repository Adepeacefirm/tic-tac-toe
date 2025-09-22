import React, { useState } from "react";
import { assets } from "../assets/assets";

const Square = ({ value, onClick, preview }) => {
  const [hover, setHover] = useState(false);
  return (
    <div>
      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="w-20 h-20 flex items-center justify-center bg-slate-700 rounded-xl text-3xl font-bold cursor-pointer"
      >
        {value ? (
          <img className="w-[50%]" src={value === "X" ? assets.icon_x : assets.icon_o} alt="" />
        ) : hover ? (
          <img className="w-[50%]"
            src={
              preview === "X" ? assets.icon_x_outline : assets.icon_o_outline
            }
            alt=""
          />
        ) : (
          ""
        )}
      </button>
    </div>
  );
};

export default Square;
