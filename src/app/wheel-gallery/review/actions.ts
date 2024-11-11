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
  subtype,
  wheelBrand,
  wheelName,
}) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("images")
    .update({
      subtype: subtype,
      car_type: carType,
      wheel_size: wheelSize,
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

export async function deleteImage({url}){

  const convertedUrl = url.slice(url.lastIndexOf('/') + 1);
  console.log(convertedUrl, url)
  const supabase = await createClient();

  const { data, error } = await supabase
  .storage
  .from('submitted-images')
  .remove([convertedUrl]);

  if (error) {
    console.error("Error deleting image:", error);
    return null;
  }

  return (`Image deleted ${data}`);
}

export async function deleteEntry({ id }) {
  const supabase = await createClient();

  const { data, error: deleteError } = await supabase
    .from('images')
    .delete()
    .eq('id', id)
    .select();

  if (deleteError) {
    console.error('Error deleting image:', deleteError);
    return null;
  }

  return data[0];
}