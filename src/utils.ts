import dayjs, { Dayjs } from 'dayjs';

export const getInitialsFromName = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const generateTimeSlots = (): Dayjs[] => {
  const interval = 15; // TODO: constant
  const times: Dayjs[] = [];
  let start = dayjs().startOf('hour').add(interval, 'minutes');
  const end = dayjs().endOf('day');

  while (start.isBefore(end) || start.isSame(end)) {
    start = start.add(interval, 'minutes');
    times.push(start);
  }

  return times;
};
