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
  const { toast } = useToast();

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
        <Button>
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
                <Button>
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