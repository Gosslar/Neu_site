import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Phone, MapPin, Building, User, FileText } from 'lucide-react';

const ImpressumPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Impressum</h1>
          <p className="text-xl text-muted-foreground">
            Angaben gemäß § 5 TMG
          </p>
        </div>

        {/* Hauptinhalt */}
        <div className="space-y-8">
          {/* Verantwortlicher */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-6 w-6 text-primary" />
                Verantwortlich für den Inhalt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="font-semibold">Ole Gosslar</p>
                    <p className="text-muted-foreground">Inhaber Jagdrevier Weetzen</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p>Am Denkmal 16</p>
                    <p>30952 Ronnenberg</p>
                    <p>Deutschland</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kontaktdaten */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-6 w-6 text-primary" />
                Kontakt
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">Telefon:</p>
                    <p className="text-muted-foreground">+49 (0) 5109 123456</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-semibold">E-Mail:</p>
                    <p className="text-muted-foreground">info@jagd-weetzen.de</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Haftungsausschluss */}
          <Card>
            <CardHeader>
              <CardTitle>Haftungsausschluss</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Haftung für Inhalte</h3>
                  <p>
                    Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den 
                    allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht 
                    unter der Verpflichtung, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach 
                    Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Haftung für Links</h3>
                  <p>
                    Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. 
                    Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten 
                    Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Urheberrecht</h3>
                  <p>
                    Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen 
                    Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der 
                    Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Streitschlichtung */}
          <Card>
            <CardHeader>
              <CardTitle>Streitschlichtung</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                <a href="https://ec.europa.eu/consumers/odr/" className="text-primary hover:underline ml-1" target="_blank" rel="noopener noreferrer">
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br /><br />
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ImpressumPage;