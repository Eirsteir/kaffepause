import { ILocation } from '@/types/Location';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export const BreakDetailLocationSection = ({
  location,
  canViewerEditBreak,
}: {
  location: ILocation | undefined;
  canViewerEditBreak: boolean;
}) => {
  const resolveButton = () => {
    if (!canViewerEditBreak) {
      return;
    }

    if (location) {
      return (
        <Button sx={{ marginTop: 2 }} variant='outlined'>
          Endre sted
        </Button>
      );
    } else {
      return (
        <Button sx={{ marginTop: 2 }} variant='outlined'>
          Legg til sted
        </Button>
      );
    }
  };

  return (
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

      {resolveButton()}
    </Box>
  );
};
