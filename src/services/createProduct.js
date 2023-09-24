import { supabase } from "../supabase/supabase";

const createProduct = async (product) => {
  try {
    const { data, error } = await supabase
      .from("products")
      .insert(product)
      .single();

    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (error) {
    console.error(
      "Error al agregar el producto a la base de datos:",
      error.message
    );
  }
};

export default createProduct;
