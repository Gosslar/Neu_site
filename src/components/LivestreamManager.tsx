import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/hooks/use-toast';
import { Settings, Save, Eye, EyeOff, Youtube, Radio, Clock, FileText } from 'lucide-react';

interface LivestreamSettings {
  livestream_enabled: boolean;
  youtube_stream_id: string;
  youtube_channel_id: string;
  livestream_title: string;
  livestream_description: string;
  livestream_schedule: string;
  livestream_fallback_message: string;
}

const LivestreamManager = () => {
  const [settings, setSettings] = useState<LivestreamSettings>({
    livestream_enabled: false,
    youtube_stream_id: '',
    youtube_channel_id: '',
    livestream_title: 'Live aus dem Jagdrevier Weetzen',
    livestream_description: 'Erleben Sie live die Aktivitäten in unserem Jagdrevier',
    livestream_schedule: '',
    livestream_fallback_message: 'Derzeit ist kein Livestream aktiv.'
  });
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLivestreamSettings();
  }, []);

  const fetchLivestreamSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching livestream settings...');
      
      const { data, error } = await supabase
        .from('cms_settings_2025_11_10_08_53')
        .select('setting_key, setting_value')
        .eq('category', 'livestream');

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      console.log('Fetched data:', data);

      if (data && data.length > 0) {
        // Convert array to object
        const settingsObj: any = {};
        data.forEach(item => {
          if (item.setting_key === 'livestream_enabled') {
            settingsObj[item.setting_key] = item.setting_value === 'true';
          } else {
            settingsObj[item.setting_key] = item.setting_value || '';
          }
        });

        console.log('Processed settings:', settingsObj);
        setSettings(prev => ({ ...prev, ...settingsObj }));
      } else {
        console.log('No livestream settings found, using defaults');
      }
    } catch (error: any) {
      console.error('Error fetching livestream settings:', error);
      setError(`Fehler beim Laden: ${error.message}`);
      toast({
        title: "Fehler beim Laden der Livestream-Einstellungen",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveLivestreamSettings = async () => {
    try {
      setSaving(true);
      setError(null);

      console.log('Saving settings:', settings);

      // Update each setting individually
      const updates = Object.entries(settings).map(([key, value]) => ({
        setting_key: key,
        setting_value: typeof value === 'boolean' ? value.toString() : value.toString()
      }));

      for (const update of updates) {
        console.log('Updating:', update);
        
        const { error } = await supabase
          .from('cms_settings_2025_11_10_08_53')
          .update({ setting_value: update.setting_value })
          .eq('setting_key', update.setting_key);

        if (error) {
          console.error('Update error for', update.setting_key, ':', error);
          throw error;
        }
      }

      console.log('All settings saved successfully');
      toast({ title: "Livestream-Einstellungen gespeichert" });
    } catch (error: any) {
      console.error('Error saving livestream settings:', error);
      setError(`Fehler beim Speichern: ${error.message}`);
      toast({
        title: "Fehler beim Speichern",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const extractYouTubeId = (url: string): string => {
    if (!url) return '';
    
    // Extract YouTube video ID from various URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/ // Direct video ID
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return url; // Return as-is if no pattern matches
  };

  const getYouTubeEmbedUrl = (videoId: string): string => {
    const cleanId = extractYouTubeId(videoId);
    return `https://www.youtube.com/embed/${cleanId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1`;
  };

  const isValidYouTubeId = (id: string): boolean => {
    if (!id) return false;
    const cleanId = extractYouTubeId(id);
    return /^[a-zA-Z0-9_-]{11}$/.test(cleanId);
  };

  // Error boundary - show error if something went wrong
  if (error && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Livestream-Verwaltung</h2>
          <Badge variant="destructive">Fehler</Badge>
        </div>
        
        <Alert variant="destructive">
          <AlertDescription>
            {error}
          </AlertDescription>
        </Alert>
        
        <Button onClick={fetchLivestreamSettings}>
          Erneut versuchen
        </Button>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Livestream-Verwaltung</h2>
          <Badge variant="secondary">Lädt...</Badge>
        </div>
        
        <Card>
          <CardContent className="p-8">
            <div className="flex items-center justify-center">
              <div className="text-lg">Livestream-Einstellungen werden geladen...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Radio className="h-8 w-8 text-red-500" />
          <div>
            <h2 className="text-2xl font-bold">Livestream-Verwaltung</h2>
            <p className="text-muted-foreground">YouTube-Livestreams für das Jagdrevier verwalten</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant={settings.livestream_enabled ? "default" : "secondary"}>
            {settings.livestream_enabled ? (
              <>
                <Radio className="h-3 w-3 mr-1" />
                Live
              </>
            ) : (
              <>
                <EyeOff className="h-3 w-3 mr-1" />
                Offline
              </>
            )}
          </Badge>
          <Button onClick={() => setPreviewMode(!previewMode)} variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? 'Bearbeiten' : 'Vorschau'}
          </Button>
        </div>
      </div>

      {previewMode ? (
        // Preview Mode - Show how the livestream will appear
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Youtube className="h-5 w-5 text-red-500" />
                <span>{settings.livestream_title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{settings.livestream_description}</p>
              
              {settings.livestream_enabled && settings.youtube_stream_id ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {isValidYouTubeId(settings.youtube_stream_id) ? (
                    <iframe
                      src={getYouTubeEmbedUrl(settings.youtube_stream_id)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title="Jagdrevier Weetzen Livestream"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <Youtube className="h-12 w-12 mx-auto mb-2 opacity-50" />
                        <p>Ungültige YouTube-Video-ID</p>
                        <p className="text-sm opacity-75">ID: {settings.youtube_stream_id}</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Radio className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p className="font-medium">Livestream nicht verfügbar</p>
                    <p className="text-sm">{settings.livestream_fallback_message}</p>
                  </div>
                </div>
              )}

              {settings.livestream_schedule && (
                <Alert>
                  <Clock className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Stream-Zeiten:</strong> {settings.livestream_schedule}
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </div>
      ) : (
        // Edit Mode - Configuration interface
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stream Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Settings className="h-5 w-5" />
                <span>Stream-Konfiguration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="livestream_enabled"
                  checked={settings.livestream_enabled}
                  onCheckedChange={(checked) => 
                    setSettings(prev => ({ ...prev, livestream_enabled: checked }))
                  }
                />
                <Label htmlFor="livestream_enabled" className="font-medium">
                  Livestream aktivieren
                </Label>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="youtube_stream_id">YouTube Video/Stream ID</Label>
                <Input
                  id="youtube_stream_id"
                  value={settings.youtube_stream_id}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, youtube_stream_id: e.target.value }))
                  }
                  placeholder="z.B. dQw4w9WgXcQ oder komplette YouTube URL"
                />
                <p className="text-xs text-muted-foreground">
                  YouTube Video-ID oder komplette URL eingeben. Für Livestreams die Stream-ID verwenden.
                </p>
                {settings.youtube_stream_id && !isValidYouTubeId(settings.youtube_stream_id) && (
                  <p className="text-xs text-red-500">
                    ⚠️ Ungültige YouTube-ID Format
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="youtube_channel_id">YouTube Kanal-ID (Optional)</Label>
                <Input
                  id="youtube_channel_id"
                  value={settings.youtube_channel_id}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, youtube_channel_id: e.target.value }))
                  }
                  placeholder="z.B. UCxxxxxxxxxxxxxxxxxxxxxx"
                />
                <p className="text-xs text-muted-foreground">
                  Für erweiterte Funktionen und Fallback-Inhalte
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Content Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="h-5 w-5" />
                <span>Inhalts-Konfiguration</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="livestream_title">Stream-Titel</Label>
                <Input
                  id="livestream_title"
                  value={settings.livestream_title}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, livestream_title: e.target.value }))
                  }
                  placeholder="Live aus dem Jagdrevier Weetzen"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="livestream_description">Beschreibung</Label>
                <Textarea
                  id="livestream_description"
                  value={settings.livestream_description}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, livestream_description: e.target.value }))
                  }
                  rows={3}
                  placeholder="Beschreibung des Livestreams..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="livestream_schedule">Stream-Zeiten (Optional)</Label>
                <Input
                  id="livestream_schedule"
                  value={settings.livestream_schedule}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, livestream_schedule: e.target.value }))
                  }
                  placeholder="z.B. Täglich 18:00-20:00 Uhr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="livestream_fallback_message">Offline-Nachricht</Label>
                <Textarea
                  id="livestream_fallback_message"
                  value={settings.livestream_fallback_message}
                  onChange={(e) => 
                    setSettings(prev => ({ ...prev, livestream_fallback_message: e.target.value }))
                  }
                  rows={2}
                  placeholder="Nachricht wenn kein Stream aktiv ist..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {!previewMode && (
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={fetchLivestreamSettings}>
            Zurücksetzen
          </Button>
          <Button onClick={saveLivestreamSettings} disabled={saving}>
            <Save className="h-4 w-4 mr-2" />
            {saving ? 'Speichern...' : 'Einstellungen speichern'}
          </Button>
        </div>
      )}

      {/* Quick Setup Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Youtube className="h-5 w-5 text-red-500" />
            <span>YouTube-Setup Anleitung</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm space-y-2">
            <p><strong>1. YouTube-Video/Stream-ID finden:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
              <li>Bei YouTube-URL <code>https://youtube.com/watch?v=dQw4w9WgXcQ</code> ist die ID: <code>dQw4w9WgXcQ</code></li>
              <li>Bei Kurz-URL <code>https://youtu.be/dQw4w9WgXcQ</code> ist die ID: <code>dQw4w9WgXcQ</code></li>
              <li>Für Livestreams: Die Stream-ID aus YouTube Studio verwenden</li>
            </ul>
            
            <p><strong>2. Livestream starten:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
              <li>YouTube Studio → "Live streamen" → Stream-Schlüssel kopieren</li>
              <li>Stream-ID hier eingeben und "Livestream aktivieren"</li>
              <li>Vorschau-Modus verwenden um das Ergebnis zu testen</li>
            </ul>

            <p><strong>3. Tipps:</strong></p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-muted-foreground">
              <li>Stream-Zeiten angeben für bessere Benutzerinformation</li>
              <li>Offline-Nachricht anpassen für professionelle Darstellung</li>
              <li>Regelmäßig testen ob der Stream korrekt angezeigt wird</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Debug Information */}
      <Card>
        <CardHeader>
          <CardTitle>Debug-Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Livestream aktiviert: {settings.livestream_enabled ? 'Ja' : 'Nein'}</p>
            <p>YouTube-ID: {settings.youtube_stream_id || 'Nicht gesetzt'}</p>
            <p>ID gültig: {isValidYouTubeId(settings.youtube_stream_id) ? 'Ja' : 'Nein'}</p>
            <p>Letztes Update: {new Date().toLocaleString()}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LivestreamManager;