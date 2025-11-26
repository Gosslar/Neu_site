-- Create blog posts table
CREATE TABLE IF NOT EXISTS public.blog_posts_2025_11_18_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image VARCHAR(500),
    author_id UUID REFERENCES auth.users(id),
    author_name VARCHAR(100),
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    category VARCHAR(100),
    tags TEXT[], -- Array of tags
    meta_title VARCHAR(255),
    meta_description TEXT,
    view_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    published_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog media table for images and videos
CREATE TABLE IF NOT EXISTS public.blog_media_2025_11_18_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.blog_posts_2025_11_18_14_00(id) ON DELETE CASCADE,
    media_type VARCHAR(20) NOT NULL CHECK (media_type IN ('image', 'video')),
    media_url VARCHAR(500) NOT NULL,
    media_title VARCHAR(255),
    media_description TEXT,
    media_alt_text VARCHAR(255),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog categories table
CREATE TABLE IF NOT EXISTS public.blog_categories_2025_11_18_14_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    color VARCHAR(7) DEFAULT '#10b981', -- Hex color for category
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default blog categories
INSERT INTO public.blog_categories_2025_11_18_14_00 (name, slug, description, color) VALUES
('Jagdberichte', 'jagdberichte', 'Berichte von Jagdausflügen und Erlebnissen', '#10b981'),
('Wildtiermanagement', 'wildtiermanagement', 'Artikel über Wildtiermanagement und Hege', '#3b82f6'),
('Ausrüstung', 'ausruestung', 'Tests und Empfehlungen für Jagdausrüstung', '#f59e0b'),
('Naturschutz', 'naturschutz', 'Beiträge zu Naturschutz und Biotoppflege', '#22c55e'),
('Ausbildung', 'ausbildung', 'Jagdausbildung und Weiterbildung', '#8b5cf6'),
('Veranstaltungen', 'veranstaltungen', 'Ankündigungen und Berichte von Veranstaltungen', '#ef4444')
ON CONFLICT (slug) DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts_2025_11_18_14_00(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts_2025_11_18_14_00(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON public.blog_posts_2025_11_18_14_00(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts_2025_11_18_14_00(slug);
CREATE INDEX IF NOT EXISTS idx_blog_media_post_id ON public.blog_media_2025_11_18_14_00(post_id);

-- Enable Row Level Security
ALTER TABLE public.blog_posts_2025_11_18_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_media_2025_11_18_14_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_categories_2025_11_18_14_00 ENABLE ROW LEVEL SECURITY;

-- RLS Policies for blog_posts
CREATE POLICY "Anyone can view published blog posts" ON public.blog_posts_2025_11_18_14_00
    FOR SELECT USING (status = 'published');

CREATE POLICY "Authenticated users can manage all blog posts" ON public.blog_posts_2025_11_18_14_00
    FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for blog_media
CREATE POLICY "Anyone can view blog media" ON public.blog_media_2025_11_18_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage blog media" ON public.blog_media_2025_11_18_14_00
    FOR ALL USING (auth.role() = 'authenticated');

-- RLS Policies for blog_categories
CREATE POLICY "Anyone can view blog categories" ON public.blog_categories_2025_11_18_14_00
    FOR SELECT USING (true);

CREATE POLICY "Authenticated users can manage blog categories" ON public.blog_categories_2025_11_18_14_00
    FOR ALL USING (auth.role() = 'authenticated');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_blog_post_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for updated_at
CREATE TRIGGER update_blog_posts_updated_at
    BEFORE UPDATE ON public.blog_posts_2025_11_18_14_00
    FOR EACH ROW
    EXECUTE FUNCTION update_blog_post_updated_at();

-- Create function to generate slug from title
CREATE OR REPLACE FUNCTION generate_blog_slug(title_text TEXT)
RETURNS TEXT AS $$
BEGIN
    RETURN lower(
        regexp_replace(
            regexp_replace(
                regexp_replace(title_text, '[äöüÄÖÜß]', 
                    CASE 
                        WHEN title_text ~ '[äÄ]' THEN 'ae'
                        WHEN title_text ~ '[öÖ]' THEN 'oe'
                        WHEN title_text ~ '[üÜ]' THEN 'ue'
                        WHEN title_text ~ 'ß' THEN 'ss'
                        ELSE ''
                    END, 'g'
                ),
                '[^a-zA-Z0-9\s-]', '', 'g'
            ),
            '\s+', '-', 'g'
        )
    );
END;
$$ LANGUAGE plpgsql;