import Divider from '@/components/elements/Divider';
import Heading from '@/components/elements/Heading';
import BreakInvitationActionCard from '@/components/invitations/BreakInvitationActionCard';
import { QueryResult } from '@/components/QueryResult';
import { usePendingBreakInvitations } from '@/hooks/Breaks';
import Typography from '@mui/material/Typography';

export default function PendingBreakInvitations() {
  const { data, loading, error } = usePendingBreakInvitations({
    variables: { first: 10 },
  });

  return (
    <>
      <Heading>Nye invitasjoner</Heading>
      <QueryResult
        data={data?.pendingBreakInvitations}
        error={error}
        loading={loading}>
        {data?.pendingBreakInvitations.edges
          .map((edge) => edge.node)
          .map((item, i) => (
            <BreakInvitationActionCard invitation={item} key={i} />
          ))}

        {data?.pendingBreakInvitations.totalCount === 0 && (
          <Typography mb={1.5}>
            Du har ingen ventende invitasjoner. Kanskje du kan invitere noen på
            pause?
          </Typography>
        )}
      </QueryResult>
      <Divider />
    </>
  );
}
