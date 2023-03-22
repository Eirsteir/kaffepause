import { useMemo } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { IUser } from '../../types/User';
import { usePendingBreakInvitations } from '@/hooks/Breaks';
import { NetworkStatus } from '@apollo/client';


interface UpcomingBreaksProps {
    user: IUser;
}

export default function UpcomingBreaks({ user }: UpcomingBreaksProps) {

    const { loading, error, data, fetchMore, refetch, networkStatus } = usePendingBreakInvitations({
        variables: {
            first: 10
        }
    });
    const invitations = useMemo(() => (data !== undefined ? data.pendingBreakInvitations.edges.map(edge => edge.node) : []), [data]);
    const refreshing = networkStatus === NetworkStatus.refetch;

    console.log(data)
    
  return (
    <Card>
      <CardHeader
        title={
            <Typography sx={{fontWeight: 600}}>
                Kommende pauser
            </Typography>
        }
        // subheader="Venner ^"
      />
      <CardContent>
        <Typography variant="body1" display="inline">
          Pause 1 
        </Typography>

      </CardContent>
      <CardActions disableSpacing>      
        <Button 
            variant='outlined'
            sx={{ marginLeft: 'auto' }} 
            aria-label="see-more"
        >
            Se mer
        </Button>


      </CardActions>

    </Card>
  );
}
