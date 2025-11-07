-- Create categories table
CREATE TABLE IF NOT EXISTS public.categories_2025_11_07_14_31 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create products table
CREATE TABLE IF NOT EXISTS public.products_2025_11_07_14_31 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category_id UUID REFERENCES public.categories_2025_11_07_14_31(id),
    image_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cart table
CREATE TABLE IF NOT EXISTS public.cart_2025_11_07_14_31 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products_2025_11_07_14_31(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS public.orders_2025_11_07_14_31 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id),
    total_amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    shipping_address TEXT,
    payment_intent_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS public.order_items_2025_11_07_14_31 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders_2025_11_07_14_31(id) ON DELETE CASCADE,
    product_id UUID REFERENCES public.products_2025_11_07_14_31(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user profiles table
CREATE TABLE IF NOT EXISTS public.profiles_2025_11_07_14_31 (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT,
    phone TEXT,
    address TEXT,
    is_admin BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.categories_2025_11_07_14_31 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products_2025_11_07_14_31 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_2025_11_07_14_31 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders_2025_11_07_14_31 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items_2025_11_07_14_31 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles_2025_11_07_14_31 ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Categories and products are readable by everyone
CREATE POLICY "Categories are viewable by everyone" ON public.categories_2025_11_07_14_31
    FOR SELECT USING (true);

CREATE POLICY "Products are viewable by everyone" ON public.products_2025_11_07_14_31
    FOR SELECT USING (true);

-- Cart policies - users can only access their own cart
CREATE POLICY "Users can view own cart" ON public.cart_2025_11_07_14_31
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items" ON public.cart_2025_11_07_14_31
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items" ON public.cart_2025_11_07_14_31
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items" ON public.cart_2025_11_07_14_31
    FOR DELETE USING (auth.uid() = user_id);

-- Order policies - users can only access their own orders
CREATE POLICY "Users can view own orders" ON public.orders_2025_11_07_14_31
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON public.orders_2025_11_07_14_31
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users can view own order items" ON public.order_items_2025_11_07_14_31
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders_2025_11_07_14_31 
            WHERE id = order_id AND user_id = auth.uid()
        )
    );

-- Profile policies
CREATE POLICY "Users can view own profile" ON public.profiles_2025_11_07_14_31
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles_2025_11_07_14_31
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles_2025_11_07_14_31
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Admin policies
CREATE POLICY "Admins can manage categories" ON public.categories_2025_11_07_14_31
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Admins can manage products" ON public.products_2025_11_07_14_31
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

CREATE POLICY "Admins can view all orders" ON public.orders_2025_11_07_14_31
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Insert sample categories
INSERT INTO public.categories_2025_11_07_14_31 (name, description, image_url) VALUES
('Jagdausrüstung', 'Professionelle Ausrüstung für die Jagd', '/images/hunting_equipment_1.jpeg'),
('Bekleidung', 'Jagdbekleidung und Outdoor-Kleidung', '/images/hunting_equipment_2.jpeg'),
('Optik', 'Ferngläser, Zielfernrohre und optische Geräte', '/images/hunting_equipment_3.webp'),
('Munition', 'Jagdmunition verschiedener Kaliber', '/images/hunting_equipment_4.jpeg'),
('Zubehör', 'Diverses Jagdzubehör und Hilfsmittel', '/images/hunting_equipment_5.jpeg');

-- Insert sample products
INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Zeiss Victory HT 10x42', 
    'Hochwertiges Jagdfernglas mit hervorragender Lichtdurchlässigkeit', 
    1299.00, 
    c.id, 
    '/images/hunting_equipment_3.webp', 
    15
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Optik';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Leupold VX-5HD 3-15x44', 
    'Präzisions-Zielfernrohr für die Jagd', 
    899.00, 
    c.id, 
    '/images/hunting_equipment_2.jpeg', 
    8
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Optik';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Jagdmesser Böker', 
    'Hochwertiges Jagdmesser aus Solingen', 
    89.00, 
    c.id, 
    '/images/hunting_equipment_5.jpeg', 
    25
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Jagdausrüstung';

-- Create trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON public.categories_2025_11_07_14_31 FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON public.products_2025_11_07_14_31 FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders_2025_11_07_14_31 FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles_2025_11_07_14_31 FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();