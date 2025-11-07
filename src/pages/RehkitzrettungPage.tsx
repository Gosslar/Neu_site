import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Camera, MapPin, Clock, Users, Shield } from 'lucide-react';

const RehkitzrettungPage = () => {
  const statistics = [
    { label: 'Gerettete Rehkitze 2024', value: '127', icon: <Shield className="h-6 w-6" /> },
    { label: 'Einsätze pro Saison', value: '45', icon: <Clock className="h-6 w-6" /> },
    { label: 'Abgesuchte Hektar', value: '850', icon: <MapPin className="h-6 w-6" /> },
    { label: 'Freiwillige Helfer', value: '23', icon: <Users className="h-6 w-6" /> },
  ];

  const equipment = [
    {
      name: 'DJI Matrice 300 RTK',
      description: 'Professionelle Drohne mit bis zu 55 Minuten Flugzeit',
      features: ['Wärmebildkamera', 'GPS-Präzision', 'Wetterresistent'],
      image: '/images/hunting_equipment_7.png',
    },
    {
      name: 'FLIR Vue TZ20',
      description: 'Hochauflösende Wärmebildkamera für präzise Wildtiererkennung',
      features: ['20x Zoom', 'Temperaturmessung', 'Videoaufzeichnung'],
      image: '/images/hunting_equipment_6.jpeg',
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Koordination mit Landwirten',
      description: 'Abstimmung der Mähtermine und Flächenplanung',
      icon: <Users className="h-8 w-8" />,
    },
    {
      step: '2',
      title: 'Drohnenflug in der Frühe',
      description: 'Systematische Absuche der Wiesen mit Wärmebildtechnik',
      icon: <Plane className="h-8 w-8" />,
    },
    {
      step: '3',
      title: 'Kitzbergung',
      description: 'Vorsichtige Bergung und Umsetzung der gefundenen Rehkitze',
      icon: <Shield className="h-8 w-8" />,
    },
    {
      step: '4',
      title: 'Dokumentation',
      description: 'Erfassung der Rettungsaktionen und Erfolgsstatistiken',
      icon: <Camera className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Plane className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Rehkitzrettung mit Drohnentechnik
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Moderne Technologie im Dienste des Tierschutzes. Mit Wärmebilddrohnen retten wir 
            jährlich dutzende Rehkitze vor dem Mähtod und leisten einen wichtigen Beitrag zum Wildtierschutz.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src="/images/nature_wildlife_2.jpeg"
              alt="Rehkitzrettung mit Drohne"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">Technologie für den Tierschutz</h2>
                <p className="text-lg">Jedes gerettete Leben zählt</p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere Erfolge</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {statistics.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-2">
                    {stat.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">{stat.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Process */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unser Rettungsprozess</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center items-center mb-4">
                    <div className="bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold mr-4">
                      {item.step}
                    </div>
                    <div className="text-primary">
                      {item.icon}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Equipment */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere Ausrüstung</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipment.map((item, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Eigenschaften:</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Technology Explanation */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Wie funktioniert die Wärmebildtechnik?</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Rehkitze haben in den ersten Lebenswochen noch keinen ausgeprägten Fluchtinstinkt 
                  und ducken sich bei Gefahr ins hohe Gras. Dadurch sind sie für Landwirte beim Mähen 
                  praktisch unsichtbar.
                </p>
                <p>
                  Unsere Wärmebildkameras erkennen die Körperwärme der Tiere auch im hohen Gras. 
                  Die Drohnen fliegen systematisch über die Wiesen und übertragen die Bilder in Echtzeit 
                  an unsere Piloten am Boden.
                </p>
                <p>
                  Sobald ein Rehkitz entdeckt wird, wird es vorsichtig geborgen und an einen sicheren 
                  Ort gebracht, wo es nach dem Mähen wieder freigelassen wird.
                </p>
              </div>
            </div>
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src="/images/nature_wildlife_1.jpeg"
                alt="Rehkitz in der Wiese"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Cooperation */}
        <section className="mb-16">
          <Card className="bg-muted/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Zusammenarbeit mit Landwirten</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div>
                  <MapPin className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Flächenkoordination</h3>
                  <p className="text-muted-foreground">
                    Enge Abstimmung der Mähtermine und systematische Flächenplanung
                  </p>
                </div>
                <div>
                  <Clock className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Zeitoptimierung</h3>
                  <p className="text-muted-foreground">
                    Effiziente Einsatzplanung ohne Verzögerung der landwirtschaftlichen Arbeiten
                  </p>
                </div>
                <div>
                  <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Gemeinsame Verantwortung</h3>
                  <p className="text-muted-foreground">
                    Partnerschaftlicher Ansatz für effektiven Wildtierschutz
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Volunteer Section */}
        <section className="text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Werden Sie Teil unseres Teams!</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">
                Unterstützen Sie uns bei der Rehkitzrettung! Wir suchen engagierte Freiwillige, 
                die uns bei den frühmorgendlichen Einsätzen helfen möchten.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Was Sie mitbringen sollten:</h3>
                  <ul className="space-y-1">
                    <li>• Frühe Aufstehzeiten (ab 5:00 Uhr)</li>
                    <li>• Interesse am Tierschutz</li>
                    <li>• Körperliche Fitness</li>
                    <li>• Teamgeist und Zuverlässigkeit</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Kontakt:</h3>
                  <div className="space-y-1">
                    <p><strong>Projektleiter:</strong> Dr. Maria Schmidt</p>
                    <p><strong>Telefon:</strong> +49 (0) 123 456789</p>
                    <p><strong>E-Mail:</strong> rehkitzrettung@jagd-weetzen.de</p>
                    <p><strong>Saison:</strong> Mai bis Juli</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default RehkitzrettungPage;