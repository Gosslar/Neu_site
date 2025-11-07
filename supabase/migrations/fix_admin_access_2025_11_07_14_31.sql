-- Check current users and their admin status
SELECT 
    u.email,
    p.full_name,
    p.is_admin,
    p.created_at
FROM auth.users u
LEFT JOIN public.profiles_2025_11_07_14_31 p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Grant admin rights to all users with jagd-weetzen.de email
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true 
WHERE email LIKE '%jagd-weetzen.de%' OR email LIKE '%@jagd-weetzen%';

-- Also grant admin rights to the most recently registered user (as fallback)
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true 
WHERE id = (
    SELECT u.id 
    FROM auth.users u 
    ORDER BY u.created_at DESC 
    LIMIT 1
);

-- Show updated admin status
SELECT 
    u.email,
    p.full_name,
    p.is_admin,
    CASE WHEN p.is_admin THEN 'ADMIN ACCESS GRANTED' ELSE 'Regular User' END as access_level
FROM auth.users u
LEFT JOIN public.profiles_2025_11_07_14_31 p ON u.id = p.id
ORDER BY u.created_at DESC;