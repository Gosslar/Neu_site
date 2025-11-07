import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Package, ShoppingCart, Users, TrendingUp, Eye } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock_quantity: number;
  is_active: boolean;
  category: {
    id: string;
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

interface Order {
  id: string;
  user_id: string;
  total_amount: number;
  status: string;
  payment_method: string;
  payment_status: string;
  created_at: string;
  customer_info?: any;
  profiles?: {
    full_name: string;
    email: string;
  } | null;
  order_items: {
    quantity: number;
    price: number;
    product: {
      name: string;
    };
  }[];
}

interface User {
  id: string;
  email: string;
  created_at: string;
  profile: {
    full_name: string;
    phone: string;
    address: string;
    is_admin: boolean;
  } | null;
}

const AdminPage = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Product form state
  const [productForm, setProductForm] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    image_url: '',
    stock_quantity: 0,
    category_id: '',
    is_active: true,
  });

  // Category form state
  const [categoryForm, setCategoryForm] = useState({
    id: '',
    name: '',
    description: '',
    image_url: '',
  });

  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      checkAdminStatus();
    }
  }, [user]);

  useEffect(() => {
    if (isAdmin) {
      fetchData();
    }
  }, [isAdmin]);

  const checkAdminStatus = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles_2025_11_07_14_31')
        .select('is_admin')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setIsAdmin(data?.is_admin || false);
    } catch (error: any) {
      console.error('Error checking admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const fetchData = async () => {
    await Promise.all([
      fetchProducts(),
      fetchCategories(),
      fetchOrders(),
      fetchUsers(),
    ]);
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products_2025_11_07_14_31')
        .select(`
          *,
          category:categories_2025_11_07_14_31(id, name)
        `)
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      console.error('Error fetching products:', error);
      toast({
        title: "Fehler beim Laden der Produkte",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories_2025_11_07_14_31')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      toast({
        title: "Fehler beim Laden der Kategorien",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchOrders = async () => {
    try {
      console.log('Fetching orders...');
      
      // First, try to get orders without joins to test basic access
      const { data: basicOrders, error: basicError } = await supabase
        .from('orders_2025_11_07_14_31')
        .select('*')
        .order('created_at', { ascending: false });

      if (basicError) {
        console.error('Basic orders fetch error:', basicError);
        throw basicError;
      }

      console.log('Basic orders fetched:', basicOrders?.length || 0);

      // If basic fetch works, try with joins
      const { data, error } = await supabase
        .from('orders_2025_11_07_14_31')
        .select(`
          *,
          profiles:profiles_2025_11_07_14_31(full_name, email),
          order_items:order_items_2025_11_07_14_31(
            quantity,
            price,
            product:products_2025_11_07_14_31(name)
          )
        `)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Full orders fetch error:', error);
        // Fallback to basic orders if joins fail
        setOrders(basicOrders?.map(order => ({
          ...order,
          profiles: null,
          order_items: []
        })) || []);
        return;
      }

      console.log('Full orders fetched:', data?.length || 0);
      setOrders(data || []);
    } catch (error: any) {
      console.error('Error fetching orders:', error);
      toast({
        title: "Fehler beim Laden der Bestellungen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles_2025_11_07_14_31')
        .select(`
          id,
          email,
          full_name,
          phone,
          address,
          is_admin,
          created_at
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      // Transform data to match User interface
      const transformedUsers = data?.map(profile => ({
        id: profile.id,
        email: profile.email,
        created_at: profile.created_at,
        profile: {
          full_name: profile.full_name || '',
          phone: profile.phone || '',
          address: profile.address || '',
          is_admin: profile.is_admin || false,
        }
      })) || [];
      
      setUsers(transformedUsers);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast({
        title: "Fehler beim Laden der Benutzer",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingProduct) {
        const { error } = await supabase
          .from('products_2025_11_07_14_31')
          .update({
            name: productForm.name,
            description: productForm.description,
            price: productForm.price,
            image_url: productForm.image_url,
            stock_quantity: productForm.stock_quantity,
            category_id: productForm.category_id,
            is_active: productForm.is_active,
          })
          .eq('id', editingProduct);

        if (error) throw error;
        toast({ title: "Produkt aktualisiert" });
      } else {
        const { error } = await supabase
          .from('products_2025_11_07_14_31')
          .insert({
            name: productForm.name,
            description: productForm.description,
            price: productForm.price,
            image_url: productForm.image_url,
            stock_quantity: productForm.stock_quantity,
            category_id: productForm.category_id,
            is_active: productForm.is_active,
          });

        if (error) throw error;
        toast({ title: "Produkt erstellt" });
      }

      resetProductForm();
      fetchProducts();
    } catch (error: any) {
      console.error('Error saving product:', error);
      toast({
        title: "Fehler beim Speichern",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCategorySubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('categories_2025_11_07_14_31')
          .update({
            name: categoryForm.name,
            description: categoryForm.description,
            image_url: categoryForm.image_url,
          })
          .eq('id', editingCategory);

        if (error) throw error;
        toast({ title: "Kategorie aktualisiert" });
      } else {
        const { error } = await supabase
          .from('categories_2025_11_07_14_31')
          .insert({
            name: categoryForm.name,
            description: categoryForm.description,
            image_url: categoryForm.image_url,
          });

        if (error) throw error;
        toast({ title: "Kategorie erstellt" });
      }

      resetCategoryForm();
      fetchCategories();
    } catch (error: any) {
      console.error('Error saving category:', error);
      toast({
        title: "Fehler beim Speichern",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const { error } = await supabase
        .from('products_2025_11_07_14_31')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Produkt gelöscht" });
      fetchProducts();
    } catch (error: any) {
      console.error('Error deleting product:', error);
      toast({
        title: "Fehler beim Löschen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      const { error } = await supabase
        .from('categories_2025_11_07_14_31')
        .delete()
        .eq('id', id);

      if (error) throw error;
      toast({ title: "Kategorie gelöscht" });
      fetchCategories();
    } catch (error: any) {
      console.error('Error deleting category:', error);
      toast({
        title: "Fehler beim Löschen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const editProduct = (product: Product) => {
    setProductForm({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image_url: product.image_url,
      stock_quantity: product.stock_quantity,
      category_id: product.category.id,
      is_active: product.is_active,
    });
    setEditingProduct(product.id);
  };

  const editCategory = (category: Category) => {
    setCategoryForm({
      id: category.id,
      name: category.name,
      description: category.description,
      image_url: category.image_url,
    });
    setEditingCategory(category.id);
  };

  const resetProductForm = () => {
    setProductForm({
      id: '',
      name: '',
      description: '',
      price: 0,
      image_url: '',
      stock_quantity: 0,
      category_id: '',
      is_active: true,
    });
    setEditingProduct(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({
      id: '',
      name: '',
      description: '',
      image_url: '',
    });
    setEditingCategory(null);
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('orders_2025_11_07_14_31')
        .update({ status })
        .eq('id', orderId);

      if (error) throw error;
      toast({ title: "Bestellstatus aktualisiert" });
      fetchOrders();
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast({
        title: "Fehler beim Aktualisieren",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const toggleUserAdminStatus = async (userId: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('profiles_2025_11_07_14_31')
        .update({ is_admin: !currentStatus })
        .eq('id', userId);

      if (error) throw error;
      toast({ 
        title: !currentStatus ? "Admin-Rechte vergeben" : "Admin-Rechte entfernt",
        description: !currentStatus ? "Benutzer ist jetzt Administrator" : "Benutzer ist jetzt normaler Benutzer"
      });
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating user admin status:', error);
      toast({
        title: "Fehler beim Aktualisieren",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const deleteOrder = async (orderId: string) => {
    try {
      // First delete order items
      const { error: itemsError } = await supabase
        .from('order_items_2025_11_07_14_31')
        .delete()
        .eq('order_id', orderId);

      if (itemsError) throw itemsError;

      // Then delete the order
      const { error: orderError } = await supabase
        .from('orders_2025_11_07_14_31')
        .delete()
        .eq('id', orderId);

      if (orderError) throw orderError;

      toast({ title: "Bestellung gelöscht" });
      fetchOrders();
    } catch (error: any) {
      console.error('Error deleting order:', error);
      toast({
        title: "Fehler beim Löschen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const generateDeliveryNote = async (order: Order) => {
    try {
      const { data, error } = await supabase.functions.invoke(
        'generate_cash_delivery_note_2025_11_07_18_05',
        {
          body: { order_id: order.id }
        }
      );

      if (error) {
        throw new Error(error.message || 'Fehler beim Erstellen des Lieferscheins');
      }

      // Create and download the HTML file
      const blob = new Blob([data], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = data.filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Lieferschein erstellt",
        description: "Der Lieferschein wurde als HTML-Datei heruntergeladen. Öffnen Sie diese in Ihrem Browser und drucken Sie sie als PDF.",
      });
    } catch (error: any) {
      console.error('Error generating delivery note:', error);
      toast({
        title: "Fehler beim Erstellen des Lieferscheins",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  // Fallback function for direct HTML generation
  const generateDeliveryNoteLocal = (order: Order) => {
    const customerInfo = order.customer_info && typeof order.customer_info === 'object' 
      ? order.customer_info as any 
      : {};
    
    const customerName = order.profiles?.full_name || customerInfo.fullName || 'Unbekannt';
    const customerEmail = order.profiles?.email || customerInfo.email || 'Keine E-Mail';
    const customerPhone = customerInfo.phone || 'Nicht angegeben';
    const customerAddress = customerInfo.address || 'Nicht angegeben';
    
    const deliveryDate = new Date().toLocaleDateString('de-DE');
    const orderDate = new Date(order.created_at).toLocaleDateString('de-DE');
    
    // Create PDF content
    const pdfContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Lieferschein - Jagdrevier Weetzen</title>
    <style>
        @page {
            margin: 20mm;
            size: A4;
        }
        body {
            font-family: 'Arial', sans-serif;
            line-height: 1.4;
            color: #2d3748;
            margin: 0;
            padding: 0;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 3px solid #2d5016;
        }
        .logo-section {
            flex: 1;
        }
        .company-name {
            font-size: 24px;
            font-weight: bold;
            color: #2d5016;
            margin-bottom: 5px;
        }
        .company-subtitle {
            font-size: 14px;
            color: #4a5568;
        }
        .document-info {
            text-align: right;
            flex: 1;
        }
        .document-title {
            font-size: 28px;
            font-weight: bold;
            color: #2d5016;
            margin-bottom: 10px;
        }
        .document-number {
            font-size: 14px;
            color: #4a5568;
        }
        .info-section {
            display: flex;
            justify-content: space-between;
            margin-bottom: 30px;
        }
        .customer-info, .delivery-info {
            flex: 1;
            margin-right: 20px;
        }
        .section-title {
            font-size: 16px;
            font-weight: bold;
            color: #2d5016;
            margin-bottom: 10px;
            padding-bottom: 5px;
            border-bottom: 1px solid #e2e8f0;
        }
        .info-line {
            margin-bottom: 5px;
            font-size: 14px;
        }
        .items-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 30px;
        }
        .items-table th {
            background-color: #2d5016;
            color: white;
            padding: 12px;
            text-align: left;
            font-weight: bold;
        }
        .items-table td {
            padding: 10px 12px;
            border-bottom: 1px solid #e2e8f0;
        }
        .items-table tr:nth-child(even) {
            background-color: #f7fafc;
        }
        .footer {
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e2e8f0;
            font-size: 12px;
            color: #4a5568;
        }
        .hunting-decoration {
            text-align: center;
            margin: 20px 0;
            font-size: 18px;
            color: #2d5016;
        }
        .payment-info {
            background-color: #f0f4f0;
            padding: 15px;
            border-left: 4px solid #2d5016;
            margin-bottom: 20px;
        }
        .signature-section {
            display: flex;
            justify-content: space-between;
            margin-top: 40px;
        }
        .signature-box {
            width: 200px;
            text-align: center;
        }
        .signature-line {
            border-top: 1px solid #4a5568;
            margin-top: 40px;
            padding-top: 5px;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <div class="logo-section">
            <div class="company-name">🦌 Jagdrevier Weetzen</div>
            <div class="company-subtitle">Premium Wildfleisch & Jagdspezialitäten</div>
        </div>
        <div class="document-info">
            <div class="document-title">LIEFERSCHEIN</div>
            <div class="document-number">Nr. ${order.id.slice(0, 8).toUpperCase()}</div>
        </div>
    </div>

    <div class="info-section">
        <div class="customer-info">
            <div class="section-title">🏠 Kunde</div>
            <div class="info-line"><strong>Name:</strong> ${customerName}</div>
            <div class="info-line"><strong>E-Mail:</strong> ${customerEmail}</div>
            <div class="info-line"><strong>Telefon:</strong> ${customerPhone}</div>
            <div class="info-line"><strong>Adresse:</strong> ${customerAddress}</div>
        </div>
        <div class="delivery-info">
            <div class="section-title">📅 Lieferung</div>
            <div class="info-line"><strong>Bestelldatum:</strong> ${orderDate}</div>
            <div class="info-line"><strong>Lieferdatum:</strong> ${deliveryDate}</div>
            <div class="info-line"><strong>Zahlungsart:</strong> ${order.payment_method === 'cash' ? 'Barzahlung bei Abholung' : 'Kreditkarte'}</div>
            <div class="info-line"><strong>Status:</strong> ${order.status === 'confirmed' ? 'Bestätigt' : order.status === 'pending' ? 'Ausstehend' : order.status}</div>
        </div>
    </div>

    <div class="payment-info">
        <strong>💰 Zahlungshinweis:</strong> 
        ${order.payment_method === 'cash' 
          ? 'Barzahlung bei Abholung der Ware. Bitte halten Sie den entsprechenden Betrag bereit.' 
          : 'Zahlung bereits erfolgt über Kreditkarte.'}
    </div>

    <table class="items-table">
        <thead>
            <tr>
                <th>🥩 Artikel</th>
                <th style="text-align: center;">📦 Menge</th>
                <th>📝 Beschreibung</th>
            </tr>
        </thead>
        <tbody>
            ${order.order_items.map(item => `
                <tr>
                    <td><strong>${item.product?.name || 'Unbekanntes Produkt'}</strong></td>
                    <td style="text-align: center;">${item.quantity} Stück</td>
                    <td>Premium Wildfleisch aus nachhaltiger Jagd</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <div class="hunting-decoration">
        🌲 Aus den Wäldern von Weetzen - Nachhaltig gejagt, frisch geliefert 🌲
    </div>

    <div class="signature-section">
        <div class="signature-box">
            <div class="signature-line">Übergeben von</div>
        </div>
        <div class="signature-box">
            <div class="signature-line">Erhalten von</div>
        </div>
    </div>

    <div class="footer">
        <div style="text-align: center;">
            <strong>Jagdrevier Weetzen</strong> | Nachhaltige Jagd & Premium Wildfleisch<br>
            E-Mail: info@jagd-weetzen.de | Frische Qualität aus der Region<br>
            <em>"Tradition trifft Qualität - Seit Generationen im Einklang mit der Natur"</em>
        </div>
    </div>
</body>
</html>`;

    // Create and download PDF
    const blob = new Blob([pdfContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Lieferschein_${order.id.slice(0, 8)}_${customerName.replace(/\s+/g, '_')}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Lieferschein erstellt",
      description: "Der Lieferschein wurde als HTML-Datei heruntergeladen. Sie können diese in Ihrem Browser öffnen und als PDF drucken.",
    });
  };

  const deleteUser = async (userId: string) => {
    try {
      // First delete the profile
      const { error: profileError } = await supabase
        .from('profiles_2025_11_07_14_31')
        .delete()
        .eq('id', userId);

      if (profileError) throw profileError;

      toast({ title: "Benutzerprofil gelöscht" });
      fetchUsers();
    } catch (error: any) {
      console.error('Error deleting user:', error);
      toast({
        title: "Fehler beim Löschen",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Lade Admin-Panel...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Anmeldung erforderlich</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Bitte melden Sie sich an, um das Admin-Panel zu verwenden.
            </p>
            <Button onClick={() => window.location.href = '/auth'}>
              Anmelden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Zugriff verweigert</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-4">
              Sie haben keine Administratorrechte für diesen Bereich.
            </p>
            <Button onClick={() => window.location.href = '/'}>
              Zur Startseite
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalProducts = products.length;
  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_amount, 0);
  const lowStockProducts = products.filter(p => p.stock_quantity <= 5).length;
  const totalUsers = users.length;
  const adminUsers = users.filter(u => u.profile?.is_admin).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin-Panel</h1>
          <Badge variant="secondary">Administrator</Badge>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Produkte</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                {lowStockProducts} mit niedrigem Lagerbestand
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bestellungen</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalOrders}</div>
              <p className="text-xs text-muted-foreground">
                Gesamt
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Umsatz</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{totalRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Gesamtumsatz
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Benutzer</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                {adminUsers} Administratoren
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="products">Produkte</TabsTrigger>
            <TabsTrigger value="categories">Kategorien</TabsTrigger>
            <TabsTrigger value="orders">Bestellungen</TabsTrigger>
            <TabsTrigger value="users">Benutzer</TabsTrigger>
          </TabsList>

          {/* Products Tab */}
          <TabsContent value="products">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Produktverwaltung</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={resetProductForm}>
                        <Plus className="mr-2 h-4 w-4" />
                        Neues Produkt
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>
                          {editingProduct ? 'Produkt bearbeiten' : 'Neues Produkt'}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="name">Name</Label>
                            <Input
                              id="name"
                              value={productForm.name}
                              onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="price">Preis (€)</Label>
                            <Input
                              id="price"
                              type="number"
                              step="0.01"
                              value={productForm.price}
                              onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="description">Beschreibung</Label>
                          <Textarea
                            id="description"
                            value={productForm.description}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="category">Kategorie</Label>
                            <Select
                              value={productForm.category_id}
                              onValueChange={(value) => setProductForm({ ...productForm, category_id: value })}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Kategorie wählen" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.id} value={category.id}>
                                    {category.name}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="stock">Lagerbestand</Label>
                            <Input
                              id="stock"
                              type="number"
                              value={productForm.stock_quantity}
                              onChange={(e) => setProductForm({ ...productForm, stock_quantity: parseInt(e.target.value) })}
                              required
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="image">Bild-URL</Label>
                          <Input
                            id="image"
                            value={productForm.image_url}
                            onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                            placeholder="/images/product.jpg"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="active"
                            checked={productForm.is_active}
                            onChange={(e) => setProductForm({ ...productForm, is_active: e.target.checked })}
                          />
                          <Label htmlFor="active">Aktiv</Label>
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={resetProductForm}>
                            Abbrechen
                          </Button>
                          <Button type="submit">
                            {editingProduct ? 'Aktualisieren' : 'Erstellen'}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bild</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Kategorie</TableHead>
                      <TableHead>Preis</TableHead>
                      <TableHead>Lager</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </TableCell>
                        <TableCell className="font-medium">{product.name}</TableCell>
                        <TableCell>{product.category.name}</TableCell>
                        <TableCell>€{product.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant={product.stock_quantity <= 5 ? "destructive" : "secondary"}>
                            {product.stock_quantity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={product.is_active ? "default" : "secondary"}>
                            {product.is_active ? 'Aktiv' : 'Inaktiv'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => editProduct(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Produkt bearbeiten</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleProductSubmit} className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-name">Name</Label>
                                      <Input
                                        id="edit-name"
                                        value={productForm.name}
                                        onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                                        required
                                      />
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-price">Preis (€)</Label>
                                      <Input
                                        id="edit-price"
                                        type="number"
                                        step="0.01"
                                        value={productForm.price}
                                        onChange={(e) => setProductForm({ ...productForm, price: parseFloat(e.target.value) })}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-description">Beschreibung</Label>
                                    <Textarea
                                      id="edit-description"
                                      value={productForm.description}
                                      onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                                      rows={3}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <Label htmlFor="edit-category">Kategorie</Label>
                                      <Select
                                        value={productForm.category_id}
                                        onValueChange={(value) => setProductForm({ ...productForm, category_id: value })}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Kategorie wählen" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {categories.map((category) => (
                                            <SelectItem key={category.id} value={category.id}>
                                              {category.name}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div>
                                      <Label htmlFor="edit-stock">Lagerbestand</Label>
                                      <Input
                                        id="edit-stock"
                                        type="number"
                                        value={productForm.stock_quantity}
                                        onChange={(e) => setProductForm({ ...productForm, stock_quantity: parseInt(e.target.value) })}
                                        required
                                      />
                                    </div>
                                  </div>
                                  <div>
                                    <Label htmlFor="edit-image">Bild-URL</Label>
                                    <Input
                                      id="edit-image"
                                      value={productForm.image_url}
                                      onChange={(e) => setProductForm({ ...productForm, image_url: e.target.value })}
                                      placeholder="/images/product.jpg"
                                    />
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="checkbox"
                                      id="edit-active"
                                      checked={productForm.is_active}
                                      onChange={(e) => setProductForm({ ...productForm, is_active: e.target.checked })}
                                    />
                                    <Label htmlFor="edit-active">Aktiv</Label>
                                  </div>
                                  <div className="flex justify-end space-x-2">
                                    <Button type="button" variant="outline" onClick={resetProductForm}>
                                      Abbrechen
                                    </Button>
                                    <Button type="submit">Aktualisieren</Button>
                                  </div>
                                </form>
                              </DialogContent>
                            </Dialog>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Produkt löschen</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Sind Sie sicher, dass Sie "{product.name}" löschen möchten? 
                                    Diese Aktion kann nicht rückgängig gemacht werden.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                  <AlertDialogAction onClick={() => deleteProduct(product.id)}>
                                    Löschen
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Categories Tab */}
          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Kategorienverwaltung</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button onClick={resetCategoryForm}>
                        <Plus className="mr-2 h-4 w-4" />
                        Neue Kategorie
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          {editingCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie'}
                        </DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleCategorySubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="cat-name">Name</Label>
                          <Input
                            id="cat-name"
                            value={categoryForm.name}
                            onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="cat-description">Beschreibung</Label>
                          <Textarea
                            id="cat-description"
                            value={categoryForm.description}
                            onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                            rows={3}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cat-image">Bild-URL</Label>
                          <Input
                            id="cat-image"
                            value={categoryForm.image_url}
                            onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                            placeholder="/images/category.jpg"
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={resetCategoryForm}>
                            Abbrechen
                          </Button>
                          <Button type="submit">
                            {editingCategory ? 'Aktualisieren' : 'Erstellen'}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {categories.map((category) => (
                    <Card key={category.id}>
                      <CardContent className="p-4">
                        <div className="aspect-video relative overflow-hidden rounded-md mb-4">
                          <img
                            src={category.image_url}
                            alt={category.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h3 className="font-semibold mb-2">{category.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          {category.description}
                        </p>
                        <div className="flex justify-end space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => editCategory(category)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Kategorie bearbeiten</DialogTitle>
                              </DialogHeader>
                              <form onSubmit={handleCategorySubmit} className="space-y-4">
                                <div>
                                  <Label htmlFor="edit-cat-name">Name</Label>
                                  <Input
                                    id="edit-cat-name"
                                    value={categoryForm.name}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                                    required
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-cat-description">Beschreibung</Label>
                                  <Textarea
                                    id="edit-cat-description"
                                    value={categoryForm.description}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                                    rows={3}
                                  />
                                </div>
                                <div>
                                  <Label htmlFor="edit-cat-image">Bild-URL</Label>
                                  <Input
                                    id="edit-cat-image"
                                    value={categoryForm.image_url}
                                    onChange={(e) => setCategoryForm({ ...categoryForm, image_url: e.target.value })}
                                    placeholder="/images/category.jpg"
                                  />
                                </div>
                                <div className="flex justify-end space-x-2">
                                  <Button type="button" variant="outline" onClick={resetCategoryForm}>
                                    Abbrechen
                                  </Button>
                                  <Button type="submit">Aktualisieren</Button>
                                </div>
                              </form>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Kategorie löschen</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Sind Sie sicher, dass Sie "{category.name}" löschen möchten? 
                                  Alle Produkte in dieser Kategorie werden ebenfalls betroffen.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteCategory(category.id)}>
                                  Löschen
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Bestellverwaltung</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bestellung</TableHead>
                      <TableHead>Kunde</TableHead>
                      <TableHead>Datum</TableHead>
                      <TableHead>Betrag</TableHead>
                      <TableHead>Zahlung</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-8">
                          <div className="text-muted-foreground">
                            <p className="text-lg mb-2">Keine Bestellungen vorhanden</p>
                            <p className="text-sm">Bestellungen werden hier angezeigt, sobald Kunden etwas bestellen.</p>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : (
                      orders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">
                          #{order.id.slice(0, 8)}
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">
                              {order.profiles?.full_name || 
                               (order.customer_info && typeof order.customer_info === 'object' 
                                 ? (order.customer_info as any).fullName 
                                 : 'Unbekannt')}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.profiles?.email || 
                               (order.customer_info && typeof order.customer_info === 'object' 
                                 ? (order.customer_info as any).email 
                                 : 'Keine E-Mail')}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {new Date(order.created_at).toLocaleDateString('de-DE')}
                        </TableCell>
                        <TableCell>€{order.total_amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <Badge variant={order.payment_method === 'cash' ? 'secondary' : 'default'}>
                              {order.payment_method === 'cash' ? 'Barzahlung' : 'Kreditkarte'}
                            </Badge>
                            <Badge variant={order.payment_status === 'completed' ? 'default' : 'destructive'} className="text-xs">
                              {order.payment_status === 'completed' ? 'Bezahlt' : 'Ausstehend'}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger className="w-32">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Ausstehend</SelectItem>
                              <SelectItem value="confirmed">Bestätigt</SelectItem>
                              <SelectItem value="shipped">Versandt</SelectItem>
                              <SelectItem value="delivered">Geliefert</SelectItem>
                              <SelectItem value="cancelled">Storniert</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => generateDeliveryNote(order)}
                              title="Lieferschein erstellen"
                            >
                              📄
                            </Button>
                            <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Bestelldetails #{order.id.slice(0, 8)}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <div>
                                  <h4 className="font-semibold mb-2">Kunde</h4>
                                  <p>
                                    {order.profiles?.full_name || 
                                     (order.customer_info && typeof order.customer_info === 'object' 
                                       ? (order.customer_info as any).fullName 
                                       : 'Unbekannt')}
                                  </p>
                                  <p className="text-sm text-muted-foreground">
                                    {order.profiles?.email || 
                                     (order.customer_info && typeof order.customer_info === 'object' 
                                       ? (order.customer_info as any).email 
                                       : 'Keine E-Mail')}
                                  </p>
                                  {order.customer_info && typeof order.customer_info === 'object' && (
                                    <div className="mt-2 text-sm">
                                      <p>Telefon: {(order.customer_info as any).phone || 'Nicht angegeben'}</p>
                                      <p>Adresse: {(order.customer_info as any).address || 'Nicht angegeben'}</p>
                                    </div>
                                  )}
                                </div>
                                <Separator />
                                <div>
                                  <h4 className="font-semibold mb-2">Bestellte Artikel</h4>
                                  <div className="space-y-2">
                                    {order.order_items.map((item, index) => (
                                      <div key={index} className="flex justify-between">
                                        <span>{item.product.name} x {item.quantity}</span>
                                        <span>€{(item.price * item.quantity).toFixed(2)}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-semibold">
                                  <span>Gesamt:</span>
                                  <span>€{order.total_amount.toFixed(2)}</span>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="outline" size="sm" title="Bestellung löschen">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Bestellung löschen</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Sind Sie sicher, dass Sie die Bestellung #{order.id.slice(0, 8)} löschen möchten? 
                                  Diese Aktion kann nicht rückgängig gemacht werden.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                <AlertDialogAction onClick={() => deleteOrder(order.id)}>
                                  Löschen
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Benutzerverwaltung</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>E-Mail</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Registriert</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Aktionen</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.email}</TableCell>
                        <TableCell>{user.profile?.full_name || 'Nicht angegeben'}</TableCell>
                        <TableCell>
                          {new Date(user.created_at).toLocaleDateString('de-DE')}
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.profile?.is_admin ? "default" : "secondary"}>
                            {user.profile?.is_admin ? 'Administrator' : 'Benutzer'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => toggleUserAdminStatus(user.id, user.profile?.is_admin || false)}
                            >
                              {user.profile?.is_admin ? 'Admin entfernen' : 'Admin machen'}
                            </Button>
                            {user.id !== user.id && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button variant="outline" size="sm">
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Benutzer löschen</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Sind Sie sicher, dass Sie den Benutzer "{user.email}" löschen möchten? 
                                      Diese Aktion kann nicht rückgängig gemacht werden.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => deleteUser(user.id)}>
                                      Löschen
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;