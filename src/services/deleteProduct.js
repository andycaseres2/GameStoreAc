import { supabase } from "../supabase/supabase";

const deleteProduct = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    console.error(error);
  }

  return data;
};

export default deleteProduct;
