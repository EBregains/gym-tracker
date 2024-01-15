'use client'

import useModal from "@/hooks/useModal";
import useLocalStorage from "@/hooks/useLocalStorage"
import Modal from "@/ui/Modal";
import { ChevronLeftIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Dispatch, MutableRefObject, SetStateAction, useEffect, useRef, useState } from "react";

enum STATUS {
  IDLE,
  TRAINING,
  RESTING,
  FINISHED
}
export default function Page(){
  
  
  const { ref, onOpen, onClose } = useModal();

  // TODO: Change Exercise with modal
  const selectedExercise = 'PRESS BANCA';

  const [formData, setFormData] = useLocalStorage('formData',{ 
    selectedExercise: selectedExercise,
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
        <form action="onAddEntry" className="grid h-auto grid-cols-subgrid col-span-4 gap-y-4 place-content-between">  
            
            <div className="grid h-auto grid-cols-subgrid col-span-4 gap-y-6 place-content-start">
              <div className="flex flex-col justify-between col-span-4 w-full h-[48px]">
                <label htmlFor="exercise" className="w-full inline-flex justify-between text-text-200">
                  Next Exercise <MagnifyingGlassIcon className="col-span-1 size-5 self-center hover:scale-150"/>
                </label>
                <button 
                  type="button"
                  onClick={onOpen}
                >
                  <input 
                    className="w-full border-b-2 border-background-300 font-medium text-xl uppercase"
                    type="text" 
                    name="selectedExercise"
                    id="exercise" 
                    value={formData.selectedExercise} 
                    placeholder="Select an Exercise..."
                    readOnly
                  />
                </button>
              </div>

              <Modal ref={ref} title="Select Exercise" onClose={onClose}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio repellat magnam mollitia perferendis possimus dolorem cupiditate iste et suscipit, necessitatibus maxime modi labore, excepturi neque minus nemo, odit amet sint.
              </Modal>

            <div className="flex flex-col justify-between col-span-2 h-[48px] ">
              <label htmlFor="weight" className="w-full text-text-200">
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
            <div className="flex flex-col justify-between col-span-1 h-[48px] ">
              <label htmlFor="reps" className="w-full text-text-200">
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
            <div className="flex flex-col justify-between col-span-1 h-[48px] ">
              <label htmlFor="rir" className="w-full text-text-200">
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
            <div className="flex justify-between items-center col-span-4">
              <p>Total Volume</p>
              <p><span className="font-medium text-lg">
                {formData.weight && formData.reps ?  Number(formData.weight) * Number(formData.reps) : '-  '}
                </span>
                Kg
              </p>
            </div>
          </div>
          <div className="grid grid-cols-subgrid col-span-4 gap-y-6 h-auto">
            <div className="col-span-2 flex flex-col items-center bg-background-200 p-4">
              <p className="uppercase text-lg font-medium">Training</p>
              <p>sec</p>
              <p className="font-medium text-3xl">{elapsedTraining.toFixed(0) && elapsedTraining.toFixed(0)}</p>
            </div>
            <div className="col-span-2 flex flex-col items-center bg-background-300 p-4">
              <p className="uppercase text-lg font-medium">Resting</p>
              <p>sec</p>
              <p className="font-medium text-3xl">{elapsedResting.toFixed(0) && elapsedResting.toFixed(0)}</p>
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
                type="button"
                className="self-center text-background-100 text-base text-normal"
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