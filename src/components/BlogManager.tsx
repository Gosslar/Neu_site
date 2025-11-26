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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  FileText, 
  Image, 
  Video, 
  Calendar,
  Tag,
  Globe,
  Save,
  X,
  Upload
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
  meta_title: string;
  meta_description: string;
  view_count: number;
  is_featured: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}

interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  color: string;
}

interface BlogMedia {
  id: string;
  post_id: string;
  media_type: 'image' | 'video';
  media_url: string;
  media_title: string;
  media_description: string;
  media_alt_text: string;
  sort_order: number;
}

const BlogManager = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [showPostDialog, setShowPostDialog] = useState(false);
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<BlogCategory | null>(null);
  const { toast } = useToast();

  const [postForm, setPostForm] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    featured_image: '',
    author_name: 'Ole Gosslar',
    status: 'draft',
    category: '',
    tags: [],
    meta_title: '',
    meta_description: '',
    is_featured: false
  });

  const [categoryForm, setCategoryForm] = useState<Partial<BlogCategory>>({
    name: '',
    slug: '',
    description: '',
    color: '#10b981'
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Fetch blog posts
      const { data: postsData, error: postsError } = await supabase
        .from('blog_posts_2025_11_18_14_00')
        .select('*')
        .order('created_at', { ascending: false });

      if (postsError) throw postsError;
      setPosts(postsData || []);

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from('blog_categories_2025_11_18_14_00')
        .select('*')
        .order('name');

      if (categoriesError) throw categoriesError;
      setCategories(categoriesData || []);

    } catch (error: any) {
      console.error('Error fetching blog data:', error);
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

  const handlePostSubmit = async () => {
    try {
      setSaving(true);

      if (!postForm.title || !postForm.content) {
        toast({
          title: 'Fehler',
          description: 'Titel und Inhalt sind erforderlich',
          variant: 'destructive'
        });
        return;
      }

      const slug = postForm.slug || generateSlug(postForm.title);
      const now = new Date().toISOString();

      const postData = {
        ...postForm,
        slug,
        published_at: postForm.status === 'published' ? (postForm.published_at || now) : null,
        updated_at: now
      };

      if (editingPost) {
        // Update existing post
        const { error } = await supabase
          .from('blog_posts_2025_11_18_14_00')
          .update(postData)
          .eq('id', editingPost.id);

        if (error) throw error;

        toast({
          title: 'Blog-Post aktualisiert',
          description: 'Der Blog-Post wurde erfolgreich aktualisiert'
        });
      } else {
        // Create new post
        const { error } = await supabase
          .from('blog_posts_2025_11_18_14_00')
          .insert([postData]);

        if (error) throw error;

        toast({
          title: 'Blog-Post erstellt',
          description: 'Der neue Blog-Post wurde erfolgreich erstellt'
        });
      }

      setShowPostDialog(false);
      setEditingPost(null);
      resetPostForm();
      fetchData();

    } catch (error: any) {
      console.error('Error saving blog post:', error);
      toast({
        title: 'Fehler beim Speichern',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Sind Sie sicher, dass Sie diesen Blog-Post löschen möchten?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('blog_posts_2025_11_18_14_00')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      toast({
        title: 'Blog-Post gelöscht',
        description: 'Der Blog-Post wurde erfolgreich gelöscht'
      });

      fetchData();
    } catch (error: any) {
      console.error('Error deleting blog post:', error);
      toast({
        title: 'Fehler beim Löschen',
        description: error.message,
        variant: 'destructive'
      });
    }
  };

  const handleCategorySubmit = async () => {
    try {
      setSaving(true);

      if (!categoryForm.name) {
        toast({
          title: 'Fehler',
          description: 'Kategorie-Name ist erforderlich',
          variant: 'destructive'
        });
        return;
      }

      const slug = categoryForm.slug || generateSlug(categoryForm.name);
      const categoryData = { ...categoryForm, slug };

      if (editingCategory) {
        // Update existing category
        const { error } = await supabase
          .from('blog_categories_2025_11_18_14_00')
          .update(categoryData)
          .eq('id', editingCategory.id);

        if (error) throw error;

        toast({
          title: 'Kategorie aktualisiert',
          description: 'Die Kategorie wurde erfolgreich aktualisiert'
        });
      } else {
        // Create new category
        const { error } = await supabase
          .from('blog_categories_2025_11_18_14_00')
          .insert([categoryData]);

        if (error) throw error;

        toast({
          title: 'Kategorie erstellt',
          description: 'Die neue Kategorie wurde erfolgreich erstellt'
        });
      }

      setShowCategoryDialog(false);
      setEditingCategory(null);
      resetCategoryForm();
      fetchData();

    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        title: 'Fehler beim Speichern',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setSaving(false);
    }
  };

  const resetPostForm = () => {
    setPostForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      featured_image: '',
      author_name: 'Ole Gosslar',
      status: 'draft',
      category: '',
      tags: [],
      meta_title: '',
      meta_description: '',
      is_featured: false
    });
    setTagInput('');
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      name: '',
      slug: '',
      description: '',
      color: '#10b981'
    });
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setPostForm(post);
    setTagInput(post.tags?.join(', ') || '');
    setShowPostDialog(true);
  };

  const handleEditCategory = (category: BlogCategory) => {
    setEditingCategory(category);
    setCategoryForm(category);
    setShowCategoryDialog(true);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      const newTags = tagInput.split(',').map(tag => tag.trim()).filter(tag => tag);
      setPostForm(prev => ({
        ...prev,
        tags: [...(prev.tags || []), ...newTags]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setPostForm(prev => ({
      ...prev,
      tags: (prev.tags || []).filter(tag => tag !== tagToRemove)
    }));
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      draft: 'secondary',
      published: 'default',
      archived: 'outline'
    };
    return <Badge variant={variants[status] as any}>{status}</Badge>;
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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog-Verwaltung</h2>
        <div className="flex gap-2">
          <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={() => {
                setEditingCategory(null);
                resetCategoryForm();
              }}>
                <Tag className="h-4 w-4 mr-2" />
                Kategorie hinzufügen
              </Button>
            </DialogTrigger>
          </Dialog>
          
          <Dialog open={showPostDialog} onOpenChange={setShowPostDialog}>
            <DialogTrigger asChild>
              <Button onClick={() => {
                setEditingPost(null);
                resetPostForm();
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Neuer Blog-Post
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
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
                          <Calendar className="h-4 w-4" />
                          {new Date(post.created_at).toLocaleDateString('de-DE')}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {post.view_count} Aufrufe
                        </span>
                        {post.category && (
                          <Badge variant="outline">{post.category}</Badge>
                        )}
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditPost(post)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {posts.length === 0 && (
              <Card>
                <CardContent className="p-8 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Keine Blog-Posts vorhanden</h3>
                  <p className="text-muted-foreground mb-4">
                    Erstellen Sie Ihren ersten Blog-Post, um zu beginnen.
                  </p>
                  <Button onClick={() => setShowPostDialog(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Ersten Post erstellen
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditCategory(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Blog Post Dialog */}
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingPost ? 'Blog-Post bearbeiten' : 'Neuer Blog-Post'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Titel *</Label>
              <Input
                id="title"
                value={postForm.title || ''}
                onChange={(e) => {
                  const title = e.target.value;
                  setPostForm(prev => ({
                    ...prev,
                    title,
                    slug: generateSlug(title)
                  }));
                }}
                placeholder="Blog-Post Titel"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="slug">URL-Slug</Label>
              <Input
                id="slug"
                value={postForm.slug || ''}
                onChange={(e) => setPostForm(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-slug"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Kurzbeschreibung</Label>
            <Textarea
              id="excerpt"
              value={postForm.excerpt || ''}
              onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
              placeholder="Kurze Beschreibung des Blog-Posts..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Inhalt *</Label>
            <Textarea
              id="content"
              value={postForm.content || ''}
              onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
              placeholder="Blog-Post Inhalt..."
              rows={10}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="featured_image">Titelbild URL</Label>
              <Input
                id="featured_image"
                value={postForm.featured_image || ''}
                onChange={(e) => setPostForm(prev => ({ ...prev, featured_image: e.target.value }))}
                placeholder="/images/blog-image.jpg"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="author_name">Autor</Label>
              <Input
                id="author_name"
                value={postForm.author_name || ''}
                onChange={(e) => setPostForm(prev => ({ ...prev, author_name: e.target.value }))}
                placeholder="Autor Name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={postForm.status || 'draft'}
                onValueChange={(value) => setPostForm(prev => ({ ...prev, status: value as any }))}
              >
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
            
            <div className="space-y-2">
              <Label htmlFor="category">Kategorie</Label>
              <Select
                value={postForm.category || ''}
                onValueChange={(value) => setPostForm(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategorie wählen" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Switch
                  checked={postForm.is_featured || false}
                  onCheckedChange={(checked) => setPostForm(prev => ({ ...prev, is_featured: checked }))}
                />
                Featured Post
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                placeholder="Tags eingeben (kommagetrennt)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Hinzufügen
              </Button>
            </div>
            {postForm.tags && postForm.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {postForm.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => removeTag(tag)}>
                    {tag} <X className="h-3 w-3 ml-1" />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="meta_title">SEO Titel</Label>
              <Input
                id="meta_title"
                value={postForm.meta_title || ''}
                onChange={(e) => setPostForm(prev => ({ ...prev, meta_title: e.target.value }))}
                placeholder="SEO optimierter Titel"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="meta_description">SEO Beschreibung</Label>
              <Textarea
                id="meta_description"
                value={postForm.meta_description || ''}
                onChange={(e) => setPostForm(prev => ({ ...prev, meta_description: e.target.value }))}
                placeholder="SEO Beschreibung..."
                rows={3}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowPostDialog(false)}>
              Abbrechen
            </Button>
            <Button onClick={handlePostSubmit} disabled={saving}>
              {saving ? 'Speichere...' : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  {editingPost ? 'Aktualisieren' : 'Erstellen'}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>

      {/* Category Dialog */}
      <Dialog open={showCategoryDialog} onOpenChange={setShowCategoryDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cat_name">Name *</Label>
              <Input
                id="cat_name"
                value={categoryForm.name || ''}
                onChange={(e) => {
                  const name = e.target.value;
                  setCategoryForm(prev => ({
                    ...prev,
                    name,
                    slug: generateSlug(name)
                  }));
                }}
                placeholder="Kategorie Name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cat_slug">URL-Slug</Label>
              <Input
                id="cat_slug"
                value={categoryForm.slug || ''}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="url-slug"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cat_description">Beschreibung</Label>
              <Textarea
                id="cat_description"
                value={categoryForm.description || ''}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Kategorie Beschreibung..."
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cat_color">Farbe</Label>
              <Input
                id="cat_color"
                type="color"
                value={categoryForm.color || '#10b981'}
                onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowCategoryDialog(false)}>
                Abbrechen
              </Button>
              <Button onClick={handleCategorySubmit} disabled={saving}>
                {saving ? 'Speichere...' : (
                  <>
                    <Save className="h-4 w-4 mr-2" />
                    {editingCategory ? 'Aktualisieren' : 'Erstellen'}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManager;