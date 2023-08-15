export const shuffleArrayHelper = <T>(array: T[]): T[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
}

export const formatTimerHelper = (milliseconds: number): string => {
  const date = new Date(milliseconds);
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  const millisecondsPart = date.getUTCMilliseconds();

  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(millisecondsPart).padStart(3, '0')}`;
}
