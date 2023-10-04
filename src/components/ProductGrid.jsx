import { motion } from "framer-motion";

import ProductCard from "./molecules/ProductCard";
import { useStore } from "../store/store";
import { SingleProductModal } from "./modals/SingleProductModal";
import { useState } from "react";

export const ProductGrid = () => {
  const { products } = useStore();
  const [viewSingleProductModal, setViewSingleProductModal] = useState(false);
  const [productId, setProductId] = useState("");
  return (
    <section className="w-full bg-customDarkBg2 py-12" id="products">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setProductId={setProductId}
              setViewSingleProductModal={setViewSingleProductModal}
            />
          ))}
        </div>
        {viewSingleProductModal && (
          <SingleProductModal
            setIsOpen={setViewSingleProductModal}
            productId={productId}
          />
        )}
      </motion.div>
    </section>
  );
};
