"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  Filter,
  MapPin,
  Star,
  DollarSign,
  X,
  Home,
  Sparkles,
  Car,
  Briefcase,
  Heart,
  GraduationCap,
  UtensilsCrossed,
  PartyPopper,
  PawPrint,
  Laptop,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Service = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  price_type: string;
  image_url: string | null;
  business_details: {
    business_name: string;
    business_address: string;
    business_category: string;
  } | null;
};

type Category = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const iconMap: Record<string, React.ElementType> = {
  Home,
  Sparkles,
  Car,
  Briefcase,
  Heart,
  GraduationCap,
  UtensilsCrossed,
  PartyPopper,
  PawPrint,
  Laptop,
};

const categoryColors: Record<string, string> = {
  "Home Services": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "Beauty & Wellness": "bg-pink-500/10 text-pink-600 dark:text-pink-400",
  "Auto Services": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  "Professional Services": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "Health & Medical": "bg-red-500/10 text-red-600 dark:text-red-400",
  "Education & Tutoring": "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
  "Food & Catering": "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "Events & Entertainment": "bg-teal-500/10 text-teal-600 dark:text-teal-400",
  "Pet Services": "bg-green-500/10 text-green-600 dark:text-green-400",
  "Technology": "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400",
};

// Demo services for when database is empty
const demoServices: Service[] = [
  {
    id: "demo-1",
    name: "Professional Home Cleaning",
    description: "Deep cleaning service for your entire home. We use eco-friendly products and ensure every corner sparkles.",
    category: "Home Services",
    price: 75,
    price_type: "per_visit",
    image_url: null,
    business_details: {
      business_name: "Sparkle Clean Co.",
      business_address: "123 Main St, Downtown",
      business_category: "Home Services",
    },
  },
  {
    id: "demo-2",
    name: "Mobile Car Detailing",
    description: "Premium car detailing at your location. Interior and exterior cleaning, waxing, and protection.",
    category: "Auto Services",
    price: 150,
    price_type: "fixed",
    image_url: null,
    business_details: {
      business_name: "AutoShine Mobile",
      business_address: "456 Oak Ave",
      business_category: "Auto Services",
    },
  },
  {
    id: "demo-3",
    name: "Hair Styling & Coloring",
    description: "Expert hair styling, cutting, and coloring services. Walk-ins welcome or book an appointment.",
    category: "Beauty & Wellness",
    price: 65,
    price_type: "starting_at",
    image_url: null,
    business_details: {
      business_name: "Glamour Salon",
      business_address: "789 Fashion Blvd",
      business_category: "Beauty & Wellness",
    },
  },
  {
    id: "demo-4",
    name: "Math & Science Tutoring",
    description: "Personalized tutoring for students K-12. Improve grades and build confidence in STEM subjects.",
    category: "Education & Tutoring",
    price: 45,
    price_type: "per_hour",
    image_url: null,
    business_details: {
      business_name: "BrightMinds Academy",
      business_address: "321 Learning Lane",
      business_category: "Education & Tutoring",
    },
  },
  {
    id: "demo-5",
    name: "Dog Walking & Pet Sitting",
    description: "Reliable pet care services. Daily walks, overnight sitting, and special needs care available.",
    category: "Pet Services",
    price: 25,
    price_type: "per_walk",
    image_url: null,
    business_details: {
      business_name: "Happy Paws Care",
      business_address: "555 Pet Park Dr",
      business_category: "Pet Services",
    },
  },
  {
    id: "demo-6",
    name: "Computer Repair & IT Support",
    description: "Fast and affordable computer repairs, virus removal, and IT consulting for home and small business.",
    category: "Technology",
    price: 50,
    price_type: "per_hour",
    image_url: null,
    business_details: {
      business_name: "TechFix Solutions",
      business_address: "888 Digital Way",
      business_category: "Technology",
    },
  },
  {
    id: "demo-7",
    name: "Event Photography",
    description: "Professional photography for weddings, parties, and corporate events. Packages include editing.",
    category: "Events & Entertainment",
    price: 500,
    price_type: "starting_at",
    image_url: null,
    business_details: {
      business_name: "Capture Moments Studio",
      business_address: "222 Photo Row",
      business_category: "Events & Entertainment",
    },
  },
  {
    id: "demo-8",
    name: "Plumbing Services",
    description: "24/7 emergency plumbing repairs, installations, and maintenance. Licensed and insured.",
    category: "Home Services",
    price: 85,
    price_type: "per_hour",
    image_url: null,
    business_details: {
      business_name: "QuickFix Plumbing",
      business_address: "444 Service Rd",
      business_category: "Home Services",
    },
  },
];

