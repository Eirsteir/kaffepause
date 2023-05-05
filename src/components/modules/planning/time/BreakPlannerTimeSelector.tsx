import { Dayjs } from 'dayjs';

import CenteredBox from '@/components/elements/CenteredBox';
import TimeSlotPicker from '@/components/modules/planning/time/TimeSlotPicker';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
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
    <Box>
      <Tooltip
        placement='top'
        title='Når du vil ha pause bestemmer selvsagt du.'>
        <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
          Når?
        </Typography>
      </Tooltip>

      <TimeSlotPicker initialTimeSlot={initialTimeSlot} onSelect={onSelect} />
    </Box>
  );
}
