import React, { useState } from "react";

const InputFile = ({
  label,
  className,
  designButton,
  onChange,
  setImagePreviewUrl,
  imagePreviewUrl,
}) => {
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      onChange(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={`${className} flex items-center justify-around`}>
      <label
        className={`${designButton} w-full text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex gap-2 items-center focus:outline-none cursor-pointer h-max`}
      >
        {label}
        <input type="file" className="hidden" onChange={handleOnChange} />
      </label>
      {imagePreviewUrl && (
        <img
          className="w-24 h-24 rounded-full"
          src={imagePreviewUrl}
          alt="Imagen previa"
        />
      )}
    </div>
  );
};

export default InputFile;
