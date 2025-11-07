import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, Award, Users, Target, Heart } from 'lucide-react';

const JagdhundePage = () => {
  const dogBreeds = [
    {
      name: 'Brandlbracke',
      description: 'Österreichische Bracke mit ausgezeichneter Spurlaut und Finderwillen. Spezialist für schwieriges Gelände.',
      specialties: ['Schweißarbeit', 'Nachsuche', 'Spurlaut', 'Stöberjagd'],
      image: '/images/hunting_dogs_3.jpeg',
      origin: 'Österreich',
      certification: 'VGP geprüft'
    },
    {
      name: 'Alpenländische Dachsbracke',
      description: 'Robuste Bracke aus den Alpen. Hervorragend für Nachsuche und Schweißarbeit in schwierigem Terrain.',
      specialties: ['Schweißarbeit', 'Nachsuche', 'Dachsjagd', 'Spurarbeit'],
      image: '/images/hunting_dogs_1.webp',
      origin: 'Österreich/Bayern',
      certification: 'VGP geprüft'
    },
    {
      name: 'Deutsche Bracke',
      description: 'Traditionelle deutsche Bracke mit hervorragender Nase und ausdauerndem Spurwillen.',
      specialties: ['Schweißarbeit', 'Nachsuche', 'Spurlaut', 'Meutejagd'],
      image: '/images/hunting_dogs_2.jpeg',
      origin: 'Deutschland',
      certification: 'VGP geprüft'
    },
  ];

  const trainingPrograms = [
    {
      title: 'Welpenförderung',
      description: 'Frühe Prägung und Sozialisierung für Jagdhundewelpen',
      duration: '8-16 Wochen',
      icon: <Heart className="h-6 w-6" />,
    },
    {
      title: 'Grundausbildung',
      description: 'Gehorsam, Leinenführigkeit und erste jagdliche Übungen',
      duration: '6-12 Monate',
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Jagdliche Ausbildung',
      description: 'Spezialisierung auf verschiedene Jagdarten und Wildarten',
      duration: '1-2 Jahre',
      icon: <Target className="h-6 w-6" />,
    },
    {
      title: 'Prüfungsvorbereitung',
      description: 'Vorbereitung auf VJP, HZP und VGP Prüfungen',
      duration: 'Nach Bedarf',
      icon: <Award className="h-6 w-6" />,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <TreePine className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Jagdhunde im Revier Weetzen
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Unsere vierbeinigen Partner sind das Herzstück einer erfolgreichen und waidgerechten Jagd. 
            <strong>Ausschließlich geprüfte Jagdgebrauchshunde</strong> kommen bei uns zum Einsatz.
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-12">
          <div className="aspect-video relative overflow-hidden rounded-lg">
            <img
              src="/images/hunting_dogs_4.webp"
              alt="Jagdhunde im Einsatz"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl font-bold mb-2">Professionelle Hundearbeit</h2>
                <p className="text-lg">Tradition, Ausbildung und Leidenschaft</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dog Breeds Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Unsere geprüften Jagdgebrauchshunde</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-3xl mx-auto">
            Alle unsere Jagdhunde sind VGP-geprüfte Bracken mit hervorragenden Leistungen in der Schweißarbeit und Nachsuche.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {dogBreeds.map((breed, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={breed.image}
                    alt={breed.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{breed.name}</CardTitle>
                    <Badge variant="outline" className="text-xs">
                      {breed.certification}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Herkunft: {breed.origin}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{breed.description}</p>
                  <div className="space-y-2">
                    <h4 className="font-semibold">Spezialgebiete:</h4>
                    <div className="flex flex-wrap gap-2">
                      {breed.specialties.map((specialty, idx) => (
                        <Badge key={idx} variant="secondary">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Training Programs */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Ausbildungsprogramme</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainingPrograms.map((program, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-4">
                    {program.icon}
                  </div>
                  <CardTitle className="text-lg">{program.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{program.description}</p>
                  <Badge variant="outline">{program.duration}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Training Philosophy */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Unsere Ausbildungsphilosophie</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Die Ausbildung unserer Jagdhunde basiert auf Vertrauen, Geduld und positiver Verstärkung. 
                  Jeder Hund wird individuell gefördert und entsprechend seiner natürlichen Anlagen ausgebildet.
                </p>
                <p>
                  Wir legen großen Wert auf eine umfassende Sozialisierung und eine solide Grundausbildung, 
                  bevor die spezielle jagdliche Ausbildung beginnt.
                </p>
                <p>
                  Unsere erfahrenen Hundeführer arbeiten eng mit den Hunden zusammen und entwickeln 
                  eine vertrauensvolle Partnerschaft, die für den Erfolg bei der Jagd entscheidend ist.
                </p>
              </div>
            </div>
            <div className="aspect-square relative overflow-hidden rounded-lg">
              <img
                src="/images/hunting_dogs_5.jpeg"
                alt="Hundeausbildung"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>


      </div>
    </div>
  );
};

export default JagdhundePage;