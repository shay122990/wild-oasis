import { supabase } from "./supabase";

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

export async function createCabin(newCabin) {
  const { data, error } = await supabase.from("cabins").insert([newCabin]);

  if (error) console.log("cabin could not be created");

  return data;
}
