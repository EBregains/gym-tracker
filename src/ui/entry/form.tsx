'use client'

import useLocalStorage from "@/hooks/useLocalStorage"
import { onAddEntry } from "@/actions/data";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef } from "react";
import clsx from "clsx";

enum STATUS {
  IDLE,
  TRAINING,
  RESTING,
  FINISHED
}

interface Props {
  selectedExercise: {id:number, name:string} | null,
}
export default function EntryForm({ selectedExercise }: Props){
  
  const [formData, setFormData] = useLocalStorage('formData',{
    weight: '',
    reps: '', 
    rir: '', 
    trainingTime: 0, 
    restingTime: 0 
  })

  // TODO: Timers for training and resting
  const [currentStatus, setCurrentStatus] = useLocalStorage('currentStatus', STATUS['IDLE']);
  const [startTraining, setStartTraining ] = useLocalStorage('startTraining', 0);
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

  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

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
    <input 
      type="hidden"
      name="exerciseId"
      id="exerciseId"
      value={selectedExercise?.id}
    />
    <div className="flex flex-row w-full h-auto justify-between ">
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
    <div className="flex justify-end items-center py-6">
      <p className="w-1/2">Total Volume</p>
      <p><span className="font-medium text-lg">
        {formData.weight && formData.reps ?  Number(formData.weight) * Number(formData.reps) : '-  '}
        </span>
        Kg
      </p>
    </div>
    <div className="grid grid-cols-subgrid col-span-4 gap-6 h-auto">
  <div className={clsx("flex flex-col col-span-2 items-center bg-background-200 p-4", currentStatus == STATUS['TRAINING'] ? "bg-accent-100" : "bg-background-300")}>
    <label htmlFor="trainingTime" className="uppercase text-lg font-medium">
      TRAINING
    </label>
    <input type="hidden" value={elapsedTraining.toFixed(0)} name="trainingTime" id="trainingTime"/>
    <p>sec</p>
    <p className="font-medium text-3xl"> {elapsedTraining.toFixed(0)}</p>
  </div>
  <div className={clsx("flex flex-col col-span-2 items-center bg-background-200 p-4", currentStatus == STATUS['RESTING'] ? "bg-accent-100" : "bg-background-300")}>
  <label htmlFor="restingTime" className="uppercase text-lg font-medium">
      RESTING
    </label>
    <input type="hidden" value={elapsedResting.toFixed(0)} name="restingTime" id="restingTime"/>
    <p>sec</p>
    <p className="font-medium text-3xl"> {elapsedResting.toFixed(0)}</p>
  </div>

  
  <div className="flex justify-between col-span-4 gap-4">
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
      onSubmit={() => {}}
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