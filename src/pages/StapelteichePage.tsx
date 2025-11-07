import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Waves, Fish, Leaf, Calendar, Camera, Users } from 'lucide-react';

const StapelteichePage = () => {
  const pondData = [
    { label: 'Gesamtfläche', value: '12 ha', icon: <Waves className="h-6 w-6" /> },
    { label: 'Anzahl Teiche', value: '8', icon: <Waves className="h-6 w-6" /> },
    { label: 'Durchschnittstiefe', value: '2,5 m', icon: <Waves className="h-6 w-6" /> },
    { label: 'Entstehungsjahr', value: '1892', icon: <Calendar className="h-6 w-6" /> },
  ];

  const fishSpecies = [
    {
      name: 'Karpfen',
      scientificName: 'Cyprinus carpio',
      description: 'Hauptfischart unserer Teiche mit ausgezeichneter Fleischqualität',
      characteristics: ['Bis 80 cm', 'Friedfisch', 'Ganzjährig'],
      image: '/images/nature_wildlife_3.jpeg',
    },
    {
      name: 'Schleie',
      scientificName: 'Tinca tinca',
      description: 'Robuste Fischart, die auch in sauerstoffarmen Gewässern gedeiht',
      characteristics: ['Bis 40 cm', 'Grundfisch', 'Mai-September'],
      image: '/images/nature_wildlife_4.jpeg',
    },
    {
      name: 'Hecht',
      scientificName: 'Esox lucius',
      description: 'Raubfisch zur natürlichen Bestandsregulierung',
      characteristics: ['Bis 120 cm', 'Raubfisch', 'Ganzjährig'],
      image: '/images/nature_wildlife_1.jpeg',
    },
  ];

  const activities = [
    {
      title: 'Teichpflege',
      description: 'Regelmäßige Reinigung und Instandhaltung der Teichanlagen',
      season: 'Ganzjährig',
      icon: <Leaf className="h-8 w-8" />,
    },
    {
      title: 'Fischbesatz',
      description: 'Kontrolle und Ergänzung des Fischbestandes',
      season: 'Frühjahr',
      icon: <Fish className="h-8 w-8" />,
    },
    {
      title: 'Abfischung',
      description: 'Jährliche Ernte und Bestandskontrolle',
      season: 'Herbst',
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: 'Naturschutz',
      description: 'Erhaltung des Lebensraums für Wasservögel und Amphibien',
      season: 'Ganzjährig',
      icon: <Camera className="h-8 w-8" />,
    },
  ];

  const regulations = [
    'Angelschein und gültige Erlaubnis erforderlich',
    'Schonzeiten und Mindestmaße beachten',
    'Maximaler Tagesfang: 3 Karpfen oder 5 Schleien',
    'Nachtangeln nur mit besonderer Genehmigung',
    'Verwendung von Widerhaken verboten',
    'Anfüttern nur mit genehmigten Ködern',
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Waves className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Weetzer Stapelteiche
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unsere historischen Teichanlagen sind seit über 130 Jahren ein wichtiger Bestandteil 
            der regionalen Fischzucht und bieten heute einen wertvollen Lebensraum für Wasservögel und Amphibien.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src="/images/nature_wildlife_2.jpeg"
              alt="Weetzer Stapelteiche"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">Tradition seit 1892</h2>
                <p className="text-lg">Nachhaltige Fischzucht und Naturschutz</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pond Statistics */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere Teichanlage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pondData.map((data, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-2">
                    {data.icon}
                  </div>
                  <CardTitle className="text-3xl font-bold text-primary">{data.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{data.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Fish Species */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unser Fischbestand</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {fishSpecies.map((fish, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={fish.image}
                    alt={fish.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{fish.name}</CardTitle>
                  <p className="text-sm italic text-muted-foreground">{fish.scientificName}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{fish.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Eigenschaften:</h4>
                    <div className="flex flex-wrap gap-2">
                      {fish.characteristics.map((char, idx) => (
                        <Badge key={idx} variant="secondary">
                          {char}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Activities */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Teichbewirtschaftung</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-4">
                    {activity.icon}
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{activity.description}</p>
                  <Badge variant="outline">{activity.season}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* History and Ecology */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Geschichte und Ökologie</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Die Weetzer Stapelteiche entstanden 1892 als Teil eines ausgeklügelten 
                  Teichwirtschaftssystems. Ursprünglich dienten sie der kommerziellen Karpfenzucht 
                  und versorgten die Region mit frischem Fisch.
                </p>
                <p>
                  Heute stehen neben der nachhaltigen Fischproduktion vor allem ökologische Aspekte 
                  im Vordergrund. Die Teiche bieten Lebensraum für zahlreiche Wasservögel, Amphibien 
                  und Insekten und tragen zur Biodiversität der Region bei.
                </p>
                <p>
                  Durch extensive Bewirtschaftung und den Verzicht auf chemische Zusätze 
                  erhalten wir ein natürliches Gleichgewicht, das sowohl der Fischqualität 
                  als auch dem Naturschutz zugutekommt.
                </p>
              </div>
            </div>
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src="/images/nature_wildlife_4.jpeg"
                alt="Teichökologie"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        {/* Fishing Regulations */}
        <section className="mb-16">
          <Card className="bg-muted/30">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Angelbestimmungen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Wichtige Regeln:</h3>
                  <ul className="space-y-2">
                    {regulations.map((rule, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span className="text-muted-foreground">{rule}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-4">Angelzeiten:</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="font-medium">Tagangeln:</span>
                      <span className="text-muted-foreground">Sonnenaufgang - Sonnenuntergang</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Saison:</span>
                      <span className="text-muted-foreground">1. April - 31. Oktober</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Ruhetage:</span>
                      <span className="text-muted-foreground">Montags geschlossen</span>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="font-semibold mb-2">Erlaubnisscheine:</h4>
                    <p className="text-sm text-muted-foreground">
                      Erhältlich bei unserem Gewässerwart oder im Vereinsheim
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">Interesse am Angeln?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg mb-6">
                Möchten Sie an unseren Teichen angeln oder mehr über unsere Fischzucht erfahren? 
                Kontaktieren Sie unseren Gewässerwart für weitere Informationen.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div>
                  <h3 className="text-xl font-semibold mb-2">Gewässerwart:</h3>
                  <div className="space-y-1">
                    <p><strong>Name:</strong> Klaus Fischer</p>
                    <p><strong>Telefon:</strong> +49 (0) 123 456789</p>
                    <p><strong>E-Mail:</strong> teiche@jagd-weetzen.de</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Preise (Tageskarte):</h3>
                  <div className="space-y-1">
                    <p><strong>Erwachsene:</strong> 15,00 €</p>
                    <p><strong>Jugendliche (bis 16):</strong> 8,00 €</p>
                    <p><strong>Jahreskarte:</strong> 180,00 €</p>
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

export default StapelteichePage;