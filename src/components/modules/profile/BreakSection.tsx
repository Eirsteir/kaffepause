import BreakList from '@/components/modules/breaks/BreakList';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BreakSectionProps {
  user: IUser;
}

export default function BreakSection({ user }: BreakSectionProps) {
  const breaks = ['1', '2', '3'];

  return (
    <Box>
      <Typography variant='h5'>Dine pauser</Typography>
      <BreakList breaks={breaks} />
    </Box>
  );
}
