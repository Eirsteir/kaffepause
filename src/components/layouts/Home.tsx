import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import { IUser } from '@/types/User';
import Typography from '@mui/material/Typography';

interface IProps {
  user: IUser;
}

export default function Home({ user }: IProps) {
  return (
    <>
      <BreakPlanner user={user} />
      <Typography sx={{ marginLeft: '6.5rem' }} variant='h4'>
        Lag en leseplan
      </Typography>
    </>
  );
}
