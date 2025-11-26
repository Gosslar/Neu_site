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
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Tag,
  Save,
  X
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
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showCreateCategory, setShowCreateCategory] = useState(false);
  const { toast } = useToast();

  // Form states for new post
  const [newPost, setNewPost] = useState({
    title: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: '',
    status: 'draft' as 'draft' | 'published' | 'archived',
    category: '',
    tags: [] as string[],
    is_featured: false
  });

  // Form states for new category
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
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

  const createPost = async () => {
    try {
      if (!newPost.title.trim()) {
        toast({
          title: 'Fehler',
          description: 'Bitte geben Sie einen Titel ein',
          variant: 'destructive'
        });
        return;
      }

      const slug = generateSlug(newPost.title);
      
      const { data, error } = await supabase
        .from('blog_posts_2025_11_18_14_00')
        .insert([{
          title: newPost.title,
          slug: slug,
          excerpt: newPost.excerpt,
          content: newPost.content,
          featured_image: newPost.featured_image,
          author_name: newPost.author_name || 'Jagdrevier Weetzen',
          status: newPost.status,
          category: newPost.category,
          tags: newPost.tags,
          is_featured: newPost.is_featured,
          published_at: newPost.status === 'published' ? new Date().toISOString() : null
        }])
        .select();

      if (error) throw error;

      toast({
        title: 'Blog-Post erstellt',
        description: 'Der Blog-Post wurde erfolgreich erstellt'
      });

      // Reset form
      setNewPost({
        title: '',
        excerpt: '',
        content: '',
        featured_image: '',
        author_name: '',
        status: 'draft',
        category: '',
        tags: [],
        is_featured: false
      });

      setShowCreatePost(false);
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

  const createCategory = async () => {
    try {
      if (!newCategory.name.trim()) {
        toast({
          title: 'Fehler',
          description: 'Bitte geben Sie einen Namen ein',
          variant: 'destructive'
        });
        return;
      }

      const slug = generateSlug(newCategory.name);
      
      const { data, error } = await supabase
        .from('blog_categories_2025_11_18_14_00')
        .insert([{
          name: newCategory.name,
          slug: slug,
          description: newCategory.description,
          color: newCategory.color
        }])
        .select();

      if (error) throw error;

      toast({
        title: 'Kategorie erstellt',
        description: 'Die Kategorie wurde erfolgreich erstellt'
      });

      // Reset form
      setNewCategory({
        name: '',
        description: '',
        color: '#3B82F6'
      });

      setShowCreateCategory(false);
      fetchData(); // Refresh data

    } catch (error: any) {
      console.error('Error creating category:', error);
      toast({
        title: 'Fehler beim Erstellen',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleTagInput = (value: string) => {
    const tags = value.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0);
    setNewPost({ ...newPost, tags });
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: 'default' | 'secondary' | 'outline' } = {
      draft: 'secondary',
      published: 'default',
      archived: 'outline'
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog-Verwaltung</h2>
        <Dialog open={showCreatePost} onOpenChange={setShowCreatePost}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Blog-Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Neuen Blog-Post erstellen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Titel *</Label>
                <Input
                  id="title"
                  value={newPost.title}
                  onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                  placeholder="Blog-Post Titel"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Kurzbeschreibung</Label>
                <Textarea
                  id="excerpt"
                  value={newPost.excerpt}
                  onChange={(e) => setNewPost({ ...newPost, excerpt: e.target.value })}
                  placeholder="Kurze Beschreibung des Artikels"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="content">Inhalt</Label>
                <Textarea
                  id="content"
                  value={newPost.content}
                  onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                  placeholder="Vollständiger Artikel-Inhalt"
                  rows={8}
                />
              </div>

              <div>
                <Label htmlFor="featured_image">Beitragsbild URL</Label>
                <Input
                  id="featured_image"
                  value={newPost.featured_image}
                  onChange={(e) => setNewPost({ ...newPost, featured_image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <Label htmlFor="author">Autor</Label>
                <Input
                  id="author"
                  value={newPost.author_name}
                  onChange={(e) => setNewPost({ ...newPost, author_name: e.target.value })}
                  placeholder="Jagdrevier Weetzen"
                />
              </div>

              <div>
                <Label htmlFor="category">Kategorie</Label>
                <Select value={newPost.category} onValueChange={(value) => setNewPost({ ...newPost, category: value })}>
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
                  value={newPost.tags.join(', ')}
                  onChange={(e) => handleTagInput(e.target.value)}
                  placeholder="Jagd, Natur, Wildtiere"
                />
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={newPost.status} onValueChange={(value: 'draft' | 'published' | 'archived') => setNewPost({ ...newPost, status: value })}>
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
                  checked={newPost.is_featured}
                  onCheckedChange={(checked) => setNewPost({ ...newPost, is_featured: checked })}
                />
                <Label htmlFor="featured">Als Featured-Post markieren</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setShowCreatePost(false)}>
                  Abbrechen
                </Button>
                <Button onClick={createPost}>
                  <Save className="h-4 w-4 mr-2" />
                  Erstellen
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
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
                <Button onClick={() => setShowCreatePost(true)}>
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
          <div className="flex justify-end">
            <Dialog open={showCreateCategory} onOpenChange={setShowCreateCategory}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Neue Kategorie
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Neue Kategorie erstellen</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="cat-name">Name *</Label>
                    <Input
                      id="cat-name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="Kategorie-Name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="cat-desc">Beschreibung</Label>
                    <Textarea
                      id="cat-desc"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      placeholder="Beschreibung der Kategorie"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="cat-color">Farbe</Label>
                    <Input
                      id="cat-color"
                      type="color"
                      value={newCategory.color}
                      onChange={(e) => setNewCategory({ ...newCategory, color: e.target.value })}
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-4">
                    <Button variant="outline" onClick={() => setShowCreateCategory(false)}>
                      Abbrechen
                    </Button>
                    <Button onClick={createCategory}>
                      <Save className="h-4 w-4 mr-2" />
                      Erstellen
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {categories.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Keine Kategorien vorhanden</h3>
                <p className="text-muted-foreground mb-4">
                  Erstellen Sie Kategorien für bessere Organisation.
                </p>
                <Button onClick={() => setShowCreateCategory(true)}>
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