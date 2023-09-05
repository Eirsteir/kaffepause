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

export default function SocialOverview() {
  const router = useRouter();
  const { data, loading, error } = usePendingBreakInvitations({
    variables: { first: 10 },
  });

  return (
    <>
      <QueryResult
        data={data?.pendingBreakInvitations}
        error={error}
        loading={loading}></QueryResult>
    </>
  );
}
