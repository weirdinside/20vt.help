"use server";

import { createClient } from "@/app/supabase/auth/server";

export async function getUniqueElements(columnName) {

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("images")
    .select(columnName, { count: "exact" })
    .order(columnName, { ascending: true });

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
