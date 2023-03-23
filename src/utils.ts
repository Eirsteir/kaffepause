import dayjs from 'dayjs';

import { TimeSlot } from '@/types/Time';

export const getInitialsFromName = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const generateTimeSlots = (): TimeSlot[] => {
  const interval = 15; // TODO: constant
  const times: TimeSlot[] = [];
  let start = dayjs().startOf('hour').add(interval, 'minutes');
  const end = dayjs().endOf('day');

  while (start.isBefore(end) || start.isSame(end)) {
    start = start.add(interval, 'minutes');
    times.push({ time: start, formatted: start.format('HH:mm') });
  }

  return times;
};
