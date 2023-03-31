import { Dayjs } from 'dayjs';

import CenteredBox from '@/components/elements/CenteredBox';
import TimeSlotPicker from '@/components/modules/planning/time/TimeSlotPicker';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BreakPlannerTimeSelectorProps {
  onSelect: (timeSlot: Dayjs) => void;
}

export default function BreakPlannerTimeSelector({
  onSelect,
}: BreakPlannerTimeSelectorProps) {
  return (
    <CenteredBox>
      <Typography sx={{ marginBottom: '1rem', marginTop: '2rem' }} variant='h6'>
        Når?
      </Typography>
      <Box>
        <TimeSlotPicker onSelect={onSelect} />
      </Box>
    </CenteredBox>
  );
}
