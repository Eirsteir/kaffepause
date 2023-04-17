import Heading from '@/components/elements/Heading';
import NextBreakActionCard from '@/components/home/NextBreakActionCard';
import PendingBreakInvitations from '@/components/home/PendingInvitations';
import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import { User } from '@/types/User';

interface IProps {
  user: User;
}

export default function Home({ user }: IProps) {
  return (
    <>
      <NextBreakActionCard />
      <BreakPlanner user={user} />
      <PendingBreakInvitations />
    </>
  );
}