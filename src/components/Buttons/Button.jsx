import React from "react";

const Button = ({ text, children, action }) => {
  return (
    <button
      className="text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex gap-2 items-center h-max"
      onClick={action}
    >
      {children}
      {text}
    </button>
  );
};

export default Button;
