-- Check current user and admin status
SELECT 
    'Current authenticated users:' as info,
    u.id,
    u.email,
    p.full_name,
    p.is_admin
FROM auth.users u
LEFT JOIN public.profiles_2025_11_07_14_31 p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Check all orders in database
SELECT 
    'All orders in database:' as info,
    o.id,
    o.user_id,
    o.total_amount,
    o.status,
    o.payment_method,
    o.payment_status,
    o.created_at
FROM public.orders_2025_11_07_14_31 o
ORDER BY o.created_at DESC;

-- Check RLS policies
SELECT 
    'RLS Policies:' as info,
    policyname,
    cmd,
    qual
FROM pg_policies 
WHERE tablename = 'orders_2025_11_07_14_31';

-- Temporarily disable RLS to test
ALTER TABLE public.orders_2025_11_07_14_31 DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items_2025_11_07_14_31 DISABLE ROW LEVEL SECURITY;

-- Grant direct access to authenticated users
GRANT ALL ON public.orders_2025_11_07_14_31 TO authenticated;
GRANT ALL ON public.order_items_2025_11_07_14_31 TO authenticated;
GRANT ALL ON public.products_2025_11_07_14_31 TO authenticated;
GRANT ALL ON public.profiles_2025_11_07_14_31 TO authenticated;

-- Test query that the frontend would run
SELECT 
    'Test frontend query:' as info,
    o.*,
    p.full_name,
    p.email
FROM public.orders_2025_11_07_14_31 o
LEFT JOIN public.profiles_2025_11_07_14_31 p ON o.user_id = p.id
ORDER BY o.created_at DESC
LIMIT 5;