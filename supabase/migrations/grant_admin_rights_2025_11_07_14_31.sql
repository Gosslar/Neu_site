-- Grant admin privileges to info@jagd-weetzen.de
SELECT create_admin_user('info@jagd-weetzen.de');

-- Also create a fallback to manually set admin rights if the user exists
UPDATE public.profiles_2025_11_07_14_31 
SET is_admin = true 
WHERE email = 'info@jagd-weetzen.de';

-- If the user doesn't exist yet, create a placeholder that will be updated when they register
INSERT INTO public.profiles_2025_11_07_14_31 (id, email, full_name, is_admin)
SELECT 
    gen_random_uuid(),
    'info@jagd-weetzen.de',
    'Jagdrevier Weetzen Admin',
    true
WHERE NOT EXISTS (
    SELECT 1 FROM public.profiles_2025_11_07_14_31 
    WHERE email = 'info@jagd-weetzen.de'
);

-- Create a function to automatically grant admin rights when this email registers
CREATE OR REPLACE FUNCTION auto_grant_admin()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user has the admin email
  IF NEW.email = 'info@jagd-weetzen.de' THEN
    -- Update the profile to admin
    UPDATE public.profiles_2025_11_07_14_31 
    SET is_admin = true 
    WHERE id = NEW.id;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to auto-grant admin rights for the specific email
DROP TRIGGER IF EXISTS auto_admin_grant ON public.profiles_2025_11_07_14_31;
CREATE TRIGGER auto_admin_grant
  AFTER INSERT ON public.profiles_2025_11_07_14_31
  FOR EACH ROW EXECUTE FUNCTION auto_grant_admin();