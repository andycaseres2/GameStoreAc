import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import getProductId from "../../services/getProductId";
import { EmailFastIcon } from "../../assets/icons/EmailFastIcon";
import { useStore } from "../../store/store";
import addLikeProduct from "../../services/addLikeProduct";
import { LikeOffIcon } from "../../assets/icons/LikeOffIcon";

export const SingleProductModal = ({ setIsOpen, productId }) => {
  const { setRealtime, realtime } = useStore();
  const [singleProduct, setSingleProduct] = useState({});

  useEffect(() => {
    const getProduct = async () => {
      const data = await getProductId(productId);
      setSingleProduct(data[0]);
      setRealtime(true);
    };
    getProduct();
  }, [realtime, productId, singleProduct]);

  const addLikes = async (productId) => {
    const productData = {
      title: singleProduct.title,
      description: singleProduct.description,
      price: singleProduct.price,
      state: singleProduct.state,
      image: singleProduct.image,
      likes: singleProduct.likes + 1,
    };
    await addLikeProduct(productId, productData);
    setRealtime(true);
  };

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
            className="w-full h-screen sm:h-auto sm:w-3/4 md:w-3/5 lg:w-[1000px] xl:w-[1100px] sm:rounded-2xl bg-customDarkBgTransparentLighter custom-border-gray-darker pt-12  px-8 sm:px-16 backdrop-blur-xl sm:mb-8 fixed mx-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center relative">
              <div className="w-full flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold tracking-normal text-blue-500">
                  {singleProduct.title}
                </h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <div className="w-full flex gap-10 py-10">
                    <div className="w-full flex flex-col justify-between gap-4">
                      <div className="w-full flex flex-col justify-between">
                        <p className="text-3xl text-white">
                          {singleProduct.description}
                        </p>
                        <p className="text-customGrayText text-3xl mt-6">
                          {singleProduct.price}$
                        </p>
                        <div className="flex gap-1 items-center mt-6">
                          <p className="text-green-500 text-2xl font-semibold">
                            envio gratis
                          </p>
                          <EmailFastIcon
                            width={40}
                            height={40}
                            className="text-green-500 pt-1"
                          />
                        </div>
                      </div>
                      <div className="w-full flex items-center gap-2 justify-end">
                        <p className="text-white text-3xl pt-1">
                          {singleProduct.likes}
                        </p>
                        <LikeOffIcon
                          width={40}
                          height={40}
                          className="text-blue-500 cursor-pointer hover:scale-105"
                          action={() => addLikes(singleProduct.id)}
                        />
                      </div>
                    </div>
                    <img
                      className="w-1/2 rounded-xl h-[600px]"
                      src={singleProduct.image}
                      alt={singleProduct.title}
                    />
                  </div>
                </motion.div>
              </div>
              <div
                className="fixed top-6 right-6 z-50 w-5 h-5 cursor-pointer"
                onClick={() => setIsOpen(false)}
              >
                <CloseIcon />
              </div>
              <div className="bg-blue-600 px-6 py-2 w-max rounded-lg absolute top-0 -left-8">
                <p className="text-white font-bold text-2xl capitalize">
                  {singleProduct.state}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
