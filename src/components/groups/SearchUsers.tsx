import * as React from 'react';

import { useSearchUsers } from '@/hooks/User';
import { User, UserEdge } from '@/types/User';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { debounce } from '@mui/material/utils';

export default function SearchUsers({
  onSelect,
  onSearchCompletedCallback,
}: {
  onSelect: (user: User) => void;
  onSearchCompletedCallback?: (options: User[]) => void;
}) {
  const [value, setValue] = React.useState<User | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const [options, setOptions] = React.useState<User[]>([]);

  const [search, { loading }] = useSearchUsers();

  const fetch = React.useMemo(
    () =>
      debounce((query: string, callback: (results?: User[]) => void) => {
        search({
          variables: { query },
          onCompleted: ({ searchUsers }) =>
            callback(searchUsers.edges.map((edge: UserEdge) => edge.node)),
        });
      }, 100),
    [search],
  );

  const handleSelectUser = (event, value: User | null) => {
    if (value) {
      onSelect(value);
    }
    setInputValue('');
  };

  const handleInputChange = (event, value) => {
    setInputValue(value);
  };

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

        if (onSearchCompletedCallback) {
          onSearchCompletedCallback(newOptions);
        }
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch, onSearchCompletedCallback]);

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
      loading={false}
      // loadingText={null}
      // noOptionsText={null}
      onChange={handleSelectUser}
      onInputChange={handleInputChange}
      options={options}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Søk kaffedrikkere'
          size='small'
          variant='outlined'
        />
      )}
      renderOption={(props, option) => null}
      value={value}
    />
  );
}
