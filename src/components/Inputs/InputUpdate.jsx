import React from "react";

const InputUpdate = ({
  type,
  placeholder,
  value,
  setState,
  className,
  label,
  name,
}) => {
  const isPhoneInput = type === "phone";

  const handleKeyPress = (event) => {
    if (isPhoneInput && !/[0-9\b]/.test(event.key)) {
      event.preventDefault();
    }
  };
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
        onChange={(event) => setState(event)}
        inputMode={isPhoneInput ? "numeric" : null}
        onKeyPress={handleKeyPress}
      />
    </div>
  );
};

export default InputUpdate;
