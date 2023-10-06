import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "./molecules/ProductCard";
import { useStore } from "../store/store";
import { SingleProductModal } from "./modals/SingleProductModal";
import Input from "./Inputs/Input";
import { ModalShouldLogin } from "./modals/ModalShouldLogin";
import { UserIcon } from "../assets/icons/UserIcon";
import getProducts from "../services/getProducts";

export const ProductGrid = () => {
  const { products, session, realtime, setProducts, setRealtime } = useStore();
  const [viewSingleProductModal, setViewSingleProductModal] = useState(false);
  const [viewModaLogin, setViewModaLogin] = useState(false);
  const [productId, setProductId] = useState("");
  const [listProducts, setListProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getDataProducts = async () => {
      const data = await getProducts();
      setProducts(data);
    };
    getDataProducts();
    setRealtime(false);
  }, [realtime]);

  useEffect(() => {
    if (search === "") {
      setListProducts(products);
    } else {
      setListProducts(
        products.filter((product) => {
          return product.title.toLowerCase().includes(search.toLowerCase());
        })
      );
    }
  }, [search]);

  return (
    <section className="w-full bg-customDarkBg2 py-12" id="products">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="w-full flex justify-center items-center py-8">
          <Input
            className={"w-1/3"}
            name={"search"}
            placeholder={"Search for products"}
            setState={setSearch}
            value={search}
          />
        </div>
        <div className="container mx-auto px-4 w-4/5 md:w-11/12 lg:w-10/12 xl:w-4/5 2xl:w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 pt-10">
          {(listProducts.length ? listProducts : products).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              setProductId={setProductId}
              setViewSingleProductModal={setViewSingleProductModal}
              setViewModaLogin={setViewModaLogin}
            />
          ))}
        </div>
        {viewSingleProductModal && session && (
          <SingleProductModal
            setIsOpen={setViewSingleProductModal}
            productId={productId}
          />
        )}
        {viewModaLogin && !session && (
          <ModalShouldLogin
            textButton={"Sign in"}
            redirect="/signin"
            text={"You must log in to see product details"}
            setIsOpen={setViewModaLogin}
          >
            <UserIcon width={60} height={60} className="text-blue-500" />
          </ModalShouldLogin>
        )}
      </motion.div>
    </section>
  );
};
