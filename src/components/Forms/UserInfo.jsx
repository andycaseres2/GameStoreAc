import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useStore } from "../../store/store";
import updateUser from "../../services/updateUser";
import { uploadImageToStorage } from "../../services/addImageUser";
import ProfileUser from "../organism/ProfileUser";
import SectionProducts from "../organism/SectionProducts";

const UserInfo = () => {
  const { user, setRealtime } = useStore();

  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    image: "",
  });
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [updateUserSuccess, setUpdateUserSuccess] = useState("");
  const [updateUserError, setUpdateUserError] = useState("");

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
      password: user?.password,
      phone: user?.phone,
      image: user?.image,
    }));
    setImagePreviewUrl(user?.image);
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
    try {
      const userData = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        image: formData.image,
      };
      await updateUser(user.id, userData);
      setRealtime(true);
      setUpdateUserSuccess("User Updated successfully");
    } catch (error) {
      setUpdateUserError("Error updating user", error);
    }
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
        <div className="flex flex-wrap items-center 2xl:w-[1450px] xl:w-[1300px] w-11/12 mx-auto md:pl-4 xl:pr-16 xl:pl-16 py-14">
          <div className="w-full flex mb-12 lg:mb-0">
            <ProfileUser
              formData={formData}
              setFormData={setFormData}
              imagePreviewUrl={imagePreviewUrl}
              updateUserError={updateUserError}
              updateUserSuccess={updateUserSuccess}
              handleImageChange={handleImageChange}
              handleInputChange={handleInputChange}
              saveUserData={saveUserData}
              setImagePreviewUrl={setImagePreviewUrl}
            />

            <SectionProducts />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default UserInfo;
