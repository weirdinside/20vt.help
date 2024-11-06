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

export async function updateImageData({
  id,
  carType,
  wheelSize,
  wheelBrand,
  wheelName,
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("images")
    .update({
      car_type: carType,
      wheel_size: parseInt(wheelSize),
      wheel_brand: wheelBrand,
      wheel_name: wheelName,
    })
    .eq("id", id);

  console.log(data);

  if (error) {
    console.error("Error updating image data:", error);
    return null;
  }

  return data;
}
