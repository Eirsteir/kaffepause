import { useRouter } from 'next/router';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';

import { TimeSlot } from '@/types/Time';
import { generateTimeSlots } from '@/utils';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export const useTimeSlots = (): [
  TimeSlot[],
  TimeSlot,
  React.Dispatch<React.SetStateAction<TimeSlot>>,
] => {
  const timeslots: TimeSlot[] = useMemo(generateTimeSlots, [generateTimeSlots]);
  const [timeSlot, setTimeSlot] = useState<TimeSlot>(timeslots[0]);
  return [timeslots, timeSlot, setTimeSlot];
};

export const useRefreshData = () => {
  const router = useRouter();
  return () => {
    router.replace(router.asPath);
  };
};
