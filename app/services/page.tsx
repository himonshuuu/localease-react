import { Suspense } from "react";
import { createClient } from "@/lib/supabase/server";
import { ServicesContent } from "@/components/services-content";

export const metadata = {
  title: "Services - LocalEase",
  description: "Browse and find local services near you",
};

async function getServices() {
  const supabase = await createClient();
  
  // Fetch from demo_services with demo_providers
  const { data: services, error } = await supabase
    .from("demo_services")
    .select(`
      *,
      demo_providers (
        business_name,
        business_address,
        business_category
      )
    `)
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching services:", error);
    return [];
  }

  // Transform data to match expected format
  return (services || []).map((service) => ({
    ...service,
    business_details: service.demo_providers,
  }));
}

async function getCategories() {
  const supabase = await createClient();
  
  const { data: categories, error } = await supabase
    .from("service_categories")
    .select("*")
    .order("name");

  if (error) {
    console.error("Error fetching categories:", error);
    return [];
  }

  return categories || [];
}

export default async function ServicesPage() {
  const [services, categories] = await Promise.all([
    getServices(),
    getCategories(),
  ]);

  return (
    <Suspense fallback={<ServicesSkeleton />}>
      <ServicesContent initialServices={services} categories={categories} />
    </Suspense>
  );
}

function ServicesSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-xl bg-muted"
          />
        ))}
      </div>
    </div>
  );
}
