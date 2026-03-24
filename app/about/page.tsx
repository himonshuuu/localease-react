import { Shield, Users, Heart, Award, Target, Lightbulb } from "lucide-react";

export const metadata = {
  title: "About Us - LocalEase",
  description: "Learn about LocalEase and our mission to connect communities with local services",
};

const values = [
  {
    icon: Shield,
    title: "Trust & Safety",
    description: "We verify all service providers and maintain high standards for community safety.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "We believe in strengthening local communities by supporting local businesses.",
  },
  {
    icon: Heart,
    title: "Customer Care",
    description: "Every interaction matters. We're committed to exceptional customer experiences.",
  },
  {
    icon: Award,
    title: "Quality Service",
    description: "We partner only with providers who demonstrate excellence in their craft.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: null,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: null,
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: null,
  },
  {
    name: "David Kim",
    role: "Head of Community",
    image: null,
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold text-foreground sm:text-5xl">
              About LocalEase
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              We&apos;re on a mission to make finding trusted local services as easy as
              a few clicks. Our platform connects customers with verified service
              providers, building stronger communities one service at a time.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Mission</h2>
              <p className="mt-4 text-muted-foreground">
                To empower local service providers and connect them with customers
                who need their expertise. We believe everyone deserves access to
                quality services, and every skilled professional deserves
                recognition for their work.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-foreground">Our Vision</h2>
              <p className="mt-4 text-muted-foreground">
                To become the most trusted platform for local services worldwide,
                where every community member can easily find reliable help and every
                service provider can grow their business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Our Core Values
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="rounded-xl border border-border bg-card p-6 text-center"
                >
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="mb-2 font-semibold text-foreground">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">
            Meet Our Team
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="mx-auto mb-4 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
                  <span className="text-4xl font-bold text-primary">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground">{member.name}</h3>
                <p className="text-sm text-muted-foreground">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 text-center sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "500+", label: "Service Providers" },
              { value: "50+", label: "Service Categories" },
              { value: "4.8", label: "Average Rating" },
            ].map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-primary-foreground">
                  {stat.value}
                </div>
                <p className="mt-1 text-primary-foreground/80">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
