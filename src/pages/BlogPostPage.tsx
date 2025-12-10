import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { 
  Calendar, 
  Eye, 
  User, 
  ArrowLeft,
  Share2,
  Clock,
  AlertCircle
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  status: string;
  category: string;
  tags: string[];
  view_count: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

// Fallback-Artikel für verschiedene Slugs
const fallbackPosts: { [key: string]: BlogPost } = {
  'jagdhunde-im-revier-weetzen': {
    id: '1',
    title: 'Jagdhunde im Revier Weetzen - Ausbildung und Einsatz',
    slug: 'jagdhunde-im-revier-weetzen',
    excerpt: 'Unsere Jagdhunde sind unverzichtbare Partner bei der Jagd. Erfahren Sie mehr über ihre Ausbildung und ihren Einsatz im Revier.',
    content: `
      <h2>Die Rolle der Jagdhunde im Revier Weetzen</h2>
      
      <p>Jagdhunde sind seit Jahrhunderten treue Begleiter der Jäger und spielen auch in unserem Revier eine zentrale Rolle. Sie unterstützen uns nicht nur bei der Jagd, sondern auch bei wichtigen Aufgaben des Naturschutzes und der Wildtierpflege.</p>
      
      <h3>Unsere Hunderassen</h3>
      
      <p>Im Jagdrevier Weetzen setzen wir verschiedene Hunderassen ein, die jeweils für spezielle Aufgaben ausgebildet sind:</p>
      
      <ul>
        <li><strong>Deutsche Bracke:</strong> Spezialist für die Nachsuche und Schweißarbeit</li>
        <li><strong>Brandlbracke:</strong> Vielseitiger Jagdhund für verschiedene Wildarten</li>
        <li><strong>Alpenländische Dachsbracke:</strong> Robust und ausdauernd für schwieriges Gelände</li>
      </ul>
      
      <h3>Ausbildung und Training</h3>
      
      <p>Die Ausbildung unserer Jagdhunde beginnt bereits im Welpenalter. Wir legen großen Wert auf eine fundierte Grundausbildung, die folgende Bereiche umfasst:</p>
      
      <ul>
        <li>Gehorsam und Führigkeit</li>
        <li>Spurlaut und Sichtlaut</li>
        <li>Nachsuche und Schweißarbeit</li>
        <li>Apportieren und Wasserarbeit</li>
        <li>Verhalten im Revier</li>
      </ul>
      
      <h3>Einsatz im Revier</h3>
      
      <p>Unsere ausgebildeten Jagdhunde kommen in verschiedenen Situationen zum Einsatz:</p>
      
      <ul>
        <li><strong>Nachsuche:</strong> Aufspüren von angeschossenem Wild</li>
        <li><strong>Drückjagden:</strong> Bewegung des Wildes bei Gesellschaftsjagden</li>
        <li><strong>Einzeljagd:</strong> Unterstützung bei der Pirsch und Ansitzjagd</li>
        <li><strong>Naturschutz:</strong> Monitoring von Wildtierbeständen</li>
      </ul>
      
      <h3>Tierschutz und Verantwortung</h3>
      
      <p>Der Einsatz von Jagdhunden erfolgt bei uns immer unter Berücksichtigung des Tierschutzes. Wir achten darauf, dass:</p>
      
      <ul>
        <li>Die Hunde artgerecht gehalten und gepflegt werden</li>
        <li>Regelmäßige tierärztliche Kontrollen stattfinden</li>
        <li>Die Ausbildung gewaltfrei und mit positiver Verstärkung erfolgt</li>
        <li>Der Einsatz nur bei geeigneten Witterungsbedingungen stattfindet</li>
      </ul>
      
      <p>Unsere Jagdhunde sind nicht nur Arbeitstiere, sondern auch geliebte Familienmitglieder, die mit Respekt und Fürsorge behandelt werden.</p>
    `,
    featured_image: './images/hunting_dogs_1.webp',
    author_name: 'Jagdrevier Weetzen',
    status: 'published',
    category: 'Jagdhunde',
    tags: ['Jagdhunde', 'Ausbildung', 'Revier', 'Naturschutz'],
    view_count: 156,
    is_featured: true,
    published_at: '2024-11-20T10:00:00Z',
    created_at: '2024-11-20T10:00:00Z'
  },
  'rehkitzrettung-mit-drohnen': {
    id: '2',
    title: 'Rehkitzrettung mit Drohnen - Moderne Technologie im Naturschutz',
    slug: 'rehkitzrettung-mit-drohnen',
    excerpt: 'Wie wir mit modernster Drohnen-Technologie Rehkitze vor der Mahd retten und damit einen wichtigen Beitrag zum Tierschutz leisten.',
    content: `
      <h2>Rehkitzrettung - Ein Gebot des Tierschutzes</h2>
      
      <p>Jedes Jahr im Frühjahr und Frühsommer stehen Landwirte vor einer großen Herausforderung: Die erste Mahd der Wiesen fällt in die Setzzeit der Rehe. Rehkitze, die in den hohen Gräsern Schutz suchen, sind dabei besonders gefährdet.</p>
      
      <h3>Das Problem</h3>
      
      <p>Rehkitze haben in den ersten Lebenswochen einen natürlichen Drückinstinkt - sie bleiben bei Gefahr regungslos liegen, anstatt zu fliehen. Dies macht sie bei der Mahd besonders verwundbar:</p>
      
      <ul>
        <li>Kitze werden von Mähmaschinen nicht erkannt</li>
        <li>Der natürliche Fluchtinstinkt ist noch nicht entwickelt</li>
        <li>Hohe Gräser bieten perfekte Tarnung</li>
        <li>Ricken lassen ihre Kitze oft stundenlang allein</li>
      </ul>
      
      <h3>Unsere Lösung: Drohnen-Technologie</h3>
      
      <p>Im Jagdrevier Weetzen setzen wir modernste Drohnen-Technologie ein, um Rehkitze vor der Mahd zu retten:</p>
      
      <h4>Wärmebildkameras</h4>
      <ul>
        <li>Erkennung der Körperwärme von Rehkitzen</li>
        <li>Einsatz in den frühen Morgenstunden</li>
        <li>Hohe Auflösung für präzise Lokalisierung</li>
      </ul>
      
      <h4>Systematische Absuche</h4>
      <ul>
        <li>Flächendeckende Kontrolle vor der Mahd</li>
        <li>GPS-gestützte Routenplanung</li>
        <li>Dokumentation aller Funde</li>
      </ul>
      
      <h3>Der Rettungsprozess</h3>
      
      <p>Wenn ein Rehkitz entdeckt wird, gehen wir folgendermaßen vor:</p>
      
      <ol>
        <li><strong>Lokalisierung:</strong> Genaue Positionsbestimmung per GPS</li>
        <li><strong>Vorsichtige Bergung:</strong> Mit Handschuhen und Gras, um Menschengeruch zu vermeiden</li>
        <li><strong>Sicherung:</strong> Transport in eine sichere Box am Feldrand</li>
        <li><strong>Mahd:</strong> Durchführung der Mahd ohne Gefahr für das Tier</li>
        <li><strong>Freilassung:</strong> Rückführung des Kitzes an den ursprünglichen Ort</li>
      </ol>
      
      <h3>Erfolge und Statistiken</h3>
      
      <p>Unsere Rehkitzrettung zeigt beeindruckende Ergebnisse:</p>
      
      <ul>
        <li>Über 50 gerettete Rehkitze in der letzten Saison</li>
        <li>100% Überlebensrate der geretteten Tiere</li>
        <li>Zusammenarbeit mit 15 örtlichen Landwirten</li>
        <li>Absuche von über 200 Hektar Grünland</li>
      </ul>
      
      <h3>Kooperation mit Landwirten</h3>
      
      <p>Der Erfolg unserer Rehkitzrettung basiert auf der engen Zusammenarbeit mit den örtlichen Landwirten:</p>
      
      <ul>
        <li>Frühzeitige Meldung geplanter Mahd-Termine</li>
        <li>Gemeinsame Planung der Rettungsaktionen</li>
        <li>Kostenlose Dienstleistung für die Landwirte</li>
        <li>Aufklärung über Tierschutz in der Landwirtschaft</li>
      </ul>
      
      <p>Durch diese moderne Technologie können wir einen wichtigen Beitrag zum Tierschutz leisten und gleichzeitig das Bewusstsein für den Schutz unserer heimischen Wildtiere stärken.</p>
    `,
    featured_image: './images/fawn_rescue_drone_scene_20251107_202453.png',
    author_name: 'Jagdrevier Weetzen',
    status: 'published',
    category: 'Naturschutz',
    tags: ['Rehkitzrettung', 'Drohnen', 'Tierschutz', 'Technologie'],
    view_count: 243,
    is_featured: true,
    published_at: '2024-11-18T14:30:00Z',
    created_at: '2024-11-18T14:30:00Z'
  }
};

const BlogPostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPost();
  }, [slug]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!slug) {
        setError('Kein Artikel-Slug gefunden');
        setLoading(false);
        return;
      }

      // Versuche Supabase zu laden
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        
        const { data: postData, error: postError } = await supabase
          .from('blog_posts_2025_11_18_14_00')
          .select('*')
          .eq('slug', slug)
          .eq('status', 'published')
          .single();

        if (postError) throw postError;
        
        if (postData) {
          setPost(postData);
          // Increment view count
          await supabase
            .from('blog_posts_2025_11_18_14_00')
            .update({ view_count: (postData.view_count || 0) + 1 })
            .eq('id', postData.id);
        } else {
          throw new Error('Artikel nicht gefunden');
        }
      } catch (supabaseError) {
        console.warn('Supabase nicht verfügbar, verwende Fallback-Daten:', supabaseError);
        
        // Verwende Fallback-Daten
        const fallbackPost = fallbackPosts[slug];
        if (fallbackPost) {
          setPost(fallbackPost);
        } else {
          setError('Artikel nicht gefunden');
        }
      }

    } catch (error) {
      console.error('Error fetching post:', error);
      
      // Versuche Fallback-Daten
      const fallbackPost = fallbackPosts[slug || ''];
      if (fallbackPost) {
        setPost(fallbackPost);
      } else {
        setError('Artikel konnte nicht geladen werden');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const sharePost = () => {
    if (navigator.share && post) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      });
    } else {
      // Fallback: Copy URL to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link wurde in die Zwischenablage kopiert!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Lade Artikel...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Artikel nicht gefunden</h2>
              <p className="text-muted-foreground mb-4">
                {error || 'Der angeforderte Artikel konnte nicht gefunden werden.'}
              </p>
              <Link to="/blog">
                <Button>
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück zum Blog
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-800 to-blue-600 text-white py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/blog" className="inline-flex items-center text-green-100 hover:text-white mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zum Blog
          </Link>
          
          <div className="flex items-center gap-2 mb-4">
            <Badge className="bg-white/20 text-white">
              {post.category}
            </Badge>
            {post.is_featured && (
              <Badge className="bg-yellow-500 text-yellow-900">
                Featured
              </Badge>
            )}
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-green-100">
            <span className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {post.author_name}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formatDate(post.published_at)}
            </span>
            <span className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              {post.view_count} Aufrufe
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {Math.ceil(post.content.length / 1000)} Min. Lesezeit
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Image */}
        {post.featured_image && (
          <div className="mb-8">
            <img
              src={post.featured_image}
              alt={post.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
        )}

        {/* Article Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <Card>
              <CardContent className="p-8">
                {/* Excerpt */}
                <div className="text-lg text-muted-foreground mb-6 p-4 bg-muted/50 rounded-lg border-l-4 border-primary">
                  {post.excerpt}
                </div>

                {/* Content */}
                <div 
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h4 className="text-sm font-semibold mb-3">Tags:</h4>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Share */}
                <div className="mt-8 pt-6 border-t">
                  <Button onClick={sharePost} variant="outline">
                    <Share2 className="h-4 w-4 mr-2" />
                    Artikel teilen
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Autor</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">{post.author_name}</p>
                      <p className="text-sm text-muted-foreground">
                        Jagdrevier Weetzen
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Weitere Artikel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.values(fallbackPosts)
                      .filter(p => p.slug !== post.slug)
                      .slice(0, 3)
                      .map((relatedPost) => (
                        <Link 
                          key={relatedPost.id}
                          to={`/blog/${relatedPost.slug}`}
                          className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <h4 className="font-medium text-sm line-clamp-2 mb-1">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {formatDate(relatedPost.published_at)}
                          </p>
                        </Link>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between">
            <Link to="/blog">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Alle Artikel
              </Button>
            </Link>
            
            <Button onClick={sharePost}>
              <Share2 className="h-4 w-4 mr-2" />
              Teilen
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;