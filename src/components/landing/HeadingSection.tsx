import CenteredBox from '@/components/elements/CenteredBox';
import URLS from '@/URLS';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function HeadingSection() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '7.5vw',
        paddingRight: '7.5vw',
        paddingTop: '5rem',
        paddingBottom: '3.5rem',
        textAlign: 'center',
      }}>
      <Typography
        sx={{
          fontWeight: 900,
          fontSize: { xs: '2.5rem', md: '3.5rem', lg: '5rem' },
          marginBottom: '1.5rem',
        }}
        variant='h1'>
        En bedre måte å ta pauser på
      </Typography>
      <Typography
        sx={{ fontSize: { md: '1rem', lg: '1.5rem' } }}
        variant='subtitle1'>
        {/* Å ta lesepauser med venner har aldri vært enklere */}
        Planlegg sosiale lesepauser med venner enkelt og greit
      </Typography>
      <CenteredBox>
        <Button
          disableElevation
          href={URLS.SIGNIN}
          sx={{ marginTop: '1rem' }}
          variant='contained'>
          Kom i gang
        </Button>
      </CenteredBox>
    </Box>
  );
}
