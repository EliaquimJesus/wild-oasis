import supabase from "./supabase";

export async function getCabines() {
    const { data, error } = await supabase.from("cabins").select("*");

    if (error) {
        console.log(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

export async function createCabin(newCabine) {
    const { data, error } = await supabase
        .from("cabins")
        .insert([newCabine])
        .select();

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be created.");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);

    if (error) {
        console.log(error);
        throw new Error("Cabin could not be deleted.");
    }

    return data;
}
