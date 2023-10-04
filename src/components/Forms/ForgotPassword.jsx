import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../Inputs/Input";
import { useStore } from "../../store/store";
import { SignIn } from "../../services/SignIn";
import Button from "../Buttons/Button";
import checkCurrentPassword from "../../services/checkCurrentPassword";
import { CheckIcon } from "../../assets/icons/CheckIcon";

const ForgotPassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [verifyCurrentPassword, setVerifyCurrentPassword] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useStore();

  async function handleSubmit(e) {
    e.preventDefault();
  }

  async function verifyPassword() {
    const verify = await checkCurrentPassword(user.email, currentPassword);
    console.log(verify);
    setVerifyCurrentPassword(verify);
  }

  return (
    <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3 h-full py-32 flex flex-col justify-center items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-white py-8">Update password</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-8 px-44 justify-center items-center"
        >
          <div className="w-full flex justify-center items-end gap-4">
            <Input
              label="Current password"
              type="password"
              placeholder="Current password"
              value={currentPassword}
              setState={setCurrentPassword}
              className={verifyCurrentPassword ? "w-[68%]" : "w-[62%]"}
            />
            {verifyCurrentPassword ? (
              <CheckIcon width={35} height={35} />
            ) : (
              <Button text={"Verify"} action={verifyPassword} />
            )}
          </div>

          <Input
            label="New password"
            type="password"
            placeholder="New password"
            value={newPassword}
            setState={setNewPassword}
            className={"w-9/12"}
          />

          <Input
            label="Confirm new password"
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            setState={setConfirmPassword}
            className={"w-9/12"}
          />
          <div className="w-full flex justify-center items-center pt-6">
            <button
              className="w-max text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 py-3 px-14"
            >
              Update Password
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
