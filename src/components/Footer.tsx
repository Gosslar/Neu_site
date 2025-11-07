import React from 'react';
import { Link } from 'react-router-dom';
import { TreePine, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo und Beschreibung */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <TreePine className="h-8 w-8" />
              <span className="text-xl font-bold">Jagdrevier Weetzen</span>
            </div>
            <p className="text-primary-foreground/80 mb-4">
              Tradition und Moderne vereint - Ihr Partner für nachhaltige Jagd und Naturschutz. 
              Entdecken Sie unser Revier und unsere hochwertigen Jagdartikel.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Christoph Burchard - Linderte (Pächter)</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">Ole Gosslar - Linderte</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">info@jagd-weetzen.de</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h3 className="font-semibold mb-4">Wildfleisch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/shop" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Wildfleisch
                </Link>
              </li>
              <li>
                <Link to="/shop?category=rehwild" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Rehwild
                </Link>
              </li>
              <li>
                <Link to="/shop?category=schwarzwild" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Schwarzwild
                </Link>
              </li>
            </ul>
          </div>

          {/* Was wir machen */}
          <div>
            <h3 className="font-semibold mb-4">Was wir machen</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/jagdhunde" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Jagdhunde
                </Link>
              </li>
              <li>
                <Link to="/rehkitzrettung" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Rehkitzrettung
                </Link>
              </li>
              <li>
                <Link to="/stapelteiche" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Stapelteiche
                </Link>
              </li>
              <li>
                <Link to="/revier" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Revierbeschreibung
                </Link>
              </li>
              <li>
                <Link to="/praedatoren" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Prädatorenmanagement
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="text-sm text-primary-foreground/60">
            © 2024 Jagdrevier Weetzen. Alle Rechte vorbehalten. | 
            <Link to="/datenschutz" className="hover:text-primary-foreground ml-1">Datenschutz</Link> | 
            <Link to="/impressum" className="hover:text-primary-foreground ml-1">Impressum</Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;