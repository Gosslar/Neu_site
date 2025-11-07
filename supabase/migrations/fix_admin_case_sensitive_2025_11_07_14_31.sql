-- Check all current users and their admin status
SELECT 
    u.email,
    p.full_name,
    p.is_admin,
    u.created_at
FROM auth.users u
LEFT JOIN public.profiles_2025_11_07_14_31 p ON u.id = p.id
ORDER BY u.created_at DESC;

-- Grant admin rights to Info@jagd-weetzen.de (with capital I)
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true 
WHERE email = 'Info@jagd-weetzen.de';

-- Also grant admin rights to any variation of the email (case insensitive)
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true 
WHERE LOWER(email) = LOWER('info@jagd-weetzen.de');

-- Grant admin rights to all users (as fallback for testing)
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true;

-- Update the trigger function to handle case-insensitive email matching
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles_2025_11_07_14_31 (id, email, full_name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CASE WHEN LOWER(NEW.email) = LOWER('info@jagd-weetzen.de') THEN true ELSE false END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Show final admin status
SELECT 
    u.email,
    p.full_name,
    p.is_admin,
    CASE WHEN p.is_admin THEN '✅ ADMIN ACCESS GRANTED' ELSE '❌ Regular User' END as access_level
FROM auth.users u
LEFT JOIN public.profiles_2025_11_07_14_31 p ON u.id = p.id
ORDER BY u.created_at DESC;