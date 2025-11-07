import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, ShoppingBag, Users, Award, Leaf, Target } from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: 'Frisches Wildfleisch',
      description: 'Hochwertiges Wildfleisch aus nachhaltiger Jagd, direkt vom Jäger.',
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: 'Erfahrene Gemeinschaft',
      description: 'Über 50 Jahre Erfahrung in nachhaltiger Jagd und Naturschutz.',
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: 'Beste Qualität',
      description: 'Wildfleisch aus artgerechter Haltung und stressfreier Erlegung.',
    },
    {
      icon: <Leaf className="h-8 w-8" />,
      title: 'Nachhaltigkeit',
      description: 'Verantwortungsvolle Jagd im Einklang mit der Natur.',
    },
  ];

  const activities = [
    {
      title: 'Jagdhunde im Revier',
      description: 'Professionelle Ausbildung und Einsatz unserer Jagdhunde',
      image: '/images/hunting_dogs_1.webp',
      link: '/jagdhunde',
    },
    {
      title: 'Rehkitzrettung',
      description: 'Moderne Drohnen-Technologie zum Schutz der Rehkitze',
      image: '/images/hunting_dogs_2.jpeg',
      link: '/rehkitzrettung',
    },
    {
      title: 'Weetzer Stapelteiche',
      description: 'Unsere Gewässer und nachhaltiger Fischbestand',
      image: '/images/nature_wildlife_1.jpeg',
      link: '/stapelteiche',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-primary-glow to-forest-green text-primary-foreground">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <TreePine className="h-16 w-16" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Jagdrevier Weetzen
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Erleben Sie nachhaltige Jagd in 340 Hektar naturbelassener Wiesen- und Feldlandschaft. 
              Tradition, Respekt vor der Natur und verantwortungsvolle Hege stehen im Mittelpunkt unserer jagdlichen Aktivitäten.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/shop">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Wildfleisch bestellen
                </Button>
              </Link>
              <Link to="/revier">
                <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Target className="mr-2 h-5 w-5" />
                  Unser Revier
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Warum unser Wildfleisch?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Entdecken Sie, was unser Wildfleisch so besonders macht - von der nachhaltigen Jagd bis zur fachgerechten Verarbeitung.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-border/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center text-primary mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Unsere Vereinsaktivitäten
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Erfahren Sie mehr über unsere vielfältigen Projekte und Aktivitäten im Bereich Jagd und Naturschutz.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{activity.title}</CardTitle>
                  <CardDescription className="text-base">
                    {activity.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={activity.link}>
                    <Button variant="outline" className="w-full">
                      Mehr erfahren
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Bestellen Sie jetzt frisches Wildfleisch
          </h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Entdecken Sie unser Sortiment an frischem Wildfleisch aus nachhaltiger Jagd 
            und lassen Sie sich die Delikatessen direkt nach Hause liefern.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Wildfleisch bestellen
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white/10 border-white/20 text-white hover:bg-white/20">
                Registrieren
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;