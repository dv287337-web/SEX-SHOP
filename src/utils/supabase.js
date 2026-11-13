import { createClient } from "@supabase/supabase-js";

// Variables de entorno para Vite (VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Verificamos si las credenciales están configuradas
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== "https://tu-proyecto.supabase.co"
);

// Cliente de Supabase (con fallback seguro en memoria si aún no se configuran las llaves)
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Categorías oficiales soportadas en la tienda
export const CATALOG_CATEGORIES = [
  { id: "para-ella", label: "Para Ella", route: "/para-ella" },
  { id: "para-el", label: "Para Él", route: "/para-el" },
  { id: "para-parejas", label: "Para Parejas", route: "/para-parejas" },
  { id: "lenceria", label: "Lencería", route: "/lenceria" },
  { id: "juguetes", label: "Juguetes", route: "/juguetes" },
  { id: "cosmetica", label: "Cosmética", route: "/cosmetica" },
  { id: "bdsm", label: "BDSM & Fetiche", route: "/bdsm" },
  { id: "ofertas", label: "Ofertas", route: "/ofertas" }
];

// Helper para subir imagen al Storage Bucket 'product-images'
export async function uploadProductImage(file) {
  if (!isSupabaseConfigured || !supabase) {
    // Si no está configurado Supabase, generamos un blob preview en memoria
    return URL.createObjectURL(file);
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
  const filePath = `products/${fileName}`;

  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return data.publicUrl;
}
