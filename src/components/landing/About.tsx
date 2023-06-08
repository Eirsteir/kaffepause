import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

export default function About() {
  return (
    <Box
      alignItems='center'
      display='flex'
      justifyContent='center'
      minHeight='80vh'
      sx={{ justifyContent: 'space-evenly' }}>
      <Grid container spacing={2}>
        <Grid item lg={8} md={12}>
          <Typography
            gutterBottom
            sx={{ fontSize: { xs: '2.5rem', md: '2.5rem', lg: '3.5rem' } }}
            variant='h2'>
            Hva er kaffepause?
          </Typography>
          <Typography variant='subtitle1'>
            Kaffepause er en norsk plattform designet for å gjøre studiepauser
            mer sosiale. Ved å koble studenter sammen med vennene sine, gjør
            kaffepause det enkelt å planlegge og legge til rette for
            studiepauser. Med kaffepause kan studenter ta en pause, nyte en kopp
            kaffe eller en matbit, og vende tilbake til studiene forfrisket og
            energisk.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
