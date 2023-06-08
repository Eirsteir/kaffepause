import CenteredBox from '@/components/elements/CenteredBox';
import URLS from '@/URLS';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Pitcher() {
  return (
    <CenteredBox minHeight='80vh' minWidth='100%'>
      <Typography
        sx={{ fontSize: { xs: '2.5rem', md: '2.5rem', lg: '3.5rem' } }}
        variant='h3'>
        Ta en pause med vennene dine - kaffepause
      </Typography>
      <Button
        disableElevation
        href={URLS.SIGNIN}
        sx={{
          marginTop: '1.5rem',
          marginRight: 'auto',
          padding: '.5rem 1rem',
        }}
        variant='contained'>
        Kom i gang
      </Button>
    </CenteredBox>
  );
}
