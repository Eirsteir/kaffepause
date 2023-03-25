import { useRouter } from 'next/router';
import * as React from 'react';

import SearchBar from '@/components/elements/SearchInputField';
import { useSearchUsers } from '@/hooks/User';
import { IUser, IUserEdge } from '@/types/User';
import URLS from '@/URLS';
import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';

import Avatar from '../elements/Avatar';

export default function Search() {
  const router = useRouter();
  const [value, setValue] = React.useState<IUser | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly IUser[]>([]);
  const [search, { data, loading, error }] = useSearchUsers();

  const fetch = React.useMemo(
    () =>
      debounce(
        (query: string, callback: (results?: readonly IUser[]) => void) => {
          search({
            variables: { query, first: 10 },
            onCompleted: ({ searchUsers }) =>
              callback(searchUsers.edges.map((edge: IUserEdge) => edge.node)),
          });
        },
        400,
      ),
    [search],
  );

  React.useEffect(() => {
    let active = true;

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch(inputValue, (results?: readonly IUser[]) => {
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

  return (
    <Autocomplete
      //   blurOnSelect={true}
      filterOptions={(x) => x}
      filterSelectedOptions
      freeSolo
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      id='search-bar'
      includeInputInList
      loading={loading}
      loadingText='Laster...'
      noOptionsText='Ingen treff'
      onChange={(event: any, newValue: IUser | null) => {
        setOptions([]);
        setValue('');
        setInputValue('');
        if (newValue) router.push(URLS.USERS + '/' + newValue.uuid);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      options={options}
      renderInput={(params) => {
        params.InputProps = {
          ...params.InputProps,
          endAdornment: (
            <React.Fragment>
              {loading ? <CircularProgress color='inherit' size={20} /> : null}
              {params.InputProps.endAdornment}
            </React.Fragment>
          ),
        };
        return <SearchBar placeholder='Søk etter brukere...' {...params} />;
      }}
      renderOption={(props, option) => {
        return (
          <>
            <li {...props}>
              <Grid
                alignItems='center'
                container
                sx={{ paddingTop: '.5rem', paddingBottom: '.5rem' }}>
                <Grid item sx={{ display: 'flex', width: 44 }}>
                  <Avatar sx={{ width: 32, height: 32 }} user={option} />
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
            <Divider />
          </>
        );
      }}
      sx={{ width: 302 }} // will push loading icon down if smaller
      value={value}
    />
  );
}
