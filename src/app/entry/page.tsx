
import EntryForm  from '@/ui/entry/form'
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AddEntryPage({
  searchParams 
} : {
  searchParams?: {
    id: number,
    name: string,
  }
}
  ) {

  if (!searchParams?.id || !searchParams?.name) {
    revalidatePath('/selection')
    redirect('/selection')  
  }
  
  const id = searchParams.id;
  const name = searchParams.name;

  return (
    <>
      <div className='col-span-4 flex flex-col h-auto bg-background-100'>
        <div className='flex items-center mb-4'>
          <Link href='/selection' className="flex justify-center items-center size-6 mr-3 border border-text-200">
            <ChevronLeftIcon className="size-4 text-text-200"/>
          </Link>
          <h1 className='text-2xl uppercase font-bold '>Create new entry</h1>
        </div>
        <div className='h-auto'>
          <p className='text-text-200'>Performing</p>
          <p className='font-medium text-xl uppercase mb-4'>{name}</p>
          <EntryForm 
            selectedExercise={{id: id, name: name}}
          />
        </div>
      </div>
    </>
    )
}