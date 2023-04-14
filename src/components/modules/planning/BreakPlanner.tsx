import Heading from '@/components/elements/Heading';
import BreakPlannerCreateForm from '@/components/modules/planning/BreakPlannerCreateForm';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  return (
    <Box>
      <Heading>Planlegg en pause</Heading>
      <BreakPlannerCreateForm user={user} />
    </Box>
  );
}
