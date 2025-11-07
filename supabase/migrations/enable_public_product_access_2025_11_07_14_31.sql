-- Allow public read access to products (for guest users)
DROP POLICY IF EXISTS "Public can view products" ON public.products_2025_11_07_14_31;
CREATE POLICY "Public can view products" ON public.products_2025_11_07_14_31
    FOR SELECT USING (true);

-- Allow public read access to categories (for guest users)
DROP POLICY IF EXISTS "Public can view categories" ON public.categories_2025_11_07_14_31;
CREATE POLICY "Public can view categories" ON public.categories_2025_11_07_14_31
    FOR SELECT USING (true);

-- Grant public access to products and categories tables
GRANT SELECT ON public.products_2025_11_07_14_31 TO anon;
GRANT SELECT ON public.categories_2025_11_07_14_31 TO anon;

-- Test public access
SELECT 'Public product access test:' as info, COUNT(*) as product_count 
FROM public.products_2025_11_07_14_31;

SELECT 'Public category access test:' as info, COUNT(*) as category_count 
FROM public.categories_2025_11_07_14_31;