import { ReactNode, useEffect } from 'react';

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

const ActionCard = ({ children }: { children: ReactNode }) => (
  <Card
    sx={{
      borderRadius: 40,
      border: '1px solid #DDD',
      width: '22.5rem',
      boxShadow: '0 1px 2px rgba(0,0,0,0.08), 0 4px 12px rgba(0,0,0,0.05)',
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

  useEffect(() => {
    if (data?.nextBreak?.startingAt) {
      const startingTime = new Date(data.nextBreak.startingAt).getTime();
      const currentTime = new Date().getTime();
      const refreshIntervalInMs = startingTime - currentTime;

      if (refreshIntervalInMs > 0) {
        const interval = setInterval(() => refetch(), refreshIntervalInMs);
        return () => clearInterval(interval);
      } else {
        refetch();
      }
    }
  }, [data, refetch]);

  const url = () =>
    data?.nextBreak ? `${URLS.BREAKS}/${data?.nextBreak?.uuid}` : '#';

  return (
    <>
      <Link href={url()} noLinkStyle>
        <ActionCard>
          <QueryResult
            data={data?.nextBreak}
            emptyText={
              <Typography sx={{ fontWeight: 600 }} variant='subtitle2'>
                Ingen planlagte pauser
              </Typography>
            }
            error={error}
            loading={loading}
            loadingComponent={
              <Skeleton
                sx={{ fontSize: '28px', width: '100%' }}
                variant='text'
              />
            }>
            <Typography pr={1} sx={{ fontWeight: 600 }} variant='subtitle2'>
              Neste pause <b>{dayjs(data?.nextBreak?.startingAt).fromNow()}</b>
            </Typography>
            <ArrowCircleRightOutlinedIcon
              color='primary'
              sx={{ fontSize: '2rem' }}
            />
          </QueryResult>
        </ActionCard>
      </Link>
    </>
  );
}
