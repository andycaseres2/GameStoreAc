import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../Inputs/Input";
import resetPassword from "../../services/resetPassword";
import { ModalShouldLogin } from "../modals/ModalShouldLogin";
import { UserIcon } from "../../assets/icons/UserIcon";

export const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [messageSend, setMessageSend] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (email === "") {
      return;
    }
    const { found } = await resetPassword(email);
    if (!found) {
      setEmailNotFound(true);
      setTimeout(() => {
        setEmailNotFound(false);
      }, 3000);
      return;
    }
    setEmail("");
    setMessageSend(true);
  }

  return (
    <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3 h-full py-32 flex flex-col justify-center items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-white mb-16">Reset Password</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-8 px-44 justify-center items-center"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            value={email}
            setState={setEmail}
            className={"w-9/12"}
          />

          {emailNotFound && (
            <span className="text-red-500"> Email not found</span>
          )}

          <div className="w-full flex flex-col gap-10 justify-center items-center pt-6">
            <button
              className="w-max text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 py-3 px-14"
              disabled={email === ""}
            >
              Reset password
            </button>
          </div>
        </form>

        {messageSend && (
          <ModalShouldLogin
            textButton={"Ok"}
            redirect="/signin"
            text={"check your email a password recovery message has been sent"}
            setIsOpen={setMessageSend}
          >
            <UserIcon width={60} height={60} className="text-blue-500" />
          </ModalShouldLogin>
        )}
      </motion.div>
    </div>
  );
};
