import { supabase } from "../supabase/supabase";

async function updateProduct(productId, productData) {
  const { error } = await supabase
    .from("products")
    .update({
      title: productData.title,
      description: productData.description,
      price: productData.price,
      state: productData.state,
      image: productData.image,
      likes: productData.likes,
    })
    .eq("id", productId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export default updateProduct;
