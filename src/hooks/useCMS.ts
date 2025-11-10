import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface CMSContent {
  id: string;
  page_key: string;
  title: string;
  content: string;
  content_type: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  image_url?: string;
  is_active: boolean;
  sort_order: number;
}

interface CMSSettings {
  id: string;
  setting_key: string;
  setting_value: string;
  setting_type: string;
  description?: string;
  category: string;
  is_public: boolean;
}

export const useCMSContent = (pageKey?: string) => {
  const [content, setContent] = useState<CMSContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContent();
  }, [pageKey]);

  const fetchContent = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('cms_content_2025_11_10_08_53')
        .select('*')
        .eq('is_active', true);

      if (pageKey) {
        query = query.eq('page_key', pageKey);
      }

      const { data, error } = await query.order('sort_order', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching CMS content:', err);
    } finally {
      setLoading(false);
    }
  };

  const getContent = (key: string): CMSContent | null => {
    return content.find(item => item.page_key === key) || null;
  };

  const getContentValue = (key: string, fallback: string = ''): string => {
    const item = getContent(key);
    return item?.content || fallback;
  };

  return {
    content,
    loading,
    error,
    getContent,
    getContentValue,
    refetch: fetchContent
  };
};

export const useCMSSettings = (category?: string) => {
  const [settings, setSettings] = useState<CMSSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSettings();
  }, [category]);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('cms_settings_2025_11_10_08_53')
        .select('*')
        .eq('is_public', true);

      if (category) {
        query = query.eq('category', category);
      }

      const { data, error } = await query.order('setting_key', { ascending: true });

      if (error) throw error;
      setSettings(data || []);
    } catch (err: any) {
      setError(err.message);
      console.error('Error fetching CMS settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const getSetting = (key: string): CMSSettings | null => {
    return settings.find(item => item.setting_key === key) || null;
  };

  const getSettingValue = (key: string, fallback: string = ''): string => {
    const item = getSetting(key);
    return item?.setting_value || fallback;
  };

  return {
    settings,
    loading,
    error,
    getSetting,
    getSettingValue,
    refetch: fetchSettings
  };
};

// Combined hook for easy access to both content and settings
export const useCMS = () => {
  const contentHook = useCMSContent();
  const settingsHook = useCMSSettings();

  return {
    // Content methods
    content: contentHook.content,
    getContent: contentHook.getContent,
    getContentValue: contentHook.getContentValue,
    
    // Settings methods
    settings: settingsHook.settings,
    getSetting: settingsHook.getSetting,
    getSettingValue: settingsHook.getSettingValue,
    
    // Combined loading state
    loading: contentHook.loading || settingsHook.loading,
    error: contentHook.error || settingsHook.error,
    
    // Refetch methods
    refetchContent: contentHook.refetch,
    refetchSettings: settingsHook.refetch,
    refetchAll: () => {
      contentHook.refetch();
      settingsHook.refetch();
    }
  };
};