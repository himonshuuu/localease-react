-- Seed service categories
INSERT INTO public.service_categories (name, description, icon) VALUES
  ('Cleaning', 'Professional cleaning services', 'spray-can'),
  ('Plumbing', 'Plumbing repairs and installations', 'droplets'),
  ('Electrical', 'Electrical work and repairs', 'zap'),
  ('HVAC', 'Heating and cooling services', 'thermometer'),
  ('Painting', 'Interior and exterior painting', 'paintbrush'),
  ('Outdoor', 'Lawn care and landscaping', 'trees'),
  ('Home Improvement', 'General home improvements', 'hammer'),
  ('Home Repair', 'Home repair services', 'wrench'),
  ('Pest Control', 'Pest elimination services', 'bug'),
  ('Roofing', 'Roof repair and replacement', 'home'),
  ('Moving', 'Moving and packing services', 'truck'),
  ('Pool Services', 'Pool cleaning and maintenance', 'waves'),
  ('Appliances', 'Appliance repair services', 'refrigerator'),
  ('Flooring', 'Flooring installation and repair', 'layers'),
  ('Security', 'Security system installation', 'shield'),
  ('Remodeling', 'Kitchen and bathroom remodeling', 'layout'),
  ('Technology', 'Smart home and tech services', 'wifi'),
  ('Construction', 'Construction services', 'building'),
  ('Energy', 'Solar and insulation services', 'sun'),
  ('Organization', 'Home organization services', 'archive')
ON CONFLICT (name) DO NOTHING;
