import React from "react";
import { motion } from "framer-motion";
import { EmailFastIcon } from "../../assets/icons/EmailFastIcon";
import { LikeIcon } from "../../assets/icons/LikeIcon";
import { formatInMiles } from "../../utils/formatInMiles";

const ProductCard = ({ product, setProductId, setViewSingleProductModal }) => {
  return (
    <div
      className="w-[300px] h-[430px] custom-border-gray-darker rounded-xl bg-customDarkBg3 flex flex-col p-6 relative hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
      onClick={() => {
        setViewSingleProductModal(true);
        setProductId(product.id);
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <img
          className="rounded-lg w-full h-56"
          src={product.image}
          alt={product.title}
        />
        <div className="flex flex-col gap-2 justify-between pt-4">
          <h1 className="text-white font-bold text-xl">{product.title}</h1>
          <p className="text-customGrayText text-xl">
            {formatInMiles(product.price)}$
          </p>
          <div className="flex gap-1 items-center">
            <p className="text-green-500 text-xl font-semibold">Envío gratis</p>
            <EmailFastIcon
              width={30}
              height={30}
              className="text-green-500 pt-1"
            />
          </div>
        </div>
        <div className="bg-blue-600 px-6 py-2 w-max rounded-lg absolute top-4 left-3">
          <p className="text-white font-bold text-xl capitalize">
            {product.state}
          </p>
        </div>
        <div className="w-full flex items-center gap-2 justify-end">
          <p className="text-white text-xl pt-1">{product.likes}</p>
          <LikeIcon width={30} height={30} className="text-blue-500" />
        </div>
      </motion.div>
    </div>
  );
};

export default ProductCard;
