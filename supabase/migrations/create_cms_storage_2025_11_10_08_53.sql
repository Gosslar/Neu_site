-- Create storage bucket for CMS media
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'cms-media',
    'cms-media',
    true,
    10485760, -- 10MB limit
    ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'application/pdf']
) ON CONFLICT (id) DO NOTHING;

-- Create storage policies for CMS media bucket
-- Allow public read access
CREATE POLICY "Public can view CMS media" ON storage.objects
    FOR SELECT USING (bucket_id = 'cms-media');

-- Allow admins to upload, update, and delete media
CREATE POLICY "Admins can manage CMS media" ON storage.objects
    FOR ALL USING (
        bucket_id = 'cms-media' AND
        EXISTS (
            SELECT 1 FROM public.profiles_2025_11_07_14_31 
            WHERE id = auth.uid() AND is_admin = true
        )
    );

-- Allow authenticated users to upload media (will be moderated by admins)
CREATE POLICY "Authenticated users can upload CMS media" ON storage.objects
    FOR INSERT WITH CHECK (
        bucket_id = 'cms-media' AND
        auth.role() = 'authenticated'
    );