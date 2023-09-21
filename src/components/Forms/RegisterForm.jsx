import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../Inputs/Input";
import { SignUp } from "../../services/SignUp";
import { useStore } from "../../store/store";

export const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setSession } = useStore();

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await SignUp(email, password);

    if (!data) {
      throw new Error("Something went wrong");
    }
    await setSession(data.session);
    window.location.href = "/";
    return data;
  }
  return (
    <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3 h-full py-32 flex flex-col justify-center items-center gap-8">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl font-bold text-white">Register</h1>
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
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            value={password}
            setState={setPassword}
            className={"w-9/12"}
          />
          <div className="w-full flex justify-center items-center pt-6">
            <button
              className="w-max text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 py-3 px-14"
            >
              Register
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};
