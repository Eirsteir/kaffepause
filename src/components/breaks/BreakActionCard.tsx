import { CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function BreakActionCard() {
  return (
    <Card sx={{ maxWidth: '80%', marginTop: 3 }}>
      <CardActionArea>
        <CardContent>
          <Typography component='div' variant='h5'>
            Pause med 123
          </Typography>
          <Typography
            color='text.secondary'
            component='div'
            gutterBottom
            variant='caption'>
            kl 16:45
          </Typography>
          <Typography color='text.secondary' variant='body2'>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
