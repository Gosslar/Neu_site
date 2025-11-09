-- Create more test orders with different customer_info
INSERT INTO public.orders_2025_11_07_14_31 (
    user_id,
    total_amount,
    status,
    payment_method,
    payment_status,
    customer_info
) VALUES 
(
    (SELECT id FROM public.profiles_2025_11_07_14_31 LIMIT 1),
    45.50,
    'confirmed',
    'card',
    'completed',
    '{"fullName": "Anna Schmidt", "email": "anna.schmidt@example.com", "phone": "+49 987 654321", "address": "Hauptstraße 456, 54321 Beispielstadt"}'
),
(
    (SELECT id FROM public.profiles_2025_11_07_14_31 LIMIT 1),
    32.75,
    'pending',
    'cash',
    'pending',
    '{"fullName": "Peter Müller", "email": "peter.mueller@example.com", "phone": "+49 555 123456", "address": "Dorfstraße 789, 98765 Testdorf"}'
);

-- Add some order items for the test orders
INSERT INTO public.order_items_2025_11_07_14_31 (
    order_id,
    product_id,
    quantity,
    price
)
SELECT 
    o.id,
    p.id,
    2,
    p.price
FROM public.orders_2025_11_07_14_31 o
CROSS JOIN public.products_2025_11_07_14_31 p
WHERE o.customer_info IS NOT NULL
AND p.name LIKE '%Reh%'
LIMIT 3;