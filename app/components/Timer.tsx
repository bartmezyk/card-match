import { useEffect, useState } from "react";
import styled from "styled-components";

import { formatTimerHelper } from "common/helpers";

interface TimerProps {
  startGameDate: Date;
  stopCounting: boolean;
}

export const Timer = ({ startGameDate, stopCounting }: TimerProps) => {
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
        setTime(new Date().getTime() - startGameDate.getTime());
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
