import { supabase } from "../supabase/supabase";

async function recoverPassword(userId, newPassword) {
  // Actualizamos la clave de la tabla "users"
  const { error: userError } = await supabase
    .from("users")
    .update({ password: newPassword })
    .eq("id", userId); // Utilizamos el userId asociado con el token

  if (userError) {
    console.error(userError);
    throw new Error(userError.message);
  }

  // Actualizamos la clave de autenticación de Supabase
  const { error: authError } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (authError) {
    console.error(authError);
    throw new Error(authError.message);
  }
}

export default recoverPassword;
