import dayjs from '@/dayjs';
import Typography from '@mui/material/Typography';

export const BreakDetailHeader = ({
  title,
  startingAt,
}: {
  title: string;
  startingAt: Date;
}) => (
  <div>
    <Typography sx={{ paddingBottom: '.5rem' }} variant='h1'>
      {title}
    </Typography>

    <Typography sx={{ marginBottom: '0.5rem' }} variant='body2'>
      {dayjs(startingAt).format('LLL')}
    </Typography>
  </div>
);
