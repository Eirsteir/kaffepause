import { Dayjs } from 'dayjs';
import React, { useEffect, useState } from 'react';

import usePagination from '@/hooks/Pagination';
import { useTimeSlots } from '@/hooks/utils';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

interface TimeSlotPickerProps {
  onSelect: (timeSlot: Dayjs) => void;
  initialTimeSlot: Dayjs | undefined;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  onSelect,
  initialTimeSlot,
}) => {
  const matchesXsBreakPoint = useMediaQuery('(max-width:450px)', {
    noSsr: true,
  });

  console.log(matchesXsBreakPoint);

  const [timeSlots, timeSlot, _] = useTimeSlots();
  const [value, setValue] = useState<Dayjs>(initialTimeSlot || timeSlot);

  const [page, setPage] = useState<number>(1);

  const PER_PAGE = matchesXsBreakPoint ? 6 : 8;
  const count = Math.ceil(timeSlots.length / PER_PAGE);
  const _DATA = usePagination(timeSlots, PER_PAGE);

  const handleChange = (e, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

  const handleSelect = (timeSlot: Dayjs) => {
    setValue(timeSlot);
    onSelect(timeSlot);
  };

  useEffect(() => onSelect(value), [onSelect, value]);

  return (
    <Box
      alignItems='center'
      display='flex'
      flexDirection='column'
      justifyContent='center'>
      <Grid container spacing={1}>
        {_DATA.currentData().map((timeSlot: Dayjs, i: number) => (
          <Grid item key={i} sm={3} sx={{ textAlign: 'center' }} xs={4}>
            <Button
              disableElevation
              onClick={() => handleSelect(timeSlot)}
              variant={value.isSame(timeSlot) ? 'contained' : 'outlined'}>
              {timeSlot.format('HH:mm')}
            </Button>
          </Grid>
        ))}
      </Grid>

      <Pagination
        boundaryCount={0}
        count={count}
        onChange={handleChange}
        page={page}
        shape='rounded'
        siblingCount={0}
        sx={{ paddingTop: '.5rem' }}
      />
    </Box>
  );
};

export default TimeSlotPicker;
