export const randomizeArrayHelper = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
}

export const formatTimerHelper = (milliseconds: number): string => {
  const date = new Date(milliseconds);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const millisecondsPart = date.getUTCMilliseconds();

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millisecondsPart).padStart(3, '0')}`;
}
