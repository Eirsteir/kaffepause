import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export const BreakDetailLocationSection = ({ title }: { title: string }) => (
  <Box sx={{ marginTop: '2rem' }}>
    <Typography variant='h5'>Sted</Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '0.5rem',
      }}>
      <LocationOnOutlinedIcon fontSize='small' />
      <Typography variant='body1'>{title}</Typography>
    </Box>
  </Box>
);
