
import EntryForm  from '@/ui/entries/form'
import useModal from "@/hooks/useModal";
import ExerciseSelector from '@/ui/exercise-selector';
import { useState } from 'react';
import Modal from '@/ui/Modal';
import { fetchExercises } from '@/db/data';

export default async function AddEntryPage() {

  const exercises = await fetchExercises();
  return (
    <>
      <div className='col-span-4 gap-5 min-w-[325px] h-auto bg-background-100'>
        <EntryForm exercises={exercises.exercises} />
      </div>
    </>
    )
}