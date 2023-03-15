import React, { useState, useMemo } from "react";
import dayjs from 'dayjs';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Typography from "@mui/material/Typography";

import usePagination from '@/hooks/Pagination';


type TimeSlot = {
  time: dayjs.Dayjs;
  formatted: string;
}; 

interface TimeSlotPickerProps {
  selectedTime: string;
  onTimeSlotSelected: (time: string) => void;
}

const generateTimeSlots = (): TimeSlot[] => {
  const interval = 15;
  const times: TimeSlot[] = [];
  const now = dayjs();
  let start = dayjs().startOf('hour').add(15, 'minutes');
  const end = dayjs().endOf('day');

  const day_start = dayjs().startOf('day').hour(7); // 7 am
  const day_end = dayjs().startOf('day').hour(22) // 10 pm
  
  while (start.isBefore(end) || start.isSame(end)) {
    console.log(start);
    start = start.add(interval, 'minutes');
    times.push({ time: start, formatted: start.format('HH:mm') });
  }

  // while (start.isBefore(end)) {
    // if (start.isAfter(now)) {
    //   console.log(start);
    //   times.push(start.format('HH:mm'));
    //   start.add(interval, 'minutes');
    // }
  // }

  return times;
};


const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedTime,
  onTimeSlotSelected,
}) => {
  const timeSlots = useMemo(() => generateTimeSlots(), [generateTimeSlots]);
  const [page, setPage] = useState<number>(1);
  const PER_PAGE = 12;

  const count = Math.ceil(timeSlots.length / PER_PAGE);
  const _DATA = usePagination(timeSlots, PER_PAGE);

  const handleChange = (e, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

  return (
    <Grid container spacing={2}>

      {_DATA.currentData().map((timeSlot: TimeSlot) => (
        <Grid item key={timeSlot} xs={6} sm={3}>
          <Button
            variant={selectedTime === timeSlot ? 'contained' : 'outlined'}
            color="secondary" 
            disableElevation
            onClick={() => onTimeSlotSelected(timeSlot)}
          >
              {timeSlot.formatted}
          </Button>
        </Grid>
      ))}

      <Pagination
        count={count}
        // size="large"
        page={page}
        shape="rounded"
        onChange={handleChange}
      />
    </Grid>
  );
};

export default TimeSlotPicker;
