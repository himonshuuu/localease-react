import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProfileContent } from "@/components/profile-content";

export const metadata = {
  title: "Profile - LocalEase",
  description: "Manage your LocalEase profile",
};

async function getProfileData() {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  let businessDetails = null;
  if (profile?.user_type === "business") {
    const { data: business } = await supabase
      .from("business_details")
      .select("*")
      .eq("profile_id", user.id)
      .single();
    businessDetails = business;
  }

  return { user, profile, businessDetails };
}

export default async function ProfilePage() {
  const { user, profile, businessDetails } = await getProfileData();

  return (
    <ProfileContent 
      user={user} 
      initialProfile={profile} 
      initialBusinessDetails={businessDetails} 
    />
  );
}
