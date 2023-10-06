import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import ButtonLink from "../Buttons/ButtonLink";

export const ModalShouldLogin = ({
  setIsOpen,
  text,
  textButton,
  redirect,
  children,
}) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, zIndex: 50 }}
        animate={{ opacity: 1, zIndex: 50 }}
        transition={{ duration: 0.1 }}
        exit={{ opacity: 0 }}
      >
        <div
          className="w-full h-full  bg-customDarkBgTransparentDarker fixed top-0 left-0 flex  z-50 justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-1/2 h-screen sm:h-auto sm:rounded-2xl bg-customDarkBgTransparentLighter custom-border-gray-darker py-12 px-8 sm:px-16 backdrop-blur-xl sm:mb-8 fixed mx-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex flex-col justify-center items-center gap-6">
              {children}
              <h1 className="text-3xl text-white text-center">{text}</h1>
              <div className="w-full flex justify-center gap-8 pt-8">
                <ButtonLink
                  text={textButton}
                  redirect={redirect}
                  className={"text-xl px-8 flex justify-center w-1/3 py-2"}
                />
              </div>
            </div>
            <div className="flex justify-center relative">
              <div
                className="fixed top-6 right-6 z-50 w-5 h-5 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
