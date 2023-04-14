import { Dayjs } from 'dayjs';

import CenteredBox from '@/components/elements/CenteredBox';
import TimeSlotPicker from '@/components/modules/planning/time/TimeSlotPicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BreakPlannerTimeSelectorProps {
  onSelect: (timeSlot: Dayjs) => void;
  initialTimeSlot: Dayjs | undefined;
}

export default function BreakPlannerTimeSelector({
  onSelect,
  initialTimeSlot,
}: BreakPlannerTimeSelectorProps) {
  return (
    <CenteredBox>
      <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
        Når?
      </Typography>
      <Box>
        <TimeSlotPicker initialTimeSlot={initialTimeSlot} onSelect={onSelect} />
      </Box>
    </CenteredBox>
  );
}
