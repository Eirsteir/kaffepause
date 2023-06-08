import Image from 'next/image';

import CenteredBox from '@/components/elements/CenteredBox';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function InfoSection2() {
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
          <Typography
            gutterBottom
            sx={{ fontSize: breakpoint ? '2.5rem' : '3.5rem' }}
            variant='h2'>
            Gjør studiepausene sosiale
          </Typography>
          <Typography variant='subtitle1'>
            Kaffepause handler om å gjøre studiepausene mer sosiale. I stedet
            for å ta en pause alene, hjelper plattformen vår deg med å planlegge
            pauser og invitere vennene dine, eller til og med opprette en
            gruppe.
            <br />
            <br />
            På denne måten kan dere slappe av og lade opp sammen, og gjøre
            studieøktene deres mer morsomme og hyggelige. Opprett en konto nå og
            begynn å koble deg sammen med vennene dine!
          </Typography>
        </Grid>
        <Grid item lg={6} md={12}>
          <CenteredBox>
            <Image
              alt='social coffebreaks'
              height={300}
              priority
              sizes='(max-width: 479px) 88vw, (max-width: 767px) 91vw, (max-width: 991px) 85vw, 39vw'
              src='/5295.jpg'
              style={{ width: 'inherit', height: 'inherit' }}
              width={500}
            />
          </CenteredBox>
        </Grid>
      </Grid>
    </Box>
  );
}
