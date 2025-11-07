-- Create test orders for demonstration
DO $$
DECLARE
    test_user_id UUID;
    test_order_id UUID;
    product_id UUID;
BEGIN
    -- Get or create a test user (admin user)
    SELECT id INTO test_user_id 
    FROM public.profiles_2025_11_07_14_31 
    WHERE is_admin = true 
    LIMIT 1;
    
    -- If no admin user found, get any user
    IF test_user_id IS NULL THEN
        SELECT id INTO test_user_id 
        FROM public.profiles_2025_11_07_14_31 
        LIMIT 1;
    END IF;
    
    -- If still no user, create a dummy one
    IF test_user_id IS NULL THEN
        test_user_id := gen_random_uuid();
        INSERT INTO public.profiles_2025_11_07_14_31 (id, email, full_name, is_admin)
        VALUES (test_user_id, 'test@jagd-weetzen.de', 'Test Kunde', false);
    END IF;
    
    -- Get a product for the order
    SELECT id INTO product_id 
    FROM public.products_2025_11_07_14_31 
    LIMIT 1;
    
    -- Create test order 1 (Card payment)
    test_order_id := gen_random_uuid();
    INSERT INTO public.orders_2025_11_07_14_31 (
        id, user_id, total_amount, status, payment_method, payment_status, 
        customer_info, created_at
    ) VALUES (
        test_order_id,
        test_user_id,
        45.50,
        'confirmed',
        'card',
        'completed',
        '{"fullName": "Max Mustermann", "email": "max@example.com", "phone": "0123456789", "address": "Musterstraße 1, 12345 Musterstadt"}',
        NOW() - INTERVAL '2 days'
    );
    
    -- Create order item for test order 1
    IF product_id IS NOT NULL THEN
        INSERT INTO public.order_items_2025_11_07_14_31 (
            order_id, product_id, quantity, price
        ) VALUES (
            test_order_id, product_id, 2, 22.75
        );
    END IF;
    
    -- Create test order 2 (Cash payment)
    test_order_id := gen_random_uuid();
    INSERT INTO public.orders_2025_11_07_14_31 (
        id, user_id, total_amount, status, payment_method, payment_status,
        customer_info, created_at
    ) VALUES (
        test_order_id,
        test_user_id,
        32.00,
        'pending',
        'cash',
        'pending',
        '{"fullName": "Anna Schmidt", "email": "anna@example.com", "phone": "0987654321", "address": "Testweg 5, 54321 Testdorf"}',
        NOW() - INTERVAL '1 day'
    );
    
    -- Create order item for test order 2
    IF product_id IS NOT NULL THEN
        INSERT INTO public.order_items_2025_11_07_14_31 (
            order_id, product_id, quantity, price
        ) VALUES (
            test_order_id, product_id, 1, 32.00
        );
    END IF;
    
    -- Create test order 3 (Recent cash payment)
    test_order_id := gen_random_uuid();
    INSERT INTO public.orders_2025_11_07_14_31 (
        id, user_id, total_amount, status, payment_method, payment_status,
        customer_info, created_at
    ) VALUES (
        test_order_id,
        test_user_id,
        28.50,
        'pending',
        'cash',
        'pending',
        '{"fullName": "Peter Jäger", "email": "peter@jagd-weetzen.de", "phone": "0555123456", "address": "Waldstraße 10, 31535 Neustadt"}',
        NOW() - INTERVAL '3 hours'
    );
    
    -- Create order item for test order 3
    IF product_id IS NOT NULL THEN
        INSERT INTO public.order_items_2025_11_07_14_31 (
            order_id, product_id, quantity, price
        ) VALUES (
            test_order_id, product_id, 1, 28.50
        );
    END IF;
    
    RAISE NOTICE 'Test orders created successfully';
END $$;

-- Show created orders
SELECT 
    o.id,
    o.total_amount,
    o.status,
    o.payment_method,
    o.payment_status,
    o.customer_info->>'fullName' as customer_name,
    o.created_at
FROM public.orders_2025_11_07_14_31 o
ORDER BY o.created_at DESC;