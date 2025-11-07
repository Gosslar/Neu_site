import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  Plane, 
  Camera, 
  MapPin, 
  Clock, 
  Users, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Thermometer,
  Search,
  HandHeart,
  GraduationCap,
  DollarSign,
  Package,
  MapPinned,
  Phone,
  Calendar,
  Target,
  Zap
} from 'lucide-react';

const RehkitzrettungPage = () => {
  const [activeTab, setActiveTab] = useState('startseite');

  // Aktuelle Statistiken
  const currentStats = [
    { label: 'Gerettete Rehkitze 2024', value: '247', icon: <Heart className="h-6 w-6" />, trend: '+23%' },
    { label: 'Aktive Einsätze', value: '12', icon: <Clock className="h-6 w-6" />, urgent: true },
    { label: 'Abgesuchte Hektar', value: '1.850', icon: <MapPin className="h-6 w-6" />, trend: '+15%' },
    { label: 'Freiwillige Helfer', value: '67', icon: <Users className="h-6 w-6" />, trend: '+8' },
  ];

  // Problem-Fakten
  const problemFacts = [
    {
      title: 'Mahdsaison-Gefahr',
      description: 'Mai bis Juli: Höchste Gefahr für Rehkitze während der ersten Lebenswoche',
      icon: <Calendar className="h-8 w-8 text-red-600" />,
      severity: 'Kritisch'
    },
    {
      title: 'Instinktverhalten',
      description: 'Rehkitze ducken sich bei Gefahr und fliehen nicht - fataler Instinkt bei Mäharbeiten',
      icon: <Shield className="h-8 w-8 text-orange-600" />,
      severity: 'Hoch'
    },
    {
      title: 'Zeitfenster',
      description: 'Nur 2-3 Stunden am frühen Morgen für effektive Wärmebildsuche',
      icon: <Clock className="h-8 w-8 text-yellow-600" />,
      severity: 'Zeitkritisch'
    }
  ];

  // Rettungsmethoden
  const rescueMethods = [
    {
      method: 'Drohneneinsatz',
      description: 'Wärmebildkameras erkennen Rehkitze aus der Luft - modernste und effektivste Methode',
      effectiveness: '95%',
      timeRequired: '30-45 Min/ha',
      icon: <Plane className="h-8 w-8 text-blue-600" />,
      advantages: ['Schnelle Flächenabdeckung', 'Präzise Erkennung', 'Stressfreie Suche']
    },
    {
      method: 'Vergrämung',
      description: 'Flatterbänder und Duftstoffe vertreiben Rehgeißen vor der Mahd',
      effectiveness: '70%',
      timeRequired: '1-2 Tage vorher',
      icon: <Zap className="h-8 w-8 text-green-600" />,
      advantages: ['Präventive Maßnahme', 'Kostengünstig', 'Einfache Anwendung']
    },
    {
      method: 'Fußsuche',
      description: 'Traditionelle Absuche zu Fuß mit Hunden - zeitaufwendig aber gründlich',
      effectiveness: '80%',
      timeRequired: '2-3 Std/ha',
      icon: <Search className="h-8 w-8 text-purple-600" />,
      advantages: ['Gründliche Suche', 'Keine Technik nötig', 'Bewährte Methode']
    }
  ];

  // Hilfs-Optionen
  const helpOptions = [
    {
      title: 'Freiwilliger Helfer werden',
      description: 'Unterstützen Sie uns bei Einsätzen in der Mahdsaison',
      requirements: ['Früh aufstehen (4:00 Uhr)', 'Körperliche Fitness', 'Teamfähigkeit'],
      icon: <HandHeart className="h-8 w-8 text-blue-600" />,
      action: 'Jetzt anmelden'
    },
    {
      title: 'Ausbildung zum Rehkitzretter',
      description: 'Lernen Sie Drohnenbedienung und Rettungstechniken',
      requirements: ['Drohnenführerschein', '2-tägiger Kurs', 'Praktische Übungen'],
      icon: <GraduationCap className="h-8 w-8 text-green-600" />,
      action: 'Kurs buchen'
    },
    {
      title: 'Spenden',
      description: 'Unterstützen Sie uns finanziell für Equipment und Einsätze',
      requirements: ['Drohnen: 15.000€', 'Wärmebildkamera: 8.000€', 'Einsatzkosten: 200€/Tag'],
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      action: 'Spenden'
    },
    {
      title: 'Equipment bereitstellen',
      description: 'Stellen Sie Ausrüstung oder Fahrzeuge zur Verfügung',
      requirements: ['Geländefahrzeuge', 'Drohnen', 'Transportboxen'],
      icon: <Package className="h-8 w-8 text-purple-600" />,
      action: 'Equipment anbieten'
    }
  ];

  const renderStartseite = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <div className="flex justify-center mb-6">
          <Heart className="h-20 w-20 text-red-500" />
        </div>
        <h1 className="text-5xl font-bold mb-4 text-red-600">Jedes Rehkitz zählt</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          Mit modernster Drohnen-Technologie retten wir Rehkitze vor dem Mähtod. 
          Jede Minute zählt - jedes Leben ist wertvoll.
        </p>
        
        {/* Notfall Button */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
            <h2 className="text-2xl font-bold text-red-800">Notfall-Meldung</h2>
          </div>
          <p className="text-red-700 mb-4">
            Mähen Sie morgen früh? Melden Sie sich JETZT - wir helfen sofort!
          </p>
          <Button size="lg" className="bg-red-600 hover:bg-red-700">
            <Phone className="mr-2 h-5 w-5" />
            Sofort anrufen: 0151 123 456 78
          </Button>
        </div>
      </div>

      {/* Aktuelle Statistiken */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {currentStats.map((stat, index) => (
          <Card key={index} className={`text-center ${stat.urgent ? 'border-red-500 bg-red-50' : ''}`}>
            <CardContent className="pt-6">
              <div className={`flex justify-center mb-2 ${stat.urgent ? 'text-red-600' : 'text-green-600'}`}>
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
              {stat.trend && (
                <Badge variant="outline" className="mt-2 text-xs">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.trend}
                </Badge>
              )}
              {stat.urgent && (
                <Badge variant="destructive" className="mt-2 text-xs">
                  Dringend!
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Aktuelle Einsätze */}
      <Card className="border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-800">
            <AlertTriangle className="h-6 w-6" />
            Aktuelle Einsätze - Ihre Hilfe wird gebraucht!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800">Heute 05:00 Uhr - Weetzen Nord</h3>
              <p className="text-sm text-muted-foreground">25 Hektar Wiese, 2 Drohnen im Einsatz</p>
              <Badge variant="outline" className="mt-2">Helfer gesucht</Badge>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-orange-800">Morgen 04:30 Uhr - Ronnenberg Süd</h3>
              <p className="text-sm text-muted-foreground">40 Hektar Wiese, Großeinsatz geplant</p>
              <Badge variant="destructive" className="mt-2">Dringend Helfer benötigt</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderProblem = () => (
    <div className="space-y-12">
      <div className="text-center">
        <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-red-600" />
        <h2 className="text-3xl font-bold mb-4">Das Rehkitz-Problem bei der Wiesenmahd</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Jedes Jahr sterben tausende Rehkitze einen qualvollen Tod durch Mähmaschinen. 
          Ein Problem, das wir mit moderner Technik lösen können.
        </p>
      </div>

      {/* Problem-Fakten */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {problemFacts.map((fact, index) => (
          <Card key={index} className="border-l-4 border-l-red-500">
            <CardHeader>
              <div className="flex items-center gap-3">
                {fact.icon}
                <div>
                  <CardTitle className="text-lg">{fact.title}</CardTitle>
                  <Badge variant={fact.severity === 'Kritisch' ? 'destructive' : 'secondary'}>
                    {fact.severity}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{fact.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Zahlen und Fakten */}
      <Card className="bg-red-50">
        <CardHeader>
          <CardTitle className="text-2xl text-red-800">Erschreckende Zahlen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">100.000+</div>
              <p className="text-sm text-red-700">Rehkitze sterben jährlich in Deutschland</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">Mai-Juli</div>
              <p className="text-sm text-red-700">Kritische Mahdsaison</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">0-14</div>
              <p className="text-sm text-red-700">Tage alt - höchste Gefahr</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">95%</div>
              <p className="text-sm text-red-700">Rettungsquote mit Drohnen</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Warum Rehkitze sich nicht retten können */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-6 w-6 text-orange-600" />
            Warum Rehkitze sich nicht selbst retten können
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-3 text-orange-700">Fataler Instinkt</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Rehkitze ducken sich bei Gefahr und bleiben regungslos liegen
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Fluchtinstinkt entwickelt sich erst nach 2-3 Wochen
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Mutter lässt Kitz allein, um es zu schützen
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Kein Eigengeruch - perfekte Tarnung wird zur Falle
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-orange-700">Zeitkritische Faktoren</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Mahd beginnt oft bei Sonnenaufgang
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Wärmebildsuche nur in kühlen Morgenstunden effektiv
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Landwirte unter Zeitdruck bei gutem Wetter
                </li>
                <li className="flex items-start">
                  <span className="text-orange-600 mr-2">•</span>
                  Kurzes Zeitfenster zwischen Anruf und Mahd
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRettungsmethoden = () => (
    <div className="space-y-12">
      <div className="text-center">
        <Plane className="h-16 w-16 mx-auto mb-4 text-blue-600" />
        <h2 className="text-3xl font-bold mb-4">Moderne Rettungsmethoden</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Von traditioneller Fußsuche bis zur High-Tech-Drohne - 
          wir setzen alle verfügbaren Methoden für die Rehkitzrettung ein.
        </p>
      </div>

      {/* Rettungsmethoden Vergleich */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {rescueMethods.map((method, index) => (
          <Card key={index} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                {method.icon}
                <CardTitle className="text-lg">{method.method}</CardTitle>
              </div>
              <div className="flex gap-2">
                <Badge variant="outline">Erfolg: {method.effectiveness}</Badge>
                <Badge variant="secondary">{method.timeRequired}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{method.description}</p>
              <div>
                <h4 className="font-semibold mb-2 text-green-700">Vorteile:</h4>
                <ul className="space-y-1">
                  {method.advantages.map((advantage, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-green-600 mr-2">✓</span>
                      <span className="text-muted-foreground">{advantage}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Drohnen-Technologie Detail */}
      <Card className="bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-800">
            <Camera className="h-6 w-6" />
            Drohnen-Technologie im Detail
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-blue-700">Wärmebildkamera-Einsatz</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Thermometer className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Erkennung von Körpertemperatur-Unterschieden
                </li>
                <li className="flex items-start">
                  <Clock className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Optimale Zeit: 4:00-7:00 Uhr morgens
                </li>
                <li className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  GPS-genaue Positionsbestimmung
                </li>
                <li className="flex items-start">
                  <Target className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Systematische Flugmuster für 100% Abdeckung
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-blue-700">Best Practices für Landwirte</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start">
                  <Phone className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Anruf 24h vor geplantem Mähtermin
                </li>
                <li className="flex items-start">
                  <Calendar className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Flexible Terminplanung in der Mahdsaison
                </li>
                <li className="flex items-start">
                  <MapPinned className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Genaue Flächenangaben und Zufahrtswege
                </li>
                <li className="flex items-start">
                  <Clock className="w-4 h-4 mr-2 mt-0.5 text-blue-600" />
                  Mahd erst nach Freigabe durch Rettungsteam
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vergrämungsmethoden */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-6 w-6 text-green-600" />
            Präventive Vergrämungsmethoden
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-3">
                <Zap className="h-8 w-8 mx-auto text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Flatterbänder</h3>
              <p className="text-sm text-muted-foreground">
                Bunte Bänder schrecken Rehgeißen ab und verhindern das Ablegen von Kitzen
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-3">
                <Heart className="h-8 w-8 mx-auto text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Duftstoffe</h3>
              <p className="text-sm text-muted-foreground">
                Menschliche Gerüche vertreiben Rehe aus den zu mähenden Flächen
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-lg mb-3">
                <Users className="h-8 w-8 mx-auto text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Begehung</h3>
              <p className="text-sm text-muted-foreground">
                Regelmäßige Begehung der Flächen stört die Rehe beim Ablegen
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderMitmachen = () => (
    <div className="space-y-12">
      <div className="text-center">
        <HandHeart className="h-16 w-16 mx-auto mb-4 text-green-600" />
        <h2 className="text-3xl font-bold mb-4">Mitmachen und Helfen</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Werden Sie Teil unseres Rettungsteams! Jede helfende Hand zählt, 
          um noch mehr Rehkitze vor dem Mähtod zu bewahren.
        </p>
      </div>

      {/* Hilfs-Optionen */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {helpOptions.map((option, index) => (
          <Card key={index} className="h-full hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-3">
                {option.icon}
                <CardTitle className="text-lg">{option.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{option.description}</p>
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Voraussetzungen/Bedarf:</h4>
                <ul className="space-y-1">
                  {option.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start text-sm">
                      <span className="text-green-600 mr-2">•</span>
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Button className="w-full">
                {option.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Regionalgruppen */}
      <Card className="bg-green-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-800">
            <MapPinned className="h-6 w-6" />
            Regionalgruppen finden
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Region Hannover</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Hauptgruppe mit 25 aktiven Helfern
              </p>
              <p className="text-xs text-green-700">
                <strong>Kontakt:</strong> hannover@rehkitzrettung.de<br />
                <strong>Leiter:</strong> Max Mustermann
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Ronnenberg/Weetzen</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Lokale Gruppe für schnelle Einsätze
              </p>
              <p className="text-xs text-green-700">
                <strong>Kontakt:</strong> weetzen@rehkitzrettung.de<br />
                <strong>Leiter:</strong> Anna Schmidt
              </p>
            </div>
            <div className="bg-white p-4 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Neue Gruppe gründen</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Starten Sie eine Gruppe in Ihrer Region
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Gruppe gründen
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Kontakt für Notfälle */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-800">
            <Phone className="h-6 w-6" />
            Notfall-Kontakt
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <div className="text-3xl font-bold text-red-600 mb-2">0151 123 456 78</div>
            <p className="text-red-700 mb-4">
              24/7 Hotline für dringende Rehkitzrettungen
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-red-800">Mahdsaison (Mai-Juli):</strong><br />
                Täglich 4:00 - 10:00 Uhr besetzt
              </div>
              <div>
                <strong className="text-red-800">Außerhalb der Saison:</strong><br />
                Mo-Fr 8:00 - 18:00 Uhr
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const tabs = [
    { id: 'startseite', label: 'Startseite', icon: <Heart className="w-4 h-4" /> },
    { id: 'problem', label: 'Das Problem', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'methoden', label: 'Rettungsmethoden', icon: <Plane className="w-4 h-4" /> },
    { id: 'mitmachen', label: 'Mitmachen', icon: <HandHeart className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Tabs */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-red-500 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {activeTab === 'startseite' && renderStartseite()}
        {activeTab === 'problem' && renderProblem()}
        {activeTab === 'methoden' && renderRettungsmethoden()}
        {activeTab === 'mitmachen' && renderMitmachen()}
      </div>
    </div>
  );
};

export default RehkitzrettungPage;