import { useSnackbar } from 'material-ui-snackbar-provider';
import { useEffect, useMemo, useState } from 'react';

import CenteredBox from '@/components/elements/CenteredBox';
import LocationSelectCreateOptionDialog from '@/components/modules/planning/location/LocationSelectCreateOptionDialog';
import { useLocations } from '@/hooks/Location';
import { Location } from '@/types/Location';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface BreakPlannerLocationSelectorProps {
  initialLocation: Location | undefined;
  onSelect: (location: Location) => void;
}

export default function BreakPlannerLocationSelector({
  initialLocation,
  onSelect,
}: BreakPlannerLocationSelectorProps) {
  const [location, setLocation] = useState<Location | undefined>(
    initialLocation,
  );

  const handleSelect = (location: Location) => {
    setLocation(location);
    onSelect(location);
  };

  useEffect(() => {
    if (location) {
      onSelect(location);
    }
  }, [onSelect, location]);

  return (
    <>
      <Tooltip
        placement='top'
        title='Legg til et sted så blir det lettere å koordinere pausene.'>
        <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
          Hvor?
        </Typography>
      </Tooltip>

      <Box>
        <LocationSelectCreateOptionDialog
          initialLocation={location}
          // loading={loading}
          // locations={locations}
          onSelect={handleSelect}
        />

        <Typography variant='caption'>
          *Du kan legge til et nytt sted ved å skrive det inn her
        </Typography>
      </Box>
    </>
  );
}
