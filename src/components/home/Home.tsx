import NextBreakActionCard from '@/components/home/NextBreakActionCard';
import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import { IUser } from '@/types/User';

interface IProps {
  user: IUser;
}

export default function Home({ user }: IProps) {
  return (
    <>
      <NextBreakActionCard />
      <BreakPlanner user={user} />
      {/* <Typography sx={{ marginLeft: '6.5rem' }} variant='h4'>
        Lag en leseplan
      </Typography> */}
    </>
  );
}
