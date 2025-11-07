-- Check current RLS policies for products table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products_2025_11_07_14_31';

-- Grant necessary permissions for authenticated users to insert products
GRANT INSERT, UPDATE, DELETE ON public.products_2025_11_07_14_31 TO authenticated;

-- Create admin policy for product management (INSERT, UPDATE, DELETE)
DROP POLICY IF EXISTS "Admins can manage products" ON public.products_2025_11_07_14_31;
CREATE POLICY "Admins can manage products" ON public.products_2025_11_07_14_31
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Ensure categories can be read by authenticated users for the dropdown
GRANT SELECT ON public.categories_2025_11_07_14_31 TO authenticated;
DROP POLICY IF EXISTS "Authenticated users can view categories" ON public.categories_2025_11_07_14_31;
CREATE POLICY "Authenticated users can view categories" ON public.categories_2025_11_07_14_31
    FOR SELECT USING (auth.role() = 'authenticated');

-- Test current user's admin status
SELECT 'Current user info:' as info, 
       auth.uid() as user_id,
       auth.email() as email;

-- Check if user has admin profile
SELECT 'Admin profile check:' as info,
       id,
       email,
       is_admin,
       full_name
FROM public.profiles_2025_11_07_14_31 
WHERE id = auth.uid();

-- Test product insertion permissions
SELECT 'Product table permissions:' as info,
       has_table_privilege('public.products_2025_11_07_14_31', 'INSERT') as can_insert,
       has_table_privilege('public.products_2025_11_07_14_31', 'UPDATE') as can_update,
       has_table_privilege('public.products_2025_11_07_14_31', 'DELETE') as can_delete;