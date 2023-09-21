import { supabase } from "../supabase/supabase";

export async function SignOut() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}
