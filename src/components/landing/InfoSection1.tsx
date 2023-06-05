import Image from 'next/image';

import homePic from '@/assets/home.png';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function InfoSection1() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  return (
    <Box
      alignItems='center'
      display='flex'
      justifyContent='center'
      minHeight='80vh'
      sx={{ justifyContent: 'space-evenly' }}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12}>
          <Image
            alt="Screenshot of kaffepause's homepage"
            height={250}
            src={homePic}
            width={390}
          />
        </Grid>
        <Grid item lg={6} md={12}>
          <Typography
            gutterBottom
            sx={{ fontSize: { md: '2.5rem', lg: '3.5rem' } }}
            variant='h2'>
            Bli med vennene dine på kaffepause
          </Typography>
          <Typography variant='subtitle1'>
            Kaffepause er en plattform som lar deg planlegge studiepausene dine
            og bli med vennene dine direkte eller ved å opprette en gruppe.
            Registrer deg i dag og start planleggingen av pausene dine sammen
            med vennene dine!
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
