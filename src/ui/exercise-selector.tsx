import { fetchExercises }from "@/db/data"
import { useEffect } from "react";
import Search from "@/ui/search";

export default async function ExerciseSelector({ exercises }: any) {

  // --------------------------------------------------------------------------------------------------
  // TODO: AGREGAR UN COMPONENTE SEARCH Y UN COMPONENTE TABLE. SEARCH VA EN UI, TABLE VA EN UI/Entries
  // --------------------------------------------------------------------------------------------------

  return (
    <>
      <Search placeholder="Type the exercise you are looking for..."></Search>
      {/* <Table></Table> */}
    </>
  )
}