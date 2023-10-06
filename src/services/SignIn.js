import { supabase } from "../supabase/supabase";

export async function SignIn(email, password) {
  const result = {
    data: null,
    error: null,
  };

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  result.data = data;
  result.error = error?.message;

  return result;
}
