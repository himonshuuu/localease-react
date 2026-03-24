"use client";

import Link from "next/link";
import {
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
  ArrowRight,
} from "lucide-react";
import { motion } from "framer-motion";

const categories = [
  { name: "Home Services", icon: Home, color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { name: "Beauty & Wellness", icon: Sparkles, color: "bg-pink-500/10 text-pink-600 dark:text-pink-400" },
  { name: "Auto Services", icon: Car, color: "bg-orange-500/10 text-orange-600 dark:text-orange-400" },
  { name: "Professional Services", icon: Briefcase, color: "bg-purple-500/10 text-purple-600 dark:text-purple-400" },
  { name: "Health & Medical", icon: Heart, color: "bg-red-500/10 text-red-600 dark:text-red-400" },
  { name: "Education & Tutoring", icon: GraduationCap, color: "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" },
  { name: "Food & Catering", icon: UtensilsCrossed, color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
  { name: "Events & Entertainment", icon: PartyPopper, color: "bg-teal-500/10 text-teal-600 dark:text-teal-400" },
  { name: "Pet Services", icon: PawPrint, color: "bg-green-500/10 text-green-600 dark:text-green-400" },
  { name: "Technology", icon: Laptop, color: "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400" },
];

export function ServicesPreview() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-foreground sm:text-4xl"
          >
            Browse by Category
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto mt-4 max-w-2xl text-muted-foreground"
          >
            Explore our wide range of services and find the perfect match for your needs
          </motion.p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/services?category=${encodeURIComponent(category.name)}`}
                  className="group flex flex-col items-center gap-3 rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className={`flex h-14 w-14 items-center justify-center rounded-xl ${category.color}`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <span className="text-center text-sm font-medium text-foreground group-hover:text-primary">
                    {category.name}
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            View All Services
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
