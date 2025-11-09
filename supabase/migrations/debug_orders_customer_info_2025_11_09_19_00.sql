-- Debug: Check existing orders and their customer_info
SELECT 
    id,
    user_id,
    customer_info,
    total_amount,
    status,
    created_at
FROM public.orders_2025_11_07_14_31
ORDER BY created_at DESC
LIMIT 10;

-- Check profiles
SELECT 
    id,
    full_name,
    email
FROM public.profiles_2025_11_07_14_31
LIMIT 10;

-- Create a test order with customer_info
INSERT INTO public.orders_2025_11_07_14_31 (
    user_id,
    total_amount,
    status,
    payment_method,
    payment_status,
    customer_info
) VALUES (
    (SELECT id FROM public.profiles_2025_11_07_14_31 LIMIT 1),
    25.99,
    'pending',
    'cash',
    'pending',
    '{"fullName": "Max Mustermann", "email": "max.mustermann@example.com", "phone": "+49 123 456789", "address": "Musterstraße 123, 12345 Musterstadt"}'
);