import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CloseIcon } from "../../assets/icons/CloseIcon";
import InputFile from "../Inputs/InputFile";
import InputUpdate from "../Inputs/InputUpdate";
import TextArea from "../Inputs/TextArea";
import Button from "../Buttons/Button";
import { uploadImageToStorageProduct } from "../../services/uploadImageToStorageProduct";
import getProductId from "../../services/getProductId";
import updateProduct from "../../services/updateProduct";
import { useStore } from "../../store/store";

export const UpdateProductModal = ({ setIsOpen, productId }) => {
  const [stateError, setStateError] = useState("");
  const [imageError, setImageError] = useState("");
  const [updateProductSuccess, setUpdateProductSuccess] = useState("");
  const [updateProductError, setUpdateProductError] = useState("");
  const [singleProduct, setSingleProduct] = useState({});
  const { setRealtime } = useStore();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    state: "",
    likes: 0,
    image: "",
  });

  useEffect(() => {
    const getProduct = async () => {
      const data = await getProductId(productId);
      setSingleProduct(data[0]);
    };
    getProduct();
  }, [productId]);

  useEffect(() => {
    async function updateProductInitial() {
      const currentFormaData = {
        title: singleProduct.title,
        description: singleProduct.description,
        price: singleProduct.price,
        state: singleProduct.state,
        likes: singleProduct.likes,
        image: singleProduct.image,
      };
      setFormData((prevState) => ({ ...prevState, ...currentFormaData }));
      setImagePreviewUrl(singleProduct.image);
    }

    updateProductInitial();
  }, [singleProduct]);

  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleImageChange = async (file) => {
    const imageUrl = await uploadImageToStorageProduct(file);
    await setFormData({
      ...formData,
      image: imageUrl,
    });
  };

  const handleBlurState = (event) => {
    if (!/^[nN][eE][wW]$|^[uU][sS][eE][dD]$/.test(event.target.value)) {
      setStateError('Please enter "new" or "used."');
      event.target.focus();
    }
  };

  const saveProductData = async (event) => {
    event.preventDefault();
    try {
      await updateProduct(productId, formData);
      setUpdateProductSuccess("Producto creado exitosamente");
      setImageError("");
      setRealtime(true);
    } catch (error) {
      setUpdateProductError("Error al crear el producto", error);
    }
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
            className="w-full h-screen sm:h-auto sm:w-3/4 md:w-3/5 lg:w-[1000px] xl:w-[1100px] sm:rounded-2xl bg-customDarkBgTransparentLighter custom-border-gray-darker py-12 px-8 sm:px-16 backdrop-blur-xl sm:mb-8 fixed mx-auto z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center relative">
              <div className="w-full flex flex-col items-center justify-center">
                <h2 className="text-5xl font-bold tracking-normal text-customSecondary">
                  Update product
                </h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="w-full flex justify-center"
                >
                  <div className="w-8/12 fle py-10">
                    <form
                      onSubmit={saveProductData}
                      className="w-full flex flex-col gap-4 justify-center items-center"
                    >
                      <div className="w-9/12 flex flex-col justify-start gap-2">
                        <InputUpdate
                          label="Title"
                          name="title"
                          type="text"
                          placeholder="Title"
                          value={formData.title}
                          className={"w-full"}
                          setState={handleInputChange}
                        />
                      </div>

                      <div className="w-9/12 flex flex-col justify-start gap-2">
                        <TextArea
                          label="Description"
                          type="text"
                          name="description"
                          placeholder="Description"
                          value={formData.description}
                          setState={handleInputChange}
                          className={"w-full"}
                        />
                      </div>
                      <div className="w-9/12 flex flex-col justify-start gap-2">
                        <InputUpdate
                          label="Price"
                          type="text"
                          name="price"
                          placeholder="Price"
                          value={formData.price}
                          setState={handleInputChange}
                          className={"w-full"}
                        />
                      </div>

                      <div className="w-9/12 flex flex-col justify-start gap-2">
                        <InputUpdate
                          label="State"
                          type="text"
                          name="state"
                          placeholder="State: New or Used"
                          value={formData.state}
                          setState={handleInputChange}
                          className={"w-full"}
                          onBlur={handleBlurState}
                        />

                        {stateError && (
                          <p className="text-red-500 text-md">{stateError}</p>
                        )}
                      </div>

                      <div className="w-9/12 flex flex-col justify-start gap-2">
                        <InputFile
                          label="Add Image"
                          className={"w-full"}
                          designButton="w-max font-bold text-md"
                          onChange={handleImageChange}
                          setImagePreviewUrl={setImagePreviewUrl}
                          imagePreviewUrl={imagePreviewUrl}
                          styleImage={"rounded-lg w-32 h-32 "}
                          formData={formData}
                          isUpdateUser={false}
                          productId={productId}
                        />
                        {imageError && (
                          <p className="text-red-500 text-md">{imageError}</p>
                        )}
                      </div>

                      {updateProductSuccess && (
                        <p className="text-green-500 text-md">
                          {updateProductSuccess}
                        </p>
                      )}

                      {updateProductError && (
                        <p className="text-red-500 text-md">
                          {updateProductError}
                        </p>
                      )}

                      <div className="w-full flex justify-center gap-8 pt-8">
                        <Button
                          text="Save"
                          className="w-1/3 text-lg font-bold flex justify-center items-center"
                          action={(e) => saveProductData(e)}
                        />
                        <Button
                          text="Cancel"
                          className="w-1/3 text-lg font-bold flex justify-center items-center"
                          action={() => {
                            setIsOpen(false);
                          }}
                        />
                      </div>
                    </form>
                  </div>
                </motion.div>
              </div>

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
