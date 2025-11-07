import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Target, Shield } from 'lucide-react';

const PraedatorenPage = () => {
  const predators = [
    {
      name: "Waschbär",
      scientificName: "Procyon lotor",
      image: "/images/nature-1.jpg",
      huntingSeasons: [
        { period: "1. August - 28. Februar", type: "Hauptjagdzeit" }
      ],
      description: "Der Waschbär ist ein invasiver Neozoon, der erhebliche Schäden in der heimischen Fauna anrichtet. Als geschickter Kletterer plündert er Vogelnester und gefährdet bodenbrütende Arten.",
      characteristics: [
        "Nachtaktiv und sehr anpassungsfähig",
        "Geschickte Kletterer und Schwimmer",
        "Allesfresser mit Vorliebe für Eier und Jungvögel",
        "Hohe Reproduktionsrate"
      ],
      management: "Intensive Bejagung zur Bestandsregulierung, besonders in Schutzgebieten und Siedlungsnähe."
    },
    {
      name: "Dachs",
      scientificName: "Meles meles",
      image: "/images/nature-2.jpg",
      huntingSeasons: [
        { period: "1. August - 31. Oktober", type: "Hauptjagdzeit" },
        { period: "16. Juni - 31. Juli", type: "Schonzeit für führende Fähen" }
      ],
      description: "Der Dachs ist ein wichtiger Bestandteil unseres Ökosystems, kann aber bei Überpopulation Schäden in der Landwirtschaft verursachen und Bodenbrüter gefährden.",
      characteristics: [
        "Nachtaktiv und territorial",
        "Ausgezeichneter Gräber mit starken Krallen",
        "Allesfresser mit saisonaler Nahrungsanpassung",
        "Lebt in komplexen Bausystemen"
      ],
      management: "Selektive Bejagung zur Bestandsregulierung, besonders bei Schäden in landwirtschaftlichen Flächen."
    },
    {
      name: "Fuchs",
      scientificName: "Vulpes vulpes",
      image: "/images/nature-3.jpg",
      huntingSeasons: [
        { period: "16. Juni - 28. Februar", type: "Hauptjagdzeit" },
        { period: "1. März - 15. Juni", type: "Schonzeit (Aufzucht)" }
      ],
      description: "Der Rotfuchs ist ein wichtiger Prädator, dessen Bestand reguliert werden muss, um das Gleichgewicht zwischen Beutegreifern und Niederwild zu erhalten.",
      characteristics: [
        "Sehr anpassungsfähig und intelligent",
        "Ausgezeichneter Jäger mit feinem Gehör",
        "Territorial mit großen Revieren",
        "Überträger von Krankheiten wie Tollwut und Räude"
      ],
      management: "Ganzjährige Bejagung außerhalb der Aufzuchtzeit, besonders wichtig für den Schutz von Bodenbrütern und Niederwild."
    },
    {
      name: "Marder",
      scientificName: "Martes foina / Martes martes",
      image: "/images/nature-4.jpg",
      huntingSeasons: [
        { period: "16. Juli - 28. Februar", type: "Steinmarder" },
        { period: "16. Juli - 28. Februar", type: "Baummarder" }
      ],
      description: "Marder sind geschickte Kletterer und Jäger, die sowohl Stein- als auch Baummarder umfassen. Sie können erhebliche Schäden an Gebäuden und in der Tierwelt verursachen.",
      characteristics: [
        "Nachtaktiv und sehr beweglich",
        "Ausgezeichnete Kletterer",
        "Territoriale Einzelgänger",
        "Vielseitige Nahrung von Früchten bis zu Kleintieren"
      ],
      management: "Gezielte Bejagung besonders in Siedlungsnähe und zum Schutz von Vogelpopulationen."
    },
    {
      name: "Nutria",
      scientificName: "Myocastor coypus",
      image: "/images/nature-5.jpg",
      huntingSeasons: [
        { period: "Ganzjährig", type: "Keine Schonzeit" }
      ],
      description: "Die Nutria ist ein invasiver Neozoon aus Südamerika, der erhebliche Schäden an Gewässerufern und der Vegetation verursacht. Eine intensive Bejagung ist zum Schutz der heimischen Ökosysteme erforderlich.",
      characteristics: [
        "Semiaquatisch lebend",
        "Hohe Reproduktionsrate",
        "Verursacht Ufererosion durch Grabaktivitäten",
        "Konkurriert mit heimischen Arten um Lebensraum"
      ],
      management: "Intensive ganzjährige Bejagung erforderlich, da keine natürlichen Feinde vorhanden sind."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Shield className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Prädatorenmanagement</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Verantwortungsvolle Regulierung von Beutegreifern zum Schutz der heimischen Tierwelt 
              und zur Erhaltung des ökologischen Gleichgewichts in unserem Revier.
            </p>
          </div>
        </div>
      </div>

      {/* Introduction */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader>
              <Target className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Ziele des Managements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Schutz bedrohter Arten, Erhaltung der Biodiversität und 
                Regulierung invasiver Neozoen zum Schutz heimischer Ökosysteme.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Calendar className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Jagdzeiten Niedersachsen</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Alle Jagdzeiten entsprechen der aktuellen Verordnung des Landes Niedersachsen 
                und berücksichtigen Schonzeiten während der Aufzucht.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <MapPin className="h-8 w-8 text-green-600 mb-2" />
              <CardTitle>Unser Revier</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Professionelles Management in den Weetzer Revieren mit 
                modernen Methoden und nachhaltigen Ansätzen.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Predator Cards */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-center mb-8">Bejagbare Prädatoren in Niedersachsen</h2>
          
          {predators.map((predator, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <img
                    src={predator.image}
                    alt={predator.name}
                    className="w-full h-64 lg:h-full object-cover"
                  />
                </div>
                
                <div className="lg:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-green-800">{predator.name}</h3>
                      <p className="text-sm italic text-muted-foreground">{predator.scientificName}</p>
                    </div>
                    <div className="text-right">
                      {predator.huntingSeasons.map((season, idx) => (
                        <Badge key={idx} variant="secondary" className="mb-1 block">
                          {season.period}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4">{predator.description}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold mb-2 text-green-700">Eigenschaften:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {predator.characteristics.map((char, idx) => (
                          <li key={idx} className="flex items-start">
                            <span className="text-green-600 mr-2">•</span>
                            {char}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2 text-green-700">Management:</h4>
                      <p className="text-sm text-muted-foreground">{predator.management}</p>
                      
                      <div className="mt-3">
                        <h5 className="font-medium text-sm mb-1">Jagdzeiten in Niedersachsen:</h5>
                        {predator.huntingSeasons.map((season, idx) => (
                          <div key={idx} className="text-xs text-muted-foreground">
                            <strong>{season.period}</strong>
                            {season.type && <span className="ml-2">({season.type})</span>}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-green-50 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-green-800">Wichtige Hinweise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-green-700">
            <div>
              <h4 className="font-semibold mb-2">Rechtliche Grundlagen:</h4>
              <ul className="space-y-1">
                <li>• Niedersächsisches Jagdgesetz (NJagdG)</li>
                <li>• Bundesjagdgesetz (BJagdG)</li>
                <li>• Verordnung über die Jagdzeiten</li>
                <li>• Artenschutzrechtliche Bestimmungen</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Nachhaltigkeit:</h4>
              <ul className="space-y-1">
                <li>• Wissenschaftlich fundierte Bestandserfassung</li>
                <li>• Selektive und waidgerechte Bejagung</li>
                <li>• Monitoring der Populationsentwicklung</li>
                <li>• Zusammenarbeit mit Naturschutzverbänden</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center">
          <p className="text-muted-foreground">
            Für Fragen zum Prädatorenmanagement oder zur Zusammenarbeit bei Problemtieren 
            stehen wir Ihnen gerne zur Verfügung.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PraedatorenPage;