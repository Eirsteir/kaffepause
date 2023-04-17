import { Dayjs } from 'dayjs';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';

import { generateTimeSlots } from '@/utils';

export const useHasMounted = () => {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return hasMounted;
};

export const useTimeSlots = (): [
  Dayjs[],
  Dayjs,
  React.Dispatch<React.SetStateAction<Dayjs>>,
] => {
  const timeslots: Dayjs[] = useMemo(generateTimeSlots, [generateTimeSlots]);
  const [timeSlot, setTimeSlot] = useState<Dayjs>(timeslots[0]);
  return [timeslots, timeSlot, setTimeSlot];
};

export const useRefreshData = () => {
  // Reload server side data
  const router = useRouter();
  return () => {
    router.replace(router.asPath);
  };
};

export const useParams = () => {
  // Waiting for useParams() from nextjs v13.3
  const router = useRouter();
  return router.query;
};
