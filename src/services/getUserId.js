import { supabase } from "../supabase/supabase";

const getUserId = async (userId) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId);

  if (error) {
    console.error(error);
  }

  return data;
};

export default getUserId;
