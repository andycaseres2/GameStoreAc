import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jdqutuyidetohruhllra.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpkcXV0dXlpZGV0b2hydWhsbHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMDUyMjksImV4cCI6MjAxMDU4MTIyOX0.nJyDQSHuvz3YW7x6RINf6lJbZnQYUIiKsV-lN_x22A4";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  localStorage: typeof window !== "undefined" ? window.localStorage : null,
});
