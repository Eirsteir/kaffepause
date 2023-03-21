import React from 'react'
import { TimeSlot } from '@/types/Time';
import { generateTimeSlots } from '@/utils';
import { useState, useEffect, useMemo } from 'react';

export const useHasMounted = () => {
    const [hasMounted, setHasMounted] = useState(false);
    useEffect(() => {
      setHasMounted(true);
    }, []);
    return hasMounted;
  }

export const useTimeSlots = (): [TimeSlot[], TimeSlot, React.Dispatch<React.SetStateAction<TimeSlot>>] => {
    const timeslots: TimeSlot[] = useMemo(generateTimeSlots, [generateTimeSlots]);
    const [timeSlot, setTimeSlot] = useState<TimeSlot>(timeslots[0]);
    return [timeslots, timeSlot, setTimeSlot];
}