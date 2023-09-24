import React, { useState } from "react";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { EyeClosedIcon } from "../../assets/icons/EyeClosedIcon";

const InputUpdate = ({
  type,
  placeholder,
  value,
  setState,
  className,
  label,
  name,
  onBlur,
}) => {
  const isPhoneInput = type === "phone" || name === "price";

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleKeyPress = (event) => {
    if (isPhoneInput && !/[0-9\b]/.test(event.key)) {
      event.preventDefault();
    }
  };
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <label className="text-white ml-1">{label}</label>
      <div className="relative">
        <input
          className="w-full text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex gap-2 items-center focus:outline-none"
          type={type === "password" && showPassword ? "text" : type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={(event) => setState(event)}
          inputMode={isPhoneInput ? "numeric" : null}
          onKeyPress={onBlur ? "" : handleKeyPress}
          onBlur={onBlur}
          autoComplete="off"
          spellCheck="false"
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-customGray text-opacity-50 hover:text-opacity-75 focus:outline-none"
            onClick={toggleShowPassword}
          >
            {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
          </button>
        )}
      </div>
    </div>
  );
};

export default InputUpdate;
