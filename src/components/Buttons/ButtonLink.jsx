import React from "react";
import { UserIcon } from "../../assets/icons/UserIcon";

const ButtonLink = ({ text, redirect, image, alt }) => {
  return (
    <a
      className="text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 py-1 text-sm flex gap-2 items-center"
      href={redirect}
    >
      {image ? (
        <img className="w-8 h-8 rounded-full" src={image} alt={alt} />
      ) : (
        <UserIcon />
      )}

      {text}
    </a>
  );
};

export default ButtonLink;
