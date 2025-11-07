import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Banknote } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutForm = () => {
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({ ...prev, email: user.email || '' }));
    }
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!formData.fullName || !formData.email || !formData.phone) {
      toast({
        title: "Fehler",
        description: "Bitte füllen Sie alle Pflichtfelder aus.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create order with cash payment
      const { data: orderData, error: orderError } = await supabase.functions.invoke(
        'process_cash_order_2025_11_07_18_05',
        {
          body: {
            user_id: user?.id || null, // Allow guest orders
            items: items,
            total_amount: getTotalPrice(),
            customer_info: formData
          }
        }
      );

      if (orderError) {
        throw new Error(orderError.message || 'Fehler beim Erstellen der Bestellung');
      }

      toast({
        title: "Bestellung erfolgreich!",
        description: "Ihre Bestellung wurde aufgenommen. Sie können bei Abholung bar bezahlen.",
      });

      clearCart();
      navigate('/shop');
    } catch (error: any) {
      console.error('Order error:', error);
      toast({
        title: "Fehler bei der Bestellung",
        description: error.message || "Ein unerwarteter Fehler ist aufgetreten.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Bestellübersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.quantity} × €{item.product.price.toFixed(2)}
                    </p>
                  </div>
                </div>
                <span className="font-medium">
                  €{(item.product.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Gesamt:</span>
              <span>€{getTotalPrice().toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle>Kundendaten</CardTitle>
          {!user && (
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mt-2">
              <p className="text-sm text-blue-800">
                👤 <strong>Gastbestellung:</strong> Sie können auch ohne Anmeldung bestellen. 
                Ihre Daten werden nur für diese Bestellung verwendet.
              </p>
            </div>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Vollständiger Name *</Label>
              <Input
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">E-Mail-Adresse *</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Telefonnummer *</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="address">Adresse</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Straße, Hausnummer, PLZ Ort"
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Banknote className="mr-2 h-5 w-5" />
            Zahlungsart
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 p-4 border rounded-lg bg-green-50 border-green-200">
            <Banknote className="h-5 w-5 text-green-600" />
            <div className="flex-1">
              <div className="font-medium text-green-800">Barzahlung bei Abholung</div>
              <div className="text-sm text-green-600">
                Zahlung vor Ort bei Abholung der Ware. Keine Vorauszahlung erforderlich.
              </div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-md">
            <p className="text-sm text-amber-800">
              <strong>💡 Hinweis:</strong> Nach Ihrer Bestellung erhalten Sie eine Bestätigung. 
              Die Ware wird für Sie bereitgestellt und Sie bezahlen bei der Abholung.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={loading || items.length === 0}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Bestellung wird erstellt...
          </div>
        ) : (
          `Bestellung aufgeben - €${getTotalPrice().toFixed(2)} (Barzahlung bei Abholung)`
        )}
      </Button>
    </form>
  );
};

const CheckoutPage = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            onClick={() => navigate('/shop')}
            className="mb-8"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Zurück zum Shop
          </Button>

          <Card className="text-center py-12">
            <CardContent>
              <Banknote className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h2 className="text-2xl font-bold mb-4">Ihr Warenkorb ist leer</h2>
              <p className="text-muted-foreground mb-6">
                Fügen Sie Artikel zu Ihrem Warenkorb hinzu, um eine Bestellung aufzugeben.
              </p>
              <Button onClick={() => navigate('/shop')} size="lg">
                Jetzt einkaufen
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zum Warenkorb
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Kasse</h1>
          <p className="text-muted-foreground">
            Vervollständigen Sie Ihre Bestellung mit Barzahlung bei Abholung
          </p>
        </div>

        <CheckoutForm />
      </div>
    </div>
  );
};

export default CheckoutPage;