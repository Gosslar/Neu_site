import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, MapPin, Users, AlertTriangle, Shield, Target, Car, Dog, Eye } from 'lucide-react';

const RevierPage = () => {
  const revierData = [
    { label: 'Gesamtfläche', value: '340 ha', icon: <MapPin className="h-6 w-6" /> },
    { label: 'Landschaftstyp', value: 'Wiesen & Felder', icon: <TreePine className="h-6 w-6" /> },
    { label: 'Hauptverkehrsweg', value: 'B217', icon: <Car className="h-6 w-6" /> },
    { label: 'Jagdgemeinschaft', value: 'Aktiv', icon: <Users className="h-6 w-6" /> },
  ];

  const challenges = [
    {
      title: 'Verkehrszerschneidung',
      description: 'Die B217 führt zu einer alarmierend hohen Zahl an Wildunfällen (Fallwild)',
      impact: 'Gefahr für Tier und Mensch',
      icon: <Car className="h-8 w-8 text-red-600" />,
      severity: 'Hoch'
    },
    {
      title: 'Freizeitdruck',
      description: 'Wachsender Druck durch die Stadtbevölkerung sorgt für ständige Beunruhigung',
      impact: 'Wildtiere werden in riskantere Gebiete gedrängt',
      icon: <Dog className="h-8 w-8 text-orange-600" />,
      severity: 'Mittel'
    }
  ];

  const solutions = [
    {
      category: 'Verkehrssicherheit',
      measures: [
        'Einsatz von Wildwarnreflektoren',
        'Prüfung von Grünbrücken',
        'Geschwindigkeitsbegrenzungen in kritischen Bereichen'
      ],
      icon: <Shield className="h-6 w-6 text-blue-600" />
    },
    {
      category: 'Rücksichtsvolle Erholung',
      measures: [
        'Hunde anleinen',
        'Auf den Wegen bleiben',
        'Dämmerungsstunden meiden',
        'Ruhezonen respektieren'
      ],
      icon: <Target className="h-6 w-6 text-green-600" />
    },
    {
      category: 'Aufklärung',
      measures: [
        'Bewusstsein bei Anwohnern schärfen',
        'Information für Erholungssuchende',
        'Schutz der heimischen Tierwelt',
        'Gemeinsame Verantwortung fördern'
      ],
      icon: <Eye className="h-6 w-6 text-purple-600" />
    }
  ];

  const wildlifeInfo = [
    {
      category: 'Schalenwild',
      species: ['Rehwild', 'Rotwild', 'Schwarzwild'],
      description: 'Hauptwildarten in unserem Revier',
      challenges: 'Besonders betroffen von Verkehrszerschneidung'
    },
    {
      category: 'Niederwild',
      species: ['Feldhase', 'Fasan', 'Rebhuhn'],
      description: 'Bodenbrütende Arten und Feldtiere',
      challenges: 'Störungen durch freilaufende Hunde'
    },
    {
      category: 'Raubwild',
      species: ['Fuchs', 'Marder', 'Waschbär'],
      description: 'Prädatoren im Ökosystem',
      challenges: 'Anpassung an menschliche Störungen'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <TreePine className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-4">Unser Jagdrevier</h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              340 Hektar naturbelassene Wiesen- und Feldlandschaft zwischen Tradition und modernen Herausforderungen. 
              Nachhaltiges Wildtiermanagement im Spannungsfeld von Verkehr und Freizeitnutzung.
            </p>
          </div>
        </div>
      </div>

      {/* Revier Statistics */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {revierData.map((item, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-2 text-green-600">
                  {item.icon}
                </div>
                <div className="text-2xl font-bold text-green-800">{item.value}</div>
                <div className="text-sm text-muted-foreground">{item.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Herausforderungen */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <AlertTriangle className="h-12 w-12 mx-auto mb-4 text-orange-600" />
            <h2 className="text-3xl font-bold mb-4">Jagdrevier im Spannungsfeld</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Unser lokales Jagdrevier steht unter doppeltem Druck durch Verkehrszerschneidung 
              und wachsenden Freizeitdruck der Stadtbevölkerung.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {challenges.map((challenge, index) => (
              <Card key={index} className="border-l-4 border-l-orange-500">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    {challenge.icon}
                    <div>
                      <CardTitle className="text-xl">{challenge.title}</CardTitle>
                      <Badge variant={challenge.severity === 'Hoch' ? 'destructive' : 'secondary'}>
                        {challenge.severity}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3">{challenge.description}</p>
                  <div className="bg-orange-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-orange-800">
                      <strong>Auswirkung:</strong> {challenge.impact}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Lösungsansätze */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 mx-auto mb-4 text-blue-600" />
            <h2 className="text-3xl font-bold mb-4">Gemeinsame Lösungsansätze</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Ein gemeinsames Handeln ist erforderlich. Durch koordinierte Maßnahmen können wir 
              den Schutz unserer heimischen Tierwelt gewährleisten.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {solutions.map((solution, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {solution.icon}
                    <CardTitle className="text-lg">{solution.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {solution.measures.map((measure, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <span className="text-green-600 mr-2 mt-1">•</span>
                        <span className="text-muted-foreground">{measure}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Wildbestand */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-center">Wildbestand in unserem Revier</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {wildlifeInfo.map((category, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <TreePine className="h-16 w-16 text-green-600" />
                </div>
                <CardHeader>
                  <CardTitle className="text-green-800">{category.category}</CardTitle>
                  <p className="text-sm text-muted-foreground">{category.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {category.species.map((species, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="bg-yellow-50 p-2 rounded text-xs">
                    <strong className="text-yellow-800">Herausforderung:</strong>
                    <br />
                    <span className="text-yellow-700">{category.challenges}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Aufruf zum Handeln */}
        <div className="bg-green-50 rounded-lg p-8 text-center">
          <Users className="h-16 w-16 mx-auto mb-4 text-green-600" />
          <h2 className="text-2xl font-bold mb-4 text-green-800">Gemeinsam für unsere Tierwelt</h2>
          <p className="text-muted-foreground mb-6 max-w-3xl mx-auto">
            Ein geschärftes Bewusstsein bei Anwohnern und Erholungssuchenden ist der Schlüssel 
            zum Schutz unserer heimischen Tierwelt. Jeder kann einen Beitrag leisten.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Dog className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-sm mb-1">Hunde anleinen</h3>
              <p className="text-xs text-muted-foreground">Schutz vor Wildstörungen</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Target className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-sm mb-1">Wege einhalten</h3>
              <p className="text-xs text-muted-foreground">Ruhezonen respektieren</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Eye className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-sm mb-1">Dämmerung meiden</h3>
              <p className="text-xs text-muted-foreground">Aktivitätszeiten beachten</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <Car className="h-8 w-8 mx-auto mb-2 text-green-600" />
              <h3 className="font-semibold text-sm mb-1">Vorsichtig fahren</h3>
              <p className="text-xs text-muted-foreground">Wildunfälle vermeiden</p>
            </div>
          </div>
        </div>

        {/* Kontakt */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Haben Sie Fragen zu unserem Revier?</h3>
          <p className="text-muted-foreground">
            Kontaktieren Sie uns für weitere Informationen über nachhaltige Jagd 
            und Wildtiermanagement in unserem 340 Hektar großen Revier.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RevierPage;