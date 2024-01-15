import { MutableRefObject, useRef, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export default function useStoragedTimer(key: string, value: number, interval:number) {

  const [seconds, setSeconds] = useLocalStorage(`${key}seconds`, 0)
  const intervalRef : MutableRefObject<number | NodeJS.Timeout > = useRef(0)

  function start() {
    intervalRef.current = setInterval(() => {
      setSeconds((initialValue:number) => initialValue += 1)
    }, interval)
  }

  function stop() {
    clearInterval(intervalRef.current)
  }

  function getElapsedTime() {
    return seconds;
  }

  return {
    start,
    stop,
    getElapsedTime
  }
}