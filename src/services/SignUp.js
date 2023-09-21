import { supabase } from "../supabase/supabase";

// Nueva función que agrega más información del usuario a una tabla de usuarios
async function addUserToDatabase(user, password) {
  const { data, error } = await supabase.from("users").insert({
    id: user.id,
    name: "",
    surname: "",
    email: user.email,
    password: password,
    phone: "",
    image: "",
  });
}

export async function SignUp(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email: email,
    password: password,
  });

  if (error) {
    throw new Error(error.message);
  }

  // Agregar información del usuario a la tabla de usuarios
  await addUserToDatabase(data.user, password);

  return data;
}
