import { useRouter } from 'next/router';

import AvatarChips from '@/components/elements/AvatarChips';
import dayjs from '@/dayjs';
import { IBreak } from '@/types/Break';
import URLS from '@/URLS';
import { Box, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import CenteredBox from '../elements/CenteredBox';
import Link from '../navigation/Link';

type BreakActionCardProps = {
  break_: IBreak;
};

export default function BreakActionCard({ break_ }: BreakActionCardProps) {
  return (
    <Link href={`${URLS.BREAKS}/${break_.uuid}`} noLinkStyle>
      <Card sx={{ maxWidth: '80%', marginTop: 3 }}>
        <CardActionArea>
          <CardContent>
            <Typography component='div' variant='h3'>
              Pause
            </Typography>
            <Typography
              color='text.secondary'
              component='div'
              gutterBottom
              variant='subtitle2'>
              {dayjs(break_.startingAt).format('LLL')}
            </Typography>

            <Typography variant='body1'>
              {break_.location?.title || 'Ikke spesifisert'}
            </Typography>

            <Box sx={{ padding: 1 }}>
              <AvatarChips
                users={break_.invitation.addressees.edges.map(
                  (edge) => edge.node,
                )}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}
