import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import { IUser } from '@/types/User';

interface IProps {
  user: IUser;
}

export default function Home({ user }: IProps) {
  return <BreakPlanner user={user} />;
}
