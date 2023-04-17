import { useRouter } from 'next/router';

import Divider from '@/components/elements/Divider';
import Heading from '@/components/elements/Heading';
import BreakInvitationActionCard from '@/components/invitations/BreakInvitationActionCard';
import { QueryResult } from '@/components/QueryResult';
import { usePendingBreakInvitations } from '@/hooks/Breaks';
import URLS from '@/URLS';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function PendingBreakInvitations() {
  const router = useRouter();
  const { data, loading, error } = usePendingBreakInvitations({
    variables: { first: 10 },
  });

  return (
    <>
      <Typography
        sx={{ paddingTop: '5rem', paddingBottom: '1.5rem' }}
        variant='h1'>
        Nye invitasjoner
      </Typography>
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
          <>
            <Typography mb={1.5}>
              Du har ingen ventende invitasjoner.
            </Typography>
            <Button
              onClick={() => router.push(URLS.INVITATIONS)}
              variant='contained'>
              Se alle
            </Button>
          </>
        )}
      </QueryResult>
      <Divider />
    </>
  );
}
