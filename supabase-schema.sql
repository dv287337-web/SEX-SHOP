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

-- 4. Solicitudes de pedido recibidas desde el checkout
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  customer JSONB NOT NULL,
  shipping JSONB NOT NULL,
  items JSONB NOT NULL,
  total NUMERIC(10, 2) NOT NULL,
  delivery TEXT NOT NULL,
  payment TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(status);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Recepción pública de solicitudes"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Lectura de solicitudes para administración"
  ON public.orders
  FOR SELECT
  USING (true);

CREATE POLICY "Actualización de estado de solicitudes"
  ON public.orders
  FOR UPDATE
  USING (true);
