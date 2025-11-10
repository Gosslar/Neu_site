-- CMS Content Management Tables
-- Create content table for managing page content
CREATE TABLE IF NOT EXISTS public.cms_content_2025_11_10_08_53 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_key VARCHAR(100) NOT NULL UNIQUE, -- e.g., 'homepage_hero', 'about_us_text'
    title VARCHAR(255),
    content TEXT,
    content_type VARCHAR(50) DEFAULT 'text', -- 'text', 'html', 'markdown'
    meta_title VARCHAR(255),
    meta_description TEXT,
    meta_keywords TEXT,
    image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_by UUID REFERENCES auth.users(id)
);

-- Create media library table
CREATE TABLE IF NOT EXISTS public.cms_media_2025_11_10_08_53 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    alt_text TEXT,
    caption TEXT,
    folder VARCHAR(100) DEFAULT 'general',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    uploaded_by UUID REFERENCES auth.users(id)
);

-- Create navigation menu table
CREATE TABLE IF NOT EXISTS public.cms_navigation_2025_11_10_08_53 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    url VARCHAR(255) NOT NULL,
    icon VARCHAR(50),
    parent_id UUID REFERENCES public.cms_navigation_2025_11_10_08_53(id),
    sort_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_external BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create page settings table
CREATE TABLE IF NOT EXISTS public.cms_settings_2025_11_10_08_53 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'text', -- 'text', 'number', 'boolean', 'json'
    description TEXT,
    category VARCHAR(50) DEFAULT 'general',
    is_public BOOLEAN DEFAULT false, -- whether setting can be accessed by non-admin users
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Insert default content
INSERT INTO public.cms_content_2025_11_10_08_53 (page_key, title, content, content_type, meta_title, meta_description) VALUES
('homepage_hero_title', 'Jagdrevier Weetzen', 'Jagdrevier Weetzen', 'text', 'Jagdrevier Weetzen - Hege und Naturschutz im Calenberger Land', 'Hege und Naturschutz im Calenberger Land. Ihr Partner für nachhaltige Jagd, Wildtiermanagement und verantwortungsvollen Naturschutz.'),
('homepage_hero_subtitle', 'Nachhaltige Jagd und Naturschutz', 'Erleben Sie nachhaltige Jagd in 340 Hektar naturbelassener Wiesen- und Feldlandschaft. Tradition, Respekt vor der Natur und verantwortungsvolle Hege stehen im Mittelpunkt unserer jagdlichen Aktivitäten.', 'text', NULL, NULL),
('about_us_text', 'Über uns', 'Unser Jagdrevier erstreckt sich über 340 Hektar naturbelassene Wiesen- und Feldlandschaft im Calenberger Land. Seit Generationen pflegen wir hier die Tradition der nachhaltigen Jagd und des verantwortungsvollen Naturschutzes.', 'html', NULL, NULL),
('contact_info', 'Kontaktinformationen', '{"address": "Weetzen, Niedersachsen", "email": "info@jagdrevier-weetzen.de", "phone": ""}', 'json', NULL, NULL);

-- Insert default navigation
INSERT INTO public.cms_navigation_2025_11_10_08_53 (label, url, sort_order) VALUES
('Home', '/', 1),
('Shop', '/shop', 2),
('Jagdhunde', '/jagdhunde', 3),
('Rehkitzrettung', '/rehkitzrettung', 4),
('Stapelteiche', '/stapelteiche', 5);

-- Insert default settings
INSERT INTO public.cms_settings_2025_11_10_08_53 (setting_key, setting_value, setting_type, description, category, is_public) VALUES
('site_title', 'Jagdrevier Weetzen - Hege und Naturschutz im Calenberger Land', 'text', 'Website title for SEO', 'seo', true),
('site_description', 'Hege und Naturschutz im Calenberger Land. Ihr Partner für nachhaltige Jagd, Wildtiermanagement und verantwortungsvollen Naturschutz.', 'text', 'Website description for SEO', 'seo', true),
('site_keywords', 'Jagd, Hege, Naturschutz, Calenberger Land, Weetzen, Wildtiermanagement, Jagdhunde, Rehkitzrettung, Nachhaltigkeit', 'text', 'Website keywords for SEO', 'seo', true),
('contact_email', 'info@jagdrevier-weetzen.de', 'text', 'Main contact email', 'contact', true),
('social_facebook', '', 'text', 'Facebook page URL', 'social', true),
('social_instagram', '', 'text', 'Instagram profile URL', 'social', true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cms_content_page_key ON public.cms_content_2025_11_10_08_53(page_key);
CREATE INDEX IF NOT EXISTS idx_cms_content_active ON public.cms_content_2025_11_10_08_53(is_active);
CREATE INDEX IF NOT EXISTS idx_cms_media_folder ON public.cms_media_2025_11_10_08_53(folder);
CREATE INDEX IF NOT EXISTS idx_cms_media_active ON public.cms_media_2025_11_10_08_53(is_active);
CREATE INDEX IF NOT EXISTS idx_cms_navigation_parent ON public.cms_navigation_2025_11_10_08_53(parent_id);
CREATE INDEX IF NOT EXISTS idx_cms_navigation_active ON public.cms_navigation_2025_11_10_08_53(is_active);
CREATE INDEX IF NOT EXISTS idx_cms_settings_key ON public.cms_settings_2025_11_10_08_53(setting_key);
CREATE INDEX IF NOT EXISTS idx_cms_settings_public ON public.cms_settings_2025_11_10_08_53(is_public);