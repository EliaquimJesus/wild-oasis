import supabase, { supabaseUrl } from "./supabase";

// Read cabins data
export async function getCabines() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

// insert, edit cabin
export async function createEditCabin(newCabine, id) {
  const hasImagePath = newCabine.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabine.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = hasImagePath
    ? newCabine.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/Edit cabin
  let query = supabase.from("cabins");

  // A. CREACTE
  if (!id) query = query.insert([{ ...newCabine, image: imagePath }]);

  // B. EDIT
  if (id) query = query.update({ ...newCabine, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be created.");
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabine.image);

  // 3. Delete tha cabin if there was an error uploading image
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);

    console.log(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabine was not created"
    );
  }

  return data;
}

// Delete cabin
export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted.");
  }

  return data;
}
