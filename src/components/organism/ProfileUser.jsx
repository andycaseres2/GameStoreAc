import React from "react";
import InputUpdate from "../Inputs/InputUpdate";
import InputFile from "../Inputs/InputFile";
import Button from "../Buttons/Button";

const ProfileUser = ({
  formData,
  setFormData,
  handleInputChange,
  handleImageChange,
  saveUserData,
  updateUserSuccess,
  updateUserError,
  setImagePreviewUrl,
  imagePreviewUrl,
}) => {
  return (
    <div className="w-full">
      <span className="custom-block-subtitle">User Information</span>
      <h2 className="mt-6 mb-8 text-4xl lg:text-5xl custom-block-big-title">
        Profile
      </h2>
      <form onSubmit={saveUserData} className="w-full flex flex-col gap-4">
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
          value={formData?.email}
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
          styleImage={"w-28 h-28 rounded-lg"}
          setFormData={setFormData}
          formData={formData}
          isUpdateUser={true}
        />
        <div className="w-full flex justify-start gap-8 pt-8">
          <Button
            text="Save"
            className="w-1/3 text-lg font-bold flex justify-center items-center"
            action={(e) => saveUserData(e)}
          />
        </div>
        {updateUserSuccess && (
          <p className="text-green-500 text-md">{updateUserSuccess}</p>
        )}

        {updateUserError && (
          <p className="text-red-500 text-md">{updateUserError}</p>
        )}
      </form>
    </div>
  );
};

export default ProfileUser;
