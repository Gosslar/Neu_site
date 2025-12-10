import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Calendar, 
  Eye, 
  User, 
  Search, 
  ArrowRight,
  BookOpen,
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

// Fallback-Daten für den Fall, dass Supabase nicht verfügbar ist
const fallbackPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Jagdhunde im Revier Weetzen - Ausbildung und Einsatz',
    slug: 'jagdhunde-im-revier-weetzen',
    excerpt: 'Unsere Jagdhunde sind unverzichtbare Partner bei der Jagd. Erfahren Sie mehr über ihre Ausbildung und ihren Einsatz im Revier.',
    content: 'Vollständiger Artikel über Jagdhunde...',
    featured_image: './images/hunting_dogs_1.webp',
    author_name: 'Jagdrevier Weetzen',
    status: 'published',
    category: 'Jagdhunde',
    tags: ['Jagdhunde', 'Ausbildung', 'Revier'],
    view_count: 156,
    is_featured: true,
    published_at: '2024-11-20T10:00:00Z',
    created_at: '2024-11-20T10:00:00Z'
  },
  {
    id: '2',
    title: 'Rehkitzrettung mit Drohnen - Moderne Technologie im Naturschutz',
    slug: 'rehkitzrettung-mit-drohnen',
    excerpt: 'Wie wir mit modernster Drohnen-Technologie Rehkitze vor der Mahd retten und damit einen wichtigen Beitrag zum Tierschutz leisten.',
    content: 'Vollständiger Artikel über Rehkitzrettung...',
    featured_image: './images/fawn_rescue_drone_scene_20251107_202453.png',
    author_name: 'Jagdrevier Weetzen',
    status: 'published',
    category: 'Naturschutz',
    tags: ['Rehkitzrettung', 'Drohnen', 'Tierschutz'],
    view_count: 243,
    is_featured: true,
    published_at: '2024-11-18T14:30:00Z',
    created_at: '2024-11-18T14:30:00Z'
  },
  {
    id: '3',
    title: 'Die Weetzer Stapelteiche - Ein Paradies für Wasservögel',
    slug: 'weetzer-stapelteiche-wasservoegel',
    excerpt: 'Unsere Stapelteiche sind nicht nur ein wichtiger Lebensraum für Wasservögel, sondern auch ein beliebtes Ziel für Naturbeobachter.',
    content: 'Vollständiger Artikel über die Stapelteiche...',
    featured_image: './images/DJI_20251123100937_0001_V.jpg',
    author_name: 'Jagdrevier Weetzen',
    status: 'published',
    category: 'Gewässer',
    tags: ['Stapelteiche', 'Wasservögel', 'Naturbeobachtung'],
    view_count: 189,
    is_featured: false,
    published_at: '2024-11-15T09:15:00Z',
    created_at: '2024-11-15T09:15:00Z'
  },
  {
    id: '4',
    title: 'Prädatorenmanagement - Bestandsregulierung im Revier',
    slug: 'praedatorenmanagement-bestandsregulierung',
    excerpt: 'Wie wir durch gezieltes Prädatorenmanagement das ökologische Gleichgewicht in unserem Revier erhalten.',
    content: 'Vollständiger Artikel über Prädatorenmanagement...',
    featured_image: './images/nature_wildlife_1.jpeg',
    author_name: 'Jagdrevier Weetzen',
    status: 'published',
    category: 'Wildtiermanagement',
    tags: ['Prädatoren', 'Bestandsregulierung', 'Ökologie'],
    view_count: 134,
    is_featured: false,
    published_at: '2024-11-12T16:45:00Z',
    created_at: '2024-11-12T16:45:00Z'
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetchBlogData();
  }, []);

  const fetchBlogData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Versuche Supabase zu laden
      try {
        const { supabase } = await import('@/integrations/supabase/client');
        
        // Fetch published blog posts
        const { data: postsData, error: postsError } = await supabase
          .from('blog_posts_2025_11_18_14_00')
          .select('*')
          .eq('status', 'published')
          .order('published_at', { ascending: false });

        if (postsError) throw postsError;
        
        if (postsData && postsData.length > 0) {
          setPosts(postsData);
        } else {
          // Keine Daten in der Datenbank, verwende Fallback
          setPosts(fallbackPosts);
        }
      } catch (supabaseError) {
        console.warn('Supabase nicht verfügbar, verwende Fallback-Daten:', supabaseError);
        setPosts(fallbackPosts);
      }

    } catch (error) {
      console.error('Error fetching blog data:', error);
      setError('Fehler beim Laden der Blog-Artikel');
      // Auch bei Fehlern Fallback-Daten verwenden
      setPosts(fallbackPosts);
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const featuredPosts = posts.filter(post => post.is_featured).slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p>Lade Blog-Artikel...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with weetzen.jpg background */}
      <div 
        className="relative text-white py-16 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("./images/weetzen.jpg")',
          minHeight: '400px'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              🦌 Jagd Weetzen Blog
            </h1>
            <p className="text-xl text-green-100 max-w-2xl mx-auto drop-shadow-md">
              Erfahrungen, Wissen und Geschichten aus dem Jagdrevier Weetzen
            </p>
            {error && (
              <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg backdrop-blur-sm">
                <div className="flex items-center gap-2 text-yellow-100">
                  <AlertCircle className="h-4 w-4" />
                  <span className="text-sm">Fallback-Modus: Beispiel-Artikel werden angezeigt</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="h-6 w-6" />
              Empfohlene Artikel
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  {post.featured_image && (
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-yellow-500 text-yellow-900">
                          Featured
                        </Badge>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(post.published_at)}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {post.author_name}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          {post.view_count}
                        </span>
                      </div>
                      
                      <Link to={`/blog/${post.slug}`}>
                        <Button variant="ghost" size="sm">
                          Lesen <ArrowRight className="h-3 w-3 ml-1" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Blog-Artikel durchsuchen..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {post.featured_image && (
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">
                    {post.category}
                  </Badge>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.published_at)}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {post.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {post.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{post.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {post.author_name}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {post.view_count}
                    </span>
                  </div>
                  
                  <Link to={`/blog/${post.slug}`}>
                    <Button variant="ghost" size="sm">
                      Lesen <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Posts Message */}
        {filteredPosts.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Keine Artikel gefunden</h3>
              <p className="text-muted-foreground">
                {searchTerm 
                  ? 'Versuchen Sie andere Suchbegriffe.'
                  : 'Es sind noch keine Blog-Artikel veröffentlicht.'
                }
              </p>
            </CardContent>
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Vorherige
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                onClick={() => setCurrentPage(page)}
                className="w-10"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Nächste
            </Button>
          </div>
        )}

        {/* Info Box */}
        <div className="mt-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Über unseren Blog
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Hier teilen wir unsere Erfahrungen aus dem Jagdrevier Weetzen mit Ihnen. 
                Von der Ausbildung unserer Jagdhunde über moderne Rehkitzrettung bis hin zu 
                Naturschutzmaßnahmen - erfahren Sie mehr über unsere Arbeit im Calenberger Land.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Badge variant="outline">Jagdhunde</Badge>
                <Badge variant="outline">Rehkitzrettung</Badge>
                <Badge variant="outline">Naturschutz</Badge>
                <Badge variant="outline">Stapelteiche</Badge>
                <Badge variant="outline">Wildtiermanagement</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;