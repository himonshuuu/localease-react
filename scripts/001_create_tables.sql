-- Create profiles table for user information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT,
  last_name TEXT,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  address TEXT,
  avatar_url TEXT,
  user_type TEXT DEFAULT 'user' CHECK (user_type IN ('user', 'business')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create business_details table
CREATE TABLE IF NOT EXISTS public.business_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  business_name TEXT NOT NULL,
  business_email TEXT,
  business_phone TEXT,
  business_address TEXT,
  business_category TEXT,
  business_description TEXT,
  business_website TEXT,
  years_in_business INTEGER,
  number_of_employees INTEGER,
  business_hours JSONB DEFAULT '{}',
  pricing JSONB DEFAULT '{}',
  accepted_payment_methods TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create services table
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  business_id UUID REFERENCES public.business_details(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  category TEXT,
  price DECIMAL(10,2),
  price_type TEXT DEFAULT 'fixed' CHECK (price_type IN ('fixed', 'hourly', 'estimate')),
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create service categories table
CREATE TABLE IF NOT EXISTS public.service_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_details ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_categories ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can delete their own profile" ON public.profiles
  FOR DELETE USING (auth.uid() = id);

-- Business details policies
CREATE POLICY "Business details are viewable by everyone" ON public.business_details
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own business details" ON public.business_details
  FOR INSERT WITH CHECK (auth.uid() = (SELECT id FROM public.profiles WHERE id = profile_id));

CREATE POLICY "Users can update their own business details" ON public.business_details
  FOR UPDATE USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = profile_id));

CREATE POLICY "Users can delete their own business details" ON public.business_details
  FOR DELETE USING (auth.uid() = (SELECT id FROM public.profiles WHERE id = profile_id));

-- Services policies
CREATE POLICY "Services are viewable by everyone" ON public.services
  FOR SELECT USING (true);

CREATE POLICY "Business owners can insert services" ON public.services
  FOR INSERT WITH CHECK (
    auth.uid() IN (
      SELECT p.id FROM public.profiles p
      JOIN public.business_details bd ON bd.profile_id = p.id
      WHERE bd.id = business_id
    )
  );

CREATE POLICY "Business owners can update their services" ON public.services
  FOR UPDATE USING (
    auth.uid() IN (
      SELECT p.id FROM public.profiles p
      JOIN public.business_details bd ON bd.profile_id = p.id
      WHERE bd.id = business_id
    )
  );

CREATE POLICY "Business owners can delete their services" ON public.services
  FOR DELETE USING (
    auth.uid() IN (
      SELECT p.id FROM public.profiles p
      JOIN public.business_details bd ON bd.profile_id = p.id
      WHERE bd.id = business_id
    )
  );

-- Service categories policies (public read)
CREATE POLICY "Service categories are viewable by everyone" ON public.service_categories
  FOR SELECT USING (true);
