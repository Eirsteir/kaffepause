import { useEffect } from 'react';

import BreakPlannerCreateForm from '@/components/modules/planning/BreakPlannerCreateForm';
import dayjs from '@/dayjs';
import { useNextBreak } from '@/hooks/Breaks';
import { IUser } from '@/types/User';
import { socialTextTruncated } from '@/utils';
import { NetworkStatus } from '@apollo/client';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

interface BreakPlannerProps {
  user: IUser;
}

export default function BreakPlanner({ user }: BreakPlannerProps) {
  const { data, loading, error, refetch, networkStatus } = useNextBreak({
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const breakTime = dayjs(data?.nextBreak?.startingAt);
    const now = dayjs();
    if (breakTime.isBefore(now)) {
      console.log('Refetching...');
      refetch();
    }
  }, [refetch, data]);

  const isInitiated = data && data.nextBreak !== null;

  if (loading && data === undefined) {
    return (
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        Sjekker om du har planlagt pauser...
      </Typography>
    );
  }
  if (networkStatus === NetworkStatus.refetch)
    return (
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        Håper pausen gikk bra! Klargjør for en ny en...
      </Typography>
    );

  if (error)
    return (
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h6'>
        {error.message}
      </Typography>
    );

  console.log(data.nextBreak);

  return (
    <Box>
      <Typography sx={{ marginBottom: '0.5rem' }} variant='h4'>
        {isInitiated
          ? `Din neste pause starter ${dayjs(
              data?.nextBreak?.startingAt,
            ).fromNow()}`
          : 'Planlegg neste pause'}
      </Typography>

      {!isInitiated && (
        <BreakPlannerCreateForm onSubmit={refetch} user={user} />
      )}

      {isInitiated && (
        <>
          <Grid container sx={{ marginTop: 4, maxWidth: 1200 }}>
            <Grid item xs={4}>
              <Card elevation={0}>
                <CardActionArea sx={{ textAlign: 'center', padding: '2rem' }}>
                  <LocationOnOutlinedIcon color='primary' />
                  <Typography>{data.nextBreak.location.title}</Typography>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card elevation={0}>
                <CardActionArea sx={{ textAlign: 'center', padding: '2rem' }}>
                  <AccessTimeOutlinedIcon color='primary' />
                  <Typography>
                    {dayjs(data.nextBreak.startingAt).format('LLL')}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card elevation={0}>
                <CardActionArea sx={{ textAlign: 'center', padding: '2rem' }}>
                  <GroupOutlinedIcon color='primary' />
                  <Typography>
                    {(data.nextBreak.invitation.acceptees.count ?? 0) == 0
                      ? 'Ingen har godtatt enda'
                      : socialTextTruncated(
                          data.nextBreak.invitation.acceptees.edges[0]?.node
                            .shortName,
                          data.nextBreak.invitation.acceptees.count ?? 0,
                        )}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}
