import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Eye, 
  FileText, 
  Save,
  ArrowLeft
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author_name: string;
  status: 'draft' | 'published' | 'archived';
  category: string;
  tags: string[];
  view_count: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
}

const BlogManagerMinimal = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const { toast } = useToast();

  // Simple form state
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [featuredImage, setFeaturedImage] = useState('');
  const [authorName, setAuthorName] = useState('Jagdrevier Weetzen');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase
        .from('blog_posts_2025_11_18_14_00')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching posts:', error);
        throw error;
      }
      
      setPosts(data || []);
    } catch (error: any) {
      console.error('Error:', error);
      setError(error.message || 'Fehler beim Laden');
      toast({
        title: 'Fehler',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ä/g, 'ae')
      .replace(/ö/g, 'oe')
      .replace(/ü/g, 'ue')
      .replace(/ß/g, 'ss')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleCreatePost = async () => {
    if (!title.trim()) {
      toast({
        title: 'Fehler',
        description: 'Bitte geben Sie einen Titel ein',
        variant: 'destructive'
      });
      return;
    }

    try {
      setCreating(true);
      
      const slug = generateSlug(title);
      const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      
      const { data, error } = await supabase
        .from('blog_posts_2025_11_18_14_00')
        .insert([{
          title: title,
          slug: slug,
          excerpt: excerpt,
          content: content,
          featured_image: featuredImage,
          author_name: authorName,
          status: 'published',
          category: category,
          tags: tagsArray,
          is_featured: false,
          published_at: new Date().toISOString()
        }])
        .select();

      if (error) {
        console.error('Error creating post:', error);
        throw error;
      }

      toast({
        title: 'Erfolg',
        description: 'Blog-Post wurde erstellt'
      });

      // Reset form
      setTitle('');
      setExcerpt('');
      setContent('');
      setFeaturedImage('');
      setAuthorName('Jagdrevier Weetzen');
      setCategory('');
      setTags('');
      
      setShowCreateForm(false);
      fetchPosts();

    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Fehler',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Lade Blog-Daten...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="m-4">
        <CardContent className="p-8 text-center">
          <h3 className="text-lg font-semibold text-red-500 mb-2">Fehler beim Laden</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchPosts}>Erneut versuchen</Button>
        </CardContent>
      </Card>
    );
  }

  if (showCreateForm) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={() => setShowCreateForm(false)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Zurück
          </Button>
          <h2 className="text-2xl font-bold">Neuen Blog-Post erstellen</h2>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blog-Post Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Blog-Post Titel"
              />
            </div>

            <div>
              <Label htmlFor="excerpt">Kurzbeschreibung</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Kurze Beschreibung des Artikels"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Inhalt</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Vollständiger Artikel-Inhalt"
                rows={8}
              />
            </div>

            <div>
              <Label htmlFor="image">Beitragsbild URL</Label>
              <Input
                id="image"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="./images/bild.jpg"
              />
            </div>

            <div>
              <Label htmlFor="author">Autor</Label>
              <Input
                id="author"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="Jagdrevier Weetzen"
              />
            </div>

            <div>
              <Label htmlFor="category">Kategorie</Label>
              <Input
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="z.B. Jagdberichte"
              />
            </div>

            <div>
              <Label htmlFor="tags">Tags (kommagetrennt)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Jagd, Natur, Wildtiere"
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowCreateForm(false)}
                disabled={creating}
              >
                Abbrechen
              </Button>
              <Button 
                onClick={handleCreatePost}
                disabled={creating}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                {creating ? 'Erstelle...' : 'Blog-Post erstellen'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog-Verwaltung</h2>
        <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Neuer Blog-Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Keine Blog-Posts vorhanden</h3>
            <p className="text-muted-foreground mb-4">
              Erstellen Sie Ihren ersten Blog-Post, um zu beginnen.
            </p>
            <Button onClick={() => setShowCreateForm(true)} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ersten Post erstellen
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold">{post.title}</h3>
                      <Badge variant="default">
                        {post.status === 'published' ? 'Veröffentlicht' : 
                         post.status === 'draft' ? 'Entwurf' : 'Archiviert'}
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        {post.view_count || 0} Aufrufe
                      </span>
                      {post.category && (
                        <Badge variant="outline">{post.category}</Badge>
                      )}
                      <span>von {post.author_name}</span>
                    </div>
                    
                    {post.tags && post.tags.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {post.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default BlogManagerMinimal;