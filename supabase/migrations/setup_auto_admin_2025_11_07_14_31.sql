-- Create a function to automatically grant admin rights when the specific email registers
CREATE OR REPLACE FUNCTION auto_grant_admin_on_signup()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the new user has the admin email
  IF NEW.email = 'info@jagd-weetzen.de' THEN
    -- Update the profile to admin immediately after creation
    UPDATE public.profiles_2025_11_07_14_31 
    SET is_admin = true 
    WHERE id = NEW.id;
    
    RAISE NOTICE 'Admin rights granted to %', NEW.email;
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update the existing trigger to include admin check
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles_2025_11_07_14_31 (id, email, full_name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    CASE WHEN NEW.email = 'info@jagd-weetzen.de' THEN true ELSE false END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Also try to grant admin rights if the user already exists
DO $$
BEGIN
  UPDATE public.profiles_2025_11_07_14_31 
  SET is_admin = true 
  WHERE email = 'info@jagd-weetzen.de';
  
  IF FOUND THEN
    RAISE NOTICE 'Admin rights granted to existing user info@jagd-weetzen.de';
  ELSE
    RAISE NOTICE 'User info@jagd-weetzen.de not found. Admin rights will be granted automatically upon registration.';
  END IF;
END $$;