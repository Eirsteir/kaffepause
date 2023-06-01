import CenteredBox from '@/components/elements/CenteredBox';
import URLS from '@/URLS';
import { useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function Hero() {
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
      sx={{
        justifyContent: 'space-evenly',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '7.5vw',
        paddingRight: '7.5vw',
      }}>
      <Box alignItems='center'>
        <Typography
          align='center'
          component='div'
          sx={{
            fontWeight: 900,
            fontSize: breakpoint ? '3.15rem' : '5rem',
            marginBottom: '1.5rem',
          }}
          variant='h1'>
          En bedre måte å ta pauser på
        </Typography>
        <Typography
          align='center'
          component='div'
          sx={{ fontSize: breakpoint ? '1rem' : '1.5rem' }}
          variant='subtitle1'>
          Å ta lesepauser med venner har aldri vært enklere
        </Typography>

        <CenteredBox>
          <Button
            disableElevation
            href={URLS.SIGNIN}
            sx={{ marginTop: '1rem' }}
            variant='contained'>
            Ta en pause
          </Button>
        </CenteredBox>
      </Box>
    </Box>
  );
}
