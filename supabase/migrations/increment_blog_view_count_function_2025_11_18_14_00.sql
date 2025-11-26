-- Create function to increment blog post view count
CREATE OR REPLACE FUNCTION increment_blog_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.blog_posts_2025_11_18_14_00 
    SET view_count = COALESCE(view_count, 0) + 1
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;