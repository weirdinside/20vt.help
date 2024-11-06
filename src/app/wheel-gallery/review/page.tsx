import { redirect } from "next/navigation";
import { createClient } from "@/app/supabase/auth/server";
import ReviewGallery from "@/app/_components/Wheel Gallery/ReviewPage/ReviewPage";

export default async function Review() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/wheel-gallery/login");
  }

  return (
    <ReviewGallery userData={data}></ReviewGallery>
  );
}
