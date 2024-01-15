
import Image from 'next/image'
import { formatDateToLocal } from '@/lib/utils';
import Link from 'next/link';


const getToday = () => {
  const today = new Date();
  return formatDateToLocal(today);
}

export default function Home() {

  const today = getToday()

  return (

        <div className='flex flex-col col-span-4 w-auto h-auto gap-5 items-center justify-end '>
          <div className='flex w-full justify-evenly'>
            <p className='font-base font-normal '>Date:</p>
            <h5 className='font-medium text-lg'>{today}</h5>
          </div>
          <div className='flex h-16 w-full items-center justify-center bg-gradient-to-r from-primary-100 to-accent-100'>
            <Link className="self-center text-background-100 text-base text-normal" href="/entry">START TRACKING</Link>
          </div>
        </div>
  )
}
