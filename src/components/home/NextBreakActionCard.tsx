import { useEffect } from 'react';

import Link from '@/components/navigation/Link';
import { QueryResult } from '@/components/QueryResult';
import dayjs from '@/dayjs';
import { useNextBreak } from '@/hooks/Breaks';
import URLS from '@/URLS';
import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CenteredBox from '../elements/CenteredBox';

export default function NextBreakActionCard() {
  const { data, loading, error, refetch } = useNextBreak();

  useEffect(() => {
    const breakTime = dayjs(data?.nextBreak?.startingAt);
    const now = dayjs();
    if (breakTime.isBefore(now)) {
      console.log('Refetching...');
      refetch();
    }
  }, [refetch, data]);

  return (
    <QueryResult
      data={data}
      error={error}
      loading={loading}
      loadingComponent={null}>
      <CenteredBox>
        <Link href={`${URLS.BREAKS}/${data?.nextBreak?.uuid}`} noLinkStyle>
          <Card elevation={5} sx={{ borderRadius: 21 }}>
            <CardActionArea>
              <CardContent>
                <Typography variant='subtitle1'>
                  Neste pause om {dayjs(data?.nextBreak?.startingAt).fromNow()}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </CenteredBox>
    </QueryResult>
  );
}
