import { supabase } from "../supabase/supabase";

const getProducts = async () => {
  const { data, error } = await supabase.from("products").select();

  if (error) {
    console.error(error);
  }

  return data;
};

export default getProducts;
