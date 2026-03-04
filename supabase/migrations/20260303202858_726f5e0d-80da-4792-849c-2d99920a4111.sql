
-- Create function for updating timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Inventory products table
CREATE TABLE public.scankart_products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_slug TEXT NOT NULL,
  barcode TEXT,
  name TEXT NOT NULL,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scankart_products ENABLE ROW LEVEL SECURITY;

-- For MVP without auth, allow all access (will tighten later)
CREATE POLICY "Allow all access to scankart_products" ON public.scankart_products FOR ALL USING (true) WITH CHECK (true);

CREATE TRIGGER update_scankart_products_updated_at
  BEFORE UPDATE ON public.scankart_products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Orders table
CREATE TABLE public.scankart_orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  shop_slug TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  total NUMERIC(10,2) NOT NULL DEFAULT 0,
  payment_method TEXT NOT NULL CHECK (payment_method IN ('upi', 'cash')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.scankart_orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access to scankart_orders" ON public.scankart_orders FOR ALL USING (true) WITH CHECK (true);

-- Index for efficient queries
CREATE INDEX idx_scankart_products_shop ON public.scankart_products(shop_slug);
CREATE INDEX idx_scankart_products_barcode ON public.scankart_products(barcode);
CREATE INDEX idx_scankart_orders_shop ON public.scankart_orders(shop_slug);
CREATE INDEX idx_scankart_orders_created ON public.scankart_orders(created_at);
