import { useEffect } from 'react';

import BouncingDotsLoader from '@/components/elements/BouncingDotsLoader';
import CenteredBox from '@/components/elements/CenteredBox';
import Link from '@/components/navigation/Link';
import { QueryResult } from '@/components/QueryResult';
import dayjs from '@/dayjs';
import { useNextBreak } from '@/hooks/Breaks';
import URLS from '@/URLS';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';

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
      loading={true}
      loadingComponent={
        <Box sx={{ fontSize: '1rem' }}>
          <BouncingDotsLoader />
        </Box>
      }>
      <CenteredBox>
        {/* <Link href={`${URLS.BREAKS}/${data?.nextBreak?.uuid}`} noLinkStyle>
          <Card
            elevation={4}
            sx={{
              borderRadius: 21,
              marginTop: 2,
            }}>
            <CardActionArea>
              <CardContent
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  maxHeight: '3rem',
                }}>
                <Typography pr={1}>
                  Neste pause om {dayjs(data?.nextBreak?.startingAt).fromNow()}
                </Typography>
                <ArrowCircleRightOutlinedIcon
                  color='primary'
                  sx={{ fontSize: '2rem' }}
                />
              </CardContent>
            </CardActionArea>
          </Card>
        </Link> */}
      </CenteredBox>
    </QueryResult>
  );
}
