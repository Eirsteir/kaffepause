import PendingBreakInvitations from '@/components/home/PendingInvitations';
import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import { User } from '@/types/User';

interface IProps {
  user: User;
}

export default function Home({ user }: IProps) {
  return (
    <>
      <BreakPlanner user={user} />
      <PendingBreakInvitations />
    </>
  );
}
