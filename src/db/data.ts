import { supabase } from "./supabase";

export async function fetchExercises() {
  try {
    let { data: exercises, error } = await supabase
    .from('exercises')
    .select('id, name')
    
    return {exercises, error}
  } catch (error) {
    console.log( 'Database error: ', error);
    throw new Error('Failed to get exercises.')
  }
}