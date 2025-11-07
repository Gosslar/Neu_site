-- Check current user status
SELECT 
    u.id,
    u.email,
    u.created_at as user_created,
    p.id as profile_id,
    p.email as profile_email,
    p.full_name,
    p.is_admin,
    p.created_at as profile_created
FROM auth.users u
LEFT JOIN public.profiles_2025_11_07_14_31 p ON u.id = p.id
WHERE u.email ILIKE '%jagd-weetzen%'
ORDER BY u.created_at DESC;

-- Force admin rights for all jagd-weetzen users
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true 
WHERE email ILIKE '%jagd-weetzen%';

-- Also set admin for the most recent user (fallback)
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true 
WHERE id = (
    SELECT u.id 
    FROM auth.users u 
    ORDER BY u.created_at DESC 
    LIMIT 1
);

-- Check if profile exists for current users, create if missing
INSERT INTO public.profiles_2025_11_07_14_31 (id, email, full_name, is_admin)
SELECT 
    u.id,
    u.email,
    COALESCE(u.raw_user_meta_data->>'full_name', 'Admin User'),
    true
FROM auth.users u
WHERE u.email ILIKE '%jagd-weetzen%'
AND NOT EXISTS (
    SELECT 1 FROM public.profiles_2025_11_07_14_31 p 
    WHERE p.id = u.id
);

-- Final check - show all users and their admin status
SELECT 
    u.email,
    p.is_admin,
    CASE 
        WHEN p.is_admin THEN '✅ ADMIN ACCESS GRANTED' 
        ELSE '❌ No Admin Access' 
    END as status
FROM auth.users u
LEFT JOIN public.profiles_2025_11_07_14_31 p ON u.id = p.id
ORDER BY u.created_at DESC;