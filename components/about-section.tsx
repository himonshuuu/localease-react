"use client";

import { CheckCircle, Clock, Shield, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Shield,
    title: "Verified Professionals",
    description: "All service providers are thoroughly vetted and background checked for your safety.",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Read real reviews from customers and choose providers with proven track records.",
  },
  {
    icon: Clock,
    title: "Quick & Easy Booking",
    description: "Book services in minutes with our streamlined scheduling system.",
  },
  {
    icon: CheckCircle,
    title: "Satisfaction Assured",
    description: "We stand behind our service providers with a satisfaction guarantee.",
  },
];

export function AboutSection() {
  return (
    <section className="bg-secondary/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold text-foreground sm:text-4xl">
              Why Choose LocalEase?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We&apos;re committed to connecting you with the best local service
              providers while ensuring a safe, reliable, and hassle-free experience.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{feature.title}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border">
                  <div className="text-3xl font-bold text-primary">500+</div>
                  <p className="mt-1 text-sm text-muted-foreground">Service Providers</p>
                </div>
                <div className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border">
                  <div className="text-3xl font-bold text-primary">10K+</div>
                  <p className="mt-1 text-sm text-muted-foreground">Happy Customers</p>
                </div>
              </div>
              <div className="mt-8 space-y-4">
                <div className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border">
                  <div className="text-3xl font-bold text-primary">4.8</div>
                  <p className="mt-1 text-sm text-muted-foreground">Average Rating</p>
                </div>
                <div className="rounded-2xl bg-card p-6 shadow-lg ring-1 ring-border">
                  <div className="text-3xl font-bold text-primary">24/7</div>
                  <p className="mt-1 text-sm text-muted-foreground">Support Available</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
