import { supabase } from "../supabase/supabase";

async function checkCurrentPassword(email, password) {
  const { data: users, error: selectError } = await supabase
    .from("users")
    .select()
    .eq("email", email);

  if (selectError) {
    console.error(selectError);
    throw new Error("Error while trying to check user password");
  }

  // Verificar si se encontró el usuario y si la contraseña es correcta
  const currentUser = users[0];

  if (currentUser && password === currentUser.password) {
    return true;
  } else {
    return false;
  }
}

export default checkCurrentPassword;
