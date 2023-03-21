import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { TimeSlot } from "@/types/Time"
import TimeSlotPicker from "./TimeSlotPicker";

interface BreakPlannerTimeSelectorProps {
    selectedTime: TimeSlot;
    handleTimeSlotSelected: (timeSlot: TimeSlot) => void;
    handleExpandClick: () => void;
}

export const BreakPlannerTimeSelector = ({ selectedTime, handleTimeSlotSelected, handleExpandClick }: BreakPlannerTimeSelectorProps) => {
    return (
      <>
        <Typography paragraph>Endre tid</Typography>
        <TimeSlotPicker
              selectedTime={selectedTime}
              onTimeSlotSelected={handleTimeSlotSelected}
          />   
          <Button 
              variant='contained' 
              onClick={handleExpandClick}
              sx={{ display: 'block', margin: 'auto', marginTop: '1rem' }} 
              aria-label="bekreft"
          >
              OK
          </Button>
        </>
    )
  }