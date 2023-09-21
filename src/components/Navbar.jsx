import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/store.js";
import Logo from "../assets/images/logo.webp";
import { UserIcon } from "../assets/icons/UserIcon";
import { SignOutIcon } from "../assets/icons/SignOutIcon";
import { SignOut } from "../services/SignOut.js";
import getUserId from "../services/getUserId.js";
import Button from "./Buttons/Button.jsx";
import ButtonLink from "./Buttons/ButtonLink.jsx";

const navbarLinks = [
  { label: "Home", href: "/", ariaLabel: "Home" },
  { label: "News", href: "#News", ariaLabel: "News" },
];

export const Navbar = ({
  textButton,
  buttonRedirect,
  textButton2,
  buttonRedirect2,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, session, setUser, setSession } = useStore();

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserId(user.id);
      setUser(data[0]);
    };
    getUser();
  }, [session]);

  async function handleSignOut() {
    try {
      await SignOut();
      await setUser(null);
      await setSession(null);
      window.location.href = "/";
    } catch (error) {
      throw new Error(error.message);
    }
  }

  return (
    <nav className="w-full h-20 flex flex-col justify-center items-center fixed bg-customDarkBg1 lg:bg-customDarkBgTransparent z-40 lg:backdrop-blur-xl">
      <div className="2xl:w-[1280px] xl:w-10/12 w-11/12 flex justify-between items-center relative">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <a className="navbar-link" href="/" aria-label="Home">
            <div className="flex justify-start items-center grow basis-0 gap-4">
              <div className="text-white text-6xl">
                <img className="w-8" src={Logo} alt="GameStoreAc Logo" />
              </div>
              <div className="text-white font-['Inter'] font-bold text-xl">
                GameStoreAc
              </div>
            </div>
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="hidden lg:flex h-full pl-12 pb-2">
            {navbarLinks.map(({ href, label, ariaLabel }) => (
              <a
                className="navbar-link"
                href={href}
                aria-label={ariaLabel}
                key={label}
              >
                {label}
              </a>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          exit={{ opacity: 0 }}
        >
          <div className="grow basis-0 justify-end hidden lg:flex">
            {session && session.access_token ? (
              <div className="w-full flex gap-4">
                <ButtonLink
                  text={"Profile"}
                  redirect="/profile"
                  image={user?.image}
                  alt={user?.name}
                />
                <Button text={"Sign out"} action={handleSignOut}>
                  <SignOutIcon />
                </Button>
              </div>
            ) : (
              <div className="w-full flex gap-4">
                <a
                  className="text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex gap-2 items-center"
                  href={buttonRedirect}
                >
                  <UserIcon />
                  {textButton}
                </a>
                {textButton2 && buttonRedirect2 && (
                  <a
                    className="text-white custom-border-gray rounded-xl
           bg-customDarkBg2 hover:bg-customDarkBg3  border-gray-700 pl-6 pr-8 pt-2 pb-2 text-sm flex gap-2 items-center"
                    href={buttonRedirect2}
                  >
                    <UserIcon />
                    {textButton2}
                  </a>
                )}
              </div>
            )}
          </div>
        </motion.div>
        <div
          className="lg:hidden flex flex-col  px-2 py-3 border-solid border border-gray-600 rounded-md cursor-pointer hover:bg-customDarkBg2"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="w-5 h-0.5 bg-gray-500  mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-500  mb-1"></div>
          <div className="w-5 h-0.5 bg-gray-500 "></div>
        </div>
      </div>
      {/* Mobile navbar */}
    </nav>
  );
};
