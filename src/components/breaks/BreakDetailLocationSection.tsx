import { ILocation } from '@/types/Location';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const BreakDetailLocationSection = ({
  location,
  canViewerEdit,
}: {
  location: ILocation | undefined;
  canViewerEdit: boolean;
}) => (
  <Box sx={{ marginTop: '2rem' }}>
    <Typography sx={{ paddingBottom: '.5rem' }} variant='h2'>
      Sted
    </Typography>
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginTop: '0.5rem',
      }}>
      <LocationOnOutlinedIcon fontSize='small' />
      <Typography variant='body1'>
        {location?.title || 'Ikke oppgitt'}
      </Typography>
    </Box>

    {(canViewerEdit && !location) ?? (
      <Button sx={{ marginTop: 2 }} variant='outlined'>
        Legg til sted
      </Button>
    )}
  </Box>
);
