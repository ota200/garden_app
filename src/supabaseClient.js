import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://ftovdxktpagjxhjfqtmp.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0b3ZkeGt0cGFnanhoamZxdG1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc5NzE2MDksImV4cCI6MjA3MzU0NzYwOX0.FavQpKe6uQJ2oibS-UrngLN8pDAjnOiyKHAXHHs34m4";

export const supabase = createClient(supabaseUrl, supabaseKey);