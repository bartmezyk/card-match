import { useEffect, useState } from "react";
import styled from "styled-components";

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

  return <StyledTimer>Time: {formatTimerHelper(time)}</StyledTimer>;
};

const StyledTimer = styled.div`
  margin-top: 5px;
  font-size: 16px;
  font-family: monospace;
`;
