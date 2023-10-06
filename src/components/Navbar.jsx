import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useStore } from "../store/store.js";
import Logo from "../assets/images/logo.webp";
import { UserIcon } from "../assets/icons/UserIcon";
import getUserId from "../services/getUserId.js";
import { useSignOut } from "../hooks/useSignOut.jsx";

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
  const { user, session, setUser, realtime, setRealtime } = useStore();
  const handleSignOut = useSignOut();

  useEffect(() => {
    const getUser = async () => {
      const data = await getUserId(session.user.id);
      setUser(data[0]);
    };
    getUser();
    setRealtime(false);
  }, [session, realtime]);

  const navbarOptiones = [
    { text: "Profile", href: "/profile", ariaLabel: "Profile" },
    {
      text: "Change Password",
      href: "/change-password",
      ariaLabel: "Change Password",
    },
    {
      text: "Sign Out",
      href: "",
      ariaLabel: "Sign Out",
      action: () => handleSignOut(),
    },
  ];

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
          <div className="hidden lg:flex h-full pb-2">
            {navbarLinks.map(({ href, label, ariaLabel }) => (
              <a
                className="navbar-link"
                href={href}
                aria-label={ariaLabel}
                key={label}
                onClick={() => {
                  action && action();
                }}
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
                {user?.image && (
                  <img
                    className="w-10 h-10 rounded-full cursor-pointer hover:scale-105 transition-all duration-300 ease-in-out relative"
                    src={user?.image}
                    alt={user?.name}
                    onClick={() => setIsOpen(!isOpen)}
                  />
                )}
                {isOpen && (
                  <div className="absolute top-16 right-0">
                    <div className="w-full flex flex-col text-white custom-border-gray rounded-xl bg-customDarkBg2 border-gray-700 px-4 py-2">
                      {navbarOptiones.map(
                        ({ href, text, ariaLabel, action }) => (
                          <a
                            href={!action && href}
                            aria-label={ariaLabel}
                            onClick={action && action}
                            className="cursor-pointer text-sm hover:scale-105 transition-all duration-300 ease-in-out p-2"
                          >
                            {text}
                          </a>
                        )
                      )}
                    </div>
                  </div>
                )}
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
      </div>
      {/* Mobile navbar */}
    </nav>
  );
};
