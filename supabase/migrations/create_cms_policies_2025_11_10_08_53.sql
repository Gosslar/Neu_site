-- Enable RLS on CMS tables
ALTER TABLE public.cms_content_2025_11_10_08_53 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_media_2025_11_10_08_53 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_navigation_2025_11_10_08_53 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cms_settings_2025_11_10_08_53 ENABLE ROW LEVEL SECURITY;

-- CMS Content Policies
-- Allow public read access to active content
CREATE POLICY "Public can view active content" ON public.cms_content_2025_11_10_08_53
    FOR SELECT USING (is_active = true);

-- Allow admins full access to content
CREATE POLICY "Admins can manage content" ON public.cms_content_2025_11_10_08_53
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- CMS Media Policies
-- Allow public read access to active media
CREATE POLICY "Public can view active media" ON public.cms_media_2025_11_10_08_53
    FOR SELECT USING (is_active = true);

-- Allow admins full access to media
CREATE POLICY "Admins can manage media" ON public.cms_media_2025_11_10_08_53
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- CMS Navigation Policies
-- Allow public read access to active navigation
CREATE POLICY "Public can view active navigation" ON public.cms_navigation_2025_11_10_08_53
    FOR SELECT USING (is_active = true);

-- Allow admins full access to navigation
CREATE POLICY "Admins can manage navigation" ON public.cms_navigation_2025_11_10_08_53
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- CMS Settings Policies
-- Allow public read access to public settings
CREATE POLICY "Public can view public settings" ON public.cms_settings_2025_11_10_08_53
    FOR SELECT USING (is_public = true);

-- Allow admins full access to all settings
CREATE POLICY "Admins can manage all settings" ON public.cms_settings_2025_11_10_08_53
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Create update triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc'::text, NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON public.cms_content_2025_11_10_08_53
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cms_settings_updated_at BEFORE UPDATE ON public.cms_settings_2025_11_10_08_53
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();