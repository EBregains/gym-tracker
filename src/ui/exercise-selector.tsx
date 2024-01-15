import { fetchExercises }from "@/db/data"

export default async function ExerciseSelector({ exercises }: any) {

  const exerciseList = await fetchExercises();
  console.log(exerciseList.error, exerciseList.exercises);
  

  return (
    <>
      <h4>Exercise selector</h4>
    </>
  )
}