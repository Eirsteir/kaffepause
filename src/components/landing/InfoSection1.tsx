import Image from 'next/image';

import CenteredBox from '@/components/elements/CenteredBox';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function InfoSection1() {
  return (
    <Box
      alignItems='center'
      display='flex'
      justifyContent='center'
      minHeight='80vh'
      sx={{ justifyContent: 'space-evenly' }}>
      <Grid container spacing={2}>
        <Grid item lg={6} md={12}>
          <CenteredBox>
            <Image
              alt="Screenshot of kaffepause's homepage"
              height={300}
              priority
              sizes='(max-width: 479px) 88vw, (max-width: 767px) 91vw, (max-width: 991px) 85vw, 39vw'
              src='/7566.jpg'
              width={500}
            />
          </CenteredBox>
        </Grid>
        <Grid item lg={6} md={12}>
          <Typography
            gutterBottom
            sx={{ fontSize: { xs: '2.5rem', md: '2.5rem', lg: '3.5rem' } }}
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
