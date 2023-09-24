import React from "react";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import deleteImage from "../../services/deleteImage";
import { useStore } from "../../store/store";
import updateUser from "../../services/updateUser";
import updateProduct from "../../services/updateProduct";

const InputFile = ({
  label,
  className,
  designButton,
  onChange,
  setImagePreviewUrl,
  imagePreviewUrl,
  styleImage,
  formData,
  isUpdateUser,
  productId,
}) => {
  const { setRealtime, user } = useStore();
  const handleOnChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      onChange(file);
    };
    reader.readAsDataURL(file);
  };

  const saveUserData = async (id) => {
    try {
      const userData = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        image: "",
      };

      await updateUser(id, userData);
      setRealtime(true);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  const saveProductData = async () => {
    try {
      const productData = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        state: formData.state,
        image: "",
        likes: formData.likes,
      };
      await updateProduct(productId, productData);
      setRealtime(true);
    } catch (error) {
      console.error("Error al crear el producto", error);
    }
  };

  const handleDeleteImage = async (url, id) => {
    const filename = await url.split("/").slice(-2).join("/");
    await deleteImage(filename);
    if (isUpdateUser) {
      await saveUserData(id);
    } else {
      await saveProductData(id, formData);
    }
    await setImagePreviewUrl(null);
    setRealtime(true);
  };

  return (
    <div className={`${className} flex items-center justify-start gap-32 pt-2`}>
      <label
        className={`${designButton} w-full text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex gap-2 items-center focus:outline-none cursor-pointer h-max`}
      >
        {label}
        <input type="file" className="hidden" onChange={handleOnChange} />
      </label>
      {imagePreviewUrl && (
        <div className="relative">
          <img
            className={`${styleImage}`}
            src={imagePreviewUrl}
            alt="Imagen previa"
          />
          <div
            onClick={() => handleDeleteImage(imagePreviewUrl, user.id)}
            className="w-8 h-8 bg-red-400 rounded-full absolute -top-3 -right-4 flex justify-center items-center cursor-pointer hover:scale-105 transition-all"
          >
            <CloseIcon className="w-5 h-5 fill-white  " />
          </div>
        </div>
      )}
    </div>
  );
};

export default InputFile;
