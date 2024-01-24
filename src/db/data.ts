import clsx from "clsx";
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

export async function fetchFilteredExercises(query: string) {

  let pattern = "%" + query + "%"  

  try {
    let { data: exercises, error } = await supabase
    .from('exercises')
    .select('id, name')
    .ilike('name', pattern)
    .throwOnError()
    
    return {exercises, error}
  } catch (error) {
    console.log( 'Database error: ', error);
    throw new Error('Failed to get exercises with pattern: ' + pattern)
  }
}