import { supabase } from "../supabase/supabase";

const getProductId = async (productId) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", productId);

  if (error) {
    console.error(error);
  }

  return data;
};

export default getProductId;
