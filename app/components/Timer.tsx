import { useEffect, useState } from "react";

import { formatTimerHelper } from "common/helpers";

interface TimerProps {
  startDate: Date;
  stopCounting: boolean;
}

export const Timer = ({ startDate, stopCounting }: TimerProps) => {
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

  useEffect(() => {
    if (stopCounting) {
      clearInterval(timer);
    }

    // eslint-disable-next-line
  }, [stopCounting]);

  useEffect(() => {
    setTimer(
      setInterval(() => {
        setTime(new Date().getTime() - startDate.getTime());
      }, 1)
    );

    return () => {
      clearInterval(timer);
    };

    // eslint-disable-next-line
  }, []);

  return (
    <h4 className="mt-1 text-base font-mono">
      Time: {formatTimerHelper(time)}
    </h4>
  );
};
