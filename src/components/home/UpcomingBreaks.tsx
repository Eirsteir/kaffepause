import BreakActionCard from '@/components/breaks/BreakActionCard';
import Divider from '@/components/elements/Divider';
import ShowMoreButton from '@/components/elements/ShowMoreButton';
import BreakInvitationActionCard from '@/components/invitations/BreakInvitationActionCard';
import { QueryResult } from '@/components/QueryResult';
import { useUpcomingBreaks } from '@/hooks/Breaks';
import { Button } from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -12,
    top: 6,
  },
}));

export default function UpcomingBreaks() {
  const { loading, data, error, fetchMore } = useUpcomingBreaks({
    variables: {
      before: 0,
      first: 10,
    },
  });

  return (
    <>
      <Typography
        sx={{ paddingTop: '2rem', paddingBottom: '1.5rem' }}
        variant='h1'>
        Kommende pauser
      </Typography>

      <QueryResult
        data={data?.pendingBreakInvitations}
        error={error}
        loading={loading}>
        {data?.upcomingBreaks.edges
          .map((edge) => edge.node)
          .map((item, i) => (
            <BreakActionCard break_={item} key={i} />
          ))}
      </QueryResult>
      {data?.upcomingBreaks.totalCount === 0 ? (
        <div>
          <Typography mb={1.5}>Du har ingen kommende pauser.</Typography>
          <Button variant='contained'>Start en nå</Button>
        </div>
      ) : (
        data?.upcomingBreaks.pageInfo.hasNextPage && (
          <ShowMoreButton
            onClick={() =>
              fetchMore({ variables: { before: data.upcomingBreaks.count } })
            }
          />
        )
      )}
      <Divider />
    </>
  );
}
