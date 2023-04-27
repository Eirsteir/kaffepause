import { useRouter } from 'next/router';

import Divider from '@/components/elements/Divider';
import BreakInvitationActionCard from '@/components/invitations/BreakInvitationActionCard';
import { QueryResult } from '@/components/QueryResult';
import { usePendingBreakInvitations } from '@/hooks/Breaks';
import URLS from '@/URLS';
import Badge, { BadgeProps } from '@mui/material/Badge';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -12,
    top: 6,
  },
}));

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
        <StyledBadge
          badgeContent=' '
          color='secondary'
          invisible={data?.pendingBreakInvitations?.count === 0}>
          Nye invitasjoner
        </StyledBadge>
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
