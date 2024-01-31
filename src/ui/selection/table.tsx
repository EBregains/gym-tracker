import { fetchFilteredExercises } from "@/db/data"
import Link from "next/link"

export default async function Table({
  query 
}: {
  query : string
}) {

  const exercises = await fetchFilteredExercises(query)

  return (
    <>
      <div className="col-span-4 h-auto overflow-auto">
        {exercises?.exercises?.map((exercise) => (
          <Link 
            key={exercise.id}
            href={`/entry?id=${exercise.id}&name=${exercise.name}`}
            className="w-full block bg-background-200 p-4 uppercase hover:bg-primary-100 hover:text-background-100"
          >
            {exercise.name}
          </Link>
        ))}
      </div>
    </>
  )
}