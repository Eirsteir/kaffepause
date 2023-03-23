import { useMemo } from 'react';

import { usePendingBreakInvitations } from '@/hooks/Breaks';
import { NetworkStatus } from '@apollo/client';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { IUser } from '../../types/User';

interface UpcomingBreaksProps {
  user: IUser;
}

export default function UpcomingBreaks({ user }: UpcomingBreaksProps) {
  const { loading, error, data, fetchMore, refetch, networkStatus } = usePendingBreakInvitations({
    variables: {
      first: 10,
    },
  });
  const invitations = useMemo(() => (data !== undefined ? data.pendingBreakInvitations.edges.map((edge) => edge.node) : []), [data]);
  const refreshing = networkStatus === NetworkStatus.refetch;

  console.log(data);

  return (
    <Card>
      <CardHeader
        title={<Typography variant='h6'>Kommende pauser</Typography>}
        // subheader="Venner ^"
      />
      <CardContent>
        <Typography display='inline' variant='body1'>
          Pause 1
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Button aria-label='see-more' sx={{ marginLeft: 'auto' }} variant='outlined'>
          Se mer
        </Button>
      </CardActions>
    </Card>
  );
}
