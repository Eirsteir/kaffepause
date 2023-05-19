import Link from '@/components/navigation/Link';
import URLS from '@/URLS';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      alignItems='center'
      display='flex'
      justifyContent='center'
      minHeight='80vh'
      sx={{ justifyContent: 'space-evenly' }}>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <Box>
            <Typography
              align='left'
              component='div'
              sx={{ fontWeight: 900 }}
              variant='h2'>
              Planlegg perfekte kaffepauser med venner
            </Typography>
            <Typography align='left' component='div' variant='subtitle1'>
              Enten du trenger en rask koffeinboost eller vil ta igjen tapt tid
              med vennene dine over en kopp kaffe, vil vårt verktøy gjøre det
              enkelt å planlegge perfekte kaffepauser.
            </Typography>

            <Link href={URLS.SIGNIN}>
              <Button
                disableElevation
                sx={{ marginTop: '1rem' }}
                variant='contained'>
                Ta en pause
              </Button>
            </Link>
            <Link href={URLS.SIGNUP}>
              <Button
                disableElevation
                sx={{ marginTop: '1rem', marginLeft: '1rem' }}
                variant='contained'>
                Lag en bruker
              </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
