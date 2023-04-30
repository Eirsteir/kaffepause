import SearchIcon from '@mui/icons-material/Search';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { alpha, styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  marginLeft: 0,
  width: '10%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    minWidth: 'inherit !important',
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(3)})`,
    transition: theme.transitions.create(['width', 'backgroundColor']),
    borderRadius: theme.shape.borderRadius,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width: '15ch',
      },
    },
    '&:focus': {
      backgroundColor: alpha(grey[500], 0.15),
      '&:hover': {
        backgroundColor: alpha(grey[500], 0.25),
      },
    },
  },
}));

export default function SearchBar(params) {
  const { InputLabelProps, InputProps, ...rest } = params;
  return (
    <Search>
      <SearchIconWrapper>
        <Tooltip title='Søk'>
          <IconButton
            aria-controls='search-bar'
            aria-haspopup='true'
            sx={{
              zIndex: 10,
            }}>
            <SearchIcon />
          </IconButton>
        </Tooltip>
      </SearchIconWrapper>
      <StyledInputBase {...params.InputProps} {...rest} />
    </Search>
  );
}
