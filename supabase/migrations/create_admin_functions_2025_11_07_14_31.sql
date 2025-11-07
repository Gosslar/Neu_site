-- Create admin user function
CREATE OR REPLACE FUNCTION create_admin_user(user_email TEXT)
RETURNS VOID AS $$
BEGIN
  -- Update existing profile to admin if user exists
  UPDATE public.profiles_2025_11_07_14_31 
  SET is_admin = true 
  WHERE email = user_email;
  
  -- If no rows were updated, the user doesn't exist yet
  IF NOT FOUND THEN
    RAISE NOTICE 'User with email % not found. Please register first, then run this function again.', user_email;
  ELSE
    RAISE NOTICE 'User % has been granted admin privileges.', user_email;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Grant admin privileges to the first registered user
-- Replace 'your-email@example.com' with your actual email address
-- SELECT create_admin_user('your-email@example.com');

-- Create a trigger to automatically create profile when user signs up
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles_2025_11_07_14_31 (id, email, full_name, is_admin)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    false
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user registration
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();