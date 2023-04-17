import * as React from 'react';

import BouncingDotsLoader from '@/components/elements/BouncingDotsLoader';
import { useLocationsLazy } from '@/hooks/Location';
import { Location } from '@/types/Location';
import { Typography } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export default function LocationAsynchronousAutocomplete({
  onChange,
}: {
  onChange: (value: Location) => void;
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly Location[]>([]);

  const [getLocations, { error }] = useLocationsLazy();
  const loading = open && options.length === 0;

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    getLocations({
      onCompleted: (data) => {
        if (active) {
          const locations =
            data !== undefined
              ? data.locations.edges.map((edge) => edge.node)
              : [];
          setOptions([...locations]);
        }
      },
    });

    return () => {
      active = false;
    };
  }, [loading, getLocations]);

  return (
    <>
      <Autocomplete
        getOptionLabel={(option) => option.title}
        id='locations-autocomplete'
        isOptionEqualToValue={(option, value) => option.title === value.title}
        loading={loading}
        loadingText={<BouncingDotsLoader fontSize={8} />}
        noOptionsText='Ingen campuser funnet'
        onChange={(event, value) => {
          onChange(value);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onOpen={() => {
          setOpen(true);
        }}
        open={open}
        options={options}
        renderInput={(params) => (
          <TextField
            {...params}
            label='Søk campuser'
            size='small'
            variant='standard'
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.uuid}>
              {option.title}
            </li>
          );
        }}
        sx={{ width: 250 }}
      />

      {error && (
        <Typography color='error.main' variant='subtitle2'>
          Det oppsto en feil ved henting av campuser. Prøv igjen snart!
        </Typography>
      )}
    </>
  );
}
