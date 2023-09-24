import { supabase } from "../supabase/supabase";

const deleteImage = async (fileName) => {
  const { error } = await supabase.storage.from("gamestoreac").remove(fileName);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
};

export default deleteImage;
