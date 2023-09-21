import React from "react";

const Input = ({
  type,
  placeholder,
  value,
  setState,
  className,
  label,
  name,
}) => {
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <label className="text-white ml-1">{label}</label>
      <input
        className="w-full text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex gap-2 items-center focus:outline-none"
        type={type ?? "text"}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(event) => setState(event.target.value)}
      />
    </div>
  );
};

export default Input;
