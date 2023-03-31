import { useEffect, useMemo, useState } from 'react';

import CenteredBox from '@/components/elements/CenteredBox';
import LocationSelectCreateOptionDialog from '@/components/modules/planning/location/LocationSelectCreateOptionDialog';
import { useLocations } from '@/hooks/Location';
import { ILocation } from '@/types/Location';
import { IUser } from '@/types/User';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface BreakPlannerLocationSelectorProps {
  user: IUser;
  onSelect: (location: ILocation) => void;
}

export default function BreakPlannerLocationSelector({
  user,
  onSelect,
}: BreakPlannerLocationSelectorProps) {
  const [location, setLocation] = useState<ILocation | undefined>(
    user.preferredLocation,
  );
  const [inputError, setInputError] = useState<string>('');
  const { loading, error, data } = useLocations();
  const locations = useMemo(
    () =>
      data !== undefined ? data.locations.edges.map((edge) => edge.node) : [],
    [data],
  );

  const handleSelect = (location: ILocation) => {
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
      <Typography sx={{ marginBottom: '1rem', marginTop: '2rem' }} variant='h6'>
        Hvor?
      </Typography>
      <Box sx={{ maxWidth: 250 }}>
        <LocationSelectCreateOptionDialog
          error={inputError}
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
