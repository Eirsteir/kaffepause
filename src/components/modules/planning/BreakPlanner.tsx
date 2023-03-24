import BreakPlannerFriendsSelector from '@/components/modules/planning/friends/BreakPlannerFriendsSelector';
import BreakPlannerLocationSelector from '@/components/modules/planning/location/BreakPlannerLocationSelector';
import BreakPlannerTimeSelector from '@/components/modules/planning/time/BreakPlannerTimeSelector';
import { TimeSlot } from '@/types/Time';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import StartBreakButton from './StartBreakButton';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  const onTimeSlotSelect = (timeSlot: TimeSlot) => {};
  const onLocationSelect = (location: ILocation) => {};
  const onFriendSelect = (invitees: IUser[]) => {};

  return (
    <Box
      sx={{
        // textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        justifyContent: 'left',
        margin: 'auto',
        maxWidth: 460,
        width: 'fit-content',
      }}>
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h5'>
        Planlegg neste pause
      </Typography>

      <BreakPlannerTimeSelector onSelect={onTimeSlotSelect} />
      <BreakPlannerLocationSelector onSelect={onLocationSelect} user={user} />
      <BreakPlannerFriendsSelector onSelect={onFriendSelect} user={user} />

      <StartBreakButton />
    </Box>
  );
}
