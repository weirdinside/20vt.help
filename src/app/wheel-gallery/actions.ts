"use server";

import { createClient } from "@/app/supabase/auth/server";

export async function getUniqueElements(columnName) {
  const supabase = await createClient();
  console.log(columnName)

  const { data, error } = await supabase
    .from("images")
    .select(columnName, { count: "exact" })
    .order(columnName, { ascending: true });

  if (error) {
    console.error(error);
    return error;
  }

  const uniqueElements = [...new Set(data.map(item => item[columnName]))];

  return uniqueElements;
}

export async function filterElements(filters: object) {
  const supabase = await createClient();
  let query = supabase.from("images").select("*").eq("approved", true);

  for (const [columnName, values] of Object.entries(filters)) {
    if(values.length > 0){
      query = query.in(columnName, values);
    }
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    return null;
  }

  return data;
}
