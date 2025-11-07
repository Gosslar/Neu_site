-- Check current RLS policies for products table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual 
FROM pg_policies 
WHERE tablename = 'products_2025_11_07_14_31';

-- Check if RLS is enabled
SELECT schemaname, tablename, rowsecurity, forcerowsecurity 
FROM pg_tables 
WHERE tablename = 'products_2025_11_07_14_31';

-- Grant necessary permissions for authenticated users to insert products
GRANT INSERT, UPDATE, DELETE ON public.products_2025_11_07_14_31 TO authenticated;

-- Create admin policy for product management
DROP POLICY IF EXISTS "Admins can manage products" ON public.products_2025_11_07_14_31;
CREATE POLICY "Admins can manage products" ON public.products_2025_11_07_14_31
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Ensure categories can be read by authenticated users
GRANT SELECT ON public.categories_2025_11_07_14_31 TO authenticated;

-- Test admin status for current user
SELECT 'Current user admin status:' as info, 
       COALESCE(p.is_admin, false) as is_admin,
       auth.uid() as user_id
FROM public.profiles_2025_11_07_14_31 p 
WHERE p.id = auth.uid();