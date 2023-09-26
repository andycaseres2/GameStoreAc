import { motion } from "framer-motion";

import ProductCard from "./molecules/ProductCard";

export const ProductGrid = () => {
  return (
    <section className="w-full bg-customDarkBg2" id="products">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ProductCard />
      </motion.div>
    </section>
  );
};
