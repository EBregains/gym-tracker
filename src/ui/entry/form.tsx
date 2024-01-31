'use client'

import useLocalStorage from "@/hooks/useLocalStorage"
import { onAddEntry } from "@/actions/data";
import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowPathIcon, StopIcon } from "@heroicons/react/24/solid";

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
  
  const [formData, setFormData] = useState({
    weight: '',
    reps: '', 
    rir: '', 
  })

  // TODO: Timers for training and resting
  const [currentStatus, setCurrentStatus] = useState(STATUS['IDLE']);

  const [startTraining, setStartTraining ] = useLocalStorage('startTraining', 0);
  const [startResting, setStartResting] = useLocalStorage('startResting', 0);
  
  const [finishTraining, setFinishTraining] = useLocalStorage('finishTraining', 0);
  const [finishResting, setFinishResting] = useLocalStorage('finishResting', 0);

  const TimeStampRef: MutableRefObject<number | NodeJS.Timeout | undefined> = useRef(0)
  let elapsedTraining = 0
  let elapsedResting = 0

  useEffect (() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    elapsedTraining = (finishTraining - startTraining) / 1000
    // eslint-disable-next-line react-hooks/exhaustive-deps
    elapsedResting = (finishResting - startResting) / 1000
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
    TimeStampRef.current = setInterval(() => {
      timer(Date.now())
    }, 1000)  
  }

  function stopTimer() {
    clearInterval(TimeStampRef.current);
    TimeStampRef.current = undefined
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

  function reset() {
    setCurrentStatus(STATUS['IDLE'])
  }
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({ ...prevFormData, [name]: value }));
  };

  if(startTraining !== null && finishTraining !== null) {
    elapsedTraining = (finishTraining - startTraining) / 1000
  }
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

  <div className="grid grid-cols-4 col-span-4 gap-4 h-auto">
    {
    currentStatus === STATUS['IDLE'] ?
      <button 
        className="flex flex-col col-span-2 items-center justify-center bg-gradient-to-r from-primary-100 to-accent-100 text-background-100 p-4"
        onClick={train}
        >
        TRAIN
      </button> :
      <div className="flex flex-col col-span-2 items-center bg-background-200 p-4">
      <label htmlFor="trainingTime" className="uppercase text-lg font-medium">
        TRAINING
      </label>
      <input type="hidden" value={elapsedTraining.toFixed(0)} name="trainingTime" id="trainingTime"/>
      <p>sec</p>
      <p className="font-medium text-3xl"> {elapsedTraining.toFixed(0)}</p>
      </div>
    }
    {
    currentStatus <= STATUS['TRAINING'] ?
      <button 
        className="flex flex-col col-span-2 items-center justify-center bg-gradient-to-r from-primary-100 to-accent-100 text-background-100 p-4"  
        onClick={rest}
        disabled={currentStatus !== STATUS['TRAINING']}
      >
        REST
      </button> 
      :
      <div className="flex flex-col col-span-2 items-center bg-background-200 p-4">
      <label htmlFor="restingTime" className="uppercase text-lg font-medium">
          RESTING
        </label>
        <input type="hidden" value={elapsedResting.toFixed(0)} name="restingTime" id="restingTime"/>
        <p>sec</p>
        <p className="font-medium text-3xl"> {elapsedResting.toFixed(0)}</p>
      </div>
    }

    {
      currentStatus === STATUS['FINISHED'] ?
      <button
        type="button"
        className="col-span-1 p-4 bg-background-100 text-text-100 border-2 border-text-200"
        onClick={reset}
      >
        <ArrowPathIcon></ArrowPathIcon>
      </button>
      :
      <button 
        type="button"
        className="col-span-1 p-4 bg-gradient-to-r from-primary-100 to-accent-100 text-background-100 "
        onClick={finish}
        disabled={currentStatus !== STATUS['RESTING']}
      >
        <StopIcon></StopIcon>
      </button>
    }
    <button 
      type="submit"
      className="col-span-3 p-4 bg-gradient-to-r from-primary-100 to-accent-100 text-background-100"
      onSubmit={() => {}}
      disabled={currentStatus !== STATUS['FINISHED']}
    >
      SUBMIT
    </button>
  </div>
  </form>
  </>
  )
}