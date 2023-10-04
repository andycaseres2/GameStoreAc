import { supabase } from "../supabase/supabase";

async function updateUserPassword(userId, newPassword) {
  const { error: updateError } = await supabase
    .from("users")
    .update({ password: newPassword })
    .eq("id", userId);

  if (updateError) {
    console.error(updateError);
    throw new Error(updateError.message);
  }

  const { error: authUpdateError } = await supabase.auth.update({
    password: newPassword,
  });

  if (authUpdateError) {
    console.error(authUpdateError);
    throw new Error(authUpdateError.message);
  }
}

export default updateUserPassword;
