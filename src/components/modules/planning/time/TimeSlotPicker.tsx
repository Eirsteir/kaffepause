import React, { useEffect, useState } from 'react';

import usePagination from '@/hooks/Pagination';
import { useTimeSlots } from '@/hooks/utils';
import { TimeSlot } from '@/types/Time';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';

interface TimeSlotPickerProps {
  onSelect: (timeSlot: TimeSlot) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ onSelect }) => {
  const [timeSlots, _] = useTimeSlots();
  const [value, setValue] = useState<TimeSlot>(timeSlots[0]);
  const [page, setPage] = useState<number>(1);

  const PER_PAGE = 9;
  const count = Math.ceil(timeSlots.length / PER_PAGE);
  const _DATA = usePagination(timeSlots, PER_PAGE);

  const handleChange = (e, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

  const handleSelect = (timeSlot: TimeSlot) => {
    setValue(timeSlot);
    onSelect(timeSlot);
  };

  useEffect(() => onSelect(value), [onSelect, value]);

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'
      sx={{ width: 300 }}>
      <Grid container spacing={1}>
        {_DATA.currentData().map((timeSlot: TimeSlot) => (
          <Grid
            item
            key={timeSlot.formatted}
            sm={4}
            sx={{ textAlign: 'center' }}>
            <Button
              disableElevation
              onClick={() => handleSelect(timeSlot)}
              variant={value === timeSlot ? 'contained' : 'outlined'}>
              {timeSlot.formatted}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={count}
        onChange={handleChange}
        page={page}
        shape='rounded'
        sx={{ paddingTop: '1rem' }}
      />
    </Box>
  );
};

export default TimeSlotPicker;
