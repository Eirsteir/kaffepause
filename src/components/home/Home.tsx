import PageContainer from '@/components/elements/PageContainer';
import PendingBreakInvitations from '@/components/home/PendingInvitations';
import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import { useMe } from '@/hooks/User';

export default function Home() {
  const { data, loading, error } = useMe();

  if (loading) {
    return null;
  }

  return (
    <PageContainer>
      <BreakPlanner user={data?.me} />
      <PendingBreakInvitations />
    </PageContainer>
  );
}
