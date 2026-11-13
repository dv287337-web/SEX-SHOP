-- ============================================================================
-- SCRIPT DE BASE DE DATOS Y STORAGE PARA PANEL ADMINISTRADOR (SUPABASE)
-- Ejecuta este script en el SQL Editor de tu Dashboard de Supabase
-- ============================================================================

-- 1. Tabla de Productos
CREATE TABLE IF NOT EXISTS public.products (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  material TEXT DEFAULT 'Silicona médica premium',
  price NUMERIC(10, 2) NOT NULL,
  old_price NUMERIC(10, 2),
  rating NUMERIC(2, 1) DEFAULT 5.0,
  tag TEXT DEFAULT 'Nuevo',
  image TEXT NOT NULL,
  description TEXT,
  stock INTEGER DEFAULT 10,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para búsqueda veloz por categoría
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON public.products(created_at DESC);

-- Habilitar Row Level Security (RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 2. Políticas de Seguridad (Cualquiera puede ver productos, cualquiera con anon key o admin puede gestionar)
CREATE POLICY "Lectura pública de productos" 
  ON public.products 
  FOR SELECT 
  USING (is_active = true OR true);

CREATE POLICY "Inserción de productos" 
  ON public.products 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Actualización de productos" 
  ON public.products 
  FOR UPDATE 
  USING (true);

CREATE POLICY "Eliminación de productos" 
  ON public.products 
  FOR DELETE 
  USING (true);

-- 3. Crear Storage Bucket para imágenes de productos (público)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Políticas de Storage para lectura y subida pública de imágenes
CREATE POLICY "Imágenes públicas de productos"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "Subida de imágenes de productos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'product-images');
