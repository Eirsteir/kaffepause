import dayjs, { Dayjs } from 'dayjs';

export const getInitialsFromName = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

function nextTimeQuarterHour(time = new Date()) {
  const timeToReturn = new Date(time);

  timeToReturn.setMilliseconds(
    Math.ceil(timeToReturn.getMilliseconds() / 1000) * 1000,
  );
  timeToReturn.setSeconds(Math.ceil(timeToReturn.getSeconds() / 60) * 60);
  timeToReturn.setMinutes(Math.ceil(timeToReturn.getMinutes() / 15) * 15);
  return dayjs(timeToReturn);
}

export const generateTimeSlots = (): Dayjs[] => {
  const interval = 15; // TODO: constant
  const times: Dayjs[] = [];
  let start = nextTimeQuarterHour();
  const end = dayjs().endOf('day');

  while (start.isBefore(end) || start.isSame(end)) {
    times.push(start);
    start = start.add(interval, 'minutes');
  }

  return times;
};
