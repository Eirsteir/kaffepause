import AvatarChips from '@/components/elements/AvatarChips';
import Link from '@/components/navigation/Link';
import dayjs from '@/dayjs';
import { IBreak } from '@/types/Break';
import URLS from '@/URLS';
import { Box, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

type BreakActionCardProps = {
  break_: IBreak;
};

export default function BreakActionCard({ break_ }: BreakActionCardProps) {
  return (
    <Link href={`${URLS.BREAKS}/${break_.uuid}`} noLinkStyle>
      <Card
        elevation={0}
        sx={{ marginTop: 3, boxShadow: '0 6px 20px rgba(0,0,0,0.2)' }}>
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
