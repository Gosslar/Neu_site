import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Waves, Leaf, Calendar, Camera, Users, MapPin, Binoculars, TreePine, Bird } from 'lucide-react';

const StapelteichePage = () => {
  const areaData = [
    { label: 'Gesamtfläche', value: '20 ha', icon: <Waves className="h-6 w-6" /> },
    { label: 'Vogelarten', value: '275', icon: <Bird className="h-6 w-6" /> },
    { label: 'Wasserbüffel', value: '20+', icon: <Users className="h-6 w-6" /> },
    { label: 'Entstehung', value: '1993', icon: <Calendar className="h-6 w-6" /> },
  ];

  const birdSpecies = [
    {
      category: 'Brutvögel',
      species: ['Haubentaucher', 'Zwergtaucher', 'Rohrweihe', 'Rohrammer', 'Teichrohrsänger', 'Eisvogel'],
      description: 'Ständige Bewohner der Stapelteiche',
      image: '/images/nature_wildlife_1.jpeg',
    },
    {
      category: 'Zugvögel',
      species: ['Bekassine', 'Kampfläufer', 'Uferschnepfe', 'Rotschenkel'],
      description: 'Rastvögel im Frühjahr und Herbst',
      image: '/images/nature_wildlife_2.jpeg',
    },
    {
      category: 'Besondere Arten',
      species: ['Silberreiher', 'Graureiher', 'Weißstorch', 'Rotmilan', 'Fischadler'],
      description: 'Seltene und bemerkenswerte Besucher',
      image: '/images/nature_wildlife_3.jpeg',
    },
  ];

  const activities = [
    {
      title: 'Naturbeobachtung',
      description: 'Zwei Beobachtungshütten für ungestörte Tierbeobachtung',
      season: 'Ganzjährig',
      icon: <Binoculars className="h-8 w-8" />,
    },
    {
      title: 'Wasserbüffel-Pflege',
      description: 'Natürliche Landschaftspflege durch über 20 Wasserbüffel',
      season: 'Ganzjährig',
      icon: <Users className="h-8 w-8" />,
    },
    {
      title: 'Geführte Exkursionen',
      description: 'Regelmäßige Führungen durch Naturschutzexperten',
      season: 'Frühjahr-Herbst',
      icon: <Camera className="h-8 w-8" />,
    },
    {
      title: 'Natur-Erlebnisweg',
      description: 'Wandern und Radfahren auf dem ausgeschilderten Weg',
      season: 'Ganzjährig',
      icon: <TreePine className="h-8 w-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-800 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Waves className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Weetzer Stapelteiche</h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Das flächenmäßig größte Feuchtbiotop der Region - ein herausragendes Beispiel 
              für die erfolgreiche Umwandlung einer ehemaligen Industriefläche in ein wertvolles 
              Naherholungs- und Naturschutzgebiet.
            </p>
          </div>
        </div>
      </div>

      {/* Area Statistics */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {areaData.map((item, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2 text-blue-600">
                  {item.icon}
                </div>
                <div className="text-2xl font-bold text-blue-800">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Geschichte */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Geschichte: Von der Industriebrache zum Naturjuwel</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  Die Entstehung aus der Zuckerindustrie
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Vor über einem Jahrhundert war das Areal eine feuchte Wiesenlandschaft. Mit dem Aufkommen 
                  der Zuckerindustrie wurde das Gelände von der Zuckerfabrik Weetzen umgestaltet.
                </p>
                <p className="text-muted-foreground">
                  Über Rohrleitungen wurde das Waschwasser der Zuckerrüben in die Becken geleitet. 
                  Dabei "stapelte" sich die Erde, was dem Gelände seinen Namen gab: <strong>Stapelteiche</strong>.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  Der Wandel zum Schutzgebiet (1993)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  Nach der Schließung der Zuckerfabrik 1993 erkannten Naturschützer das immense Potenzial 
                  als Lebensraum für bis zu 170 Vogelarten.
                </p>
                <p className="text-muted-foreground">
                  Durch das Engagement von Naturschützern und der Region Hannover wurde das 20 Hektar große 
                  Gelände dauerhaft als ökologisch wertvolles Biotop gesichert.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Vogelwelt */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Ein Paradies für 275 Vogelarten</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Die Stapelteiche sind vor allem als Vogelparadies bekannt. Die Vielfalt ist beeindruckend 
            und umfasst Brutvögel, Zugvögel und seltene Arten.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {birdSpecies.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <img
                    src={category.image}
                    alt={category.category}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-blue-800">{category.category}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.species.map((species, idx) => (
                      <Badge key={idx} variant="secondary" className="text-xs">
                        {species}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Wasserbüffel */}
        <div className="mb-12 bg-green-50 rounded-lg p-8">
          <div className="text-center mb-8">
            <Users className="h-16 w-16 mx-auto mb-4 text-green-600" />
            <h2 className="text-3xl font-bold mb-4">Wasserbüffel als Landschaftspfleger</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Seit 2011 werden über 20 Wasserbüffel als "tierische Landschaftspfleger" eingesetzt. 
              Sie sind ein Schlüsselfaktor für den Erhalt der offenen Landschaftsstruktur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Offenhaltung der Flächen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Durch das Abweiden von Schilf, Binsen und aufkommenden Gehölzen verhindern 
                  sie die Verbuschung und Verwaldung der Feuchtwiesen.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Kleinstlebensräume</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Ihre Trittsiegel im feuchten Boden füllen sich mit Wasser und werden zu 
                  temporären Laichgewässern für Amphibien und Lebensraum für Insekten.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-green-700">Verhinderung der Verlandung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Indem sie sich in den Teichen suhlen, halten sie Wasserflächen offen 
                  und verhindern, dass diese zuwachsen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Aktivitäten */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Freizeitaktivitäten und Erholung</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Die Stapelteiche sind als Ort der ruhigen, naturbezogenen Naherholung konzipiert 
            und bieten vielfältige Möglichkeiten, die Natur zu genießen.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map((activity, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-2 text-blue-600">
                    {activity.icon}
                  </div>
                  <CardTitle className="text-lg">{activity.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">{activity.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {activity.season}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ökosystem */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Ein komplexes Ökosystem</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-green-600" />
                  Landschaftsmerkmale
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Offene Wasserflächen und Schilfzonen
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Erlen- und Pappelwälder
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Dämme und Wiesen
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-600 mr-2">•</span>
                    Ausgedehnte Schlickflächen bei sinkendem Wasserstand
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-6 w-6 text-blue-600" />
                  Weitere Tierwelt
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Säugetiere: Wildschweine, Füchse, Waschbären
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Amphibien: Frösche und Kröten
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Insekten: Bis zu 30 verschiedene Libellenarten
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    Vielfältige Insektenwelt als Nahrungsgrundlage
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Besucherinformationen */}
        <div className="bg-blue-50 rounded-lg p-8">
          <div className="text-center mb-6">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-2xl font-bold mb-4">Besucherinformationen</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3 text-blue-800">Lage und Anfahrt</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>📍 Zwischen Weetzen und Vörie (12 km südwestlich von Hannover)</li>
                <li>🚗 Zugang über Kreisstraße K228</li>
                <li>🅿️ Parkmöglichkeiten auf der Westseite der Straße</li>
                <li>🚶 Zu Fuß oder mit dem Fahrrad erreichbar</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3 text-blue-800">Besucherregeln</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>🚶 Auf den Wegen bleiben</li>
                <li>🔇 Ruhiges Verhalten zum Schutz der Tiere</li>
                <li>📷 Fotografieren von den Beobachtungshütten aus</li>
                <li>🌿 Natur mit Respekt behandeln</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-blue-700 font-medium">
              Ein einzigartiger Lebensraum - bewahrt durch Naturschutz und nachhaltige Pflege
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StapelteichePage;