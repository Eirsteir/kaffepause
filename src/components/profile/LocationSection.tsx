import { useState } from 'react';

import LoadingButton from '@/components/elements/LoadingButton';
import LocationAsynchronousAutocomplete from '@/components/modules/locations/LocationAsynchronousAutocomplete';
import { useUpdatePreferredLocation } from '@/hooks/User';
import { Location } from '@/types/Location';
import { User } from '@/types/User';
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function UserLocationSection({
  user,
  actorIsUser,
}: {
  user: User;
  actorIsUser: boolean;
}) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [location, setLocation] = useState<Location>();
  const [updateLocation, { loading, error }] = useUpdatePreferredLocation();

  const onSubmit = () => {
    if (location === undefined) return;

    updateLocation({
      variables: { locationUuid: location.uuid },
      onCompleted: (data) => {
        if (data.updatePreferredLocation.success) {
          setIsEditing(false);
          // show success state
        }
      },
    });
  };

  return (
    <>
      <Box sx={{ marginTop: '1rem' }}>
        <Typography
          sx={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}
          variant='h2'>
          Foretrukket campus
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            paddingBottom: '.5rem',
          }}>
          <LocationOnOutlinedIcon color='primary' fontSize='small' />

          <Typography variant='body1'>
            {user.preferredLocation?.title || 'Ikke oppgitt'}
          </Typography>
        </Box>

        {isEditing && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
            }}>
            <LocationAsynchronousAutocomplete onChange={setLocation} />

            <Box pl={3} pt={1}>
              <Button onClick={() => setIsEditing(false)} variant='outlined'>
                Avbryt
              </Button>
              <LoadingButton
                disabled={location === undefined}
                loading={loading}
                onClick={onSubmit}
                sx={{ marginLeft: 1 }}
                variant='contained'>
                Lagre
              </LoadingButton>
            </Box>

            {error && (
              <Typography color='error.main' variant='subtitle2'>
                Det oppsto en under oppdateringen. Prøv igjen snart!
              </Typography>
            )}
          </Box>
        )}

        {actorIsUser && !isEditing && (
          <Button onClick={() => setIsEditing(true)} variant='outlined'>
            {user.preferredLocation ? 'Endre campus' : 'Legg til en campus'}
          </Button>
        )}
      </Box>
    </>
  );
}
