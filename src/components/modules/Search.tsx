import { useRouter } from 'next/router';
import * as React from 'react';

import SearchBar from '@/components/elements/SearchInputField';
import { useSearchUsers } from '@/hooks/User';
import { User, UserEdge } from '@/types/User';
import URLS from '@/URLS';
import { CircularProgress } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { debounce } from '@mui/material/utils';

import Avatar from '../elements/Avatar';

// https://nextjs.org/docs/api-reference/next/router#resetting-state-after-navigation
export default function Search() {
  const router = useRouter();
  const [value, setValue] = React.useState<User | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<readonly User[]>([]);
  const [search, { data, loading, error }] = useSearchUsers();

  const fetch = React.useMemo(
    () =>
      debounce(
        (query: string, callback: (results?: readonly User[]) => void) => {
          search({
            variables: { query, first: 10 },
            onCompleted: ({ searchUsers }) =>
              callback(searchUsers.edges.map((edge: UserEdge) => edge.node)),
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

    fetch(inputValue, (results?: readonly User[]) => {
      if (active) {
        let newOptions: readonly User[] = [];

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
      filterOptions={(x) => x}
      filterSelectedOptions
      freeSolo
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.name
      }
      id='search-bar'
      includeInputInList
      loading={loading}
      loadingText={'Laster...'}
      noOptionsText='Ingen treff'
      onChange={(event: any, newValue: User | null) => {
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
        return <SearchBar placeholder='Søk kaffedrikkere...' {...params} />;
      }}
      renderOption={(props, option) => {
        return (
          <>
            <li {...props}>
              <Grid alignItems='center' container>
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
      value={value}
    />
  );
}
