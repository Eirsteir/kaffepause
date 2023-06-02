import PageContainer from '@/components/elements/PageContainer';
import PendingBreakInvitations from '@/components/home/PendingInvitations';
import BreakPlanner from '@/components/modules/planning/BreakPlanner';
import { QueryResult } from '@/components/QueryResult';
import { useMe } from '@/hooks/User';

export default function Home() {
  const { data, loading, error } = useMe();

  return (
    <PageContainer>
      <QueryResult data={data?.me} error={error} loading={loading}>
        <BreakPlanner user={data?.me} />
        <PendingBreakInvitations />
      </QueryResult>
    </PageContainer>
  );
}
