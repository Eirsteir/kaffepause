import dayjs from '@/dayjs';
import Typography from '@mui/material/Typography';

export const BreakDetailHeader = ({
  senderName,
  startingAt,
}: {
  senderName: string;
  startingAt: Date;
}) => (
  <div>
    <Typography sx={{ paddingBottom: '.5rem' }} variant='h1'>
      {senderName} inviterte deg til pause
    </Typography>

    <Typography sx={{ marginBottom: '0.5rem' }} variant='body2'>
      {dayjs(startingAt).format('LLL')}
    </Typography>
  </div>
);
