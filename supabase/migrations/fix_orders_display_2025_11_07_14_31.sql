-- Check if there are any orders in the database
SELECT 
    o.id,
    o.user_id,
    o.total_amount,
    o.status,
    o.payment_method,
    o.payment_status,
    o.created_at,
    p.full_name,
    p.email
FROM public.orders_2025_11_07_14_31 o
LEFT JOIN public.profiles_2025_11_07_14_31 p ON o.user_id = p.id
ORDER BY o.created_at DESC
LIMIT 10;

-- Check RLS policies on orders table
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies 
WHERE tablename = 'orders_2025_11_07_14_31';

-- Check if RLS is enabled
SELECT 
    schemaname,
    tablename,
    rowsecurity
FROM pg_tables 
WHERE tablename = 'orders_2025_11_07_14_31';

-- Create or update RLS policy for admin access to orders
DROP POLICY IF EXISTS "Admin can view all orders" ON public.orders_2025_11_07_14_31;
CREATE POLICY "Admin can view all orders" ON public.orders_2025_11_07_14_31
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Create policy for users to view their own orders
DROP POLICY IF EXISTS "Users can view own orders" ON public.orders_2025_11_07_14_31;
CREATE POLICY "Users can view own orders" ON public.orders_2025_11_07_14_31
    FOR SELECT USING (auth.uid() = user_id);

-- Create policy for order insertion
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders_2025_11_07_14_31;
CREATE POLICY "Users can insert own orders" ON public.orders_2025_11_07_14_31
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Check order_items policies
DROP POLICY IF EXISTS "Admin can view all order items" ON public.order_items_2025_11_07_14_31;
CREATE POLICY "Admin can view all order items" ON public.order_items_2025_11_07_14_31
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Create policy for users to view their own order items
DROP POLICY IF EXISTS "Users can view own order items" ON public.order_items_2025_11_07_14_31;
CREATE POLICY "Users can view own order items" ON public.order_items_2025_11_07_14_31
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.orders_2025_11_07_14_31 
            WHERE id = order_id AND user_id = auth.uid()
        )
    );

-- Allow order item insertion
DROP POLICY IF EXISTS "Users can insert order items" ON public.order_items_2025_11_07_14_31;
CREATE POLICY "Users can insert order items" ON public.order_items_2025_11_07_14_31
    FOR INSERT WITH CHECK (true);

-- Show final check
SELECT 'Orders count:' as info, COUNT(*) as count FROM public.orders_2025_11_07_14_31
UNION ALL
SELECT 'Order items count:' as info, COUNT(*) as count FROM public.order_items_2025_11_07_14_31;