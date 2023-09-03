import { useSnackbar } from 'material-ui-snackbar-provider';
import * as React from 'react';

import BouncingDotsLoader from '@/components/elements/BouncingDotsLoader';
import LoadingButton from '@/components/elements/LoadingButton';
import { useAddUserLocation, useLocationsLazy } from '@/hooks/Location';
import { Location } from '@/types/Location';
import { ApolloError } from '@apollo/client';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface LocationOptionType {
  inputValue?: string;
  title: string;
}

interface LocationSelectCreateOptionDialogProps {
  // locations: readonly LocationOptionType[];
  initialLocation: Location | undefined;
  // loading: boolean;
  onSelect: (location: Location) => void;
}

const filter = createFilterOptions<LocationOptionType>();

export default function LocationSelectCreateOptionDialog({
  // locations,
  initialLocation,
  // loading,
  onSelect,
}: LocationSelectCreateOptionDialogProps) {
  const [value, setValue] = React.useState<LocationOptionType | null>({
    title: initialLocation?.title ?? '',
  });
  const [open, toggleOpen] = React.useState(false);
  const [dialogueOpen, setDialogueOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
  });

  const [locations, setLocations] = React.useState([]);

  const [getLocations, { error }] = useLocationsLazy();
  const loading = open && locations.length === 0;
  const fetchLocations = async () => {
    if (locations.length === 0) {
      // Fetch locations when options are empty (i.e., only when the user opens the autocomplete).
      getLocations({
        onCompleted: (data) => {
          const locations2 =
            data !== undefined
              ? data.locations.edges.map((edge) => edge.node)
              : [];
          setLocations([...locations2]);
        },
      });
    }
  };

  React.useEffect(() => {
    if (open) {
      fetchLocations();
    }
  }, [open]);

  const snackbar = useSnackbar();

  const [
    addUserLocation,
    { data, loading: addLocationLoading, error: addLocationError },
  ] = useAddUserLocation();
  const [hasAddedUserLocation, setHasAddedUserLocation] =
    React.useState<boolean>(false);

  const handleClose = () => {
    setDialogValue({
      title: '',
    });
    toggleOpen(false);
    setDialogueOpen(false);
    setHasAddedUserLocation(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
    });
    addUserLocation({
      variables: { title: dialogValue.title },
      onCompleted: (data) => {
        if (data.addUserLocation.success) {
          onSelect(data.addUserLocation.location);
          setHasAddedUserLocation(true);
        } else {
          snackbar.showMessage(data.addUserLocation.errors);
        }
      },
      onError: (e: ApolloError) => snackbar.showMessage(e.message),
    });
  };

  if (error) {
    snackbar.showMessage(error.message);
  } else if (addLocationError) {
    snackbar.showMessage(error.message);
  }

  return (
    <React.Fragment>
      <Autocomplete
        clearOnBlur
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Opprett "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        freeSolo
        getOptionLabel={(option) => {
          // e.g value selected with enter, right from the input
          if (typeof option === 'string') {
            return option;
          }
          if (option.inputValue) {
            return option.inputValue;
          }
          return option.title;
        }}
        handleHomeEndKeys
        id='break-location-selector-dialog-demo'
        loading={loading}
        loadingText={<BouncingDotsLoader fontSize={8} />}
        onChange={(event, newValue) => {
          console.log(open);
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              setDialogueOpen(true);
              setDialogValue({
                title: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            setDialogueOpen(true);
            setDialogValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
            onSelect(newValue as Location);
          }
        }}
        onOpen={() => toggleOpen(true)}
        options={locations}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading && !value ? <BouncingDotsLoader /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              label='Velg sted'
              size='small'
            />
          </>
        )}
        renderOption={(props, option) => (
          <li {...props} key={option.uuid}>
            {option.title}
          </li>
        )}
        selectOnFocus
        sx={{ width: '100%' }}
        value={value}
      />

      <Dialog onClose={handleClose} open={dialogueOpen}>
        {hasAddedUserLocation ? (
          <>
            <DialogTitle>
              <b>{data.addUserLocation.location.title}</b> ble lagt til som nytt
              sted!
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Du kan nå sette i gang en pause her og se dine andre steder på
                profilen din.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'center' }}>
              <Button onClick={handleClose} variant='contained'>
                Ok
              </Button>
            </DialogActions>
          </>
        ) : (
          <form onSubmit={handleSubmit}>
            <DialogTitle>Legg til et nytt sted</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Savner du et campus, kantine eller lesesal? Legg den til her!
              </DialogContentText>
              <TextField
                autoFocus
                id='name'
                label='Navn'
                margin='dense'
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    title: event.target.value,
                  })
                }
                type='text'
                value={dialogValue.title}
                variant='standard'
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Avbryt</Button>
              <LoadingButton
                disabled={!dialogValue.title.trim()}
                loading={addLocationLoading}
                type='submit'
                variant='contained'>
                Lagre
              </LoadingButton>
            </DialogActions>
          </form>
        )}
      </Dialog>
    </React.Fragment>
  );
}
