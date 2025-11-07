import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, CreditCard, Lock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
}

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
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

    if (!stripe || !elements || !user) {
      toast({
        title: "Fehler",
        description: "Zahlungssystem wird initialisiert oder Sie sind nicht angemeldet.",
        variant: "destructive",
      });
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast({
        title: "Fehler",
        description: "Kreditkartenformular wurde nicht korrekt geladen.",
        variant: "destructive",
      });
      return;
    }

    if (items.length === 0) {
      toast({
        title: "Warenkorb leer",
        description: "Ihr Warenkorb ist leer.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // Create payment intent
      const { data: paymentData, error: paymentError } = await supabase.functions.invoke(
        'create_payment_intent_2025_11_07_14_31',
        {
          body: {
            amount: getTotalPrice(),
            currency: 'eur',
            metadata: {
              user_id: user.id,
              order_type: 'webshop'
            }
          }
        }
      );

      if (paymentError) {
        throw new Error(paymentError.message);
      }

      if (!paymentData?.client_secret) {
        throw new Error('Ungültige Zahlungskonfiguration vom Server erhalten.');
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        paymentData.client_secret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: formData.fullName,
              email: formData.email,
              phone: formData.phone,
              address: {
                line1: formData.address,
              },
            },
          },
        }
      );

      if (stripeError) {
        throw new Error(stripeError.message || 'Zahlungsverarbeitung fehlgeschlagen');
      }

      if (paymentIntent?.status === 'succeeded') {
        // Process order
        const cartItems = items.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          price: item.product.price
        }));

        const { error: orderError } = await supabase.functions.invoke(
          'process_order_2025_11_07_14_31',
          {
            body: {
              payment_intent_id: paymentIntent.id,
              cart_items: cartItems,
              shipping_address: formData.address,
              total_amount: getTotalPrice()
            }
          }
        );

        if (orderError) {
          console.error('Order processing error:', orderError);
          toast({
            title: "Warnung",
            description: "Zahlung erfolgreich, aber Bestellbestätigung fehlgeschlagen. Bitte kontaktieren Sie uns.",
            variant: "destructive",
          });
        } else {
          await clearCart();
          toast({
            title: "Bestellung erfolgreich!",
            description: "Ihre Zahlung wurde verarbeitet und die Bestellung wurde aufgegeben.",
          });
        }

        navigate('/profile');
      } else {
        throw new Error(`Zahlungsstatus abnormal: ${paymentIntent?.status}`);
      }

    } catch (error: any) {
      console.error('Checkout error:', error);
      toast({
        title: "Zahlungsfehler",
        description: error.message || 'Ein unbekannter Fehler ist aufgetreten.',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Shipping Information */}
      <Card>
        <CardHeader>
          <CardTitle>Lieferinformationen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <Label htmlFor="phone">Telefonnummer</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Label htmlFor="address">Lieferadresse *</Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Straße, Hausnummer, PLZ, Ort"
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2 h-5 w-5" />
            Zahlungsinformationen
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label>Kreditkarteninformationen *</Label>
              <div className="border rounded-md p-3 bg-background">
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: 'hsl(var(--foreground))',
                        '::placeholder': {
                          color: 'hsl(var(--muted-foreground))',
                        },
                      },
                      invalid: {
                        color: 'hsl(var(--destructive))',
                      },
                    },
                  }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Testkarte: 4242 4242 4242 4242 | Ablauf: Beliebiges zukünftiges Datum | CVC: Beliebige 3 Ziffern
              </p>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Lock className="mr-2 h-4 w-4" />
              Ihre Zahlungsinformationen sind sicher verschlüsselt
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full"
        disabled={!stripe || loading || items.length === 0}
      >
        {loading ? (
          <div className="flex items-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Zahlung wird verarbeitet...
          </div>
        ) : (
          `Jetzt bezahlen - €${getTotalPrice().toFixed(2)}`
        )}
      </Button>
    </form>
  );
};

const CheckoutPage = () => {
  const { items, getTotalPrice, getTotalItems } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Anmeldung erforderlich</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Bitte melden Sie sich an, um eine Bestellung aufzugeben.
            </p>
            <Button onClick={() => navigate('/auth')} className="w-full">
              Anmelden
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle>Warenkorb ist leer</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Fügen Sie Artikel zu Ihrem Warenkorb hinzu, bevor Sie zur Kasse gehen.
            </p>
            <Button onClick={() => navigate('/shop')} className="w-full">
              Jetzt einkaufen
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button
          variant="ghost"
          onClick={() => navigate('/cart')}
          className="mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Zurück zum Warenkorb
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold mb-6">Kasse</h1>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Bestellübersicht</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="flex-1">
                        {item.product.name} × {item.quantity}
                      </span>
                      <span>€{(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex justify-between">
                  <span>Zwischensumme ({getTotalItems()} Artikel):</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Versand:</span>
                  <span>Kostenlos</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Gesamt:</span>
                  <span>€{getTotalPrice().toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;