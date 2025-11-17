import React, { useState, useEffect } from 'react';
import { useCMS } from '@/hooks/useCMS';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Youtube, Radio, Clock, Users, ArrowLeft, Share2, ExternalLink, Package, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const LivestreamPage = () => {
  const { getSettingValue, loading } = useCMS();
  const [isLive, setIsLive] = useState(false);

  const livestreamEnabled = getSettingValue('livestream_enabled') === 'true';
  const youtubeStreamId = getSettingValue('youtube_stream_id');
  const livestreamTitle = getSettingValue('livestream_title', 'Live aus dem Jagdrevier Weetzen');
  const livestreamDescription = getSettingValue('livestream_description', 'Erleben Sie live die Aktivitäten in unserem Jagdrevier');
  const livestreamSchedule = getSettingValue('livestream_schedule');
  const fallbackMessage = getSettingValue('livestream_fallback_message', 'Derzeit ist kein Livestream aktiv.');

  const extractYouTubeId = (url: string): string => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /^([a-zA-Z0-9_-]{11})$/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return url;
  };

  const getYouTubeEmbedUrl = (videoId: string): string => {
    const cleanId = extractYouTubeId(videoId);
    return `https://www.youtube.com/embed/${cleanId}?autoplay=0&controls=1&rel=0&modestbranding=1`;
  };

  const getYouTubeWatchUrl = (videoId: string): string => {
    const cleanId = extractYouTubeId(videoId);
    return `https://www.youtube.com/watch?v=${cleanId}`;
  };

  const isValidYouTubeId = (id: string): boolean => {
    const cleanId = extractYouTubeId(id);
    return /^[a-zA-Z0-9_-]{11}$/.test(cleanId);
  };

  const shareStream = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: livestreamTitle,
          text: livestreamDescription,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-lg">Livestream wird geladen...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:bg-primary-foreground/10">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück zur Startseite
                </Button>
              </Link>
              <div className="h-6 w-px bg-primary-foreground/20" />
              <div className="flex items-center space-x-2">
                <Radio className="h-6 w-6" />
                <h1 className="text-2xl font-bold">{livestreamTitle}</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {livestreamEnabled && youtubeStreamId ? (
                <Badge variant="secondary" className="bg-red-500 text-white">
                  <Radio className="h-3 w-3 mr-1" />
                  LIVE
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-gray-500 text-white">
                  OFFLINE
                </Badge>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={shareStream}
                className="text-primary-foreground hover:bg-primary-foreground/10"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Stream Area */}
          <div className="lg:col-span-3 space-y-6">
            <Card>
              <CardContent className="p-0">
                {livestreamEnabled && youtubeStreamId && isValidYouTubeId(youtubeStreamId) ? (
                  <div className="aspect-video bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={getYouTubeEmbedUrl(youtubeStreamId)}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      title={livestreamTitle}
                    />
                  </div>
                ) : (
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                    <div className="text-center text-muted-foreground p-8">
                      <Radio className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <h3 className="text-xl font-semibold mb-2">Livestream nicht verfügbar</h3>
                      <p className="max-w-md mx-auto">{fallbackMessage}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Stream Description */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Youtube className="h-5 w-5 text-red-500" />
                  <span>Über diesen Stream</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {livestreamDescription}
                </p>
                
                {livestreamEnabled && youtubeStreamId && (
                  <div className="mt-4 pt-4 border-t">
                    <Button asChild variant="outline">
                      <a 
                        href={getYouTubeWatchUrl(youtubeStreamId)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center"
                      >
                        <Youtube className="h-4 w-4 mr-2" />
                        Auf YouTube ansehen
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stream Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Stream-Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge variant={livestreamEnabled && youtubeStreamId ? "default" : "secondary"}>
                    {livestreamEnabled && youtubeStreamId ? "Live" : "Offline"}
                  </Badge>
                </div>
                
                {livestreamSchedule && (
                  <div className="flex items-start space-x-2">
                    <Clock className="h-4 w-4 mt-0.5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Stream-Zeiten</p>
                      <p className="text-xs text-muted-foreground">{livestreamSchedule}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Weitere Inhalte</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link to="/shop">
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="h-4 w-4 mr-2" />
                    Shop besuchen
                  </Button>
                </Link>
                
                <Link to="/jagdhunde">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="h-4 w-4 mr-2" />
                    Unsere Jagdhunde
                  </Button>
                </Link>
                
                <Link to="/rehkitzrettung">
                  <Button variant="outline" className="w-full justify-start">
                    <Heart className="h-4 w-4 mr-2" />
                    Rehkitzrettung
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Information</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <Radio className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Dieser Livestream zeigt Aktivitäten aus dem Jagdrevier Weetzen. 
                    Alle Inhalte entsprechen den Grundsätzen nachhaltiger und verantwortungsvoller Jagd.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivestreamPage;