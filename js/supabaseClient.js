// js/supabaseClient.js

const { createClient } = supabase;

const SUPABASE_URL = "https://xglpomjqypinmegsevob.supabase.co";
const SUPABASE_KEY = "sb_publishable_eGRJK0nQpcRGN4OMVJDirQ_0qOu2-FB";

// Cliente (el que sí tiene .from())
window.supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// (Opcional) mantener compatibilidad si en otros archivos usas supabaseClient
window.supabaseClient = window.supabase;