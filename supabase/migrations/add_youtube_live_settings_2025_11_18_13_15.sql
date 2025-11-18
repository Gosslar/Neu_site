-- Add YouTube Live streaming settings
INSERT INTO public.cms_settings_2025_11_10_08_53 (setting_key, setting_value, setting_type, description, category, is_public) VALUES
('youtube_stream_url', '', 'text', 'YouTube Live stream URL (RTMP endpoint)', 'livestream', false),
('youtube_stream_key', '', 'text', 'YouTube Live stream key (secret)', 'livestream', false)
ON CONFLICT (setting_key) DO UPDATE SET
  setting_value = EXCLUDED.setting_value,
  setting_type = EXCLUDED.setting_type,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  is_public = EXCLUDED.is_public;