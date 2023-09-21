import { supabase } from "../supabase/supabase";

export async function SignIn(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
