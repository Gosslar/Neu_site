-- Check current order structure and data
SELECT 
    o.id,
    o.user_id,
    o.customer_info,
    p.full_name,
    p.email,
    oi.product_id,
    pr.name as product_name
FROM public.orders_2025_11_07_14_31 o
LEFT JOIN public.profiles_2025_11_07_14_31 p ON o.user_id = p.id
LEFT JOIN public.order_items_2025_11_07_14_31 oi ON o.id = oi.order_id
LEFT JOIN public.products_2025_11_07_14_31 pr ON oi.product_id = pr.id
ORDER BY o.created_at DESC
LIMIT 5;

-- Allow orders without user_id (guest orders)
ALTER TABLE public.orders_2025_11_07_14_31 
ALTER COLUMN user_id DROP NOT NULL;

-- Update RLS policies to allow guest orders
DROP POLICY IF EXISTS "Users can insert own orders" ON public.orders_2025_11_07_14_31;
CREATE POLICY "Users can insert orders" ON public.orders_2025_11_07_14_31
    FOR INSERT WITH CHECK (
        auth.uid() = user_id OR user_id IS NULL
    );

-- Allow viewing guest orders for admins
DROP POLICY IF EXISTS "Admin can view all orders" ON public.orders_2025_11_07_14_31;
CREATE POLICY "Admin can view all orders" ON public.orders_2025_11_07_14_31
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        ) OR user_id IS NULL
    );

-- Create a test guest order with proper customer_info
DO $$
DECLARE
    test_order_id UUID;
    product_id UUID;
BEGIN
    -- Get a product for the order
    SELECT id INTO product_id 
    FROM public.products_2025_11_07_14_31 
    LIMIT 1;
    
    -- Create guest order
    test_order_id := gen_random_uuid();
    INSERT INTO public.orders_2025_11_07_14_31 (
        id, user_id, total_amount, status, payment_method, payment_status,
        customer_info, created_at
    ) VALUES (
        test_order_id,
        NULL, -- Guest order
        42.50,
        'pending',
        'cash',
        'pending',
        jsonb_build_object(
            'fullName', 'Hans Müller (Gast)',
            'email', 'hans.mueller@example.com',
            'phone', '0171-1234567',
            'address', 'Dorfstraße 15, 31535 Neustadt am Rübenberge'
        ),
        NOW() - INTERVAL '30 minutes'
    );
    
    -- Create order item
    IF product_id IS NOT NULL THEN
        INSERT INTO public.order_items_2025_11_07_14_31 (
            order_id, product_id, quantity, price
        ) VALUES (
            test_order_id, product_id, 2, 21.25
        );
    END IF;
    
    RAISE NOTICE 'Guest order created successfully';
END $$;

-- Show updated orders with customer info
SELECT 
    'Updated orders:' as info,
    o.id,
    o.user_id,
    CASE 
        WHEN o.user_id IS NULL THEN 'GUEST ORDER'
        ELSE 'REGISTERED USER'
    END as order_type,
    o.customer_info->>'fullName' as customer_name,
    o.customer_info->>'email' as customer_email,
    COUNT(oi.id) as item_count
FROM public.orders_2025_11_07_14_31 o
LEFT JOIN public.order_items_2025_11_07_14_31 oi ON o.id = oi.order_id
GROUP BY o.id, o.user_id, o.customer_info
ORDER BY o.created_at DESC;