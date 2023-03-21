import React, { useState, useMemo, useEffect } from "react";
import dayjs from 'dayjs';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Box from "@mui/material/Box";

import usePagination from '@/hooks/Pagination';
import { TimeSlot } from "@/types/Time";
import { generateTimeSlots } from "@/utils";
import { useTimeSlots } from "@/hooks/utils";


interface TimeSlotPickerProps {
  selectedTime: TimeSlot;
  onTimeSlotSelected: (time: TimeSlot) => void;
}


const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedTime,
  onTimeSlotSelected,
}) => {
  const [timeSlots, _] = useTimeSlots();
  const [page, setPage] = useState<number>(1);
  
  const PER_PAGE = 12;
  const count = Math.ceil(timeSlots.length / PER_PAGE);
  const _DATA = usePagination(timeSlots, PER_PAGE);

  const handleChange = (e, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

  return (
    <Box 
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
    >      
        <Grid container spacing={1}>

        {_DATA.currentData().map((timeSlot: TimeSlot) => (
          <Grid item key={timeSlot.formatted} xs={6} sm={3}>
            <Button
              variant={selectedTime === timeSlot ? 'contained' : 'outlined'}
              disableElevation
              onClick={() => onTimeSlotSelected(timeSlot)}
            >
                {timeSlot.formatted}
            </Button>
          </Grid>
        ))}

      </Grid>

      <Pagination
        count={count}
        page={page}
        shape="rounded"
        onChange={handleChange}
        sx={{ paddingTop: '1rem' }}
      />

    </Box>
  );
};

export default TimeSlotPicker;
