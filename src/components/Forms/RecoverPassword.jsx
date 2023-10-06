import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Input from "../Inputs/Input";
import recoverPassword from "../../services/recoverPassword";

const RecoverPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verifyconfirmpassword, setVerifyConfirmPassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);
  const [passwordUpdatedError, setPasswordUpdatedError] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const authToken = JSON.parse(
      localStorage.getItem("sb-jdqutuyidetohruhllra-auth-token")
    );
    if (!authToken) {
      return;
    }
    setUserId(authToken?.user?.id);
  }, [localStorage]);

  async function handleChangePassword(e) {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setVerifyConfirmPassword(true);
      setPasswordUpdated(false);
      setPasswordUpdatedError(false);
      return;
    }

    if (newPassword === confirmPassword) {
      await recoverPassword(userId, newPassword);
      setPasswordUpdated(true);
      setPasswordUpdatedError(false);
    } else {
      setPasswordUpdatedError(true);
      setPasswordUpdated(false);
    }
  }

  return (
    <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3 h-full py-32 flex flex-col justify-center items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-white py-8">Recover password</h1>
        <form
          onSubmit={handleChangePassword}
          className="w-full flex flex-col gap-8 px-44 justify-center items-center"
        >
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

          {passwordUpdated && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center items-center"
            >
              <p className="text-green-500">Password updated</p>
            </motion.div>
          )}

          {passwordUpdatedError && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center items-center"
            >
              <p className="text-red-500">Password not updated</p>
            </motion.div>
          )}
          {verifyconfirmpassword && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center items-center"
            >
              <p className="text-red-500">Passwords do not match</p>
            </motion.div>
          )}

          <div className="w-full flex justify-center items-center pt-6">
            <button
              onClick={handleChangePassword}
              className="w-max text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 py-3 px-14"
            >
              Recover Password
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default RecoverPassword;
