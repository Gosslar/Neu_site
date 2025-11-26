-- Create CMS media table for metadata
CREATE TABLE IF NOT EXISTS public.cms_media_2025_11_18_14_30 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    alt_text VARCHAR(255),
    caption TEXT,
    uploaded_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on CMS media table
ALTER TABLE public.cms_media_2025_11_18_14_30 ENABLE ROW LEVEL SECURITY;

-- RLS policies for CMS media table
CREATE POLICY "Anyone can view CMS media metadata" ON public.cms_media_2025_11_18_14_30
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage CMS media metadata" ON public.cms_media_2025_11_18_14_30
    FOR ALL USING (auth.role() = 'authenticated');

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_cms_media_created_at ON public.cms_media_2025_11_18_14_30(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_cms_media_mime_type ON public.cms_media_2025_11_18_14_30(mime_type);