export function ServicesContent({
  initialServices,
  categories,
}: {
  initialServices: Service[];
  categories: Category[];
}) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [showFilters, setShowFilters] = useState(false);

  // Use demo services if no real services exist
  const services = initialServices.length > 0 ? initialServices : demoServices;

  const filteredServices = useMemo(() => {
    return services.filter((service) => {
      const matchesSearch =
        searchQuery === "" ||
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.business_details?.business_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "" ||
        service.category === selectedCategory ||
        service.business_details?.business_category === selectedCategory;

      const matchesPrice =
        service.price >= priceRange[0] && service.price <= priceRange[1];

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [services, searchQuery, selectedCategory, priceRange]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setPriceRange([0, 1000]);
  };

  const hasActiveFilters =
    searchQuery !== "" || selectedCategory !== "" || priceRange[0] > 0 || priceRange[1] < 1000;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-foreground">Browse Services</h1>
          <p className="mt-2 text-muted-foreground">
            Find trusted local service providers in your area
          </p>

          {/* Search Bar */}
          <div className="mt-6 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search services, businesses..."
                className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center gap-2 rounded-lg border border-input bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-accent sm:px-6"
            >
              <Filter className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                  {[searchQuery !== "", selectedCategory !== "", priceRange[0] > 0 || priceRange[1] < 1000].filter(Boolean).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || typeof window !== "undefined" && window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="w-full shrink-0 lg:w-64"
              >
                <div className="rounded-xl border border-border bg-card p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold text-foreground">Filters</h2>
                    {hasActiveFilters && (
                      <button
                        onClick={clearFilters}
                        className="text-sm text-primary hover:underline"
                      >
                        Clear all
                      </button>
                    )}
                  </div>

                  {/* Category Filter */}
                  <div className="mb-6">
                    <h3 className="mb-3 text-sm font-medium text-foreground">Category</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedCategory("")}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                          selectedCategory === ""
                            ? "bg-primary text-primary-foreground"
                            : "text-muted-foreground hover:bg-accent hover:text-foreground"
                        }`}
                      >
                        All Categories
                      </button>
                      {categories.map((category) => {
                        const Icon = iconMap[category.icon] || Briefcase;
                        return (
                          <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.name)}
                            className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${
                              selectedCategory === category.name
                                ? "bg-primary text-primary-foreground"
                                : "text-muted-foreground hover:bg-accent hover:text-foreground"
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            {category.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <h3 className="mb-3 text-sm font-medium text-foreground">Price Range</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="number"
                            value={priceRange[0]}
                            onChange={(e) =>
                              setPriceRange([Number(e.target.value), priceRange[1]])
                            }
                            min={0}
                            className="w-full rounded-lg border border-input bg-background py-2 pl-7 pr-2 text-sm text-foreground"
                            placeholder="Min"
                          />
                        </div>
                        <span className="text-muted-foreground">-</span>
                        <div className="relative flex-1">
                          <DollarSign className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                          <input
                            type="number"
                            value={priceRange[1]}
                            onChange={(e) =>
                              setPriceRange([priceRange[0], Number(e.target.value)])
                            }
                            min={0}
                            className="w-full rounded-lg border border-input bg-background py-2 pl-7 pr-2 text-sm text-foreground"
                            placeholder="Max"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Services Grid */}
          <div className="flex-1">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-4 flex flex-wrap items-center gap-2">
                {selectedCategory && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory("")}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
                {(priceRange[0] > 0 || priceRange[1] < 1000) && (
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                    ${priceRange[0]} - ${priceRange[1]}
                    <button onClick={() => setPriceRange([0, 1000])}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </div>
            )}

            <p className="mb-4 text-sm text-muted-foreground">
              Showing {filteredServices.length} service{filteredServices.length !== 1 ? "s" : ""}
            </p>

            {filteredServices.length === 0 ? (
              <div className="rounded-xl border border-border bg-card p-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-medium text-foreground">No services found</h3>
                <p className="mt-2 text-muted-foreground">
                  Try adjusting your filters or search query
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredServices.map((service, index) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group rounded-xl border border-border bg-card overflow-hidden transition-all hover:border-primary/50 hover:shadow-lg"
                  >
                    {/* Service Image */}
                    <div className={`relative h-40 ${!service.image_url ? (categoryColors[service.category] || "bg-muted") : ""} flex items-center justify-center overflow-hidden`}>
                      {service.image_url ? (
                        <img
                          src={service.image_url}
                          alt={service.name}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : (
                        (() => {
                          const Icon = iconMap[
                            categories.find((c) => c.name === service.category)?.icon || ""
                          ] || Briefcase;
                          return <Icon className="h-12 w-12 opacity-50" />;
                        })()
                      )}
                    </div>

                    <div className="p-5">
                      <div className="mb-2 flex items-start justify-between">
                        <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${categoryColors[service.category] || "bg-muted text-muted-foreground"}`}>
                          {service.category}
                        </span>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span>4.8</span>
                        </div>
                      </div>

                      <h3 className="mb-1 font-semibold text-foreground group-hover:text-primary">
                        {service.name}
                      </h3>

                      {service.business_details && (
                        <p className="mb-2 text-sm text-muted-foreground">
                          {service.business_details.business_name}
                        </p>
                      )}

                      <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
                        {service.description}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="truncate">
                            {service.business_details?.business_address || "Local Area"}
                          </span>
                        </div>
                        <span className="font-semibold text-primary">
                          ₹{service.price?.toLocaleString('en-IN')}
                          <span className="text-xs font-normal text-muted-foreground">
                            {service.price_type && service.price_type !== 'fixed' ? ` ${service.price_type}` : ''}
                          </span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
