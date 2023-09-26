import React from "react";
import { motion } from "framer-motion";

const ProductCard = () => {
  return (
    <section className="w-full flex justify-center pt-10 mb-16 lg:mb-32 bg-customDarkBg2 relative">
      <div className="absolute -top-16" id="feedback" />
      <div className="flex flex-col w-full lg:w-[1150px] justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-5 xl:gap-10 px-6 xl:px-0 items-center">
            <div
              className="w-11/12 sm:w-4/5 md:w-[560px] lg:w-1/3 custom-border-gray-darker rounded-xl bg-customDarkBg3 flex flex-col px-6 py-4"
              key={`oki`}
            >
              <div className="custom-content-text-white">andy</div>
              <div className="flex mt-4 mb-2 xl:mt-8 xl:mb-4">
                <img src={""} alt="" width="45px" />
                <div className="flex flex-col ml-4">
                  <div className="custom-content-text-white font-medium">
                    andy
                  </div>
                  <div className="custom-content-text-gray">andy</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductCard;
