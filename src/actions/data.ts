'use server'

import { supabase } from '@/db/supabase';
import { log } from 'console';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid'
import { z } from 'zod'

const EntrySchema = z.object({
  id: z.number().gt(0, { message: 'Please select an exercies'}),
  date: z.coerce.date(),
  exercise: z.coerce.number().gt(0, { message: 'Exercise must be selected' }),
  weight: z.coerce.number().gte(0,{ message: 'Invalid number' }).max(400),
  reps: z.coerce.number().gt(0,{ message: 'Invalid number' }),
  rir: z.coerce.number().gte(0,{ message: 'Invalid number' }),
  trainingTime: z.coerce.number().gt(0,{ message: 'Invalid number' }),
  restingTime: z.coerce.number().gt(0,{ message: 'Invalid number' })
})

const AddEntry = EntrySchema.omit({id: true, date: true})
// This is temporary until @types/react-dom is updated
export type State = {
  errors?: {
    date?: string[];
    exercise?: string[];
    weight?: string[];
    reps?: string[];
    rir?: string[];
    trainingTime?: string[];
    restingTime?: string[]
  };
  message?: string | null;
};

export async function onAddEntry(formData: FormData) {
  
  // Validation
  const validatedFields = AddEntry.safeParse({
    date: formData.get('date'),
    exercise: formData.get('exerciseId'),
    weight: formData.get('weight'),
    reps: formData.get('reps'),
    rir: formData.get('rir'),
    trainingTime: formData.get('trainingTime'),
    restingTime: formData.get('restingTime'),
  })
  
  // If Validation Fails retrun error
  if (!validatedFields.success) {
    console.log(validatedFields.error.flatten().fieldErrors);
    // TODO write in red the errors in page with inital state
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: 'missing fields, failed to create entry'
    }
  }
  
  // Preparing data for Insertion
  const { exercise, weight, reps, rir, trainingTime, restingTime } = validatedFields.data;
  const date = Date.now()

  console.log(exercise, weight, reps, rir, trainingTime, restingTime);
  
  // try {
  //   const { data, error } = await supabase
  //   .from('entries')
  //   .insert([
  //     { 
  //       id: uuidv4(),
  //       date: date,
  //       exercise_id: exercise,
  //       weight: weight,
  //       reps: reps,
  //       rir: rir,
  //       training_time: trainingTime,
  //       resting_time: restingTime,
  //     }
  //   ])
  //   .select()

  //   console.log(data);
    
  // } catch (error) {
  //   return error
  // }

  // revalidatePath('/entry')
  // redirect('/entry')

}