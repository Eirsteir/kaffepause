import * as React from 'react';

import SearchInputField from '@/components/elements/SearchInputField';
import SearchBar from '@/components/elements/SearchInputField';
import { useSearchUsers } from '@/hooks/User';
import { IUser, IUserEdge } from '@/types/User';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';

export default function Search() {
  const [value, setValue] = React.useState<IUser | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly IUser[]>([]);

  const [search, { data, loading, error }] = useSearchUsers();
  //   const results = useMemo(
  //     () =>
  //       data !== undefined ? data.searchUsers.edges.map((edge) => edge.node) : [],
  //     [data],
  //   );

  const fetch = React.useMemo(
    () =>
      debounce(
        (query: string, callback: (results?: readonly IUser[]) => void) => {
          //   (autocompleteService.current as any).getPlacePredictions(
          //     request,
          //     callback,
          //   );
          // DO REQUEST

          search({
            variables: { query, first: 10 },
            onCompleted: ({ searchUsers }) =>
              callback(searchUsers.edges.map((edge: IUserEdge) => edge.node)),
          });
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results?: readonly IUser[]) => {
      // HANDLE RESULTS
      console.log(results);

      if (active) {
        let newOptions: readonly IUser[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  console.log('options: ', options);
  return (
    <Autocomplete
      filterOptions={(x) => x}
      filterSelectedOptions
      freeSolo
      getOptionLabel={(option) => option.name}
      id='search-bar'
      includeInputInList
      noOptionsText='No locations'
      onChange={(event: any, newValue: IUser | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      renderInput={(params) => {
        return <SearchBar {...params} />;
      }}
      renderOption={(props, option) => {
        return (
          <li {...props}>
            <Grid alignItems='center' container>
              <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid>
              <Grid
                item
                sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                <Typography color='text.secondary' variant='body2'>
                  {option.name}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
      sx={{ width: 300 }}
      value={value}
    />
  );
}
