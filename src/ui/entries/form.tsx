'use client'

import useLocalStorage from "@/hooks/useLocalStorage"
import Modal from "@/ui/Modal";
import { onAddEntry } from "@/actions/data";
import { ChevronLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Dispatch, MutableRefObject, SetStateAction, Suspense, useEffect, useRef } from "react";
import ExerciseSelector from "@/ui/exercise-selector";
import useModal from "@/hooks/useModal";

enum STATUS {
  IDLE,
  TRAINING,
  RESTING,
  FINISHED
}

interface Props {
  exercises: Array<{id:number, name:string}> | null
}
export default function EntryForm({ exercises }: Props){
  
  const [formData, setFormData] = useLocalStorage('formData',{ 
    weight: '',
    reps: '', 
    rir: '', 
    trainingTime: 0, 
    restingTime: 0 
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  // TODO: Timers for training and resting
  const [currentStatus, setCurrentStatus] = useLocalStorage('currentStatus', STATUS['IDLE']);
  const [startTraining, setStartTraining ] = useLocalStorage('startTrainig', 0);
  const [startResting, setStartResting] = useLocalStorage('startResting', 0);
  
  const [finishTraining, setFinishTraining] = useLocalStorage('finishTraining', 0);
  const [finishResting, setFinishResting] = useLocalStorage('finishResting', 0);

  const intervalRef: MutableRefObject<number | NodeJS.Timeout | undefined> = useRef(0)

  useEffect (() => {
    if (currentStatus === STATUS['TRAINING']) {
      startTimer(setFinishTraining)
    }
    if (currentStatus === STATUS['RESTING']) {
      startTimer(setFinishResting)
    }
    if (currentStatus === STATUS['FINISHED']) {
      stopTimer();
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStatus])

  function startTimer(timer: Dispatch<SetStateAction<number>>) {
    intervalRef.current = setInterval(() => {
      timer(Date.now())
    }, 1000)  
  }

  function stopTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = undefined
  }

  function train() {
    setStartTraining(Date.now())
    setFinishTraining(Date.now())
    
    stopTimer()
    setCurrentStatus(STATUS['TRAINING'])
  }

  function rest() {
    setStartResting(Date.now())
    setFinishResting(Date.now())
    
    stopTimer()
    setCurrentStatus(STATUS['RESTING'])
  }

  function finish() {
    setCurrentStatus(STATUS['FINISHED'])
    setFormData((prevFormData: any) => ({ ...prevFormData, trainingTime: elapsedTraining, restingTime: elapsedResting}));
  }

  let elapsedTraining = 0
  if(startTraining !== null && finishTraining !== null) {
    elapsedTraining = (finishTraining - startTraining) / 1000
  }
  let elapsedResting = 0
  if(startResting !== null && finishResting !== null) {
    elapsedResting = (finishResting - startResting) / 1000
  }

return (
  <>
  <form action={onAddEntry}>       
    <div className="w-full pb-6 bg-background-100">
    <label htmlFor="customer" className="mb-2 block text-sm font-medium ">
            Choose Exercise
          </label>
          <div className="relative">
            <select
              id="exercise"
              name="exerciseId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby='customer-error'
            >
              <option value="" disabled>
                Select a customer
              </option>
              {exercises?.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
    </div>
    <div className="flex flex-row w-full h-auto justify-between pb-6 ">
      <div className="flex flex-col w-1/3">
      <label htmlFor="weight" className="text-text-200">
        Weight
      </label>
      <input 
        className="border-b-2 border-background-300 font-medium text-xl uppercase"
        type="number" 
        name="weight"
        id="weight"
        value={formData.weight} 
        onChange={onChange}
        placeholder="KG"
      />
      </div>
      <div className="flex flex-col w-1/4">
        <label htmlFor="reps" className="text-text-200">
          Reps
        </label>
        <input 
          className="border-b-2 border-background-300 font-medium text-xl uppercase"
          type="number"
          name="reps" 
          id="reps" 
          value={formData.reps}
          onChange={onChange}
          placeholder="N°"
        />
      </div>
      <div className="flex flex-col w-1/4">
        <label htmlFor="rir" className="text-text-200">
          RIR
        </label>
        <input 
          className="border-b-2 border-background-300 font-medium text-xl uppercase"
          type="number" 
          name="rir"
          id="rir" 
          value={formData.rir}
          onChange={onChange}
          placeholder="N°"
        />
      </div>
    </div>
    <div className="flex justify-between items-center p-6">
      <p>Total Volume</p>
      <p><span className="font-medium text-lg">
        {formData.weight && formData.reps ?  Number(formData.weight) * Number(formData.reps) : '-  '}
        </span>
        Kg
      </p>
    </div>
  <div className="grid grid-cols-subgrid col-span-4 gap-y-6 h-auto">
  <div className="col-span-2 flex flex-col items-center bg-background-200 p-4">
    <label htmlFor="trainingTime" className="uppercase text-lg font-medium">
      TRAINING
    </label>
    <input type="hidden" value={elapsedTraining.toFixed(0)} name="trainingTime" id="trainingTime"/>
    <p>sec</p>
    <p className="font-medium text-3xl"> {elapsedTraining.toFixed(0)}</p>
  </div>
  <div className="col-span-2 flex flex-col items-center bg-background-300 p-4">
  <label htmlFor="restingTime" className="uppercase text-lg font-medium">
      RESTING
    </label>
    <input type="hidden" value={elapsedResting.toFixed(0)} name="restingTime" id="restingTime"/>
    <p>sec</p>
    <p className="font-medium text-3xl"> {elapsedResting.toFixed(0)}</p>
  </div>

  <div className="flex justify-between col-span-4 gap-4">
    <button type="button" className="flex size-16 items-center justify-center border-[1px] border-text-200 self-center text-text-100 text-base text-normal">
      <ChevronLeftIcon className="size-5"/>
    </button>
  <div className='flex grow-[2] h-16  items-center justify-center bg-gradient-to-r from-primary-100 to-accent-100'>
    {currentStatus === STATUS['IDLE'] && 
      <button 
      type="button"
      className="self-center text-background-100 text-base text-normal"
      onClick={train}
      >
      START
    </button>}
    {currentStatus === STATUS['TRAINING'] &&
      <button 
      type="button"
      className="self-center text-background-100 text-base text-normal"
      onClick={rest}
    >
      REST
    </button>
    }
    {currentStatus === STATUS['RESTING'] &&
      <button 
      type="button"
      className="self-center text-background-100 text-base text-normal"
      onClick={finish}
    >
      FINISH
    </button>
    }
    {currentStatus === STATUS['FINISHED'] &&
      <button 
      type="submit"
      className="self-center text-background-100 text-base text-normal"
      onClick={() => {}}
    >
      SUBMIT
    </button>
    }
  </div>
  </div>
  </div>
  </form>
  </>
  )
}