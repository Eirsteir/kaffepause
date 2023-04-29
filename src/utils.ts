import dayjs, { Dayjs } from 'dayjs';

export const getInitialsFromName = (name: string): string => {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
};

export const socialTextTruncated = (
  displayName: string,
  total: number,
): string => {
  if (total === 0) {
    return 'Med ingen andre';
  }
  const pluralSuffix = total > 2 ? 'andre' : 'annen';
  const suffix = total < 2 ? '' : ` og ${total - 1} ${pluralSuffix}`;
  return 'Med ' + displayName + suffix;
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
  const interval = parseInt(
    process.env.NEXT_PUBLIC_BREAK_PLANNER_TIME_SLOT_INVERVAL_IN_MINUTES,
  );
  const times: Dayjs[] = [];
  let start = nextTimeQuarterHour();
  const end = dayjs().endOf('day');

  while (start.isBefore(end) || start.isSame(end)) {
    times.push(start);
    start = start.add(interval, 'minutes');
  }

  return times;
};
