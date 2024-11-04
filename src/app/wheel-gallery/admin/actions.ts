"use server";

import { createClient } from "@/app/supabase/auth/server";

export async function setApproved(id: number) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("images")
    .update({ approved: true })
    .eq("id", id);

  if (error) {
    console.error("Error updating approval status:", error);
    return null;
  }
  return data;
}
