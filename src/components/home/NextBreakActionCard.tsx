import { ReactNode, useEffect } from 'react';

import BouncingDotsLoader from '@/components/elements/BouncingDotsLoader';
import CenteredBox from '@/components/elements/CenteredBox';
import Link from '@/components/navigation/Link';
import { QueryResult } from '@/components/QueryResult';
import dayjs from '@/dayjs';
import { useNextBreak } from '@/hooks/Breaks';
import URLS from '@/URLS';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Skeleton } from '@mui/material';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

const ActionCard = ({ children }: { children: ReactNode }) => (
  <Card
    elevation={4}
    sx={{
      borderRadius: 21,
      marginTop: 2,
      width: '22.5rem',
    }}>
    <CardActionArea>
      <CardContent
        sx={{
          display: 'flex',
          alignItems: 'center',
          maxHeight: '3rem',
          justifyContent: 'center',
        }}>
        {children}
      </CardContent>
    </CardActionArea>
  </Card>
);

export default function NextBreakActionCard() {
  const { data, loading, error, refetch } = useNextBreak();

  // useEffect(() => {
  //   const refreshIntervalInMs = new Date(
  //     data?.break?.startingAt,
  //   ).getMilliseconds();
  //   // const interval = setInterval(() => refetch(), refreshIntervalInMs);  // NEEDS fixing calls all the time
  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [data, refetch]);

  const url = () =>
    data?.nextBreak ? `${URLS.BREAKS}/${data?.nextBreak?.uuid}` : '#';

  return (
    <CenteredBox>
      <Link href={url()} noLinkStyle>
        <ActionCard>
          <QueryResult
            data={data?.nextBreak}
            emptyText='Ingen planlagte pauser'
            error={error}
            loading={loading}
            loadingComponent={
              <Skeleton
                sx={{ fontSize: '28px', width: '100%' }}
                variant='text'
              />
            }>
            <Typography pr={1}>
              Neste pause <b>{dayjs(data?.nextBreak?.startingAt).fromNow()}</b>
            </Typography>
            <ArrowCircleRightOutlinedIcon
              color='primary'
              sx={{ fontSize: '2rem' }}
            />
          </QueryResult>
        </ActionCard>
      </Link>
    </CenteredBox>
  );
}
