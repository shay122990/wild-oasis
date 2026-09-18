import { supabase, supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) console.log("cabins cannot be loaded");

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) console.log("cabin could not be deleted");

  return data;
}

export async function createEditCabin(newCabin, id) {
  // console.log("newCabin:", newCabin);
  // console.log("id:", id);
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  let imageName;
  let imagePath = newCabin.image;

  // New image selected
  if (!hasImagePath) {
    imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");

    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  }

  // Create or edit cabin
  let query = supabase.from("cabins");

  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  } else {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    //the ID is being used as the condition for finding the row, not as data you necessarily want to change.
  }

  const { data, error } = await query.select().single(); // return a single row object once updated

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be created or updated");
  }

  if (hasImagePath) return data;

  // Only upload to Supabase STORAGE if there is a NEW image
  if (!hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      // If this was a newly created cabin, remove it
      if (!id) {
        await supabase.from("cabins").delete().eq("id", data.id);
      }

      console.error(storageError);

      throw new Error(
        `Cabin image could not be uploaded and the cabin was not ${
          id ? "updated" : "created"
        }.`,
      );
    }
  }

  return data;
}
