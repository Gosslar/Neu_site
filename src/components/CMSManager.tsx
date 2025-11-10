import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from '@/components/ui/use-toast';
import { Edit, Trash2, Plus, Save, Eye, EyeOff, Upload, Image, FileText, Settings, Navigation } from 'lucide-react';

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
  created_at: string;
  updated_at: string;
}

interface CMSMedia {
  id: string;
  filename: string;
  original_filename: string;
  file_path: string;
  file_size: number;
  mime_type: string;
  alt_text?: string;
  caption?: string;
  folder: string;
  is_active: boolean;
  created_at: string;
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

const CMSManager = () => {
  const [contents, setContents] = useState<CMSContent[]>([]);
  const [media, setMedia] = useState<CMSMedia[]>([]);
  const [settings, setSettings] = useState<CMSSettings[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingContent, setEditingContent] = useState<CMSContent | null>(null);
  const [editingSetting, setEditingSetting] = useState<CMSSettings | null>(null);
  const [uploadingFile, setUploadingFile] = useState(false);

  // Content form state
  const [contentForm, setContentForm] = useState({
    page_key: '',
    title: '',
    content: '',
    content_type: 'text',
    meta_title: '',
    meta_description: '',
    meta_keywords: '',
    image_url: '',
    is_active: true,
    sort_order: 0
  });

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({
    setting_key: '',
    setting_value: '',
    setting_type: 'text',
    description: '',
    category: 'general',
    is_public: false
  });

  useEffect(() => {
    fetchCMSData();
  }, []);

  const fetchCMSData = async () => {
    try {
      setLoading(true);
      
      // Fetch content
      const { data: contentData, error: contentError } = await supabase
        .from('cms_content_2025_11_10_08_53')
        .select('*')
        .order('sort_order', { ascending: true });

      if (contentError) throw contentError;
      setContents(contentData || []);

      // Fetch media
      const { data: mediaData, error: mediaError } = await supabase
        .from('cms_media_2025_11_10_08_53')
        .select('*')
        .order('created_at', { ascending: false });

      if (mediaError) throw mediaError;
      setMedia(mediaData || []);

      // Fetch settings
      const { data: settingsData, error: settingsError } = await supabase
        .from('cms_settings_2025_11_10_08_53')
        .select('*')
        .order('category', { ascending: true });

      if (settingsError) throw settingsError;
      setSettings(settingsData || []);

    } catch (error: any) {
      console.error('Error fetching CMS data:', error);
      toast({
        title: "Fehler beim Laden der CMS-Daten",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    try {
      const { error } = await supabase
        .from('cms_content_2025_11_10_08_53')
        .upsert({
          ...contentForm,
          id: editingContent?.id,
          updated_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (error) throw error;

      toast({ title: "Inhalt gespeichert" });
      setEditingContent(null);
      resetContentForm();
      fetchCMSData();
    } catch (error: any) {
      console.error('Error saving content:', error);
      toast({
        title: "Fehler beim Speichern",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const saveSetting = async () => {
    try {
      const { error } = await supabase
        .from('cms_settings_2025_11_10_08_53')
        .upsert({
          ...settingsForm,
          id: editingSetting?.id
        });

      if (error) throw error;

      toast({ title: "Einstellung gespeichert" });
      setEditingSetting(null);
      resetSettingsForm();
      fetchCMSData();
    } catch (error: any) {
      console.error('Error saving setting:', error);
      toast({
        title: "Fehler beim Speichern",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteContent = async (id: string) => {
    try {
      const { error } = await supabase
        .from('cms_content_2025_11_10_08_53')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({ title: "Inhalt gelöscht" });
      fetchCMSData();
    } catch (error: any) {
      console.error('Error deleting content:', error);
      toast({
        title: "Fehler beim Löschen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const uploadFile = async (file: File, folder: string = 'general') => {
    try {
      setUploadingFile(true);
      
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('cms-media')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('cms-media')
        .getPublicUrl(filePath);

      // Save media record to database
      const { error: dbError } = await supabase
        .from('cms_media_2025_11_10_08_53')
        .insert({
          filename: fileName,
          original_filename: file.name,
          file_path: publicUrl,
          file_size: file.size,
          mime_type: file.type,
          folder: folder,
          uploaded_by: (await supabase.auth.getUser()).data.user?.id
        });

      if (dbError) throw dbError;

      toast({ title: "Datei erfolgreich hochgeladen" });
      fetchCMSData();
    } catch (error: any) {
      console.error('Error uploading file:', error);
      toast({
        title: "Fehler beim Hochladen",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploadingFile(false);
    }
  };

  const startEditingContent = (content: CMSContent) => {
    setEditingContent(content);
    setContentForm({
      page_key: content.page_key,
      title: content.title,
      content: content.content,
      content_type: content.content_type,
      meta_title: content.meta_title || '',
      meta_description: content.meta_description || '',
      meta_keywords: content.meta_keywords || '',
      image_url: content.image_url || '',
      is_active: content.is_active,
      sort_order: content.sort_order
    });
  };

  const startEditingSetting = (setting: CMSSettings) => {
    setEditingSetting(setting);
    setSettingsForm({
      setting_key: setting.setting_key,
      setting_value: setting.setting_value,
      setting_type: setting.setting_type,
      description: setting.description || '',
      category: setting.category,
      is_public: setting.is_public
    });
  };

  const resetContentForm = () => {
    setContentForm({
      page_key: '',
      title: '',
      content: '',
      content_type: 'text',
      meta_title: '',
      meta_description: '',
      meta_keywords: '',
      image_url: '',
      is_active: true,
      sort_order: 0
    });
  };

  const resetSettingsForm = () => {
    setSettingsForm({
      setting_key: '',
      setting_value: '',
      setting_type: 'text',
      description: '',
      category: 'general',
      is_public: false
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">CMS-Daten werden geladen...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Content Management System</h2>
        <Badge variant="secondary">
          {contents.length} Inhalte • {media.length} Medien • {settings.length} Einstellungen
        </Badge>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="content" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Inhalte
          </TabsTrigger>
          <TabsTrigger value="media" className="flex items-center gap-2">
            <Image className="h-4 w-4" />
            Medien
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Einstellungen
          </TabsTrigger>
          <TabsTrigger value="navigation" className="flex items-center gap-2">
            <Navigation className="h-4 w-4" />
            Navigation
          </TabsTrigger>
        </TabsList>

        {/* Content Management Tab */}
        <TabsContent value="content" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Seiteninhalte verwalten</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={resetContentForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neuer Inhalt
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingContent ? 'Inhalt bearbeiten' : 'Neuen Inhalt erstellen'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="page_key">Seiten-Schlüssel</Label>
                      <Input
                        id="page_key"
                        value={contentForm.page_key}
                        onChange={(e) => setContentForm({ ...contentForm, page_key: e.target.value })}
                        placeholder="z.B. homepage_hero_title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="title">Titel</Label>
                      <Input
                        id="title"
                        value={contentForm.title}
                        onChange={(e) => setContentForm({ ...contentForm, title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="content_type">Inhaltstyp</Label>
                      <Select
                        value={contentForm.content_type}
                        onValueChange={(value) => setContentForm({ ...contentForm, content_type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="text">Text</SelectItem>
                          <SelectItem value="html">HTML</SelectItem>
                          <SelectItem value="markdown">Markdown</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="content">Inhalt</Label>
                      <Textarea
                        id="content"
                        value={contentForm.content}
                        onChange={(e) => setContentForm({ ...contentForm, content: e.target.value })}
                        rows={6}
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="meta_title">SEO Titel</Label>
                      <Input
                        id="meta_title"
                        value={contentForm.meta_title}
                        onChange={(e) => setContentForm({ ...contentForm, meta_title: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta_description">SEO Beschreibung</Label>
                      <Textarea
                        id="meta_description"
                        value={contentForm.meta_description}
                        onChange={(e) => setContentForm({ ...contentForm, meta_description: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="meta_keywords">SEO Keywords</Label>
                      <Input
                        id="meta_keywords"
                        value={contentForm.meta_keywords}
                        onChange={(e) => setContentForm({ ...contentForm, meta_keywords: e.target.value })}
                      />
                    </div>
                    <div>
                      <Label htmlFor="image_url">Bild URL</Label>
                      <Input
                        id="image_url"
                        value={contentForm.image_url}
                        onChange={(e) => setContentForm({ ...contentForm, image_url: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="is_active"
                        checked={contentForm.is_active}
                        onCheckedChange={(checked) => setContentForm({ ...contentForm, is_active: checked })}
                      />
                      <Label htmlFor="is_active">Aktiv</Label>
                    </div>
                    <div>
                      <Label htmlFor="sort_order">Sortierung</Label>
                      <Input
                        id="sort_order"
                        type="number"
                        value={contentForm.sort_order}
                        onChange={(e) => setContentForm({ ...contentForm, sort_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingContent(null)}>
                    Abbrechen
                  </Button>
                  <Button onClick={saveContent}>
                    <Save className="h-4 w-4 mr-2" />
                    Speichern
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {contents.map((content) => (
              <Card key={content.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{content.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">
                        Schlüssel: {content.page_key} • Typ: {content.content_type}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {content.is_active ? (
                        <Badge variant="default">
                          <Eye className="h-3 w-3 mr-1" />
                          Aktiv
                        </Badge>
                      ) : (
                        <Badge variant="secondary">
                          <EyeOff className="h-3 w-3 mr-1" />
                          Inaktiv
                        </Badge>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditingContent(content)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteContent(content.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {content.content}
                  </p>
                  {content.meta_title && (
                    <p className="text-xs text-muted-foreground mt-2">
                      SEO: {content.meta_title}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Media Management Tab */}
        <TabsContent value="media" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Medien verwalten</h3>
            <div className="flex space-x-2">
              <Input
                type="file"
                accept="image/*,application/pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadFile(file);
                }}
                className="hidden"
                id="file-upload"
              />
              <Label htmlFor="file-upload" className="cursor-pointer">
                <Button disabled={uploadingFile}>
                  <Upload className="h-4 w-4 mr-2" />
                  {uploadingFile ? 'Hochladen...' : 'Datei hochladen'}
                </Button>
              </Label>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {media.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-square bg-muted flex items-center justify-center">
                  {item.mime_type.startsWith('image/') ? (
                    <img
                      src={item.file_path}
                      alt={item.alt_text || item.original_filename}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FileText className="h-12 w-12 text-muted-foreground" />
                  )}
                </div>
                <CardContent className="p-3">
                  <p className="text-sm font-medium truncate">{item.original_filename}</p>
                  <p className="text-xs text-muted-foreground">
                    {(item.file_size / 1024).toFixed(1)} KB • {item.folder}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <Badge variant={item.is_active ? "default" : "secondary"} className="text-xs">
                      {item.is_active ? "Aktiv" : "Inaktiv"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Settings Management Tab */}
        <TabsContent value="settings" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Website-Einstellungen</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button onClick={resetSettingsForm}>
                  <Plus className="h-4 w-4 mr-2" />
                  Neue Einstellung
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingSetting ? 'Einstellung bearbeiten' : 'Neue Einstellung erstellen'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="setting_key">Schlüssel</Label>
                    <Input
                      id="setting_key"
                      value={settingsForm.setting_key}
                      onChange={(e) => setSettingsForm({ ...settingsForm, setting_key: e.target.value })}
                      placeholder="z.B. site_title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="setting_value">Wert</Label>
                    <Textarea
                      id="setting_value"
                      value={settingsForm.setting_value}
                      onChange={(e) => setSettingsForm({ ...settingsForm, setting_value: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="setting_type">Typ</Label>
                    <Select
                      value={settingsForm.setting_type}
                      onValueChange={(value) => setSettingsForm({ ...settingsForm, setting_type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="text">Text</SelectItem>
                        <SelectItem value="number">Zahl</SelectItem>
                        <SelectItem value="boolean">Boolean</SelectItem>
                        <SelectItem value="json">JSON</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="category">Kategorie</Label>
                    <Select
                      value={settingsForm.category}
                      onValueChange={(value) => setSettingsForm({ ...settingsForm, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">Allgemein</SelectItem>
                        <SelectItem value="seo">SEO</SelectItem>
                        <SelectItem value="contact">Kontakt</SelectItem>
                        <SelectItem value="social">Social Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="description">Beschreibung</Label>
                    <Input
                      id="description"
                      value={settingsForm.description}
                      onChange={(e) => setSettingsForm({ ...settingsForm, description: e.target.value })}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is_public"
                      checked={settingsForm.is_public}
                      onCheckedChange={(checked) => setSettingsForm({ ...settingsForm, is_public: checked })}
                    />
                    <Label htmlFor="is_public">Öffentlich sichtbar</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button variant="outline" onClick={() => setEditingSetting(null)}>
                    Abbrechen
                  </Button>
                  <Button onClick={saveSetting}>
                    <Save className="h-4 w-4 mr-2" />
                    Speichern
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid gap-4">
            {['seo', 'contact', 'social', 'general'].map((category) => {
              const categorySettings = settings.filter(s => s.category === category);
              if (categorySettings.length === 0) return null;

              return (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">
                      {category === 'seo' ? 'SEO' : 
                       category === 'contact' ? 'Kontakt' :
                       category === 'social' ? 'Social Media' : 'Allgemein'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {categorySettings.map((setting) => (
                      <div key={setting.id} className="flex items-center justify-between p-3 border rounded">
                        <div className="flex-1">
                          <p className="font-medium">{setting.setting_key}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">
                            {setting.setting_value}
                          </p>
                          {setting.description && (
                            <p className="text-xs text-muted-foreground mt-1">
                              {setting.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={setting.is_public ? "default" : "secondary"}>
                            {setting.is_public ? "Öffentlich" : "Privat"}
                          </Badge>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEditingSetting(setting)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Navigation Management Tab */}
        <TabsContent value="navigation" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Navigation verwalten</h3>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Menüpunkt
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">
                Navigation-Verwaltung wird in der nächsten Version implementiert.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CMSManager;