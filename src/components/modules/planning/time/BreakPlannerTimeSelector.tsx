import TimeSlotPicker from '@/components/modules/planning/time/TimeSlotPicker';
import { TimeSlot } from '@/types/Time';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BreakPlannerTimeSelectorProps {
  onSelect: (timeSlot: TimeSlot) => void;
}

export default function BreakPlannerTimeSelector({
  onSelect,
}: BreakPlannerTimeSelectorProps) {
  return (
    <>
      <Typography
        sx={{ marginBottom: '0.5rem', marginTop: '2rem' }}
        variant='h6'>
        Når?
      </Typography>
      <Box>
        <TimeSlotPicker onSelect={onSelect} />
      </Box>
    </>
  );
}
