import { supabase } from "../supabase/supabase";

async function resetPassword(email) {
  // Validar si el correo electrónico existe en la tabla de usuarios
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  if (data.length === 0) {
    // Si no se encuentra ningún usuario con el correo electrónico especificado, retornar un valor indicándolo
    return { found: false };
  }

  // Si se encuentra al menos un usuario con el correo electrónico especificado, continuar el proceso.
  const { error: resetError } = await supabase.auth.resetPasswordForEmail(
    email,
    {
      redirectTo: "http://localhost:3000/recover-password",
    }
  );

  if (resetError) {
    console.error(resetError);
    throw new Error(resetError.message);
  }

  // Si todo fue exitoso, retornar un valor indicando que se encontró el correo electrónico
  return { found: true };
}

export default resetPassword;
