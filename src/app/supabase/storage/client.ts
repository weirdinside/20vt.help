import { v4 as uuidv4 } from "uuid";
import imageCompression from "browser-image-compression";
import { createSupabaseClient } from "../client";

function getStorage() {
  const { storage } = createSupabaseClient();
  return storage;
}

type UploadProps = {
  file: File;
  bucket: string;
  folder?: string;
};

export async function uploadImage({ file, bucket, folder }: UploadProps) {
  const fileName = file.name;
  const fileExtension = fileName.slice(fileName.lastIndexOf(".") + 1);
  const path = `${folder ? folder + "/" : ""}${uuidv4()}.${fileExtension}`;

  try {
    file = await imageCompression(file, { maxSizeMB: 0.8 });
  } catch (error) {
    console.error(error);
    return { imageUrl: "", error: "image compression failed!" };
  }

  const storage = getStorage();

  const { data, error } = await storage.from(bucket).upload(path, file);

  if (error) {
    return { imageUrl: "", error: "image upload failed!" };
  }

  const imageUrl = `${process.env
    .NEXT_PUBLIC_SUPABASE_URL!}/storage/v1/object/public/${bucket}/${data?.path}`;

  return { imageUrl, error: "" };
}

export async function fetchAllApprovedImages() {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("approved", true);

  if (error) {
    console.error("Error fetching images:", error);
    return null;
  }
  return data;
}

export async function fetchAllUnapprovedImages() {
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("images")
    .select("*")
    .eq("approved", false);

  if (error) {
    console.error("error fetching images:", error);
    return null;
  }

  return data;
}
