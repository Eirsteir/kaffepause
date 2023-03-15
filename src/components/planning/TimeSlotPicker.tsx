import React from 'react';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import moment from 'moment';

interface TimeSlotPickerProps {
  selectedTime: string;
  onTimeSlotSelected: (time: string) => void;
}

const generateTimeSlots = (): string[] => {
  const interval = 15;
  const times: string[] = [];
  const now = moment();
  const start = moment().startOf('hour').add(15, 'minutes');
  const end = moment().endOf('day');

  while (start.isBefore(end)) {
    if (start.isAfter(now)) {
      times.push(start.format('HH:mm'));
      start.add(interval, 'minutes');
    }
  }

  return times;
};


const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({
  selectedTime,
  onTimeSlotSelected,
}) => {
  const timeSlots = generateTimeSlots();
  
  return (
    <Grid container spacing={2}>
      {timeSlots.map((timeSlot) => (
        <Grid item key={timeSlot} xs={6} sm={3}>
          <Button
            // variant="h6"
            // component="button"
            onClick={() => onTimeSlotSelected(timeSlot)}
            sx={{
              backgroundColor:
                selectedTime === timeSlot ? 'lightblue' : 'white',
            }}
          >
            {timeSlot}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default TimeSlotPicker;
