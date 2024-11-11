"use server";

import { createClient } from "@/app/supabase/auth/server";

export async function getUniqueElements(columnName: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("images")
    .select(columnName, { count: "exact" })
    .eq("approved", true)
    .order(columnName, { ascending: true });

  if (error) {
    console.error(error);
    return error;
  }

  const uniqueElements = [...new Set(data.map((item) => item[columnName]))];

  return uniqueElements;
}

export async function filterElements(filters: object) {
  const supabase = await createClient();
  let query = supabase.from("images").select("*").eq("approved", true);

  for (const [columnName, values] of Object.entries(filters)) {
    if (values.length > 0) {
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

interface PaginatedFetchProps {
  filters: object;
  numItems: number;
  page: number;
}

export async function paginatedFetch({
  filters,
  numItems,
  page,
}: PaginatedFetchProps) {
  const supabase = await createClient();

  let query = supabase.from("images").select("*").eq("approved", true);

  for (const [columnName, values] of Object.entries(filters)) {
    if (values.length > 0) {
      query = query.in(columnName, values);
    }
  }

  query = query.range(numItems * page, numItems * page + numItems);

  const { data, error } = await query;
  if (error) {
    console.error(error);
    return null;
  }
  return data;
}

// the above function will return 26 images instead of 25. when calling it in other areas,
// slice the return to (0, 25)
