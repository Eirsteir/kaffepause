import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

interface LocationOptionType {
  inputValue?: string;
  title: string;
}

interface LocationSelectCreateOptionDialogProps {
  locations: readonly LocationOptionType[];
  originalLocation: LocationOptionType;
  onSelect: (location: LocationOptionType) => void;
}

const filter = createFilterOptions<LocationOptionType>();

export default function LocationSelectCreateOptionDialog({ locations, originalLocation, onSelect }: LocationSelectCreateOptionDialogProps) {
  const [value, setValue] = React.useState<LocationOptionType | null>(originalLocation);
  const [open, toggleOpen] = React.useState(false);
  
  const [dialogValue, setDialogValue] = React.useState({
    title: ''
  });
  
  const handleClose = () => {
    setDialogValue({
      title: ''
    });
    toggleOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setValue({
      title: dialogValue.title
    });
    handleClose();
  };

  return (
    <React.Fragment>
      <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
              toggleOpen(true);
              setDialogValue({
                title: newValue
              });
            });
          } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            setDialogValue({
              title: newValue.inputValue
            });
          } else {
            setValue(newValue);
            onSelect(newValue);  // TODO: sjekk nye verdier
          }
        }}
        filterOptions={(options, params) => {
          const filtered = filter(options, params);

          if (params.inputValue !== '') {
            filtered.push({
              inputValue: params.inputValue,
              title: `Add "${params.inputValue}"`,
            });
          }

          return filtered;
        }}
        id="free-solo-dialog-demo"
        options={locations}
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
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(props, option) => <li {...props}>{option.title}</li>}
        sx={{ width: 300 }}
        freeSolo
        renderInput={(params) => <TextField {...params} label="Velg sted" />}
      />
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Legg til et nytt sted</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Savner du et campus, kantine eller lesesal? Legg den til her!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.title}
              onChange={(event) =>
                setDialogValue({
                  ...dialogValue,
                  title: event.target.value,
                })
              }
              label="Navn"
              type="text"
              variant="standard"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Avbryt</Button>
            <Button type="submit">Lagre</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}

