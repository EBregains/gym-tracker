'use client'

import { CheckBadgeIcon, CheckIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function EntrySuccessPage() {

  if (typeof window !== 'undefined') {
    window.localStorage.removeItem('formData');
    window.localStorage.removeItem('currentStatus');
    window.localStorage.removeItem('startTraining');
    window.localStorage.removeItem('finishTraining');
    window.localStorage.removeItem('startResting');
    window.localStorage.removeItem('finishResting');
  }


  return (
    <>
    <div
      className="col-span-4 flex flex-col"
    >
      <div className="flex flex-col h-full items-center justify-center">
        <CheckBadgeIcon className="text-accent-100 size-28"></CheckBadgeIcon>
        <h1
        className="text-2xl font-light mb-6">Success!</h1>
      </div>
      <div className="w-full flex flex-col justify-center gap-2">
          <Link 
            href="/selection"
            className="text-center w-full text-text-100 border-[1px] border-text-100 font-normal p-4"
          >
            New Exercise
          </Link>
          <Link 
            href="/selection"
            className="text-center w-full text-background-100 font-normal bg-gradient-to-r from-primary-100 to-accent-100 p-4 uppercase" 
          >
            Same Exercise
          </Link>
      </div>
    </div>
    </>
  )
}