import { supabase } from "../supabase/supabase";

async function updateUser(userId, formData) {
  const { error } = await supabase
    .from("users")
    .update({
      name: formData.name,
      surname: formData.surname,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      image: formData.image,
    })
    .eq("id", userId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }
}

export default updateUser;
