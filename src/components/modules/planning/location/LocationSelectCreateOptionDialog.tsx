import * as React from 'react';

import { ILocation } from '@/types/Location';
import { CircularProgress } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

interface LocationOptionType {
  inputValue?: string;
  title: string;
}

interface LocationSelectCreateOptionDialogProps {
  locations: readonly LocationOptionType[];
  initialLocation: ILocation | undefined;
  loading: boolean;
  error: string;
  onSelect: (location: ILocation) => void;
}

const filter = createFilterOptions<LocationOptionType>();

export default function LocationSelectCreateOptionDialog({
  locations,
  initialLocation,
  loading,
  error,
  onSelect,
}: LocationSelectCreateOptionDialogProps) {
  const [value, setValue] = React.useState<LocationOptionType | null>({
    title: initialLocation?.title ?? '',
  });
  const [open, toggleOpen] = React.useState(false);

  const [dialogValue, setDialogValue] = React.useState({
    title: '',
  });

  const handleClose = () => {
    setDialogValue({
      title: '',
    });
    toggleOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title,
    });
    handleClose();
  };

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
        id='free-solo-dialog-demo'
        loading={loading}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue,
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue,
            });
          } else {
            setValue(newValue);
            onSelect(newValue as ILocation);
          }
        }}
        options={locations}
        renderInput={(params) => (
          <>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading && !value ? (
                      <CircularProgress color='inherit' size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
              label='Velg sted'
            />
            <Typography sx={{ color: 'red' }} variant='caption'>
              {error}
            </Typography>
          </>
        )}
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        selectOnFocus
        // sx={{ width: 300 }}
        value={value}
      />

      <Dialog onClose={handleClose} open={open}>
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
            <Button type='submit'>Lagre</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
