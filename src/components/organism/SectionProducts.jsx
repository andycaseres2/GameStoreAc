import React, { useState } from "react";
import Button from "../Buttons/Button";
import { PlusIcon } from "../../assets/icons/PlusIcon";
import { ListIcon } from "../../assets/icons/ListIcon";
import ListProducts from "../Lists/ListProducts";
import { UpdateProductModal } from "../modals/UpdateProductModal";
import { ConfirmationModal } from "../modals/ConfirmationModal";
import { AddProductModal } from "../modals/AddProductModal";
import { useStore } from "../../store/store";
import { DeleteIcon } from "../../assets/icons/DeleteIcon";
import deleteProduct from "../../services/deleteProduct";

const SectionProducts = () => {
  const { products, setRealtime } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [viewProducts, setViewProducts] = useState(false);
  const [viewConfirmationModal, setViewConfirmationModal] = useState(false);
  const [viewUpdateModal, setViewUpdateModal] = useState(false);
  const [productId, setProductId] = useState("");

  const handleDeleteProduct = async (id) => {
    await deleteProduct(id);
    setRealtime(true);
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex gap-8 justify-end">
        <Button text={"Add product"} action={() => setIsOpen(true)}>
          <PlusIcon />
        </Button>
        <Button
          text={"List product"}
          action={() => setViewProducts(!viewProducts)}
        >
          <ListIcon />
        </Button>
      </div>
      <div className="w-full">
        {viewProducts && (
          <ListProducts
            products={products}
            setViewConfirmationModal={setViewConfirmationModal}
            setViewUpdateModal={setViewUpdateModal}
            setProductId={setProductId}
          />
        )}
      </div>

      {isOpen && <AddProductModal setIsOpen={setIsOpen} />}
      {viewConfirmationModal && (
        <ConfirmationModal
          setIsOpen={setViewConfirmationModal}
          text={"Are you sure you want to delete the product?"}
          productId={productId}
          handleDeleteProduct={handleDeleteProduct}
        >
          <DeleteIcon className={"text-red-500"} width={"80"} height={"80"} />
        </ConfirmationModal>
      )}
      {viewUpdateModal && (
        <UpdateProductModal
          setIsOpen={setViewUpdateModal}
          productId={productId}
        />
      )}
    </div>
  );
};

export default SectionProducts;
