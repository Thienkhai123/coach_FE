import { convertSecondToMMSS } from "@/helpers/functionHelper";
import { useEffect, useRef, useState } from "react";

interface ICountDownProps {
  inputTimer: number;
}

const CountDown = ({ inputTimer }: ICountDownProps) => {
  const [timer, setTimer] = useState<number>(inputTimer);
  const intervalRef = useRef<any>(); // Add a ref to store the interval id

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  // Add a listener to `timeLeft`
  useEffect(() => {
    if (timer <= 0) {
      clearInterval(intervalRef.current);
      window.location.reload();
    }
  }, [timer]);

  return (
    <>
      <span className="text-semantic-red text-sm font-semibold text-center">
        {convertSecondToMMSS(timer)}s
      </span>
      <span id="time-countdown" className="hidden">
        {timer}
      </span>
    </>
  );
};

export default CountDown;
