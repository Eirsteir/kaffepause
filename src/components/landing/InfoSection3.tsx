import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function InfoSection3() {
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
          BILDE
        </Grid>
        <Grid item lg={6} md={12}>
          <Typography
            gutterBottom
            sx={{ fontSize: breakpoint ? '2.5rem' : '3.5rem' }}
            variant='h2'>
            Praktisk og enkelt å bruke
          </Typography>
          <Typography variant='subtitle1'>
            Kaffepause er designet for å være brukervennlig og enkelt å
            navigere. Du trenger bare å opprette en konto, planlegge pausen din
            og invitere vennene dine med noen få klikk. <br />
            <br />
            Plattformen vår er også mobilvennlig, slik at du kan bruke den når
            du er på farten. Enten du studerer hjemme eller på en kafé, gjør
            Kaffepause det enkelt å ta en pause og koble deg sammen med vennene
            dine.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
