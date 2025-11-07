import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Eye, Database, Cookie, Mail, Phone, FileText, AlertTriangle } from 'lucide-react';

const DatenschutzPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield className="h-16 w-16 mx-auto mb-4 text-primary" />
          <h1 className="text-4xl font-bold text-foreground mb-4">Datenschutzerklärung</h1>
          <p className="text-xl text-muted-foreground">
            Informationen zur Verarbeitung Ihrer personenbezogenen Daten
          </p>
        </div>

        {/* Hauptinhalt */}
        <div className="space-y-8">
          {/* Verantwortlicher */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-6 w-6 text-primary" />
                Verantwortlicher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p><strong>Jagdrevier Weetzen e.V.</strong></p>
                <p>Musterstraße 123<br />30952 Ronnenberg-Weetzen<br />Deutschland</p>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+49 (0) 5109 123456</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>info@jagdrevier-weetzen.de</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Allgemeine Hinweise */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-primary" />
                Allgemeine Hinweise
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten 
                  passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie 
                  persönlich identifiziert werden können.
                </p>
                <p>
                  Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten 
                  Datenschutzerklärung.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Datenerfassung */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                Datenerfassung auf dieser Website
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Wer ist verantwortlich für die Datenerfassung auf dieser Website?</h3>
                  <p className="text-sm text-muted-foreground">
                    Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten 
                    können Sie dem Abschnitt „Hinweis zur Verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Wie erfassen wir Ihre Daten?</h3>
                  <p className="text-sm text-muted-foreground">
                    Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um 
                    Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer 
                    Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Wofür nutzen wir Ihre Daten?</h3>
                  <p className="text-sm text-muted-foreground">
                    Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. 
                    Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hosting */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-6 w-6 text-primary" />
                Hosting
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Externes Hosting</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, 
                    die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert.
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, 
                    Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website 
                    generiert werden, handeln.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Das externe Hosting erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und 
                    bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und 
                    effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Server-Log-Dateien */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-6 w-6 text-primary" />
                Server-Log-Dateien
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, 
                  die Ihr Browser automatisch an uns übermittelt. Dies sind:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Browsertyp und Browserversion</li>
                  <li>verwendetes Betriebssystem</li>
                  <li>Referrer URL</li>
                  <li>Hostname des zugreifenden Rechners</li>
                  <li>Uhrzeit der Serveranfrage</li>
                  <li>IP-Adresse</li>
                </ul>
                <p>
                  Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser 
                  Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes 
                  Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Kontaktformular */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Kontaktformular
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular 
                  inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall 
                  von Anschlussfragen bei uns gespeichert.
                </p>
                <p>
                  Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf 
                  Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags 
                  zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist.
                </p>
                <p>
                  In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven 
                  Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung 
                  (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Cookies */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Cookie className="h-6 w-6 text-primary" />
                Cookies
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>
                  Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien und richten auf 
                  Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung 
                  (Session-Cookies) oder dauerhaft (dauerhafte Cookies) auf Ihrem Endgerät gespeichert.
                </p>
                <p>
                  Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Dauerhafte Cookies bleiben auf 
                  Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren 
                  Webbrowser erfolgt.
                </p>
                <p>
                  Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert werden, wenn Sie 
                  unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns oder Ihnen die Nutzung bestimmter 
                  Dienstleistungen des Drittunternehmens.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Ihre Rechte */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6 text-primary" />
                Ihre Rechte
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm text-muted-foreground">
                <p>Sie haben jederzeit das Recht:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten</li>
                  <li>Berichtigung oder Löschung dieser Daten zu verlangen</li>
                  <li>eine Einschränkung der Datenverarbeitung zu verlangen</li>
                  <li>der Datenverarbeitung zu widersprechen</li>
                  <li>Datenübertragbarkeit zu verlangen</li>
                </ul>
                <p>
                  Sie haben zudem das Recht, sich bei einer Datenschutz-Aufsichtsbehörde über die Verarbeitung Ihrer 
                  personenbezogenen Daten durch uns zu beschweren.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Kontakt Datenschutz */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-6 w-6 text-primary" />
                Kontakt in Datenschutzfragen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Bei Fragen zum Datenschutz wenden Sie sich bitte an:
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <p><strong>Jagdrevier Weetzen e.V.</strong></p>
                  <p>Datenschutzbeauftragter</p>
                  <p>Musterstraße 123</p>
                  <p>30952 Ronnenberg-Weetzen</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Mail className="h-4 w-4" />
                    <span>datenschutz@jagdrevier-weetzen.de</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DatenschutzPage;