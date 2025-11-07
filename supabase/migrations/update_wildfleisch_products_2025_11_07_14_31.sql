-- Clear existing categories and products
DELETE FROM public.order_items_2025_11_07_14_31;
DELETE FROM public.cart_2025_11_07_14_31;
DELETE FROM public.products_2025_11_07_14_31;
DELETE FROM public.categories_2025_11_07_14_31;

-- Insert Wildfleisch categories
INSERT INTO public.categories_2025_11_07_14_31 (name, description, image_url) VALUES
('Rehwild', 'Zartes Rehfleisch aus nachhaltiger Jagd', '/images/nature_wildlife_1.jpeg'),
('Rotwild', 'Hochwertiges Hirschfleisch von Rothirschen', '/images/nature_wildlife_2.jpeg'),
('Schwarzwild', 'Kräftiges Wildschweinefleisch', '/images/nature_wildlife_3.jpeg'),
('Federwild', 'Wildgeflügel wie Fasan, Ente und Gans', '/images/nature_wildlife_4.jpeg'),
('Wurstspezialitäten', 'Hausgemachte Wildwurst und -spezialitäten', '/images/hunting_equipment_5.jpeg');

-- Insert Wildfleisch products
-- Rehwild
INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Rehkeule (ca. 1,5 kg)', 
    'Zarte Rehkeule aus heimischer Jagd, perfekt für Braten und Schmorgerichte. Vakuumverpackt und küchenfertig.', 
    28.50, 
    c.id, 
    '/images/nature_wildlife_1.jpeg', 
    12
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Rehwild';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Rehrücken ohne Knochen (ca. 800g)', 
    'Edelster Teil des Rehs, butterzart und mild im Geschmack. Ideal für festliche Anlässe.', 
    32.00, 
    c.id, 
    '/images/nature_wildlife_1.jpeg', 
    8
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Rehwild';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Rehgulasch (1 kg)', 
    'Küchenfertig geschnittenes Rehgulasch, ideal für herzhafte Schmorgerichte.', 
    24.00, 
    c.id, 
    '/images/nature_wildlife_1.jpeg', 
    15
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Rehwild';

-- Rotwild
INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Hirschkeule (ca. 2,5 kg)', 
    'Große Hirschkeule vom Rothirsch, kräftig im Geschmack und sehr ergiebig.', 
    45.00, 
    c.id, 
    '/images/nature_wildlife_2.jpeg', 
    6
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Rotwild';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Hirschrücken (ca. 1,2 kg)', 
    'Premium-Teilstück vom Rothirsch, besonders zart und aromatisch.', 
    38.00, 
    c.id, 
    '/images/nature_wildlife_2.jpeg', 
    4
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Rotwild';

-- Schwarzwild
INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Wildschweinkeule (ca. 2 kg)', 
    'Kräftige Wildschweinkeule, ideal für deftige Braten und Schmorgerichte.', 
    22.00, 
    c.id, 
    '/images/nature_wildlife_3.jpeg', 
    10
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Schwarzwild';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Wildschweinrücken (ca. 1,5 kg)', 
    'Zartes Rückenstück vom Wildschwein, vielseitig verwendbar.', 
    26.00, 
    c.id, 
    '/images/nature_wildlife_3.jpeg', 
    7
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Schwarzwild';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Wildschweingulasch (1 kg)', 
    'Würzig-kräftiges Gulaschfleisch vom Wildschwein, perfekt für herzhafte Eintöpfe.', 
    18.50, 
    c.id, 
    '/images/nature_wildlife_3.jpeg', 
    20
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Schwarzwild';

-- Federwild
INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Fasan (ganzer Vogel)', 
    'Ganzer Fasan, küchenfertig gerupft und ausgenommen. Delikater Wildgeschmack.', 
    16.50, 
    c.id, 
    '/images/nature_wildlife_4.jpeg', 
    8
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Federwild';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Wildente (ganzer Vogel)', 
    'Wildente aus heimischen Gewässern, besonders aromatisch und saftig.', 
    14.00, 
    c.id, 
    '/images/nature_wildlife_4.jpeg', 
    6
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Federwild';

-- Wurstspezialitäten
INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Wildbratwurst (4 Stück)', 
    'Hausgemachte Wildbratwurst aus verschiedenen Wildarten, würzig und herzhaft.', 
    12.50, 
    c.id, 
    '/images/hunting_equipment_5.jpeg', 
    25
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Wurstspezialitäten';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Wildsalami (ca. 200g)', 
    'Luftgetrocknete Wildsalami nach traditionellem Rezept, intensiver Geschmack.', 
    9.80, 
    c.id, 
    '/images/hunting_equipment_5.jpeg', 
    18
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Wurstspezialitäten';

INSERT INTO public.products_2025_11_07_14_31 (name, description, price, category_id, image_url, stock_quantity) 
SELECT 
    'Wildleberwurst (250g)', 
    'Cremige Wildleberwurst aus eigener Herstellung, reich an Geschmack.', 
    7.50, 
    c.id, 
    '/images/hunting_equipment_5.jpeg', 
    22
FROM public.categories_2025_11_07_14_31 c WHERE c.name = 'Wurstspezialitäten';