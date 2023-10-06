import { supabase } from "../supabase/supabase";

async function changePassword(userId, newPassword) {
  // Primero, actualizamos la clave de la tabla "users"
  const { error: userError } = await supabase
    .from("users")
    .update({ password: newPassword })
    .eq("id", userId);

  if (userError) {
    console.error(userError);
    throw new Error(userError.message);
  }

  // Luego, actualizamos la clave de autenticación de Supabase
  const { error: authError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (authError) {
    console.error(authError);
    throw new Error(authError.message);
  }
}

export default changePassword;
