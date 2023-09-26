import React from "react";
import { motion } from "framer-motion";
import { EditIcon } from "../../assets/icons/EditIcon";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import { SadIcon } from "../../assets/icons/SadIcon";
import defaultImage from "../../assets/images/defaultImage.webp";

const ListProducts = ({
  products,
  setViewConfirmationModal,
  setViewUpdateModal,
  setProductId,
}) => {
  return (
    <div className="w-full flex py-8">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full flex flex-col gap-4"
      >
        {products.length ? (
          <div className="w-full flex flex-col gap-4">
            {products.map((product) => (
              <div
                className="w-full flex justify-between items-center gap-4"
                key={product.id}
              >
                {product.image ? (
                  <img
                    className="w-16 h-16"
                    src={product.image}
                    alt={product.name}
                  />
                ) : (
                  <img className="w-16 h-16" src={defaultImage} alt="Imagen" />
                )}

                <p className="text-lg text-white">{product.title}</p>
                <div className="w-max px-4 flex gap-4">
                  <EditIcon
                    width={"26"}
                    height={"26"}
                    className={
                      "text-white cursor-pointer hover:scale-105 transition-all"
                    }
                    action={() => {
                      setProductId(product.id);
                      setViewUpdateModal(true);
                    }}
                  />
                  <DeleteIcon
                    width={"26"}
                    height={"26"}
                    className={
                      "text-red-500 cursor-pointer hover:scale-105 transition-all"
                    }
                    action={() => {
                      setProductId(product.id);
                      setViewConfirmationModal(true);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center pt-10 gap-6">
            <SadIcon width={"80"} height={"80"} className={"text-white"} />
            <h1 className="text-2xl text-white">No products</h1>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ListProducts;
