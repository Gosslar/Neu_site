import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Tag,
  Save
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

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { toast } = useToast();

  // Form states
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: 'Jagdrevier Weetzen',
    status: 'draft' as 'draft' | 'published' | 'archived',
    category: '',
    tags: '',
    is_featured: false
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch blog posts
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts_2025_11_18_14_00')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) {
        console.error('Posts error:', postsError);
        throw postsError;
      }
      
      setPosts(postsData || []);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories_2025_11_18_14_00')
        .select('*')
        .order('name');

      if (categoriesError) {
        console.error('Categories error:', categoriesError);
        throw categoriesError;
      }
      
      setCategories(categoriesData || []);

    } catch (error: any) {
      console.error('Error fetching blog data:', error);
      setError(error.message || 'Fehler beim Laden der Blog-Daten');
      toast({
        title: 'Fehler beim Laden der Blog-Daten',
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
      .replace(/[äöüß]/g, (match) => {
        const replacements: { [key: string]: string } = {
          'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss'
        };
        return replacements[match] || match;
      })
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!formData.title.trim()) {
        toast({
          title: 'Fehler',
          description: 'Bitte geben Sie einen Titel ein',
          variant: 'destructive'
        });
        return;
      }

      const slug = generateSlug(formData.title);
      const tagsArray = formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
      
      const { data, error } = await supabase
        .from('blog_posts_2025_11_18_14_00')
        .insert([{
          title: formData.title,
          slug: slug,
          excerpt: formData.excerpt,
          content: formData.content,
          featured_image: formData.featured_image,
          author_name: formData.author_name,
          status: formData.status,
          category: formData.category,
          tags: tagsArray,
          is_featured: formData.is_featured,
          published_at: formData.status === 'published' ? new Date().toISOString() : null
        }])
        .select();

      if (error) throw error;

      toast({
        title: 'Blog-Post erstellt',
        description: 'Der Blog-Post wurde erfolgreich erstellt'
      });

      // Reset form
      setFormData({
        title: '',
        excerpt: '',
        content: '',
        featured_image: '',
        author_name: 'Jagdrevier Weetzen',
        status: 'draft',
        category: '',
        tags: '',
        is_featured: false
      });

      setShowCreateForm(false);
      fetchData(); // Refresh data

    } catch (error: any) {
      console.error('Error creating post:', error);
      toast({
        title: 'Fehler beim Erstellen',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'outline' } = {
      draft: 'secondary',
      published: 'default',
      archived: 'outline'
    };
    const labels: { [key: string]: string } = {
      draft: 'Entwurf',
      published: 'Veröffentlicht',
      archived: 'Archiviert'
    };
    return <Badge variant={variants[status] || 'secondary'}>{labels[status] || status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Lade Blog-Daten...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="text-red-500 mb-4">
            <FileText className="h-12 w-12 mx-auto mb-2" />
            <h3 className="text-lg font-semibold">Fehler beim Laden</h3>
          </div>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchData}>
            Erneut versuchen
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (showCreateForm) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Neuen Blog-Post erstellen</h2>
          <Button variant="outline" onClick={() => setShowCreateForm(false)}>
            Zurück zur Übersicht
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Blog-Post Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Blog-Post Titel"
                  required
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Kurzbeschreibung</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Kurze Beschreibung des Artikels"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Inhalt</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Vollständiger Artikel-Inhalt"
                  rows={8}
                />
              </div>

              <div>
                <Label htmlFor="featured_image">Beitragsbild URL</Label>
                <Input
                  id="featured_image"
                  value={formData.featured_image}
                  onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={formData.author_name}
                  onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                  placeholder="Jagdrevier Weetzen"
                />
              </div>

              <div>
                <Label htmlFor="category">Kategorie</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Kategorie wählen" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Keine Kategorie</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags (kommagetrennt)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Jagd, Natur, Wildtiere"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData({ ...formData, status: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Entwurf</SelectItem>
                    <SelectItem value="published">Veröffentlicht</SelectItem>
                    <SelectItem value="archived">Archiviert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
                />
                <Label htmlFor="featured">Als Featured-Post markieren</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Abbrechen
                </Button>
                <Button type="submit">
                  <Save className="h-4 w-4 mr-2" />
                  Blog-Post erstellen
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog-Verwaltung</h2>
        <Button onClick={() => setShowCreateForm(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Neuer Blog-Post
        </Button>
      </div>

      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList>
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Blog-Posts ({posts.length})
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="h-4 w-4" />
            Kategorien ({categories.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {posts.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Keine Blog-Posts vorhanden</h3>
                <p className="text-muted-foreground mb-4">
                  Erstellen Sie Ihren ersten Blog-Post, um zu beginnen.
                </p>
                <Button onClick={() => setShowCreateForm(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Ersten Post erstellen
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">{post.title}</h3>
                          {getStatusBadge(post.status)}
                          {post.is_featured && <Badge variant="secondary">Featured</Badge>}
                        </div>
                        
                        <p className="text-muted-foreground mb-2">{post.excerpt}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {post.view_count} Aufrufe
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
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          {categories.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Keine Kategorien vorhanden</h3>
                <p className="text-muted-foreground mb-4">
                  Erstellen Sie Kategorien für bessere Organisation.
                </p>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Erste Kategorie erstellen
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {categories.map((category) => (
                <Card key={category.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: category.color }}
                          ></div>
                          <h3 className="text-lg font-semibold">{category.name}</h3>
                          <Badge variant="outline">{category.slug}</Badge>
                        </div>
                        <p className="text-muted-foreground">{category.description}</p>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BlogManager;