import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../store/store";
import updateUser from "../../services/updateUser";
import InputUpdate from "../Inputs/InputUpdate";
import InputFile from "../Inputs/InputFile";
import { uploadImageToStorage } from "../../services/addImageUser";
import Button from "../Buttons/Button";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { ListIcon } from "../../assets/icons/ListIcon";
import { AddProductModal } from "../AddProductModal";

const UserInfo = () => {
  const { user } = useStore();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: user.name,
      surname: user.surname,
      email: user.email,
      password: user.password,
      phone: user.phone,
      image: user.image,
    }));
    setImagePreviewUrl(user.image);
  }, [user]);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = async (file) => {
    const imageUrl = await uploadImageToStorage(file);
    await setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  const saveUserData = async (event) => {
    event.preventDefault();
    await updateUser(user.id, formData);
  };

  return (
    <section
      className="w-full bg-customDarkBg2 mt-20 mb-8 sm:mt-16 sm:mb-16 xl:mt-0  xl:m pt-[2rem]  md:pt-[12vw] lg:pt-0"
      id="features"
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto md:pl-4 xl:pr-16 xl:pl-16">
          <div className="w-full flex mb-12 lg:mb-0">
            <div className="w-full">
              <span className="custom-block-subtitle">User Information</span>
              <h2 className="mt-6 mb-8 text-4xl lg:text-5xl custom-block-big-title">
                Profile
              </h2>
              <form
                onSubmit={saveUserData}
                className="w-full flex flex-col gap-4"
              >
                <InputUpdate
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  value={formData.name}
                  className={"w-9/12"}
                  setState={handleInputChange}
                />
                <InputUpdate
                  label="Surname"
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={formData.surname}
                  setState={handleInputChange}
                  className={"w-9/12"}
                />
                <InputUpdate
                  label="Email"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  setState={handleInputChange}
                  className={"w-9/12"}
                />
                <InputUpdate
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  setState={handleInputChange}
                  className={"w-9/12"}
                />
                <InputUpdate
                  label="Phone"
                  type="phone"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  setState={handleInputChange}
                  className={"w-9/12"}
                />

                <InputFile
                  label="Add Image"
                  className={"w-9/12"}
                  designButton="w-max font-bold text-md"
                  onChange={handleImageChange}
                  setImagePreviewUrl={setImagePreviewUrl}
                  imagePreviewUrl={imagePreviewUrl}
                />
                <div className="w-full flex justify-start">
                  <button
                    className="text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-md flex gap-2 items-center justify-center w-1/3"
                    onClick={(e) => saveUserData(e)}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
            <div className="w-full flex gap-8 justify-end">
              <Button text={"Add product"} action={() => setIsOpen(true)}>
                <PlusIcon />
              </Button>
              <Button text={"List product"}>
                <ListIcon />
              </Button>
            </div>
          </div>
        </div>
        {isOpen && <AddProductModal setIsOpen={setIsOpen} />}
      </motion.div>
    </section>
  );
};

export default UserInfo;
