"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Briefcase,
  Camera,
  Loader2,
  Check,
  AlertCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";

type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  avatar_url: string | null;
  user_type: string;
};

type BusinessDetails = {
  id: string;
  business_name: string;
  business_email: string | null;
  business_phone: string | null;
  business_address: string | null;
  business_category: string | null;
  business_description: string | null;
  business_website: string | null;
};

export function ProfileContent({
  user,
  initialProfile,
  initialBusinessDetails,
}: {
  user: SupabaseUser;
  initialProfile: Profile | null;
  initialBusinessDetails: BusinessDetails | null;
}) {
  const [activeTab, setActiveTab] = useState<"personal" | "business">("personal");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();
  const supabase = createClient();

  // Personal info state
  const [firstName, setFirstName] = useState(initialProfile?.first_name || "");
  const [lastName, setLastName] = useState(initialProfile?.last_name || "");
  const [email, setEmail] = useState(initialProfile?.email || user.email || "");
  const [phone, setPhone] = useState(initialProfile?.phone || "");
  const [address, setAddress] = useState(initialProfile?.address || "");

  // Business info state
  const [businessName, setBusinessName] = useState(initialBusinessDetails?.business_name || "");
  const [businessEmail, setBusinessEmail] = useState(initialBusinessDetails?.business_email || "");
  const [businessPhone, setBusinessPhone] = useState(initialBusinessDetails?.business_phone || "");
  const [businessAddress, setBusinessAddress] = useState(initialBusinessDetails?.business_address || "");
  const [businessCategory, setBusinessCategory] = useState(initialBusinessDetails?.business_category || "");
  const [businessDescription, setBusinessDescription] = useState(initialBusinessDetails?.business_description || "");
  const [businessWebsite, setBusinessWebsite] = useState(initialBusinessDetails?.business_website || "");

  const categories = [
    "Home Services",
    "Beauty & Wellness",
    "Auto Services",
    "Professional Services",
    "Health & Medical",
    "Education & Tutoring",
    "Food & Catering",
    "Events & Entertainment",
    "Pet Services",
    "Technology",
  ];

  const isBusinessUser = initialProfile?.user_type === "business";

  const handleSavePersonal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          address,
          updated_at: new Date().toISOString(),
        })
        .eq("id", user.id);

      if (error) throw error;

      setMessage({ type: "success", text: "Profile updated successfully!" });
      router.refresh();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update profile. Please try again." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBusiness = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      if (initialBusinessDetails) {
        const { error } = await supabase
          .from("business_details")
          .update({
            business_name: businessName,
            business_email: businessEmail,
            business_phone: businessPhone,
            business_address: businessAddress,
            business_category: businessCategory,
            business_description: businessDescription,
            business_website: businessWebsite,
            updated_at: new Date().toISOString(),
          })
          .eq("id", initialBusinessDetails.id);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("business_details")
          .insert({
            profile_id: user.id,
            business_name: businessName,
            business_email: businessEmail,
            business_phone: businessPhone,
            business_address: businessAddress,
            business_category: businessCategory,
            business_description: businessDescription,
            business_website: businessWebsite,
          });

        if (error) throw error;
      }

      setMessage({ type: "success", text: "Business details updated successfully!" });
      router.refresh();
    } catch (error) {
      setMessage({ type: "error", text: "Failed to update business details. Please try again." });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
          <p className="mt-2 text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>

        {/* Avatar Section */}
        <div className="mb-8 flex items-center gap-6 rounded-xl border border-border bg-card p-6">
          <div className="relative">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-primary">
              {initialProfile?.avatar_url ? (
                <img
                  src={initialProfile.avatar_url}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <span className="text-3xl font-bold">
                  {(firstName || user.email || "U").charAt(0).toUpperCase()}
                </span>
              )}
            </div>
            <button className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground">
              <Camera className="h-4 w-4" />
            </button>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              {firstName} {lastName}
            </h2>
            <p className="text-muted-foreground">{email}</p>
            <span className="mt-2 inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
              {isBusinessUser ? "Business Account" : "Customer Account"}
            </span>
          </div>
        </div>

        {/* Message */}
        {message && (
          <div
            className={`mb-6 flex items-center gap-2 rounded-lg p-4 ${
              message.type === "success"
                ? "bg-green-500/10 text-green-600 dark:text-green-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
            }`}
          >
            {message.type === "success" ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            {message.text}
          </div>
        )}

        {/* Tabs */}
        {isBusinessUser && (
          <div className="mb-6 flex rounded-lg border border-border p-1">
            <button
              onClick={() => setActiveTab("personal")}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                activeTab === "personal"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab("business")}
              className={`flex-1 rounded-md py-2.5 text-sm font-medium transition-colors ${
                activeTab === "business"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Business Details
            </button>
          </div>
        )}

        {/* Personal Info Form */}
        {activeTab === "personal" && (
          <form onSubmit={handleSavePersonal} className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Personal Information</h3>

            <div className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium text-foreground">
                    First Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="firstName"
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium text-foreground">
                    Last Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="lastName"
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium text-foreground">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="address" className="text-sm font-medium text-foreground">
                  Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 sm:w-auto sm:px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </form>
        )}

        {/* Business Info Form */}
        {activeTab === "business" && isBusinessUser && (
          <form onSubmit={handleSaveBusiness} className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-6 text-lg font-semibold text-foreground">Business Information</h3>

            <div className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="businessName" className="text-sm font-medium text-foreground">
                  Business Name
                </label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="businessName"
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="businessEmail" className="text-sm font-medium text-foreground">
                    Business Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="businessEmail"
                      type="email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="businessPhone" className="text-sm font-medium text-foreground">
                    Business Phone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      id="businessPhone"
                      type="tel"
                      value={businessPhone}
                      onChange={(e) => setBusinessPhone(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="businessCategory" className="text-sm font-medium text-foreground">
                  Business Category
                </label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <select
                    id="businessCategory"
                    value={businessCategory}
                    onChange={(e) => setBusinessCategory(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="businessAddress" className="text-sm font-medium text-foreground">
                  Business Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    id="businessAddress"
                    type="text"
                    value={businessAddress}
                    onChange={(e) => setBusinessAddress(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-4 text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="businessWebsite" className="text-sm font-medium text-foreground">
                  Website
                </label>
                <input
                  id="businessWebsite"
                  type="url"
                  value={businessWebsite}
                  onChange={(e) => setBusinessWebsite(e.target.value)}
                  placeholder="https://example.com"
                  className="w-full rounded-lg border border-input bg-background py-2.5 px-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="businessDescription" className="text-sm font-medium text-foreground">
                  Business Description
                </label>
                <textarea
                  id="businessDescription"
                  value={businessDescription}
                  onChange={(e) => setBusinessDescription(e.target.value)}
                  rows={4}
                  className="w-full rounded-lg border border-input bg-background p-4 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50 sm:w-auto sm:px-6"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Business Details"
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
