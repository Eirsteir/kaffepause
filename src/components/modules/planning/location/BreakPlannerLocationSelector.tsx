import { useEffect, useMemo, useState } from 'react';

import CenteredBox from '@/components/elements/CenteredBox';
import LocationSelectCreateOptionDialog from '@/components/modules/planning/location/LocationSelectCreateOptionDialog';
import { useLocations } from '@/hooks/Location';
import { Location } from '@/types/Location';
import { User } from '@/types/User';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

interface BreakPlannerLocationSelectorProps {
  user: User;
  onSelect: (location: Location) => void;
}

export default function BreakPlannerLocationSelector({
  user,
  onSelect,
}: BreakPlannerLocationSelectorProps) {
  const [location, setLocation] = useState<Location | undefined>(
    user.preferredLocation,
  );
  const [inputError, setInputError] = useState<string>('');
  const { loading, error, data } = useLocations();
  const locations = useMemo(
    () =>
      data !== undefined ? data.locations.edges.map((edge) => edge.node) : [],
    [data],
  );

  const handleSelect = (location: Location) => {
    if (!location) {
      return setInputError('Du må velge et pausested');
    }
    setInputError('');
    setLocation(location);
    onSelect(location);
  };

  useEffect(() => {
    if (location) {
      onSelect(location);
    }
  }, [onSelect, location]);

  return (
    <CenteredBox>
      <Tooltip
        placement='top'
        title='Legg til et sted så blir det lettere å koordinere pausene.'>
        <Typography sx={{ marginBottom: '1rem' }} variant='h3'>
          Hvor?
        </Typography>
      </Tooltip>

      <Box sx={{ maxWidth: 250 }}>
        <LocationSelectCreateOptionDialog
          initialLocation={location}
          loading={loading}
          locations={locations}
          onSelect={handleSelect}
        />

        <Typography variant='caption'>
          *Du kan legge til et nytt sted ved å skrive det inn her
        </Typography>
        {error && (
          <Typography sx={{ color: 'red' }} variant='caption'>
            {error.message}
          </Typography>
        )}
      </Box>
    </CenteredBox>
  );
}
