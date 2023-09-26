import React from "react";

const Button = ({ text, children, action, className }) => {
  return (
    <button
      className={`${className} text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 px-6 py-2 text-sm flex gap-2 items-center h-max`}
      onClick={action}
    >
      {children}
      {text && text}
    </button>
  );
};

export default Button;
