-- Add livestream settings to CMS
INSERT INTO public.cms_settings_2025_11_10_08_53 (setting_key, setting_value, setting_type, description, category, is_public) VALUES
('livestream_enabled', 'false', 'boolean', 'Enable/disable livestream functionality', 'livestream', true),
('youtube_stream_id', '', 'text', 'YouTube video/stream ID for live streaming', 'livestream', false),
('youtube_channel_id', '', 'text', 'YouTube channel ID for fallback content', 'livestream', false),
('livestream_title', 'Live aus dem Jagdrevier Weetzen', 'text', 'Title displayed above the livestream', 'livestream', true),
('livestream_description', 'Erleben Sie live die Aktivitäten in unserem Jagdrevier - von der Hege bis zur nachhaltigen Jagd.', 'text', 'Description text for the livestream page', 'livestream', true),
('livestream_schedule', '', 'text', 'Information about when streams are typically active', 'livestream', true),
('livestream_fallback_message', 'Derzeit ist kein Livestream aktiv. Schauen Sie später wieder vorbei oder folgen Sie uns auf unseren Social Media Kanälen für Ankündigungen.', 'text', 'Message shown when no stream is active', 'livestream', true);

-- Add some example YouTube stream configurations
INSERT INTO public.cms_content_2025_11_10_08_53 (page_key, title, content, content_type, meta_title, meta_description, is_active, sort_order) VALUES
('livestream_page_content', 'Livestream Seite', 'Live-Übertragungen aus dem Jagdrevier Weetzen', 'html', 'Livestream - Jagdrevier Weetzen', 'Erleben Sie live die Aktivitäten in unserem Jagdrevier Weetzen', true, 100),
('livestream_instructions', 'Stream-Anweisungen', 'Hier können Sie live dabei sein, wenn wir über unsere Jagdaktivitäten, Hege-Maßnahmen und Naturschutzprojekte berichten.', 'html', NULL, NULL, true, 101);