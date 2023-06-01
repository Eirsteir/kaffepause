import CenteredBox from '@/components/elements/CenteredBox';
import URLS from '@/URLS';
import { useMediaQuery } from '@mui/material';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export default function Pitcher() {
  const theme = useTheme();
  const breakpoint = useMediaQuery(theme.breakpoints.down('md'), {
    noSsr: true,
  });

  return (
    <CenteredBox minHeight='80vh' minWidth='100%'>
      <Typography
        sx={{ fontSize: breakpoint ? '2.5rem' : '3.5rem' }}
        variant='h3'>
        Ta en pause med vennene dine - kaffepause
      </Typography>
      <Button
        disableElevation
        href={URLS.SIGNIN}
        sx={{
          marginTop: '1.5rem',
          marginRight: 'auto',
        }}
        variant='contained'>
        Kom i gang
      </Button>
    </CenteredBox>
  );
}
