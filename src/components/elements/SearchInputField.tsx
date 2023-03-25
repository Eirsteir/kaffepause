import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import InputAdornment from '@mui/material/InputAdornment';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(grey[500], 0.15),
  '&:hover': {
    backgroundColor: alpha(grey[500], 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const SearchInputField = () => (
  <Search>
    <SearchIconWrapper>
      <SearchIcon color='primary' />
    </SearchIconWrapper>
    <StyledInputBase
      inputProps={{ 'aria-label': 'search' }}
      placeholder='Søk...'
    />
  </Search>
);

const CssTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: 'green',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'green',
  },
  '& .MuiFilledInput-root': {
    '& fieldset': {
      borderColor: 'red',
    },
    '&:hover fieldset': {
      borderColor: 'yellow',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'green',
    },
  },
});

export default function SearchBar(params) {
  const { InputLabelProps, InputProps, ...rest } = params;
  return (
    // <CssTextField
    //   {...params}
    //   InputProps={{
    //     ...params.InputProps,
    //     startAdornment: (
    //       <InputAdornment position='start'>
    //         <SearchIcon color='primary' />
    //       </InputAdornment>
    //     ),
    //   }}
    //   label='Søk...'
    //   size='small'
    //   variant='filled'
    // />
    <Search>
      <SearchIconWrapper>
        <SearchIcon color='primary' />
      </SearchIconWrapper>
      <StyledInputBase
        {...params.InputProps}
        {...rest}
        // inputProps={{ 'aria-label': 'search' }}
        placeholder='Søk...'
      />
    </Search>
  );
}
