import Heading from '@/components/elements/Heading';
import BreakPlannerCreateForm from '@/components/modules/planning/BreakPlannerCreateForm';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  return (
    <Box sx={{ paddingTop: '1rem' }}>
      <Heading noGutterBottom>Planlegg en pause</Heading>
      <Typography sx={{ marginBottom: '3rem' }} variant='body2'>
        Start en pause ved å legge til et tidspunkt. Resten kan du ta senere.
      </Typography>
      <BreakPlannerCreateForm user={user} />
    </Box>
  );
}
